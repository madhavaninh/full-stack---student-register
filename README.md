# Student Management REST API

## Setup
1. Install Node.js, MySQL (or XAMPP), and Postman.
2. Run `database.sql` in phpMyAdmin or MySQL Workbench.
3. Copy `.env.example` to `.env` and set your MySQL username/password.
4. In this folder run `npm install`.
5. Run `npm run dev` (or `npm start`).

Open `http://localhost:5000` to check the server.

## Postman endpoints
Base URL: `http://localhost:5000/api/students`

- POST `/` — register
- GET `/` — get all students
- GET `/:id` — get one student
- PUT `/:id` — update
- DELETE `/:id` — delete

For POST and PUT select Body > raw > JSON. Example:
```json
{
  "name": "Madhavan",
  "roll_no": "MCA001",
  "email": "madhavan@example.com",
  "department": "MCA",
  "year": 1
}
```

Roll number and email must be unique. Required fields are checked. Queries use `?` placeholders.
