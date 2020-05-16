// node commonjs
module.exports = {
  devServer: {
     host: 'localhost',
     port: 3000,
     proxy: {
       '/api':{
         target: 'http://localhost:8000',
         changeOrigin: true,
         pathRewrite: {
             '^/api': ''
         }
       }
     }
  },
  // publicPath:'/app',
  // outputDir: 'dist',
};
