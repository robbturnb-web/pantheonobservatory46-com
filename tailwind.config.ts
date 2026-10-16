import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: 'calc(var(--spacing) * 4)', // 1rem with 14px base = 14px padding
      screens: {
        sm: '40rem',
        md: '48rem', 
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
    },
    extend: {
      fontFamily: {
        bagel: ['Bagel Fat One', 'cursive'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          blue: "var(--accent-blue)",
          blueDeep: "var(--accent-blue-deep)",
          blueBg: "var(--accent-blue-bg)",
          emerald: "var(--accent-emerald)",
          purple: "var(--accent-purple)",
          purpleDeep: "var(--accent-purple-deep)",
          purpleGlow: "var(--accent-purple-glow)",
          neon: "var(--accent-neon)",
          greenGlow: "var(--accent-green-glow)",
          redDeep: "var(--accent-red-deep)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sacred: {
          DEFAULT: "var(--sacred)",
          light: "var(--sacred-light)",
          glow: "var(--sacred-glow)",
          dark: "#009955",
        },
        mystic: {
          DEFAULT: "var(--mystic)",
          light: "var(--mystic-light)",
          deep: "var(--mystic-deep)",
        },
        cosmic: {
          DEFAULT: "var(--cosmic)",
          bright: "var(--cosmic-bright)",
          deep: "var(--cosmic-deep)",
          dark: "#2a4a6f",
        },
        clarity: {
          DEFAULT: "var(--clarity)",
          silver: "var(--clarity-silver)",
          gray: "var(--clarity-gray)",
        },
        space: {
          black: "var(--space-black)",
          navy: "var(--space-navy)",
          blue: "var(--space-blue)",
        },
        alert: {
          DEFAULT: "var(--alert)",
          deep: "var(--alert-deep)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          glow: "var(--gold-glow)",
        },
        hub: {
          disclosure: "var(--hub-disclosure)",
          "disclosure-glow": "var(--hub-disclosure-glow)",
          ancient: "var(--hub-ancient)",
          "ancient-glow": "var(--hub-ancient-glow)",
          cosmic: "var(--hub-cosmic)",
          "cosmic-glow": "var(--hub-cosmic-glow)",
          life: "var(--hub-life)",
          "life-glow": "var(--hub-life-glow)",
          signal: "var(--hub-signal)",
          "signal-glow": "var(--hub-signal-glow)",
          warning: "var(--hub-warning)",
          "warning-glow": "var(--hub-warning-glow)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0a0e1a, #000000)',
        'purple-green': 'linear-gradient(135deg, rgba(157, 77, 237, 0.2), rgba(0, 255, 136, 0.2))',
        'purple-blue': 'linear-gradient(135deg, #9d4edd, #4a7ba7)',
        'green-cyan': 'linear-gradient(135deg, #00cc66, #00d9ff)',
        'full-spectrum': 'linear-gradient(90deg, #ff3366, #9d4edd, #4a7ba7, #00cc66, #ffd700)',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
        'neon-purple': '0 0 20px rgba(157, 77, 237, 0.5), 0 0 40px rgba(157, 77, 237, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
        'cosmic-glow': '0 0 30px rgba(157, 77, 237, 0.4), 0 0 60px rgba(0, 255, 136, 0.2)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
