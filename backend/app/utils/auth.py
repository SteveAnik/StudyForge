from datetime import datetime, timedelta, timezone

import jwt
from flask import current_app, request

from app.repositories.user_repository import UserRepository
from app.utils.errors import AuthError


def create_jwt(user_id):
    now = datetime.now(tz=timezone.utc)
    payload = {
        "sub": user_id,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(seconds=current_app.config["JWT_EXP_SECONDS"])).timestamp()),
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")


def decode_jwt(token):
    try:
        return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    except jwt.ExpiredSignatureError as exc:
        raise AuthError("Token expired") from exc
    except jwt.PyJWTError as exc:
        raise AuthError("Invalid token") from exc


def get_current_user():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise AuthError("Missing bearer token")
    token = auth_header.split(" ", 1)[1].strip()
    claims = decode_jwt(token)
    user = UserRepository.get_by_id(claims["sub"])
    if not user:
        raise AuthError("User not found")
    return user
