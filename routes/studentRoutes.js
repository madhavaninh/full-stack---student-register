const express = require("express");
const router = express.Router();

const c = require("../controllers/studentController");

router.post("/", c.registerStudent);
router.get("/", c.getStudents);
router.get("/:id", c.getStudentById);
router.put("/:id", c.updateStudent);
router.delete("/:id", c.deleteStudent);

module.exports = router;