export type TicketStatus = 'open' | 'in_progress' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface TicketListItem {
    id: number
    title: string
    status: TicketStatus
    priority: TicketPriority
    category: string | null
    created_at: string
    updated_at: string
    assigned_to_id: number | null
    assignee_name: string | null
    team_id: number | null
    user_name: string | null
    user_email: string | null
}

export interface TicketMessage {
    id: number
    body: string
    ticket_id: number
    author_id: number
    author_name: string
    author_email: string
    author_role: string
    created_at: string
}

export interface TicketDetail {
    id: number
    title: string
    description: string
    status: TicketStatus
    priority: TicketPriority
    category: string | null
    created_at: string
    updated_at: string
    creator_name: string | null
    creator_email: string | null
    assignee_name: string | null
    assignee_email: string | null
    team_name: string | null
    assigned_to_id: number | null
    team_id: number | null
    messages: TicketMessage[]
}

export const STATUS_LABEL: Record<TicketStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
}

export const PRIORITY_LABEL: Record<TicketPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
}
