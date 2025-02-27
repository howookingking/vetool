import type { Config } from 'tailwindcss'

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const createShakeKeyframes = (degree: number, reverse: boolean = false) => {
  const rotations = reverse
    ? {
        '10%': degree,
        '20%': -degree,
        '30%': degree,
        '40%': -degree,
        '50%': degree,
        '60%': -degree,
        '70%': degree,
        '80%': -degree,
        '90%': degree,
      }
    : {
        '10%': -degree,
        '20%': degree,
        '30%': -degree,
        '40%': degree,
        '50%': -degree,
        '60%': degree,
        '70%': -degree,
        '80%': degree,
        '90%': -degree,
      }

  return {
    '0%': { transform: 'rotate(0deg)' },
    ...Object.entries(rotations).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: { transform: `rotate(${value}deg)` },
      }),
      {},
    ),
    '100%': { transform: 'rotate(0deg)' },
  }
}

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shake: createShakeKeyframes(0.1),
        'shake-reverse': createShakeKeyframes(0.1, true),
        'shake-strong': createShakeKeyframes(0.5),
        'shake-strong-reverse': createShakeKeyframes(0.5, true),

        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shake: 'shake 1.2s ease-out infinite',
        'shake-reverse': 'shake-reverse 1.2s ease-out infinite',
        'shake-strong': 'shake-strong 1.2s ease-out infinite',
        'shake-strong-reverse': 'shake-strong-reverse 1.2s ease-out infinite',
        slideDown: 'slideDown 0.5s ease-in-out forwards',
        slideUp: 'slideUp 0.5s ease-in-out forwards',
        aurora: 'aurora 60s linear infinite',
      },
      height: {
        'exclude-header': 'calc(100vh - 48px)',
        desktop: 'calc(100vh - 40px)', // icu footer만 제외
        mobile: 'calc(100vh - 88px)', // icu header(모바일 혹은 처치표 필터) 제외
        company: 'calc(100vh - 64px)',
      },
      width: {
        'exclude-sidebar': 'calc(100vw - 250px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

export default config
