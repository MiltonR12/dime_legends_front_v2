/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        rosePrimary: "#CB3CFF",
        primary: "#1850E3",
        secondary: "#FF4326",
        tertiary: "#31EF43",
        info: "#CCCFEE",
        fondo: "#000217",
        oscuro: "#111827",
        violetPrimary: "#1D023E",
        violetSecondary: "#2B044A",
        violetTertiary: "#2B0C52",
        three: {
          100: "#FFFFFF",
          200: "#D9E1FA",
          300: "#D1DBF9",
          400: "#AEB9E1",
          500: "#7E89AC",
          600: "#37446B",
          700: "#0B1739",
          800: "#080F25",
        },
        other: {
          1: "#101935",
          2: "#1A2138",
          3: "#2D3748",
          4: "#4A5568",
          5: "#6B7280",
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  sidebar: {
    DEFAULT: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))',
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}