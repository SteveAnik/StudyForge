import bcrypt

from app.repositories.user_repository import UserRepository
from app.utils.auth import create_jwt
from app.utils.errors import AuthError, ValidationError


class AuthService:
    @staticmethod
    def register(email, password):
        existing = UserRepository.get_by_email(email)
        if existing:
            raise ValidationError("Email already registered")
        password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user = UserRepository.create(email=email, password_hash=password_hash)
        token = create_jwt(user.id)
        return {"user": user.to_dict(), "token": token}

    @staticmethod
    def login(email, password):
        user = UserRepository.get_by_email(email)
        if not user:
            raise AuthError("Invalid credentials")
        if not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
            raise AuthError("Invalid credentials")
        token = create_jwt(user.id)
        return {"user": user.to_dict(), "token": token}
