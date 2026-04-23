# Project Proposal: StudyForge

## 1) Project Overview

### Application Concept and Purpose
**StudyForge** is a web-based productivity and education platform for students to plan coursework, practice data structure/algorithm concepts, and track progress with analytics.  
It combines a task planner, coding-practice module, and study insights dashboard in one cohesive system.

### Target Users and Use Cases
- Undergraduate students managing multiple classes and assignments
- Students preparing for programming tests (sorting/searching, recursion, stacks/queues)
- Learners who need a single place for schedule + practice + progress reflection

Primary use cases:
- Create and prioritize assignments/tasks for each course
- Complete daily algorithm practice challenges
- Track completion trends and weak concept areas
- Review performance by topic before exams

### Key Features and Functionality
- Account-based dashboard and session management
- Course and assignment management (CRUD)
- Study session timer and productivity streaks
- Algorithm practice engine with test cases
- Concept tagging (arrays, linked lists, stacks, queues, recursion, sorting, searching)
- Visual analytics (completion rates, topic mastery trends)
- Exportable weekly progress report

### Why This Demonstrates Advanced Programming Skills
- Multi-layered architecture (UI, API, domain logic, persistence)
- Strong OOP modeling and interface-driven design
- Multiple data structures and algorithm implementations
- Exception-safe service layer and input validation
- Automated testing strategy (unit + integration)
- Professional documentation and modular code organization

---

## 2) Technical Architecture

### System Architecture Diagram
```text
+-------------------------+         HTTP/JSON         +------------------------------+
|  React Frontend         |  <--------------------->  | Flask API (Blueprints)       |
|  - Dashboard            |                           | - Auth routes                |
|  - Planner              |                           | - Tasks/Courses routes       |
|  - Practice UI          |                           | - Practice/Analytics routes  |
+-----------+-------------+                           +--------------+---------------+
            |                                                            |
            | client-side state                                           | service calls
            v                                                            v
+-------------------------+                           +------------------------------+
| React Query / Context   |                           | Domain Services Layer         |
| for caching + auth      |                           | - TaskService                |
+-------------------------+                           | - PracticeService            |
                                                      | - AnalyticsService           |
                                                      +--------------+---------------+
                                                                     |
                                                                     | repository interfaces
                                                                     v
                                                      +------------------------------+
                                                      | Data Access Layer            |
                                                      | SQLAlchemy + Supabase Postgres|
                                                      +--------------+---------------+
                                                                     |
                                                                     v
                                                      +------------------------------+
                                                      | PostgreSQL (Supabase)        |
                                                      +------------------------------+
```

### Technology Stack and Justification
- **Backend:** Python + Flask  
  Aligns with your language preference; lightweight and excellent for clean API architecture.
- **Frontend:** React + JavaScript  
  Demonstrates modern component-based UI and asynchronous state management.
- **Database:** PostgreSQL via Supabase  
  Managed Postgres with fast setup for a 2-week timeline.
- **ORM:** SQLAlchemy  
  Teaches model relationships, clean abstractions, and query composition.
- **Testing:** `pytest` + Flask test client + frontend component tests  
  Demonstrates professional verification practices.

### Project Structure
```text
studyforge/
  backend/
    app/
      __init__.py
      config.py
      extensions.py
      models/
        user.py
        course.py
        task.py
        practice_attempt.py
      repositories/
        base_repository.py
        task_repository.py
        practice_repository.py
      services/
        auth_service.py
        task_service.py
        practice_service.py
        analytics_service.py
      algorithms/
        sorting.py
        searching.py
        stack_queue_utils.py
        recursion_utils.py
      routes/
        auth_routes.py
        task_routes.py
        practice_routes.py
        analytics_routes.py
      schemas/
        task_schema.py
        practice_schema.py
      utils/
        error_handlers.py
        validators.py
    tests/
      unit/
      integration/
    run.py
  frontend/
    src/
      api/
      components/
      pages/
      hooks/
      context/
      utils/
    tests/
  PROJECT_PROPOSAL.md
  README.md
  TECHNICAL_DOCUMENTATION.md
```

### Design Patterns
- **Layered Architecture:** routes -> services -> repositories -> models
- **Repository Pattern:** decouple data access from business logic
- **Strategy Pattern:** selectable algorithm evaluators for practice mode
- **Factory Pattern:** app/config initialization for test/dev/prod
- **DTO/Schema validation pattern:** enforce request/response contracts

---

## 3) Data Flow and System Design

### Data Flow Diagram (Task + Practice Flow)
```text
User action (UI)
   -> Frontend validation
   -> API request
   -> Route handler (auth + schema check)
   -> Service layer business rules
   -> Repository/ORM transaction
   -> DB commit
   -> Service response object
   -> API JSON response
   -> Frontend cache/state update
   -> UI render + notifications
```

### Database Schema (Core Tables)
- `users`
  - `id (uuid, pk)`
  - `email (unique)`
  - `password_hash`
  - `created_at`
- `courses`
  - `id (uuid, pk)`
  - `user_id (fk -> users.id)`
  - `name`
  - `term`
- `tasks`
  - `id (uuid, pk)`
  - `course_id (fk -> courses.id)`
  - `title`
  - `description`
  - `due_date`
  - `priority`
  - `status`
  - `estimated_minutes`
