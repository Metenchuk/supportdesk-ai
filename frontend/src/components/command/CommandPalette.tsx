import { useState, useEffect, useMemo } from 'react'
import { Search, Tag, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTickets } from '../../services/tickets'
import { useSearchParams } from 'react-router-dom'

interface Props {
    open: boolean
    onClose: () => void
    onNewTicket: () => void
}

export default function CommandPalette({ open, onClose, onNewTicket }: Props) {
    const [q, setQ] = useState('')
    const [, setSearchParams] = useSearchParams()

    const { data } = useQuery({
        queryKey: ['tickets'],
        queryFn: () => getTickets({ limit: 100 }),
        enabled: open,
    })

    const filtered = useMemo(() => {
        if (q.length < 2) return []
        const list = data?.data ?? []
        const query = q.toLowerCase()
        return list.filter((t) => t.title.toLowerCase().includes(query) || t.user_name?.toLowerCase().includes(query)).slice(0, 8)
    }, [data, q])

    useEffect(() => {
        if (!open) setQ('')
    }, [open])

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, onClose])

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
            <div className="bg-bg border border-border rounded-lg w-full max-w-lg shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border">
                    <Search size={15} className="text-text-faint flex-shrink-0" />
                    <input
                        autoFocus
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search tickets or type a command..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-faint"
                    />
                    <kbd className="text-[10px] text-text-faint border border-border rounded px-1 font-mono-tabular">Esc</kbd>
                </div>

                {q.length < 2 ? (
                    <div className="p-1.5">
                        <button
                            onClick={() => {
                                onNewTicket()
                                onClose()
                            }}
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-bg-hover text-sm text-left transition-colors">
                            <Plus size={14} className="text-text-faint" />
                            Create new ticket
                            <kbd className="ml-auto text-[10px] text-text-faint font-mono-tabular">C</kbd>
                        </button>
                    </div>
                ) : filtered.length > 0 ? (
                    <ul className="py-1.5 max-h-72 overflow-y-auto">
                        {filtered.map((t) => (
                            <li key={t.id}>
                                <button
                                    onClick={() => {
                                        setSearchParams({ ticketId: String(t.id) })
                                        onClose()
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-bg-hover text-left transition-colors">
                                    <Tag size={13} className="text-text-faint flex-shrink-0" />
                                    <span className="text-[11px] font-mono-tabular text-text-faint flex-shrink-0">TIC-{t.id}</span>
                                    <span className="flex-1 text-sm truncate">{t.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="py-10 text-center text-sm text-text-faint">No results for "{q}"</div>
                )}
            </div>
        </div>
    )
}
