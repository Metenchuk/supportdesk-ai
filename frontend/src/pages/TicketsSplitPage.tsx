import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useSearchParams, useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTickets } from '../services/tickets'
import { getCurrentUser } from '../services/auth'
import TicketListPanel from '../components/tickets/TicketListPanel'
import TicketDetailPanel from '../components/tickets/TicketDetailPanel'
import EmptyDetailState from '../components/tickets/EmptyDetailState'
import { useKeyboardNav } from '../hooks/useKeyboardNav'

interface OutletCtx {
    onOpenPalette: () => void
    onNewTicket: () => void
}

export default function TicketsSplitPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { onOpenPalette, onNewTicket } = useOutletContext<OutletCtx>()

    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')
    const [sort, setSort] = useState<'asc' | 'desc'>('desc')

    const ticketId = searchParams.get('ticketId')
    const assigneeFilter = searchParams.get('assignee')

    const { data: me } = useQuery({ queryKey: ['me'], queryFn: getCurrentUser })

    const { data, isLoading } = useQuery({
        queryKey: ['tickets', statusFilter, priorityFilter, sort],
        queryFn: () => getTickets({
            status: statusFilter || undefined,
            priority: priorityFilter || undefined,
            sort,
            limit: 100,
        }),
    })

    const tickets = useMemo(() => {
        let list = data?.data ?? []
        if (assigneeFilter === 'me' && me?.id) {
            list = list.filter((t) => t.assigned_to_id === me.id)
        }
        if (search) {
            const q = search.toLowerCase()
            list = list.filter((t) => t.title.toLowerCase().includes(q) || t.user_name?.toLowerCase().includes(q))
        }
        return list
    }, [data, search, assigneeFilter, me])

    const selectTicket = useCallback((id: number | null) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (id === null) next.delete('ticketId')
            else next.set('ticketId', String(id))
            return next
        }, { replace: true })
    }, [setSearchParams])

    const currentIndex = tickets.findIndex((t) => String(t.id) === ticketId)

    const listRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (currentIndex < 0 || !listRef.current) return
        const el = listRef.current.querySelector(`[data-ticket-id="${ticketId}"]`)
        el?.scrollIntoView({ block: 'nearest' })
    }, [ticketId, currentIndex])

    useKeyboardNav({
        onUp: () => {
            if (tickets.length === 0) return
            const nextIndex = currentIndex <= 0 ? tickets.length - 1 : currentIndex - 1
            selectTicket(tickets[nextIndex].id)
        },
        onDown: () => {
            if (tickets.length === 0) return
            const nextIndex = currentIndex < 0 || currentIndex >= tickets.length - 1 ? 0 : currentIndex + 1
            selectTicket(tickets[nextIndex].id)
        },
        onEnter: () => {
            if (currentIndex >= 0) selectTicket(tickets[currentIndex].id)
        },
        onNew: onNewTicket,
        onCommandPalette: onOpenPalette,
    })

    return (
        <div className="flex-1 grid overflow-hidden h-full" style={{ gridTemplateColumns: '380px 1fr' }}>
            <TicketListPanel
                ref={listRef}
                tickets={tickets}
                isLoading={isLoading}
                selectedId={ticketId ? Number(ticketId) : null}
                onSelect={selectTicket}
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                sort={sort}
                onSortChange={setSort}
            />

            <div className="overflow-hidden flex flex-col border-l border-border">
                {ticketId ? (
                    <TicketDetailPanel ticketId={Number(ticketId)} onClose={() => selectTicket(null)} />
                ) : (
                    <EmptyDetailState onOpenPalette={onOpenPalette} />
                )}
            </div>
        </div>
    )
}