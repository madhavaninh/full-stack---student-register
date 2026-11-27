import { useState, useEffect } from 'react';

const emptyStudent = { name: '', rollNumber: '', email: '', department: '', year: '' };


function StudentForm({ onSave, editingStudent, onCancel }) {
  const [form, setForm] = useState(emptyStudent);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    } else {
      setForm(emptyStudent);
    }
    setError('');
  }, [editingStudent]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.rollNumber.trim() || !form.email.trim() || !form.department || !form.year) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onSave(form);
    setForm(emptyStudent);
  }

  return (
    <section className="panel">
      <h2>{editingStudent ? 'Edit Student' : 'Register Student'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter student name" />
        </label>
        <label>Roll Number
          <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="Enter roll number" />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
        </label>
        <label>Department
          <select name="department" value={form.department} onChange={handleChange}>
            <option value="">Select department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="BCA">BCA</option>
            <option value="IT">Information Technology</option>
            <option value="Commerce">Commerce</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>Year
          <select name="year" value={form.year} onChange={handleChange}>
            <option value="">Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <div className="form-buttons">
          <button type="submit" className="primary-button">{editingStudent ? 'Update Student' : 'Add Student'}</button>
          {editingStudent && <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </section>
  );
}

export default StudentForm;
