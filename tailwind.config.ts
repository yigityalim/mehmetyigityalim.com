import type { Config } from 'tailwindcss'
import colors from './colors'
import plugin from 'tailwindcss/plugin'

const iOsHeight = plugin(function ({ addUtilities }) {
    const supportsTouchable = '@supports (-webkit-touch-callout: none)'
    const webkitFillAvailable = '-webkit-fill-available'

    const utilities = {
        '.min-h-screen-ios': {
            [supportsTouchable]: {
                minHeight: webkitFillAvailable,
            },
        },
        '.h-screen-ios': {
            [supportsTouchable]: {
                height: webkitFillAvailable,
            },
        },
    }

    addUtilities(utilities, { respectPrefix: false, respectImportant: false })
})

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx,md,mdx}',
        './components/**/*.{ts,tsx,md,mdx}',
        './app/**/*.{ts,tsx,md,mdx}',
        './src/**/*.{ts,tsx,md,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors,
            backgroundImage: {
                'gradient-left-dark':
                    'conic-gradient(from 90deg at -10% 100%, #2B303B 0deg, #2B303B 90deg, #16181D 360deg)',
                'gradient-right-dark':
                    'conic-gradient(from -90deg at 110% 100%, #2B303B 0deg, #16181D 90deg, #16181D 360deg)',
                'gradient-left': 'conic-gradient(from 90deg at -10% 100%, #BCC1CD 0deg, #BCC1CD 90deg, #FFFFFF 360deg)',
                'gradient-right':
                    'conic-gradient(from -90deg at 110% 100%, #FFFFFF 0deg, #EBECF0 90deg, #EBECF0 360deg)',
                'meta-gradient': "url('/images/meta-gradient.png')",
                'meta-gradient-dark': "url('/images/meta-gradient-dark.png')",
            },
            keyframes: {
                loader: {
                    '0%': {
                        left: '0',
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        left: '100%',
                        transform: 'translateX(0)',
                    },
                },
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                tilt: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(0.5deg)',
                    },
                    '100%': {
                        transform: 'rotate(0deg)',
                    },
                },
            },
            animation: {
                loader: 'loader 1s linear infinite',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                tilt: 'tilt 20s infinite cubic-bezier(.01,.01,.01,.01)',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
        iOsHeight,
    ],
} satisfies Config
export default config