- `practice_attempts`
  - `id (uuid, pk)`
  - `user_id (fk -> users.id)`
  - `topic` (arrays/linked_lists/stacks/queues/sorting/searching/recursion)
  - `challenge_id`
  - `input_payload (jsonb)`
  - `expected_output (jsonb)`
  - `submitted_output (jsonb)`
  - `is_correct`
  - `duration_seconds`
  - `created_at`

### API Design (Representative Endpoints)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/tasks?course_id=&status=&priority=`
- `POST /api/tasks`
- `PATCH /api/tasks/{task_id}`
- `DELETE /api/tasks/{task_id}`
- `POST /api/practice/evaluate`
- `GET /api/analytics/overview`
- `GET /api/analytics/topics`

Response format standard:
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### State Management Approach
- React Query for server state (fetch/cache/invalidate)
- React Context for auth/session state
- Local component state for UI interactions/forms

### Authentication and Authorization Flow
- Email/password login
- Password hashing with `bcrypt`
- JWT-based auth stored in secure client storage strategy
- Flask middleware/decorator validates token and injects current user
- Resource ownership checks in service layer (users can access only their records)

---

## 4) Component Breakdown

### Major Components and Responsibilities
- **Auth Module:** registration, login, token validation, access control
- **Course Module:** course grouping for assignment organization
- **Task Module:** task CRUD, prioritization, due-date scheduling, completion
- **Practice Module:** algorithm challenge generation and evaluation
- **Analytics Module:** aggregates performance/productivity signals
- **Frontend UI Module:** dashboards, forms, practice interface, charts

### Dependencies Between Components
- `TaskService` depends on `CourseRepository`, `TaskRepository`
- `PracticeService` depends on algorithm utilities + `PracticeRepository`
- `AnalyticsService` depends on task and practice repositories
- Frontend pages depend on API client and shared context/hooks

### Key Classes and Functions
- `TaskService.create_task()` - validates and creates student task items
- `TaskService.mark_complete()` - updates task status with integrity checks
- `PracticeService.evaluate_attempt()` - runs challenge validation logic
- `AnalyticsService.compute_topic_mastery()` - calculates topic-level metrics
- `sorting.py::merge_sort()` and `quick_sort()` - course-aligned algorithm demos
- `searching.py::binary_search()` - iterative and recursive versions
- `recursion_utils.py::factorial_recursive()` and nested traversal helpers

---

## 5) Implementation Roadmap

## Phase 0 (Day 1): Finalization and Setup
- Confirm scope and grading constraints
- Initialize backend/frontend projects
- Configure environment, database, and CI basics

## Phase 1 (Days 2-4): Core Backend Foundation
- Build Flask app factory, config, DB models
- Implement auth module and user/session flow
- Build course + task CRUD API
- Add tests for routes/services

## Phase 2 (Days 5-7): Practice Engine and Algorithms
- Implement practice attempt model and API
- Add sorting/searching/recursion utility modules
- Add challenge evaluator and correctness checks
- Unit-test algorithm and evaluator functions

## Phase 3 (Days 8-10): Frontend Experience
- Create dashboard, task planner, and practice pages
- Integrate API calls and state management
- Add form validation, loading/error UX states

## Phase 4 (Days 11-12): Analytics and Polish
- Build analytics endpoints and UI charts
- Improve error handling and edge-case validation
- Add documentation comments and cleanup

## Phase 5 (Days 13-14): Testing and Documentation
- Integration test pass and bug fixes
- Finalize `README.md` and `TECHNICAL_DOCUMENTATION.md`
- Demo scenario script and final review

### Estimated Complexity by Module
- Auth/session: Medium
- Task + course CRUD: Medium
- Practice evaluator + algorithms: High
- Analytics calculations: Medium-High
- Frontend integration and polish: High

### Testing Strategy
- **Unit tests:** service methods, algorithms, validators
- **Integration tests:** key API flows (login, CRUD, evaluate, analytics)
- **Frontend tests:** critical component rendering and API interaction
- **Manual acceptance tests:** end-to-end student scenario checklist

---

## 6) Programming Concepts Demonstrated

### Course Concepts Mapped to Implementation
- **Object-Oriented Programming:** models, services, repository classes
- **Data Structures:** arrays/lists, stacks, queues, linked-list-style operations
- **Recursion:** recursive search/utility functions in practice module
- **Sorting Algorithms:** merge sort and quick sort challenge support
- **Searching Algorithms:** binary and linear search evaluation paths
- **Exception Handling:** centralized error handlers and custom exception types
- **File/IDE analysis practices:** logs, debug tooling, structured test outputs
- **Structured design methodology:** layered modules and clear interfaces

### Advanced Techniques Beyond Baseline
- Token-based authentication and route guards
- Repository abstraction and dependency-injection style composition
- API contract consistency with schema validation
- Performance considerations (query optimization + basic complexity notes)
- Modular testing pyramid and clean documentation standards

---

## Scope Decision for Timeline

Given the 2-week window and your preference for balanced quality, this proposal is **web-first** (Flask + React + Supabase) with optional desktop packaging as a stretch goal (e.g., Tauri/Electron wrapper) only if core requirements are complete early.

---

## Approval Checklist

Please confirm:
1. Use this exact project concept (`StudyForge`) or adjust theme/name.
2. Keep React frontend, or prefer Flask-rendered templates only.
3. Include authentication in final scope (recommended: yes).
4. Include Supabase/Postgres in baseline scope (recommended: yes).
5. Any professor-required deliverable format I should mirror in documentation.
