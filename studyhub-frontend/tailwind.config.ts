import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design System từ StudyHub Stitch
        'primary': '#003d9b',
        'on-primary': '#ffffff',
        'primary-container': '#0052cc',
        'on-primary-container': '#c4d2ff',
        'primary-fixed': '#dae2ff',
        'primary-fixed-dim': '#b2c5ff',
        'on-primary-fixed': '#001848',
        'on-primary-fixed-variant': '#0040a2',
        'inverse-primary': '#b2c5ff',

        'secondary': '#00687b',
        'on-secondary': '#ffffff',
        'secondary-container': '#50dcff',
        'on-secondary-container': '#005f71',
        'secondary-fixed': '#afecff',
        'secondary-fixed-dim': '#48d7f9',
        'on-secondary-fixed': '#001f27',
        'on-secondary-fixed-variant': '#004e5d',

        'tertiary': '#5e3c00',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#7d5200',
        'on-tertiary-container': '#ffca81',
        'tertiary-fixed': '#ffddb3',
        'tertiary-fixed-dim': '#ffb950',
        'on-tertiary-fixed': '#291800',
        'on-tertiary-fixed-variant': '#624000',

        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        'surface': '#f8f9fb',
        'surface-dim': '#d9dadc',
        'surface-bright': '#f8f9fb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f4f6',
        'surface-container': '#edeef0',
        'surface-container-high': '#e7e8ea',
        'surface-container-highest': '#e1e2e4',
        'on-surface': '#191c1e',
        'on-surface-variant': '#434654',
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f3',
        'surface-tint': '#0c56d0',
        'surface-variant': '#e1e2e4',

        'outline': '#737685',
        'outline-variant': '#c3c6d6',
        'background': '#f8f9fb',
        'on-background': '#191c1e',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        'margin-mobile': '16px',
        'margin-desktop': '32px',
        'base': '8px',
        'gutter': '24px',
        'header-height': '72px',
        'sidebar-width': '280px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

export default config
