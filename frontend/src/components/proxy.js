// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api prefix when forwarding to the target
            },
        })
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api prefix when forwarding to the target
            },
        })
    );
};