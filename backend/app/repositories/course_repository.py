from app.models.course import Course
from app.extensions import db


class CourseRepository:
    @staticmethod
    def list_by_user(user_id):
        return Course.query.filter_by(user_id=user_id).all()

    @staticmethod
    def create(user_id, name, term):
        course = Course(user_id=user_id, name=name, term=term)
        db.session.add(course)
        db.session.commit()
        return course

    @staticmethod
    def get_by_id(course_id):
        return Course.query.get(course_id)
