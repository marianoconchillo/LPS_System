/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        veryLightBlue: "#365883",
        lightBlue: "#294973",
        blue: "#1b3b62",
        darkBlue: "#0e2c52",
        veryDarkBlue: "#001d41",
      },
      backgroundImage: {
        "gestiones": "url('src/assets/gestiones.jpg')",
      },
    },
  },
  plugins: [],
};
