import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTicket, deleteTicket } from '../services/tickets'
import type { TicketListItem, TicketDetail } from '../types/ticket'
import type { TicketsResponse } from '../services/tickets'

export function useUpdateTicket(ticketId: number) {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: { title?: string; status?: string; priority?: string; assignedToId?: number }) => updateTicket(ticketId, data),

        onMutate: async (data) => {
            await qc.cancelQueries({ queryKey: ['tickets'] })
            await qc.cancelQueries({ queryKey: ['ticket', ticketId] })

            const previousLists = qc.getQueriesData<TicketsResponse>({ queryKey: ['tickets'] })
            const previousDetail = qc.getQueryData<TicketDetail>(['ticket', ticketId])

            qc.setQueriesData<TicketsResponse>({ queryKey: ['tickets'] }, (old) => {
                if (!old) return old
                return {
                    ...old,
                    data: old.data.map((t: TicketListItem) => (t.id === ticketId ? ({ ...t, ...data } as TicketListItem) : t)),
                }
            })

            qc.setQueryData<TicketDetail>(['ticket', ticketId], (old) => (old ? ({ ...old, ...data } as TicketDetail) : old))

            return { previousLists, previousDetail }
        },

        onError: (_err, _vars, context) => {
            context?.previousLists?.forEach(([key, value]) => {
                qc.setQueryData(key, value)
            })
            if (context?.previousDetail) {
                qc.setQueryData(['ticket', ticketId], context.previousDetail)
            }
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: ['tickets'] })
            qc.invalidateQueries({ queryKey: ['ticket', ticketId] })
        },
    })
}

export function useDeleteTicket() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteTicket(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['tickets'] })
        },
    })
}
