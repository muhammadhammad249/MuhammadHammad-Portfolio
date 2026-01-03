import React, { useState, useEffect } from 'react'
import GoalInput from './components/GoalInput'
import GoalCard from './components/GoalCard'
import ProgressBar from './components/ProgressBar'

const STORAGE_KEY = 'daily-goals-v1'

export default function App() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setGoals(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load goals', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
  }, [goals])

  function addGoal(title, description) {
    if (!title || !title.trim()) return false
    const newGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: Date.now()
    }
    setGoals(prev => [newGoal, ...prev])
    return true
  }

  function updateGoal(id, updates) {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)))
  }

  function deleteGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  function toggleComplete(id) {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, completed: !g.completed } : g)))
  }

  const total = goals.length
  const completed = goals.filter(g => g.completed).length

  // Sort: incomplete first (preserve creation order), completed to bottom
  const sorted = [...goals].sort((a, b) => {
    if (a.completed === b.completed) return b.createdAt - a.createdAt
    return a.completed ? 1 : -1
  })

  const today = new Date()
  const todayStr = today.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Daily Goals</h1>
          <p className="date">{todayStr}</p>
        </div>
        <div className="progress-top">
          <ProgressBar total={total} completed={completed} />
        </div>
      </header>

      <main className="main">
        <GoalInput onAdd={addGoal} />

        {total === 0 ? (
          <div className="empty">No goals yet — add your first goal to get started.</div>
        ) : (
          <div className="grid">
            {sorted.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={() => toggleComplete(goal.id)}
                onDelete={() => deleteGoal(goal.id)}
                onUpdate={updates => updateGoal(goal.id, updates)}
              />
            ))}
          </div>
        )}

      </main>

      <footer className="footer">
        <div className="footer-inner">Progress: {completed}/{total} completed</div>
      </footer>
    </div>
  )
}
