const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const listNotes = async () => (await fetch(`${API}/notes`)).json();
export const createNote = async (note) =>
  (await fetch(`${API}/notes`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(note)})).json();
export const updateNote = async (id, note) =>
  (await fetch(`${API}/notes/${id}`, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(note)})).json();
export const deleteNote = async (id) =>
  fetch(`${API}/notes/${id}`, {method:"DELETE"});
