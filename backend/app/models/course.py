import uuid

from app.extensions import db


class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    term = db.Column(db.String(100), nullable=False)

    user = db.relationship("User", back_populates="courses")
    tasks = db.relationship("Task", back_populates="course", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "name": self.name,
            "term": self.term,
        }
