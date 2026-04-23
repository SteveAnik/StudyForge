from flask import Blueprint, jsonify, request

from app.services.auth_service import AuthService
from app.utils.validators import require_fields


auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    require_fields(payload, ["email", "password"])
    data = AuthService.register(payload["email"], payload["password"])
    return jsonify({"success": True, "data": data, "error": None}), 201


@auth_bp.post("/login")
def login():
    payload = request.get_json() or {}
    require_fields(payload, ["email", "password"])
    data = AuthService.login(payload["email"], payload["password"])
    return jsonify({"success": True, "data": data, "error": None}), 200
