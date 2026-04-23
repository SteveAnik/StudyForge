from app.models.user import User
from app.extensions import db


class UserRepository:
    @staticmethod
    def get_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def create(email, password_hash):
        user = User(email=email, password_hash=password_hash)
        db.session.add(user)
        db.session.commit()
        return user
