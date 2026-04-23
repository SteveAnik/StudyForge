from app.repositories.course_repository import CourseRepository
from app.repositories.practice_repository import PracticeRepository
from app.repositories.task_repository import TaskRepository


class AnalyticsService:
    @staticmethod
    def overview(user_id):
        courses = CourseRepository.list_by_user(user_id)
        course_ids = [course.id for course in courses]
        tasks = TaskRepository.list_by_course_ids(course_ids) if course_ids else []
        attempts = PracticeRepository.list_by_user(user_id)
        completed = [t for t in tasks if t.status == "done"]
        overview_data = {
            "total_courses": len(courses),
            "total_tasks": len(tasks),
            "completed_tasks": len(completed),
            "completion_rate": round((len(completed) / len(tasks) * 100), 2) if tasks else 0,
            "practice_attempts": len(attempts),
            "correct_attempts": len([a for a in attempts if a.is_correct]),
        }
        return overview_data

    @staticmethod
    def topics(user_id):
        attempts = PracticeRepository.list_by_user(user_id)
        by_topic = {}
        for attempt in attempts:
            if attempt.topic not in by_topic:
                by_topic[attempt.topic] = {"attempts": 0, "correct": 0}
            by_topic[attempt.topic]["attempts"] += 1
            if attempt.is_correct:
                by_topic[attempt.topic]["correct"] += 1
        result = []
        for topic, info in by_topic.items():
            mastery = round((info["correct"] / info["attempts"] * 100), 2) if info["attempts"] else 0
            result.append({"topic": topic, "attempts": info["attempts"], "correct": info["correct"], "mastery": mastery})
        return result
