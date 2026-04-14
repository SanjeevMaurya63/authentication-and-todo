import { useState } from 'react'

const priorities = [
  { value: 'low', label: 'Low', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  { value: 'high', label: 'High', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
]

export default function TodoForm({ onAdd, loading }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title.trim()) return
    await onAdd(form)
    setForm({ title: '', description: '', priority: 'medium' })
    setOpen(false)
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-200 group">
      <span className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
      <span className="font-display text-sm">Add new task...</span>
    </button>
  )

  return (
    <div className="glass-strong rounded-2xl p-5 animate-slide-up border border-sky-500/20">
      <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Task
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text" name="title" placeholder="Task title..." value={form.title}
          onChange={handleChange} className="input-field font-display" autoFocus maxLength={100}
        />
        <textarea
          name="description" placeholder="Description (optional)..." value={form.description}
          onChange={handleChange} rows={2}
          className="input-field resize-none font-body text-sm"
          maxLength={500}
        />
        {/* Priority selector */}
        <div className="flex gap-2">
          {priorities.map(p => (
            <button key={p.value} type="button" onClick={() => setForm(f => ({ ...f, priority: p.value }))}
              className={`flex-1 py-2 rounded-xl border text-xs font-display font-medium transition-all duration-200 ${form.priority === p.value ? p.color : 'text-slate-500 bg-transparent border-white/10 hover:border-white/20'}`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={() => setOpen(false)}
            className="flex-1 btn-ghost text-sm py-2.5">Cancel</button>
          <button type="submit" disabled={loading || !form.title.trim()}
            className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}
