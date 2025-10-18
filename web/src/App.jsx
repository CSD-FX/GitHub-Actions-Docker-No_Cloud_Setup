import { useEffect, useState } from "react";
import { listNotes, createNote, updateNote, deleteNote } from "./api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const load = async () => setNotes(await listNotes());

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await createNote({ title, content });
    setTitle(""); setContent("");
    load();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4">Notes</h1>
        <form onSubmit={add} className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
          <input className="w-full border rounded p-2" placeholder="Title"
                 value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full border rounded p-2" rows="4" placeholder="Content"
                    value={content} onChange={e=>setContent(e.target.value)} />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add Note
          </button>
        </form>
        <div className="grid gap-4">
          {notes.map(n => (
            <div key={n.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{n.title}</h2>
                <div className="space-x-2">
                  <button className="px-3 py-1 rounded border"
                          onClick={async ()=>{ 
                            const t = prompt("New title", n.title) ?? n.title;
                            const c = prompt("New content", n.content) ?? n.content;
                            await updateNote(n.id,{title:t,content:c}); load();
                          }}>Edit</button>
                  <button className="px-3 py-1 rounded bg-rose-600 text-white"
                          onClick={async ()=>{ await deleteNote(n.id); load(); }}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
