from app.utils.errors import ValidationError


def require_fields(payload, required_fields):
    missing = [field for field in required_fields if field not in payload or payload[field] in (None, "")]
    if missing:
        raise ValidationError(f"Missing required fields: {', '.join(missing)}")
