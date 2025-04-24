import { useState, useEffect } from 'react';

export default function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched notes:', data);
        setNotes(data);
      })
      .catch((err) => {
        console.error('Error fetching notes:', err);
      });
  }, []);

  const addNote = async () => {
    const newNote = { title, description };
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(newNote),
    });

    const savedNote = await res.json();
    setNotes([...notes, savedNote]);
    setTitle('');
    setDescription('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧠 MindVault Notes</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} onClick={addNote}>
          ➕ Add Note
        </button>
      </div>

      <div style={styles.notesContainer}>
        {notes.map((note, idx) => (
          <div key={idx} style={styles.noteCard}>
            <h3 style={styles.noteTitle}>{note.title}</h3>
            <p style={styles.noteDescription}>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🧑‍🎨 Styling
const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    minHeight: '80px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'flex-start',
  },
  notesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  noteCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  noteTitle: {
    margin: '0 0 0.5rem',
    fontWeight: 'bold',
    color: '#34495e',
  },
  noteDescription: {
    margin: 0,
    color: '#555',
  },
};
