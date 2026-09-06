import { formatDistanceToNow } from 'date-fns'
import type { TicketListItem } from '../../types/ticket'

interface Props {
    ticket: TicketListItem
    isSelected: boolean
    onClick: () => void
}

const statusDot: Record<string, string> = {
    open: 'bg-status-open',
    in_progress: 'bg-status-progress',
    closed: 'bg-status-closed',
}

const priorityLabel: Record<string, { label: string; color: string }> = {
    low: { label: 'Low', color: 'text-priority-low' },
    medium: { label: 'Medium', color: 'text-priority-medium' },
    high: { label: 'High', color: 'text-priority-high' },
}

export default function TicketRow({ ticket, isSelected, onClick }: Props) {
    const priority = priorityLabel[ticket.priority] ?? priorityLabel.medium
    const initials = ticket.assignee_name
        ? ticket.assignee_name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()
        : null

    return (
        <div
            role="option"
            aria-selected={isSelected}
            data-ticket-id={ticket.id}
            onClick={onClick}
            className={`group flex flex-col gap-1 px-3 py-2.5 border-b border-border cursor-pointer transition-colors ${
                isSelected ? 'bg-bg-hover border-l-2 border-l-accent -ml-px pl-[11px]' : 'hover:bg-bg-hover border-l-2 border-l-transparent'
            }`}>
            <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[ticket.status] ?? 'bg-text-faint'}`} />
                <span className="text-[11px] font-mono-tabular text-text-faint flex-shrink-0">TIC-{ticket.id}</span>
                <span className="flex-1 text-sm font-medium text-text truncate">{ticket.title}</span>
            </div>

            <div className="flex items-center gap-2 pl-3.5">
                {initials && (
                    <span className="w-4 h-4 rounded-full bg-bg-hover border border-border flex items-center justify-center text-[9px] font-medium text-text-muted flex-shrink-0">{initials}</span>
                )}
                <span className={`text-[11px] font-medium ${priority.color}`}>{priority.label}</span>
                <span className="text-[11px] text-text-faint ml-auto flex-shrink-0">{formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })}</span>
            </div>
        </div>
    )
}
