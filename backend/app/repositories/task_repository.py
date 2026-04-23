from app.models.task import Task
from app.extensions import db


class TaskRepository:
    @staticmethod
    def list_by_course_ids(course_ids, status=None, priority=None):
        query = Task.query.filter(Task.course_id.in_(course_ids))
        if status:
            query = query.filter_by(status=status)
        if priority:
            query = query.filter_by(priority=priority)
        return query.all()

    @staticmethod
    def create(**kwargs):
        task = Task(**kwargs)
        db.session.add(task)
        db.session.commit()
        return task

    @staticmethod
    def get_by_id(task_id):
        return Task.query.get(task_id)

    @staticmethod
    def update(task):
        db.session.commit()
        return task

    @staticmethod
    def delete(task):
        db.session.delete(task)
        db.session.commit()
