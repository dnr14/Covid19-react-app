const { createProxyMiddleware } = require('http-proxy-middleware');
//  재시작해야 반영이 된다.
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};