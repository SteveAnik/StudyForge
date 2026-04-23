from datetime import datetime

from app.repositories.course_repository import CourseRepository
from app.repositories.task_repository import TaskRepository
from app.utils.errors import ForbiddenError, NotFoundError, ValidationError


class TaskService:
    @staticmethod
    def list_tasks(user_id, status=None, priority=None):
        courses = CourseRepository.list_by_user(user_id)
        course_ids = [course.id for course in courses]
        if not course_ids:
            return []
        tasks = TaskRepository.list_by_course_ids(course_ids, status=status, priority=priority)
        return [task.to_dict() for task in tasks]

    @staticmethod
    def create_task(user_id, payload):
        course = CourseRepository.get_by_id(payload["course_id"])
        if not course:
            raise NotFoundError("Course not found")
        if course.user_id != user_id:
            raise ForbiddenError("You do not own this course")
        due_date = None
        if payload.get("due_date"):
            due_date = datetime.fromisoformat(payload["due_date"])
        priority = payload.get("priority", "medium")
        status = payload.get("status", "todo")
        if priority not in {"low", "medium", "high"}:
            raise ValidationError("priority must be low, medium, or high")
        if status not in {"todo", "in_progress", "done"}:
            raise ValidationError("status must be todo, in_progress, or done")
        task = TaskRepository.create(
            course_id=payload["course_id"],
            title=payload["title"],
            description=payload.get("description"),
            due_date=due_date,
            priority=priority,
            status=status,
            estimated_minutes=payload.get("estimated_minutes", 30),
        )
        return task.to_dict()

    @staticmethod
    def update_task(user_id, task_id, payload):
        task = TaskRepository.get_by_id(task_id)
        if not task:
            raise NotFoundError("Task not found")
        if task.course.user_id != user_id:
            raise ForbiddenError("You do not own this task")
        for key in ["title", "description", "priority", "status", "estimated_minutes"]:
            if key in payload:
                setattr(task, key, payload[key])
        if "due_date" in payload:
            task.due_date = datetime.fromisoformat(payload["due_date"]) if payload["due_date"] else None
        TaskRepository.update(task)
        return task.to_dict()

    @staticmethod
    def delete_task(user_id, task_id):
        task = TaskRepository.get_by_id(task_id)
        if not task:
            raise NotFoundError("Task not found")
        if task.course.user_id != user_id:
            raise ForbiddenError("You do not own this task")
        TaskRepository.delete(task)
