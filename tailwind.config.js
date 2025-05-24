/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff9db5',
        'secondary': '#2c3e50',
        'bg-dark': '#121212', // 统一的深色背景
        'bg-card': '#1e1e1e', // 卡片背景色
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}

