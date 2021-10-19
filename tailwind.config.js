module.exports = {
  // purge: ["./build/*.html", "./build/*.js"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // fontFamily: {
    //   inter: ["Inter", "sans-serif"],
    // },
    extend: {
      height: {
        fit: "fit-content",
      },
      width: {
        fit: "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
