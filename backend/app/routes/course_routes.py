from flask import Blueprint, jsonify, request

from app.repositories.course_repository import CourseRepository
from app.utils.auth import get_current_user
from app.utils.validators import require_fields


course_bp = Blueprint("courses", __name__)


@course_bp.get("")
def list_courses():
    user = get_current_user()
    courses = CourseRepository.list_by_user(user.id)
    return jsonify({"success": True, "data": [course.to_dict() for course in courses], "error": None})


@course_bp.post("")
def create_course():
    user = get_current_user()
    payload = request.get_json() or {}
    require_fields(payload, ["name", "term"])
    course = CourseRepository.create(user.id, payload["name"], payload["term"])
    return jsonify({"success": True, "data": course.to_dict(), "error": None}), 201
