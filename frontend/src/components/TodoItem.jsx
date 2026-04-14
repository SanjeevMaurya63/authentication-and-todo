import { useState } from 'react'

const priorityConfig = {
  low: { label: 'Low', dot: 'bg-green-400', text: 'text-green-400' },
  medium: { label: 'Medium', dot: 'bg-yellow-400', text: 'text-yellow-400' },
  high: { label: 'High', dot: 'bg-red-400', text: 'text-red-400' },
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState({ title: todo.title, description: todo.description, priority: todo.priority })

  const p = priorityConfig[todo.priority] || priorityConfig.medium

  const handleSave = async () => {
    if (!form.title.trim()) return
    await onUpdate(todo._id, form)
    setEditing(false)
  }

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(todo._id)
  }

  const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  if (editing) return (
    <div className="glass-strong rounded-2xl p-5 border border-sky-500/20 animate-slide-up">
      <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        className="input-field font-display mb-3" maxLength={100} autoFocus />
      <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        rows={2} className="input-field resize-none font-body text-sm mb-3" maxLength={500} />
      <div className="flex gap-2 mb-3">
        {['low','medium','high'].map(pv => (
          <button key={pv} type="button" onClick={() => setForm(f => ({ ...f, priority: pv }))}
            className={`flex-1 py-1.5 rounded-lg border text-xs font-display font-medium transition-all ${form.priority === pv ? priorityConfig[pv].text + ' bg-white/5 border-current' : 'text-slate-500 border-white/10'}`}>
            {priorityConfig[pv].label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setEditing(false)} className="flex-1 btn-ghost text-sm py-2">Cancel</button>
        <button onClick={handleSave} className="flex-1 btn-primary text-sm py-2">Save Changes</button>
      </div>
    </div>
  )

  return (
    <div className={`todo-card group ${todo.completed ? 'opacity-60' : ''} ${deleting ? 'opacity-30 pointer-events-none scale-95' : ''} transition-all duration-300`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button onClick={() => onToggle(todo._id)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${todo.completed ? 'bg-sky-500 border-sky-500' : 'border-white/20 hover:border-sky-500'}`}>
          {todo.completed && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-display font-semibold text-sm leading-snug ${todo.completed ? 'line-through text-slate-500' : 'text-white'}`}>
              {todo.title}
            </h4>
            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button onClick={() => setEditing(true)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-slate-500 flex items-center justify-center transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={handleDelete}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-500 flex items-center justify-center transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              </button>
            </div>
          </div>

          {todo.description && (
            <p className={`text-xs mt-1 font-body leading-relaxed ${todo.completed ? 'text-slate-600' : 'text-slate-400'}`}>
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2.5">
            <span className={`flex items-center gap-1.5 text-xs font-mono ${p.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
            <span className="text-slate-600 text-xs font-mono">{formatDate(todo.createdAt)}</span>
            {todo.completed && (
              <span className="text-sky-500/60 text-xs font-mono ml-auto">✓ Done</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
