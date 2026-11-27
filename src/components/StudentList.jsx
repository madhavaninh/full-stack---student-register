import StudentCard from './StudentCard.jsx';

function StudentList({ students, searchText, onEdit, onDelete }) {
  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase();
    return student.name.toLowerCase().includes(search) ||
      student.rollNumber.toLowerCase().includes(search) ||
      student.department.toLowerCase().includes(search);
  });

  return (
    <section className="panel student-panel">
      <div className="list-heading">
        <div>
          <h2>Student Details</h2>
          <p>{filteredStudents.length} student(s) registered</p>
        </div>
      </div>
      {filteredStudents.length === 0 ? (
        <div className="empty-state">No students found. Add a student to get started.</div>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
export default StudentList;
