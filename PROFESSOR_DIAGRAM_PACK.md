# StudyForge Diagram Pack (for draw.io)

Use this as your blueprint inside draw.io.  
Create **4 pages** in one draw.io file:

1. System Architecture
2. Backend Component Design
3. Data Flow (Task + Practice)
4. Database ERD

---

## 1) System Architecture (Page 1)

### Layout
- Left column: `Frontend (React)`
- Middle column: `Backend (Flask API + Services)`
- Right column: `Data Layer (Supabase Postgres)`
- Top: `User`
- Bottom: `External/Utilities`

### Boxes and Labels
- `User (Student)`
- `Web UI (React + JS)`
- `Auth Context + React Query Cache`
- `Flask API (Blueprint Routes)`
- `Service Layer`
  - `AuthService`
  - `TaskService`
  - `PracticeService`
  - `AnalyticsService`
- `Repository Layer`
- `SQLAlchemy ORM`
- `PostgreSQL (Supabase)`
- `Logging + Error Handler`

### Arrows (with labels)
- `User -> Web UI` : "interacts"
- `Web UI -> Flask API` : "HTTPS JSON requests"
- `Flask API -> Service Layer` : "business logic"
- `Service Layer -> Repository Layer` : "data access abstraction"
- `Repository Layer -> SQLAlchemy ORM` : "query mapping"
- `SQLAlchemy ORM -> PostgreSQL` : "CRUD operations"
- `Flask API -> Logging + Error Handler` : "exceptions/events"
- `Flask API -> Web UI` : "standardized JSON responses"

### Suggested Styling
- Frontend boxes: light blue
- Backend boxes: light green
- Database boxes: light yellow
- Utility boxes: light gray
- Use solid arrows for request/data path and dashed arrows for logging/error path.

---

## 2) Backend Component Design (Page 2)

### Purpose
Show separation of concerns and OOP structure.

### Main Containers
- `Routes`
  - `auth_routes.py`
  - `task_routes.py`
  - `practice_routes.py`
  - `analytics_routes.py`
- `Schemas/Validators`
- `Services`
- `Repositories`
- `Models`
- `Algorithms Module`

### Relationships
- `Routes -> Schemas/Validators` : validate request
- `Routes -> Services` : call use cases
- `Services -> Repositories` : load/store data
- `Repositories -> Models` : ORM entities
- `PracticeService -> Algorithms Module` : evaluate problems
- `Services -> Custom Exceptions` : raise domain errors
- `Global Error Handler -> API Response Formatter`

### Key Note to Place on Diagram
"Controller logic stays thin; business rules are isolated in services for testability."

---

## 3) Data Flow Diagram (Page 3)

### Swimlanes
Create 5 vertical swimlanes:
- `User`
- `Frontend`
- `API Routes`
- `Service Layer`
- `Database`

### Flow A: Task Creation
1. User submits task form
2. Frontend validates required fields
3. `POST /api/tasks`
4. Route validates schema + auth token
5. Service applies rules (due date, priority, ownership)
6. Repository inserts row
7. DB commit success
8. API returns created task JSON
9. Frontend updates cache/UI

### Flow B: Practice Evaluation
1. User selects topic/challenge
2. Frontend sends attempt payload
3. `POST /api/practice/evaluate`
4. Service calls algorithm evaluator
5. Evaluator compares expected vs submitted output
6. Repository saves attempt result
7. Analytics metrics recalculated
8. Response returns score + feedback

### Visual Tips
- Use numbered circles for each step.
- Green arrows for success path.
- Red side-arrow for exception path (validation or auth failure).

---

## 4) Database ERD (Page 4)

### Entities and Fields

#### `users`
- `id (uuid, PK)`
- `email (unique)`
- `password_hash`
- `created_at`

#### `courses`
- `id (uuid, PK)`
- `user_id (FK -> users.id)`
- `name`
- `term`

#### `tasks`
- `id (uuid, PK)`
- `course_id (FK -> courses.id)`
- `title`
- `description`
- `due_date`
- `priority`
- `status`
- `estimated_minutes`

#### `practice_attempts`
- `id (uuid, PK)`
- `user_id (FK -> users.id)`
- `topic`
- `challenge_id`
- `input_payload (jsonb)`
- `expected_output (jsonb)`
- `submitted_output (jsonb)`
- `is_correct`
- `duration_seconds`
- `created_at`

### Relationships (Crow's Foot)
- `users 1 --- * courses`
- `courses 1 --- * tasks`
- `users 1 --- * practice_attempts`

### Suggested Diagram Footer
"Schema supports productivity tracking + algorithm mastery analytics while keeping ownership boundaries per user."

---

## Presentation Script (Quick 60-90 seconds)

"StudyForge is designed as a layered web application. The React client handles user interactions and state caching, while Flask routes stay thin and delegate business rules to service classes. Repositories isolate data access through SQLAlchemy to Supabase Postgres, giving us clean separation of concerns and testability. The system supports two core workflows: assignment productivity and algorithm practice with analytics. This architecture demonstrates OOP, data structures, recursion/sorting/searching use cases, validation, error handling, and scalable modular design."
