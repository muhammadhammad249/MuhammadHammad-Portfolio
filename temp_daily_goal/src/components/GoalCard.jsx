import React, { useState, useRef, useEffect } from 'react'

export default function GoalCard({ goal, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(goal.title)
  const [desc, setDesc] = useState(goal.description)
  const titleRef = useRef(null)

  useEffect(() => {
    if (editing) titleRef.current?.focus()
  }, [editing])

  useEffect(() => {
    setTitle(goal.title)
    setDesc(goal.description)
  }, [goal.title, goal.description])

  function save() {
    if (!title || !title.trim()) return
    onUpdate({ title: title.trim(), description: desc.trim() })
    setEditing(false)
  }

  return (
    <div className={`card ${goal.completed ? 'completed' : ''}`}>
      <div className="card-top">
        <label className="checkbox">
          <input type="checkbox" checked={goal.completed} onChange={onToggle} />
          <span className="checkmark" />
        </label>
        <div className="spacer" />
        <div className="card-actions">
          {editing ? (
            <>
              <button className="btn small" onClick={save}>Save</button>
              <button className="btn small ghost" onClick={() => { setEditing(false); setTitle(goal.title); setDesc(goal.description); }}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn small danger" onClick={onDelete}>Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="card-body">
        {editing ? (
          <>
            <input ref={titleRef} className="edit-title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="edit-desc" value={desc} onChange={e => setDesc(e.target.value)} />
          </>
        ) : (
          <>
            <h3 className="card-title">{goal.title}</h3>
            {goal.description && <p className="card-desc">{goal.description}</p>}
          </>
        )}
      </div>
    </div>
  )
}
