import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { X, Link2, Trash2, User, Building, Tag as TagIcon, Calendar } from 'lucide-react'
import { getTicketById } from '../../services/tickets'
import { useUpdateTicket, useDeleteTicket } from '../../hooks/useTicketMutations'
import { formatDistanceToNow } from 'date-fns'
import TicketActivity from './TicketActivity'
import TicketDetailSkeleton from './TicketDetailSkeleton'
import toast from 'react-hot-toast'

interface Props {
    ticketId: number
    onClose: () => void
}

const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
]

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

export default function TicketDetailPanel({ ticketId, onClose }: Props) {
    const { data: ticket, isLoading } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: () => getTicketById(ticketId),
    })

    const { mutate: update } = useUpdateTicket(ticketId)
    const { mutate: remove } = useDeleteTicket()

    const [title, setTitle] = useState('')
    const [editingTitle, setEditingTitle] = useState(false)

    useEffect(() => {
        if (ticket) setTitle(ticket.title)
    }, [ticket?.id])

    if (isLoading || !ticket) return <TicketDetailSkeleton />

    const saveTitle = () => {
        setEditingTitle(false)
        const trimmed = title.trim()
        if (trimmed.length >= 3 && trimmed !== ticket.title) {
            update({ title: trimmed })
        } else {
            setTitle(ticket.title)
        }
    }

    const handleCopyLink = () => {
        const url = `${window.location.origin}${window.location.pathname}?ticketId=${ticketId}`
        navigator.clipboard.writeText(url)
        toast.success('Link copied')
    }

    const handleDelete = () => {
        if (!confirm(`Delete TIC-${ticketId}? This cannot be undone.`)) return
        remove(ticketId, {
            onSuccess: () => {
                toast.success('Ticket deleted')
                onClose()
            },
        })
    }

    return (
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="sticky top-0 z-10 h-11 flex items-center gap-2 px-3 border-b border-border bg-bg flex-shrink-0">
                    <span className="text-[11px] font-mono-tabular text-text-faint">TIC-{ticket.id}</span>

                    <select
                        value={ticket.status}
                        onChange={(e) => update({ status: e.target.value })}
                        className="h-7 px-2 rounded-md border border-border bg-bg text-xs font-medium outline-none focus:border-accent">
                        {statusOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={ticket.priority}
                        onChange={(e) => update({ priority: e.target.value })}
                        className="h-7 px-2 rounded-md border border-border bg-bg text-xs font-medium outline-none focus:border-accent">
                        {priorityOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>

                    <div className="ml-auto flex items-center gap-1">
                        <button onClick={handleCopyLink} className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:bg-bg-hover transition-colors" title="Copy link">
                            <Link2 size={14} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:bg-bg-hover hover:text-priority-high transition-colors"
                            title="Delete ticket">
                            <Trash2 size={14} />
                        </button>
                        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:bg-bg-hover transition-colors" title="Close">
                            <X size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {editingTitle ? (
                        <input
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={saveTitle}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') saveTitle()
                                if (e.key === 'Escape') {
                                    setTitle(ticket.title)
                                    setEditingTitle(false)
                                }
                            }}
                            className="w-full text-xl font-semibold bg-transparent outline-none border-b border-accent pb-1 mb-4"
                        />
                    ) : (
                        <h1 onClick={() => setEditingTitle(true)} className="text-xl font-semibold mb-4 cursor-text hover:bg-bg-hover rounded-md -mx-1 px-1 transition-colors">
                            {title}
                        </h1>
                    )}

                    <div className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap mb-8">{ticket.description}</div>

                    <TicketActivity ticketId={ticket.id} messages={ticket.messages} />
                </div>
            </div>

            <div className="w-[240px] flex-shrink-0 border-l border-border p-4 flex flex-col gap-4 overflow-y-auto">
                <MetaField icon={User} label="Assignee" value={ticket.assignee_name ?? 'Unassigned'} />
                <MetaField icon={Building} label="Team" value={ticket.team_name ?? '—'} />
                <MetaField icon={TagIcon} label="Category" value={ticket.category ?? '—'} />
                <MetaField icon={Calendar} label="Created" value={formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })} />
                <MetaField icon={User} label="Reporter" value={ticket.creator_name ?? '—'} />
            </div>
        </div>
    )
}

function MetaField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-faint uppercase tracking-wide">
                <Icon size={11} />
                {label}
            </div>
            <p className="text-sm text-text truncate">{value}</p>
        </div>
    )
}
