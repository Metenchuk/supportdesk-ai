import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import QuickFilterSidebar from './QuickFilterSidebar'
import TopBar from './TopBar'
import CommandPalette from '../command/CommandPalette'
import NewTicketModal from '../tickets/NewTicketModal'

export default function AppShell() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [paletteOpen, setPaletteOpen] = useState(false)
    const [newTicketOpen, setNewTicketOpen] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-bg text-text">
            <TopBar onToggleSidebar={() => setSidebarCollapsed((p) => !p)} onOpenPalette={() => setPaletteOpen(true)} />
            <div className="flex-1 flex overflow-hidden">
                {!sidebarCollapsed && <QuickFilterSidebar onNewTicket={() => setNewTicketOpen(true)} />}
                <div className="flex-1 flex overflow-hidden min-w-0">
                    <Outlet context={{ onOpenPalette: () => setPaletteOpen(true), onNewTicket: () => setNewTicketOpen(true) }} />
                </div>
            </div>

            <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNewTicket={() => setNewTicketOpen(true)} />
            <NewTicketModal open={newTicketOpen} onClose={() => setNewTicketOpen(false)} />
        </div>
    )
}
