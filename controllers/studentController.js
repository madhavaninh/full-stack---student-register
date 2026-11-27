const db = require("../config/db");

// REGISTER STUDENT
exports.registerStudent = (req, res) => {
    const { name, rollNumber, email, department, year } = req.body;

    if (!name || !rollNumber || !email || !department || !year) {
        return res.status(400).json({
            message: "Please enter all student details"
        });
    }

    const sql = `
        INSERT INTO students
        (name, roll_no, email, department, year)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, rollNumber, email, department, year],
        (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Roll number or email already exists"
                    });
                }

                console.log(err);
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Student registered successfully",
                studentId: result.insertId
            });
        }
    );
};


// GET ALL STUDENTS
exports.getStudents = (req, res) => {
    const sql = `
        SELECT id, name, roll_no AS rollNumber,
        email, department, year
        FROM students ORDER BY id DESC
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(rows);
    });
};


// GET SINGLE STUDENT
exports.getStudentById = (req, res) => {
    const sql = `
        SELECT id, name, roll_no AS rollNumber,
        email, department, year
        FROM students WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (!rows.length) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(rows[0]);
    });
};


// UPDATE STUDENT
exports.updateStudent = (req, res) => {
    const { name, rollNumber, email, department, year } = req.body;

    if (!name || !rollNumber || !email || !department || !year) {
        return res.status(400).json({
            message: "Please enter all student details"
        });
    }

    const sql = `
        UPDATE students
        SET name=?, roll_no=?, email=?, department=?, year=?
        WHERE id=?
    `;

    db.query(
        sql,
        [name, rollNumber, email, department, year, req.params.id],
        (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Roll number or email already exists"
                    });
                }

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!result.affectedRows) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json({
                message: "Student updated successfully"
            });
        }
    );
};


// DELETE STUDENT
exports.deleteStudent = (req, res) => {
    db.query(
        "DELETE FROM students WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!result.affectedRows) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json({
                message: "Student deleted successfully"
            });
        }
    );
};