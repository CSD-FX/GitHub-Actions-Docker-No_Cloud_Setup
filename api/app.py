from flask import Flask, request, jsonify
from flask_cors import CORS
from db import init_db, list_notes, create_note, update_note, delete_note

app = Flask(__name__)
CORS(app)
init_db()

@app.get("/health")
def health():
    return jsonify(status="ok"), 200

@app.get("/notes")
def get_notes():
    return jsonify(list_notes()), 200

@app.post("/notes")
def post_note():
    data = request.get_json() or {}
    note = create_note(data.get("title","").strip(), data.get("content","").strip())
    return jsonify(note), 201

@app.put("/notes/<int:note_id>")
def put_note(note_id):
    data = request.get_json() or {}
    note = update_note(note_id, data.get("title","").strip(), data.get("content","").strip())
    if not note: return jsonify(error="not found"), 404
    return jsonify(note), 200

@app.delete("/notes/<int:note_id>")
def del_note(note_id):
    ok = delete_note(note_id)
    if not ok: return jsonify(error="not found"), 404
    return "", 204

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
