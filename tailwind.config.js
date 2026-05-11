/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-deep)',
        foreground: 'var(--text-primary)',
        card: 'var(--bg-card)',
        stats: 'var(--bg-stats)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)'
        },
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)'
        },
        nav: 'var(--nav-bg)'
      },
      animation: {
        twinkle: 'twinkle 3s infinite ease-in-out',
        rotate: 'rotate 8s linear infinite',
        float: 'float 4s ease-in-out infinite',
        scroll: 'scroll 2s infinite',
        'aurora-1': 'aurora-1 60s linear infinite',
        'aurora-2': 'aurora-2 60s linear infinite',
        'aurora-3': 'aurora-3 60s linear infinite',
        'aurora-4': 'aurora-4 60s linear infinite',
        shine: 'shine 3s linear infinite',
        marquee: 'marquee linear infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },

        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scroll: {
          '0%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
          '100%': { opacity: '0', transform: 'translateX(-50%) translateY(15px)' },
        },
        'aurora-1': {
          '0%, 100%': { top: '0', right: '0' },
          '50%': { top: '50%', right: '25%' },
          '75%': { top: '25%', right: '50%' },
        },
        'aurora-2': {
          '0%, 100%': { top: '0', left: '0' },
          '60%': { top: '75%', left: '25%' },
          '85%': { top: '50%', left: '50%' },
        },
        'aurora-3': {
          '0%, 100%': { bottom: '0', left: '0' },
          '40%': { bottom: '50%', left: '25%' },
          '65%': { bottom: '25%', left: '50%' },
        },
        'aurora-4': {
          '0%, 100%': { bottom: '0', right: '0' },
          '50%': { bottom: '25%', right: '40%' },
          '90%': { bottom: '50%', right: '25%' },
        },
      }
    },
  },
  plugins: [],
}

