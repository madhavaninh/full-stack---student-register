function StudentCard({ student, onEdit, onDelete }) {
  return (
    <article className="student-card">
      <div className="student-info">
        <div className="student-avatar">{student.name.charAt(0).toUpperCase()}</div>
        <div className="student-details">
          <h3>{student.name}</h3>
          <p className="roll-number">Roll No: {student.rollNumber}</p>
          <p>{student.email}</p>
          <div className="student-tags">
            <span>{student.department}</span>
            <span>{student.year}</span>
          </div>
        </div>
      </div>
      <div className="student-actions">
        <button className="edit-button" onClick={() => onEdit(student)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(student.id)}>Delete</button>
      </div>
    </article>
  );
}
export default StudentCard;
