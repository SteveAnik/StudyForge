from flask import Blueprint, jsonify

from app.services.analytics_service import AnalyticsService
from app.utils.auth import get_current_user


analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.get("/overview")
def overview():
    user = get_current_user()
    data = AnalyticsService.overview(user.id)
    return jsonify({"success": True, "data": data, "error": None})


@analytics_bp.get("/topics")
def topics():
    user = get_current_user()
    data = AnalyticsService.topics(user.id)
    return jsonify({"success": True, "data": data, "error": None})
