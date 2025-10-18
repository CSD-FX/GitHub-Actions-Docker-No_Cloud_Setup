import sqlite3, os

DB_PATH = os.environ.get("DB_PATH", "/data/notes.db")

def _conn():
    return sqlite3.connect(DB_PATH)

def init_db():
    con = _conn()
    con.execute("""
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""")
    con.commit()
    con.close()

def list_notes():
    con = _conn()
    rows = con.execute("SELECT id, title, content, created_at FROM notes ORDER BY id DESC").fetchall()
    con.close()
    return [{"id":r[0],"title":r[1],"content":r[2],"created_at":r[3]} for r in rows]

def create_note(title, content):
    con = _conn()
    cur = con.execute("INSERT INTO notes(title, content) VALUES(?,?)", (title or "Untitled", content or ""))
    con.commit()
    note_id = cur.lastrowid
    con.close()
    return {"id":note_id,"title":title or "Untitled","content":content or ""}

def update_note(note_id, title, content):
    con = _conn()
    cur = con.execute("UPDATE notes SET title=?, content=? WHERE id=?", (title, content, note_id))
    con.commit()
    changed = cur.rowcount
    con.close()
    if not changed: return None
    return {"id":note_id,"title":title,"content":content}

def delete_note(note_id):
    con = _conn()
    cur = con.execute("DELETE FROM notes WHERE id=?", (note_id,))
    con.commit()
    ok = cur.rowcount > 0
    con.close()
    return ok
