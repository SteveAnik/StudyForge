from app.utils.errors import ValidationError


ALLOWED_TOPICS = {"arrays", "linked_lists", "stacks", "queues", "recursion", "sorting", "searching"}


def validate_practice_payload(payload):
    required = ["topic", "challenge_id", "input_payload", "expected_output", "submitted_output"]
    for key in required:
        if key not in payload:
            raise ValidationError(f"Missing required field: {key}")
    if payload["topic"] not in ALLOWED_TOPICS:
        raise ValidationError("Unsupported topic")
