import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import StatsBar from '../components/StatsBar'

const FILTERS = ['All', 'Active', 'Completed']
const PRIORITIES = ['All', 'High', 'Medium', 'Low']

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [filter, setFilter] = useState('All')
  const [priority, setPriority] = useState('All')
  const [search, setSearch] = useState('')
  const [showLogout, setShowLogout] = useState(false)

  // Fetch todos
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos')
      setTodos(data.todos)
    } catch (err) {
      toast.error('Todos load nahi hue!')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (form) => {
    setAdding(true)
    try {
      const { data } = await api.post('/todos', form)
      setTodos(p => [data.todo, ...p])
      toast.success('Task add ho gaya! ✅')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Add karne mein error!')
    } finally {
      setAdding(false)
    }
  }

  const handleToggle = async (id) => {
    try {
      const { data } = await api.patch(`/todos/${id}/toggle`)
      setTodos(p => p.map(t => t._id === id ? data.todo : t))
    } catch {
      toast.error('Update nahi hua!')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodos(p => p.filter(t => t._id !== id))
      toast.success('Task delete ho gaya!')
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  const handleUpdate = async (id, form) => {
    try {
      const { data } = await api.put(`/todos/${id}`, form)
      setTodos(p => p.map(t => t._id === id ? data.todo : t))
      toast.success('Task update ho gaya!')
    } catch {
      toast.error('Update nahi hua!')
    }
  }

  const handleClearCompleted = async () => {
    const completed = todos.filter(t => t.completed)
    if (!completed.length) return
    try {
      await Promise.all(completed.map(t => api.delete(`/todos/${t._id}`)))
      setTodos(p => p.filter(t => !t.completed))
      toast.success(`${completed.length} completed tasks clear ho gaye!`)
    } catch {
      toast.error('Clear nahi hua!')
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logout ho gaye! 👋')
    navigate('/login')
  }

  // Filtered todos
  const filtered = useMemo(() => {
    return todos.filter(t => {
      const matchFilter = filter === 'All' || (filter === 'Active' ? !t.completed : t.completed)
      const matchPriority = priority === 'All' || t.priority === priority.toLowerCase()
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase())
      return matchFilter && matchPriority && matchSearch
    })
  }, [todos, filter, priority, search])

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-surface-900 bg-mesh">
      {/* Background blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">Authentication and Todo</span>
          </div>

          {/* User menu */}
          <div className="relative">
            <button onClick={() => setShowLogout(p => !p)}
              className="flex items-center gap-2.5 glass px-3 py-2 rounded-xl hover:border-sky-500/30 transition-all">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-display font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm text-slate-300 font-body hidden sm:block">{user?.name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {showLogout && (
              <div className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-1 min-w-[160px] border border-white/10 animate-slide-up z-50">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <p className="text-xs text-slate-400 font-mono truncate">{user?.email}</p>
                </div>
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-all text-sm font-body">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Greeting */}
        <div>
          <p className="text-slate-400 font-body text-sm">{greeting()},</p>
          <h2 className="text-2xl font-display font-bold text-white">{user?.name?.split(' ')[0]} 👋</h2>
        </div>

        {/* Stats */}
        <StatsBar todos={todos} />

        {/* Add todo */}
        <TodoForm onAdd={handleAdd} loading={adding} />

        {/* Filters & Search */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" placeholder="Search tasks..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-11 text-sm" />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            <div className="flex glass rounded-xl p-1 gap-1 flex-1">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-display font-medium transition-all duration-200 ${filter === f ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                  {f}
                </button>
              ))}
            </div>
            {/* Priority filter */}
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="glass rounded-xl px-3 text-xs font-display text-slate-300 border-white/10 bg-transparent cursor-pointer focus:outline-none focus:border-sky-500/50">
              {PRIORITIES.map(p => <option key={p} value={p} className="bg-surface-800">{p === 'All' ? 'All Priority' : p}</option>)}
            </select>
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-2.5">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-500 font-body text-sm">Loading tasks...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center glass rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-center mx-auto mb-4">
                {search || filter !== 'All' || priority !== 'All' ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                )}
              </div>
              <p className="text-slate-400 font-display font-semibold">
                {search ? 'Koi task nahi mili' : filter !== 'All' ? `Koi ${filter.toLowerCase()} task nahi` : 'Koi task nahi hai'}
              </p>
              <p className="text-slate-600 text-sm font-body mt-1">
                {search ? 'Koi aur search karo' : 'Upar "Add new task" pe click karo'}
              </p>
            </div>
          ) : (
            <>
              {filtered.map(todo => (
                <TodoItem key={todo._id} todo={todo}
                  onToggle={handleToggle} onDelete={handleDelete} onUpdate={handleUpdate} />
              ))}

              {/* Clear completed */}
              {todos.some(t => t.completed) && filter !== 'Active' && (
                <button onClick={handleClearCompleted}
                  className="w-full py-2.5 text-xs font-mono text-slate-600 hover:text-red-400/70 transition-colors flex items-center justify-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                  Clear all completed ({todos.filter(t => t.completed).length})
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-slate-700 text-xs font-mono">
            {filtered.length} task{filtered.length !== 1 ? 's' : ''} shown
            {todos.length !== filtered.length ? ` of ${todos.length} total` : ''}
          </p>
        </div>
      </main>

      {/* Click outside to close dropdown */}
      {showLogout && <div className="fixed inset-0 z-40" onClick={() => setShowLogout(false)} />}
    </div>
  )
}
