import { NavLink } from 'react-router-dom'
import { Inbox, User, Plus, Settings, BarChart2, Mail, BookOpen, Users, Shield, GitMerge, Clock, Zap, Tag } from 'lucide-react'

interface Props {
    onNewTicket: () => void
}

const quickFilters = [
    { to: '/tickets', label: 'All Tickets', icon: Inbox, exact: true },
    { to: '/tickets?assignee=me', label: 'Assigned to me', icon: User },
]

const workspace = [
    { to: '/assignment', icon: Users, label: 'Ticket Assignment' },
    { to: '/sla', icon: Clock, label: 'SLA Management' },
    { to: '/custom-status', icon: Shield, label: 'Custom Statuses' },
    { to: '/automation', icon: Zap, label: 'Automation' },
    { to: '/saved-answers', icon: BookOpen, label: 'Saved Answers' },
    { to: '/team-work', icon: Users, label: 'Team Work' },
    { to: '/joint', icon: GitMerge, label: 'Joint Editing' },
    { to: '/email', icon: Mail, label: 'Email Integration' },
    { to: '/reports', icon: BarChart2, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function QuickFilterSidebar({ onNewTicket }: Props) {
    return (
        <aside className="w-[220px] flex-shrink-0 border-r border-border flex flex-col overflow-y-auto">
            <div className="p-2.5">
                <button
                    onClick={onNewTicket}
                    className="w-full flex items-center justify-center gap-1.5 h-8 rounded-md bg-accent text-accent-fg text-sm font-medium hover:opacity-90 transition-opacity">
                    <Plus size={14} />
                    New Ticket
                    <kbd className="ml-1 text-[10px] opacity-70 font-mono-tabular">C</kbd>
                </button>
            </div>

            <nav className="px-2 flex flex-col gap-0.5">
                {quickFilters.map(({ to, label, icon: Icon, exact }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={exact}
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                                isActive ? 'bg-bg-hover text-text font-medium border-l-2 border-accent -ml-0.5 pl-2' : 'text-text-muted hover:bg-bg-hover hover:text-text'
                            }`
                        }>
                        <Icon size={15} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="mx-2.5 my-3 border-t border-border" />

            <div className="px-2.5 pb-1 flex items-center gap-1.5 text-[11px] font-medium text-text-faint uppercase tracking-wide">
                <Tag size={11} /> Workspace
            </div>

            <nav className="px-2 flex flex-col gap-0.5 pb-3">
                {workspace.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                                isActive ? 'bg-bg-hover text-text font-medium' : 'text-text-muted hover:bg-bg-hover hover:text-text'
                            }`
                        }>
                        <Icon size={15} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
