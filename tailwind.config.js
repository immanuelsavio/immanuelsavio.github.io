/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic tokens, values live in src/index.css (light + dark)
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        "on-signal": "rgb(var(--on-signal) / <alpha-value>)",
        // Syswin tokens, values in src/syswin/syswin.css (scoped to .sx)
        "sx-paper": "rgb(var(--sx-paper) / <alpha-value>)",
        "sx-surface": "rgb(var(--sx-surface) / <alpha-value>)",
        "sx-ink": "rgb(var(--sx-ink) / <alpha-value>)",
        "sx-muted": "rgb(var(--sx-muted) / <alpha-value>)",
        "sx-line": "rgb(var(--sx-line) / <alpha-value>)",
        "sx-brand": "rgb(var(--sx-brand) / <alpha-value>)",
        "sx-on-brand": "rgb(var(--sx-on-brand) / <alpha-value>)",
        "sx-deep": "rgb(var(--sx-deep) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
        sx: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Shape system: interactive = full pill, panels + media = panel
        panel: "1.25rem",
        sx: "1.75rem",
      },
      zIndex: {
        nav: "50",
        menu: "55",
        grain: "60",
        palette: "70",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
}
