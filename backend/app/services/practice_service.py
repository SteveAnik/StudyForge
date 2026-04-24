import json
import random
import time
import urllib.error
import urllib.request
from flask import current_app

from app.algorithms.challenge_bank import CHALLENGES, get_challenge, list_challenges
from app.repositories.practice_repository import PracticeRepository
from app.utils.errors import NotFoundError


_RUNTIME_CHALLENGES = {}


class PracticeService:
    @staticmethod
    def list_challenges(topic=None):
        static_items = list_challenges(topic=topic)
        generated_items = [
            {
                "id": challenge["id"],
                "topic": challenge["topic"],
                "title": challenge["title"],
                "prompt": challenge["prompt"],
                "submission_type": challenge["submission_type"],
                "input_payload": challenge["input_payload"],
                "test_cases": challenge["test_cases"],
            }
            for challenge in _RUNTIME_CHALLENGES.values()
            if not topic or challenge["topic"] == topic
        ]
        return generated_items + static_items

    @staticmethod
    def generate_ai_challenge(topic=None):
        fallback_source = [c for c in CHALLENGES if (not topic or c["topic"] == topic)]
        if not fallback_source:
            fallback_source = CHALLENGES
        fallback = random.choice(fallback_source)
        api_key = (current_app.config.get("OPENROUTER_API_KEY") or "").strip()
        if not api_key:
            challenge = {**fallback, "id": f"generated-{fallback['id']}-{int(time.time())}"}
            _RUNTIME_CHALLENGES[challenge["id"]] = challenge
            return challenge

        payload = {
            "model": current_app.config.get("OPENROUTER_MODEL"),
            "messages": [
                {"role": "system", "content": "Return only compact valid JSON."},
                {"role": "user", "content": f"Generate one coding challenge JSON with keys id,title,prompt,topic,submission_type,input_payload,expected_output,test_cases. Topic={topic or 'any'} and submission_type must be one of number,string,boolean,array."},
            ],
            "temperature": 0.5,
        }
        req = urllib.request.Request(
            f"{current_app.config.get('OPENROUTER_BASE_URL')}/chat/completions",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": current_app.config.get("OPENROUTER_SITE_URL"),
                "X-Title": current_app.config.get("OPENROUTER_APP_NAME"),
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as res:
                raw = json.loads(res.read().decode("utf-8"))
            content = raw["choices"][0]["message"]["content"]
            cleaned = content.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            parsed = json.loads(cleaned)
            generated = {
                "id": parsed.get("id") or f"generated-{int(time.time())}",
                "topic": parsed.get("topic") or (topic or fallback["topic"]),
                "title": parsed.get("title") or fallback["title"],
                "prompt": parsed.get("prompt") or fallback["prompt"],
                "submission_type": parsed.get("submission_type") or fallback["submission_type"],
                "input_payload": parsed.get("input_payload") or fallback["input_payload"],
                "expected_output": parsed.get("expected_output", fallback["expected_output"]),
                "test_cases": parsed.get("test_cases") or fallback["test_cases"],
            }
            _RUNTIME_CHALLENGES[generated["id"]] = generated
            return generated
        except (urllib.error.URLError, TimeoutError, KeyError, json.JSONDecodeError):
            challenge = {**fallback, "id": f"generated-{fallback['id']}-{int(time.time())}"}
            _RUNTIME_CHALLENGES[challenge["id"]] = challenge
            return challenge

    @staticmethod
    def evaluate_attempt(user_id, payload):
        challenge = _RUNTIME_CHALLENGES.get(payload["challenge_id"]) or get_challenge(payload["challenge_id"])
        if not challenge:
            raise NotFoundError("Challenge not found")
        submitted_output = payload["submitted_output"]
        expected_output = challenge["expected_output"]
        is_correct = submitted_output == expected_output
        attempt = PracticeRepository.create(
            user_id=user_id,
            topic=challenge["topic"],
            challenge_id=challenge["id"],
            input_payload=challenge["input_payload"],
            expected_output=expected_output,
            submitted_output=submitted_output,
            is_correct=is_correct,
            duration_seconds=payload.get("duration_seconds", 0),
        )
        score = 100 if is_correct else 0
        return {
            "attempt": attempt.to_dict(),
            "score": score,
            "feedback": "Correct" if is_correct else "Incorrect",
            "challenge": {
                "id": challenge["id"],
                "topic": challenge["topic"],
                "title": challenge["title"],
            },
        }
