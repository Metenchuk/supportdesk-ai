import SettingsProfile from '../components/settings/SettingsProfile'
import SettingsNotifications from '../components/settings/SettingsNotifications'
import SettingsAppearance from '../components/settings/SettingsAppearance'
import SettingsSecurity from '../components/settings/SettingsSecurity'

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-10 px-6 py-8 overflow-y-auto w-full">
            <div>
                <h1 className="text-3xl font-semibold text-text leading-none">Settings</h1>
                <p className="text-sm text-text-muted mt-2">Manage your account and preferences</p>
            </div>
            <SettingsProfile />
            <SettingsNotifications />
            <SettingsAppearance />
            <SettingsSecurity />
        </div>
    )
}
