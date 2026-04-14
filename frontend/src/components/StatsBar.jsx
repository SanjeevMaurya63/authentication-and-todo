export default function StatsBar({ todos }) {
  const total = todos.length
  const done = todos.filter(t => t.completed).length
  const pending = total - done
  const high = todos.filter(t => t.priority === 'high' && !t.completed).length
  const pct = total ? Math.round((done / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total, color: 'text-slate-300', bg: 'bg-slate-500/10' },
    { label: 'Done', value: done, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'Pending', value: pending, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'High Priority', value: high, color: 'text-red-400', bg: 'bg-red-500/10' },
  ]

  return (
    <div className="space-y-4">
      {/* Progress */}
      {total > 0 && (
        <div className="glass rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400">Progress</span>
            <span className="text-xs font-mono text-sky-400">{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map(s => (
          <div key={s.label} className={`glass rounded-xl p-3 text-center ${s.bg}`}>
            <div className={`text-xl font-display font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
