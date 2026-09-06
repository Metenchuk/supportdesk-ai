import { Monitor, Sun, Moon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const themes = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor },
]

export default function SettingsAppearance() {
    const { theme, setTheme } = useTheme()
    const [compactMode, setCompactMode] = useState(false)

    const handleSave = () => toast.success('Appearance settings saved!')

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#202020] dark:text-gray-100 mb-6">Appearance</h2>

            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</p>
                <div className="flex gap-3">
                    {themes.map(({ key, label, icon: Icon }) => (
                        <button key={key} onClick={() => setTheme(key as 'light' | 'dark' | 'system')}
                            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all ${
                                theme === key
                                    ? 'border-[#0A86F5] bg-[rgba(10,134,245,0.04)]'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            <Icon size={20} className={theme === key ? 'text-[#0A86F5]' : 'text-gray-400 dark:text-gray-500'} />
                            <span className={`text-xs font-medium ${theme === key ? 'text-[#0A86F5]' : 'text-gray-500 dark:text-gray-400'}`}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mb-6 py-3 border-t border-gray-50 dark:border-gray-800">
                <div>
                    <p className="text-sm font-medium text-[#202020] dark:text-gray-200">Compact Mode</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Reduce padding and margins to fit more content on the screen.</p>
                </div>
                <button onClick={() => setCompactMode(p => !p)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${compactMode ? 'bg-[#0A86F5]' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${compactMode ? 'left-7' : 'left-1'}`} />
                </button>
            </div>

            <button onClick={handleSave}
                className="h-10 px-6 bg-[#0A86F5] hover:bg-[#0875d4] text-white text-sm font-medium rounded-lg transition-colors"
            >
                Save Changes
            </button>
        </div>
    )
}