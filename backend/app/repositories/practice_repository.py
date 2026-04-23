from app.models.practice_attempt import PracticeAttempt
from app.extensions import db


class PracticeRepository:
    @staticmethod
    def create(**kwargs):
        attempt = PracticeAttempt(**kwargs)
        db.session.add(attempt)
        db.session.commit()
        return attempt

    @staticmethod
    def list_by_user(user_id):
        return PracticeAttempt.query.filter_by(user_id=user_id).all()
