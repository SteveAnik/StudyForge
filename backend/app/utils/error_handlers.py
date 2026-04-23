from flask import jsonify

from app.utils.errors import AppError


def register_error_handlers(app):
    @app.errorhandler(AppError)
    def handle_app_error(err):
        return jsonify({"success": False, "data": None, "error": str(err)}), err.status_code

    @app.errorhandler(Exception)
    def handle_unexpected_error(_err):
        return jsonify({"success": False, "data": None, "error": "Internal server error"}), 500
