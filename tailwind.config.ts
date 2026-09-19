import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          mist: {
            light: "#99C1DE",
            DEFAULT: "#779ECB",
            dark: "#5A8EB3",
          },
        },
        seafoam: {
          light: "#D4F1E8",
          DEFAULT: "#B6E3D4",
          dark: "#8FD4B9",
        },
        mist: {
          gray: "#F1F5F9",
          white: "#FFFFFF",
        },
      },
      backgroundImage: {
        'watercolor-gradient': 'linear-gradient(135deg, #779ECB 0%, #99C1DE 50%, #B6E3D4 100%)',
        'watercolor-wash': 'radial-gradient(ellipse at center, rgba(119, 158, 203, 0.1) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(119, 158, 203, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(119, 158, 203, 0.6)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;