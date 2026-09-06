import { forwardRef } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'
import type { TicketListItem } from '../../types/ticket'
import TicketRow from './TicketRow'
import TicketRowSkeleton from './TicketRowSkeleton'

interface Props {
    tickets: TicketListItem[]
    isLoading: boolean
    selectedId: number | null
    onSelect: (id: number) => void
    search: string
    onSearchChange: (v: string) => void
    statusFilter: string
    onStatusFilterChange: (v: string) => void
    priorityFilter: string
    onPriorityFilterChange: (v: string) => void
    sort: 'asc' | 'desc'
    onSortChange: (v: 'asc' | 'desc') => void
}

const TicketListPanel = forwardRef<HTMLDivElement, Props>(function TicketListPanel(
    { tickets, isLoading, selectedId, onSelect, search, onSearchChange, statusFilter, onStatusFilterChange, priorityFilter, onPriorityFilterChange, sort, onSortChange },
    ref,
) {
    return (
        <div className="flex flex-col overflow-hidden bg-bg-subtle">
            <div className="sticky top-0 z-10 bg-bg-subtle border-b border-border p-2.5 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 h-8 px-2 rounded-md border border-border bg-bg">
                    <Search size={13} className="text-text-faint flex-shrink-0" />
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search tickets..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-faint"
                    />
                </div>

                <div className="flex items-center gap-1.5">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                        className="flex-1 h-7 px-1.5 rounded-md border border-border bg-bg text-xs text-text-muted outline-none focus:border-accent">
                        <option value="">All statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => onPriorityFilterChange(e.target.value)}
                        className="flex-1 h-7 px-1.5 rounded-md border border-border bg-bg text-xs text-text-muted outline-none focus:border-accent">
                        <option value="">All priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <button
                        onClick={() => onSortChange(sort === 'desc' ? 'asc' : 'desc')}
                        className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-md border border-border text-text-muted hover:border-border-strong transition-colors"
                        title="Toggle sort order">
                        <ArrowUpDown size={12} />
                    </button>
                </div>
            </div>

            <div ref={ref} role="listbox" aria-label="Tickets" className="flex-1 overflow-y-auto">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <TicketRowSkeleton key={i} />)
                ) : tickets.length === 0 ? (
                    <div className="py-16 text-center text-sm text-text-faint">No tickets found</div>
                ) : (
                    tickets.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} isSelected={selectedId === ticket.id} onClick={() => onSelect(ticket.id)} />)
                )}
            </div>
        </div>
    )
})

export default TicketListPanel
