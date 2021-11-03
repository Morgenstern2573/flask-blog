module.exports = {
  mode: "jit",
  purge: ["./blogserver/**/*.{html,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        fit: "fit-content",
        infinite: "calc(99*100vh)",
      },
      width: {
        fit: "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: false,
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
