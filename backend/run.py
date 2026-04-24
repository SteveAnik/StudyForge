import atexit
import os
import subprocess
from pathlib import Path

from dotenv import load_dotenv

from app import create_app


load_dotenv()
app = create_app()
_frontend_process = None


def _start_frontend_if_enabled():
    global _frontend_process
    if os.getenv("START_FRONTEND", "1") != "1":
        return
    if os.getenv("WERKZEUG_RUN_MAIN") not in (None, "true"):
        return
    frontend_dir = Path(__file__).resolve().parent.parent / "frontend"
    command = [
        "npm",
        "run",
        "dev",
        "--",
        "--host",
        os.getenv("FRONTEND_HOST", "127.0.0.1"),
        "--port",
        os.getenv("FRONTEND_PORT", "5173")
    ]
    _frontend_process = subprocess.Popen(command, cwd=frontend_dir)


def _stop_frontend_process():
    global _frontend_process
    if _frontend_process and _frontend_process.poll() is None:
        _frontend_process.terminate()


atexit.register(_stop_frontend_process)


if __name__ == "__main__":
    _start_frontend_if_enabled()
    app.run(debug=True, use_reloader=False, port=int(os.getenv("PORT", "5001")))
