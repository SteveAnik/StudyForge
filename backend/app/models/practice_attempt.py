import uuid
from datetime import datetime

from app.extensions import db


class PracticeAttempt(db.Model):
    __tablename__ = "practice_attempts"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    topic = db.Column(db.String(50), nullable=False)
    challenge_id = db.Column(db.String(100), nullable=False)
    input_payload = db.Column(db.JSON, nullable=False)
    expected_output = db.Column(db.JSON, nullable=False)
    submitted_output = db.Column(db.JSON, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    duration_seconds = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="practice_attempts")

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "topic": self.topic,
            "challenge_id": self.challenge_id,
            "input_payload": self.input_payload,
            "expected_output": self.expected_output,
            "submitted_output": self.submitted_output,
            "is_correct": self.is_correct,
            "duration_seconds": self.duration_seconds,
            "created_at": self.created_at.isoformat(),
        }
