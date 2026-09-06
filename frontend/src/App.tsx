import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TicketsSplitPage from './pages/TicketsSplitPage'
import AssignmentPage from './pages/AssignmentPage'
import AutomationPage from './pages/AutomationPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import AssignmentRuleDetailPage from './pages/AssignmentRuleDetailPage'
import AutomationDetailPage from './pages/AutomationDetailPage'
import SlaManagementPage from './pages/SlaManagementPage'
import CustomTicketStatusPage from './pages/CustomTicketStatusPage'
import SavedAnswersPage from './pages/SavedAnswersPage'
import AppShell from './components/layout/AppShell'
import TeamWorkPage from './pages/TeamWorkPage'
import JointEditingPage from './pages/JointEditingPage'
import EmailIntegrationPage from './pages/EmailIntegrationPage'
import ReportStatisticsPage from './pages/ReportStatisticsPage'
import SettingsPage from './pages/SettingsPage'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppShell />}>
                <Route index element={<Navigate to="/tickets" />} />
                <Route path="tickets" element={<TicketsSplitPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="assignment" element={<AssignmentPage />} />
                <Route path="assignment-rules/:id" element={<AssignmentRuleDetailPage />} />
                <Route path="automation" element={<AutomationPage />} />
                <Route path="automation/:id" element={<AutomationDetailPage />} />
                <Route path="sla" element={<SlaManagementPage />} />
                <Route path="custom-status" element={<CustomTicketStatusPage />} />
                <Route path="saved-answers" element={<SavedAnswersPage />} />
                <Route path="team-work" element={<TeamWorkPage />} />
                <Route path="joint" element={<JointEditingPage />} />
                <Route path="email" element={<EmailIntegrationPage />} />
                <Route path="reports" element={<ReportStatisticsPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
