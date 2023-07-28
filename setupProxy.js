const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(main) {
  main.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );
};