import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { login } from '../../services/auth'
import Spinner from '../ui/Spinner'

interface LoginResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
        role: string
    }
}

export default function LoginForm() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate, isPending } = useMutation({
        mutationFn: () => login({ email, password }),
        onSuccess: (data: LoginResponse) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            toast.success('Welcome back!')
            navigate('/tickets')
        },
        onError: () => {
            toast.error('Invalid email or password')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return toast.error('Please fill in all fields')
        mutate()
    }

    return (
        <div className="w-full max-w-[420px]">
            <div className="flex items-center gap-2 mb-10 lg:hidden">
                <div className="w-8 h-8 rounded-full bg-[#0A86F5] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                        <path d="M8 16l5 5 11-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="font-semibold text-lg text-gray-900">SupportDesk</span>
            </div>

            <div className="mb-8">
                <h1 className="text-[32px] font-bold text-gray-900 leading-tight">Welcome back</h1>
                <p className="text-gray-500 mt-1">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Email address</label>
                    <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#0A86F5] focus:ring-2 focus:ring-[#0A86F5]/20 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#0A86F5] focus:ring-2 focus:ring-[#0A86F5]/20 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="mt-2 h-11 w-full bg-[#0A86F5] hover:bg-[#0875d4] disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                    {isPending ? <Spinner size="sm" /> : 'Log in'}
                </button>
            </form>
        </div>
    )
}