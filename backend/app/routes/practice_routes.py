from flask import Blueprint, jsonify, request

from app.services.practice_service import PracticeService
from app.utils.auth import get_current_user
from app.utils.validators import require_fields


practice_bp = Blueprint("practice", __name__)


@practice_bp.get("/challenges")
def list_challenges():
    get_current_user()
    topic = request.args.get("topic")
    data = PracticeService.list_challenges(topic=topic)
    return jsonify({"success": True, "data": data, "error": None})


@practice_bp.post("/evaluate")
def evaluate_attempt():
    user = get_current_user()
    payload = request.get_json() or {}
    require_fields(payload, ["challenge_id", "submitted_output"])
    data = PracticeService.evaluate_attempt(user.id, payload)
    return jsonify({"success": True, "data": data, "error": None})
