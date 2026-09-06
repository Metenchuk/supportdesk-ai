import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '../../services/messages'
import type { TicketMessage } from '../../types/ticket'
import { formatDistanceToNow } from 'date-fns'
import { Send } from 'lucide-react'

interface Props {
    ticketId: number
    messages: TicketMessage[]
}

export default function TicketActivity({ ticketId, messages }: Props) {
    const [input, setInput] = useState('')
    const qc = useQueryClient()

    const { mutate: send, isPending } = useMutation({
        mutationFn: (body: string) => sendMessage(ticketId, body),
        onSuccess: () => {
            setInput('')
            qc.invalidateQueries({ queryKey: ['ticket', ticketId] })
        },
    })

    const handleSend = () => {
        const text = input.trim()
        if (!text || isPending) return
        send(text)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-[11px] font-medium text-text-faint uppercase tracking-wide">Activity ({messages.length})</div>

            <div className="flex flex-col gap-3">
                {messages.map((m) => (
                    <div key={m.id} className="flex gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-bg-hover border border-border flex items-center justify-center text-[10px] font-medium text-text-muted flex-shrink-0">
                            {m.author_name?.slice(0, 2).toUpperCase() ?? '??'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-medium text-text">{m.author_name}</span>
                                <span className="text-[11px] text-text-faint">{formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}</span>
                            </div>
                            <p className="text-sm text-text-muted mt-0.5 whitespace-pre-wrap">{m.body}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Write a comment..."
                    className="flex-1 h-8 px-2.5 rounded-md border border-border bg-bg text-sm outline-none focus:border-accent placeholder:text-text-faint"
                />
                <button
                    onClick={handleSend}
                    disabled={isPending}
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-accent text-accent-fg disabled:opacity-50 transition-opacity">
                    <Send size={13} />
                </button>
            </div>
        </div>
    )
}
