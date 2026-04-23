from flask import Blueprint, jsonify, request

from app.services.task_service import TaskService
from app.utils.auth import get_current_user
from app.utils.validators import require_fields


task_bp = Blueprint("tasks", __name__)


@task_bp.get("")
def list_tasks():
    user = get_current_user()
    status = request.args.get("status")
    priority = request.args.get("priority")
    data = TaskService.list_tasks(user.id, status=status, priority=priority)
    return jsonify({"success": True, "data": data, "error": None})


@task_bp.post("")
def create_task():
    user = get_current_user()
    payload = request.get_json() or {}
    require_fields(payload, ["course_id", "title"])
    data = TaskService.create_task(user.id, payload)
    return jsonify({"success": True, "data": data, "error": None}), 201


@task_bp.patch("/<task_id>")
def update_task(task_id):
    user = get_current_user()
    payload = request.get_json() or {}
    data = TaskService.update_task(user.id, task_id, payload)
    return jsonify({"success": True, "data": data, "error": None})


@task_bp.delete("/<task_id>")
def delete_task(task_id):
    user = get_current_user()
    TaskService.delete_task(user.id, task_id)
    return jsonify({"success": True, "data": {"deleted": True}, "error": None})
