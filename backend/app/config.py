import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///studyforge.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_EXP_SECONDS = int(os.getenv("JWT_EXP_SECONDS", "86400"))
