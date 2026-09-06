import { useState } from 'react'
import toast from 'react-hot-toast'

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button onClick={() => onChange(!value)}
            className={`w-12 h-6 rounded-full relative transition-colors ${value ? 'bg-[#0A86F5]' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-7' : 'left-1'}`} />
        </button>
    )
}

export default function SettingsNotifications() {
    const notificationItems = [
        { key: 'newTicket', label: 'New Ticket', description: 'Get notified when a new ticket is created.' },
        { key: 'ticketAssigned', label: 'Ticket Assigned', description: 'Get notified when a ticket is assigned to you.' },
        { key: 'ticketResolved', label: 'Ticket Resolved', description: 'Get notified when a ticket is marked as resolved.' },
        { key: 'mention', label: 'Mentions', description: 'Get notified when someone mentions you in a comment.' },
        { key: 'slaBreached', label: 'SLA Breach', description: 'Get notified when a ticket breaches its SLA.' },
        { key: 'weeklyReport', label: 'Weekly Report', description: 'Receive a weekly summary of your ticket activity.' },
    ]

    const [settings, setSettings] = useState({
        newTicket: true, ticketAssigned: true, ticketResolved: false,
        mention: true, slaBreached: true, weeklyReport: false,
    })

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#202020] dark:text-gray-100 mb-6">Notifications</h2>
            <div className="flex flex-col gap-4 mb-6">
                {notificationItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                        <div>
                            <p className="text-sm font-medium text-[#202020] dark:text-gray-200">{item.label}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                        <Toggle
                            value={settings[item.key as keyof typeof settings]}
                            onChange={(v) => setSettings(p => ({ ...p, [item.key]: v }))}
                        />
                    </div>
                ))}
            </div>
            <button onClick={() => toast.success('Notification settings saved!')}
                className="h-10 px-6 bg-[#0A86F5] hover:bg-[#0875d4] text-white text-sm font-medium rounded-lg transition-colors"
            >
                Save Changes
            </button>
        </div>
    )
}