import React, { useState, useRef, useEffect } from 'react'

export default function GoalInput({ onAdd }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function submit(e) {
    e.preventDefault()
    const ok = onAdd(title, desc)
    if (!ok) return
    setTitle('')
    setDesc('')
    inputRef.current?.focus()
  }

  return (
    <form className="goal-input" onSubmit={submit}>
      <div className="row">
        <input
          ref={inputRef}
          className="title"
          placeholder="Add a new goal (required)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="add-btn" type="submit">Add</button>
      </div>
      <textarea
        className="desc"
        placeholder="Optional description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
    </form>
  )
}
