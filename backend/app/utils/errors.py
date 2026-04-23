class AppError(Exception):
    status_code = 400

    def __init__(self, message, status_code=None):
        super().__init__(message)
        if status_code is not None:
            self.status_code = status_code


class ValidationError(AppError):
    status_code = 422


class AuthError(AppError):
    status_code = 401


class NotFoundError(AppError):
    status_code = 404


class ForbiddenError(AppError):
    status_code = 403
