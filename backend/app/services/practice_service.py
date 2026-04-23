from app.algorithms.challenge_bank import get_challenge, list_challenges
from app.repositories.practice_repository import PracticeRepository
from app.utils.errors import NotFoundError


class PracticeService:
    @staticmethod
    def list_challenges(topic=None):
        return list_challenges(topic=topic)

    @staticmethod
    def evaluate_attempt(user_id, payload):
        challenge = get_challenge(payload["challenge_id"])
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
