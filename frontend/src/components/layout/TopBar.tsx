import { Search, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import UserMenu from '../header/UserMenu'

interface Props {
    onToggleSidebar: () => void
    onOpenPalette: () => void
}

export default function TopBar({ onToggleSidebar, onOpenPalette }: Props) {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <header className="h-12 flex items-center gap-2 px-3 border-b border-border bg-bg flex-shrink-0">
            <button onClick={onToggleSidebar} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-hover text-text-muted transition-colors" title="Toggle sidebar">
                <Menu size={16} />
            </button>

            <span className="text-sm font-semibold tracking-tight">SupportDesk</span>

            <button
                onClick={onOpenPalette}
                className="ml-4 flex items-center gap-2 h-7 px-2.5 rounded-md border border-border bg-bg-subtle text-text-muted text-xs hover:border-border-strong transition-colors w-64">
                <Search size={13} />
                <span className="flex-1 text-left">Search or jump to...</span>
                <kbd className="text-[10px] border border-border rounded px-1 font-mono-tabular">⌘K</kbd>
            </button>

            <div className="ml-auto flex items-center gap-1.5">
                <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-hover text-text-muted transition-colors">
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                <UserMenu />
            </div>
        </header>
    )
}
