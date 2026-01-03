import React from 'react'

export default function ProgressBar({ total, completed }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return (
    <div className="progress">
      <div className="progress-info">
        <span>{completed}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
