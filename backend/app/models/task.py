import uuid

from app.extensions import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    priority = db.Column(db.String(20), nullable=False, default="medium")
    status = db.Column(db.String(20), nullable=False, default="todo")
    estimated_minutes = db.Column(db.Integer, nullable=False, default=30)

    course = db.relationship("Course", back_populates="tasks")

    def to_dict(self):
        return {
            "id": str(self.id),
            "course_id": str(self.course_id),
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "priority": self.priority,
            "status": self.status,
            "estimated_minutes": self.estimated_minutes,
        }
