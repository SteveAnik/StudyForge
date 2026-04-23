from app.utils.errors import ValidationError


ALLOWED_PRIORITIES = {"low", "medium", "high"}
ALLOWED_STATUS = {"todo", "in_progress", "done"}


def validate_task_payload(payload, partial=False):
    if not partial:
        for key in ["course_id", "title"]:
            if key not in payload:
                raise ValidationError(f"Missing required field: {key}")
    if "priority" in payload and payload["priority"] not in ALLOWED_PRIORITIES:
        raise ValidationError("priority must be low, medium, or high")
    if "status" in payload and payload["status"] not in ALLOWED_STATUS:
        raise ValidationError("status must be todo, in_progress, or done")
