from flask import Flask, jsonify
from flask_cors import CORS

from .config import Config
from .extensions import db
from .utils.error_handlers import register_error_handlers
from .routes.auth_routes import auth_bp
from .routes.course_routes import course_bp
from .routes.task_routes import task_bp
from .routes.practice_routes import practice_bp
from .routes.analytics_routes import analytics_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from .models.user import User
        from .models.course import Course
        from .models.task import Task
        from .models.practice_attempt import PracticeAttempt

        db.create_all()

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(course_bp, url_prefix="/api/courses")
    app.register_blueprint(task_bp, url_prefix="/api/tasks")
    app.register_blueprint(practice_bp, url_prefix="/api/practice")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")

    @app.get("/api/health")
    def health():
        return jsonify({"success": True, "data": {"status": "ok"}, "error": None})

    register_error_handlers(app)
    return app
