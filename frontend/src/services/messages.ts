import api from '../lib/api'
import type { TicketMessage } from '../types/ticket'

export const sendMessage = (ticketId: number, body: string) => api.post(`/tickets/${ticketId}/messages`, { body }).then((r) => r.data as TicketMessage)
