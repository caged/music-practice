// Example Configuration File
module.exports = {
  plugins: [
    /* ... */
  ],
  installOptions: {
    // polyfillNode: true,
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    baseUrl: '/music-practice'
    /* ... */
  },
  mount: {
    public: { url: '/' },
  },
  alias: {
    /* ... */
  },
  experiments: {
    // optimize: {
    //   bundle: true,
    //   minify: true,
    //   target: 'es2018',
    // },
    // routes: [
    //   // { src: '/music-practice/*', dest: "/1/index.html" }
    // ]
  },
}
