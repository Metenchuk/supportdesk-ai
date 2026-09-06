import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { createTicket } from '../../services/tickets'
import toast from 'react-hot-toast'

interface Props {
    open: boolean
    onClose: () => void
}

export default function NewTicketModal({ open, onClose }: Props) {
    const qc = useQueryClient()
    const [, setSearchParams] = useSearchParams()
    const [form, setForm] = useState({ title: '', description: '', priority: 'medium' })

    const { mutate, isPending } = useMutation({
        mutationFn: () => createTicket(form),
        onSuccess: (ticket) => {
            toast.success('Ticket created')
            qc.invalidateQueries({ queryKey: ['tickets'] })
            setForm({ title: '', description: '', priority: 'medium' })
            setSearchParams({ ticketId: String(ticket.id) })
            onClose()
        },
        onError: () => toast.error('Failed to create ticket'),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (form.title.length < 3 || form.description.length < 10) {
            return toast.error('Title needs 3+ chars, description 10+ chars')
        }
        mutate()
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
            <div className="bg-bg border border-border rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h2 className="text-sm font-semibold">New Ticket</h2>
                    <button onClick={onClose} className="text-text-faint hover:text-text transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
                    <input
                        autoFocus
                        value={form.title}
                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Ticket title"
                        className="h-9 px-2.5 rounded-md border border-border bg-bg-subtle text-sm outline-none focus:border-accent placeholder:text-text-faint"
                    />
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Description..."
                        rows={4}
                        className="px-2.5 py-2 rounded-md border border-border bg-bg-subtle text-sm outline-none focus:border-accent placeholder:text-text-faint resize-none"
                    />
                    <select
                        value={form.priority}
                        onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
                        className="h-9 px-2.5 rounded-md border border-border bg-bg-subtle text-sm outline-none focus:border-accent">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={onClose} className="flex-1 h-9 border border-border rounded-md text-sm text-text-muted hover:bg-bg-hover transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isPending} className="flex-1 h-9 bg-accent text-accent-fg rounded-md text-sm font-medium disabled:opacity-60 transition-opacity">
                            {isPending ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
