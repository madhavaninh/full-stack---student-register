import { useState, useEffect } from 'react';

import StudentForm from './components/StudentForm.jsx';
import StudentList from './components/StudentList.jsx';

const API = "http://localhost:4000/api/students";

function App() {
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);

    // FETCH STUDENTS FROM MYSQL
    async function fetchStudents() {
        try {
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            const data = await response.json();
            setStudents(data);

        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Unable to load students. Check backend server.");
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    // SAVE OR UPDATE STUDENT
    async function saveStudent(studentData) {
        try {
            const url = editingStudent
                ? `${API}/${editingStudent.id}`
                : API;

            const method = editingStudent ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Operation failed");
            }

            alert(result.message);

            setEditingStudent(null);

            fetchStudents();

        } catch (error) {
            alert(error.message);
        }
    }

    // DELETE STUDENT
    async function deleteStudent(studentId) {
        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }

        try {
            const response = await fetch(`${API}/${studentId}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert(result.message);

            fetchStudents();

            if (editingStudent?.id === studentId) {
                setEditingStudent(null);
            }

        } catch (error) {
            alert(error.message);
        }
    }

    // EDIT STUDENT
    function startEditing(student) {
        setEditingStudent(student);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className="app">

            <header className="topbar">
                <div className="brand">
                    <span className="brand-icon">S</span>
                    Student Manager
                </div>

                <span className="topbar-label">
                    Registration & Management
                </span>
            </header>

            <main className="main-content">

                <div className="page-intro">
                    <p className="eyebrow">
                        STUDENT ADMINISTRATION
                    </p>

                    <h1>Student Registration</h1>

                    <p className="intro-text">
                        Register students and manage their details in one place.
                    </p>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">👥</div>

                    <div>
                        <p>Total Students</p>
                        <strong>{students.length}</strong>
                    </div>
                </div>

                <div className="content-grid">

                    <StudentForm
                        onSave={saveStudent}
                        editingStudent={editingStudent}
                        onCancel={() => setEditingStudent(null)}
                    />

                    <div className="right-column">

                        <div className="search-box">
                            <span>⌕</span>

                            <input
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(event.target.value)
                                }
                                placeholder="Search name, roll number or department..."
                            />
                        </div>

                        <StudentList
                            students={students}
                            searchText={searchText}
                            onEdit={startEditing}
                            onDelete={deleteStudent}
                        />

                    </div>
                </div>

            </main>

            <footer>
                Student Manager <span>•</span> React + Node + MySQL
            </footer>

        </div>
    );
}

export default App;