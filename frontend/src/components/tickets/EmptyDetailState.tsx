import { Command, Inbox } from 'lucide-react'

interface Props {
    onOpenPalette: () => void
}

export default function EmptyDetailState({ onOpenPalette }: Props) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-faint">
            <Inbox size={32} strokeWidth={1.25} />
            <p className="text-sm">Select a ticket to view details</p>
            <button onClick={onOpenPalette} className="flex items-center gap-1.5 text-xs border border-border rounded-md px-2.5 py-1.5 hover:border-border-strong transition-colors">
                <Command size={12} />
                Press <kbd className="font-mono-tabular">⌘K</kbd> for quick actions
            </button>
        </div>
    )
}
