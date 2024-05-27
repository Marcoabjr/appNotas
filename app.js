import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function App() {
    
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/api/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleAddNote = () => {
    axios.post('/api/notes', { title, content })
      .then(response => setNotes([...notes, response.data]))
      .catch(error => console.error('Error adding note:', error));
  };

  const handleDeleteNote = (id) => {
    axios.delete(`/api/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note._id !== id)))
      .catch(error => console.error('Error deleting note:', error));
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Notes App</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleAddNote}>
        Add Note
      </Button>
      <List>
        {notes.map(note => (
          <ListItem key={note._id} alignItems="flex-start">
            <ListItemText primary={note.title} secondary={note.content} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNote(note._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;