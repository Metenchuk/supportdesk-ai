/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--bg) / <alpha-value>)',
                'bg-subtle': 'rgb(var(--bg-subtle) / <alpha-value>)',
                'bg-hover': 'rgb(var(--bg-hover) / <alpha-value>)',
                border: 'rgb(var(--border) / <alpha-value>)',
                'border-strong': 'rgb(var(--border-strong) / <alpha-value>)',
                text: 'rgb(var(--text) / <alpha-value>)',
                'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
                'text-faint': 'rgb(var(--text-faint) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
                'status-open': 'rgb(var(--status-open) / <alpha-value>)',
                'status-open-bg': 'rgb(var(--status-open-bg) / <alpha-value>)',
                'status-progress': 'rgb(var(--status-progress) / <alpha-value>)',
                'status-progress-bg': 'rgb(var(--status-progress-bg) / <alpha-value>)',
                'status-closed': 'rgb(var(--status-closed) / <alpha-value>)',
                'status-closed-bg': 'rgb(var(--status-closed-bg) / <alpha-value>)',
                'priority-low': 'rgb(var(--priority-low) / <alpha-value>)',
                'priority-medium': 'rgb(var(--priority-medium) / <alpha-value>)',
                'priority-high': 'rgb(var(--priority-high) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
            },
            borderRadius: { sm: '4px', md: '6px', lg: '10px' },
        },
    },
    plugins: [],
}
