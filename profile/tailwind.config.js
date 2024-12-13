/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx, js}"],
  theme: {
    extend: {
      spacing: {
        '300': '300px',
        '340': '340px',
        '616': '41rem',
        '700': '44rem',
      },
      keyframes: {
        '0%': { transform: 'scaleY(0)' },
        '80%': { transform: 'scaleY(1.2)' },
        '1000%': { transform: 'scaleY(1)' },
      },
        animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
        'bounce-y': 'bounce-y 1s ease-in-out infinite',
        },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
    {
      saasstartertheme: {
        primary: "#180042",
        "primary-content": "#fefbf6",
        secondary: "#c7b9f8",
        neutral: "#180042",
        "neutral-content": "#fefbf6",
        accent: "#db2777",
        "accent-content": "#180042",
        "base-content": "#180042",
        "base-100": "#fefbf6",
        "base-200": "#faedd6",
        success: "#37d399",
        error: "#f77272",
      },
    },
  ],
  },
}

