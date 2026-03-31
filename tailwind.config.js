/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A2E4A",
        accent: "#E8601C",
        teal: "#0E7C7B",
        bg: "#F4F4F4",
        surface: "#FFFFFF",
        text: "#111111",
        muted: "#444444",
        border: "#CCCCCC",
        success: "#16A34A",
        error: "#DC2626"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(13, 28, 44, 0.16)"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(232, 96, 28, 0.18), transparent 38%), radial-gradient(circle at bottom right, rgba(14, 124, 123, 0.2), transparent 42%)"
      }
    }
  },
  plugins: []
};
