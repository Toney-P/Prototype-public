module.exports = {
    // publicPath: './',//基础路径
    // outputDir: 'dist',//生产环境构建文件的目录
    // assetsDir: 'static',//放置生成的静态资源 (js、css、img、fonts)
    // // lintOnSave: process.env.NODE_ENV === 'development', //服务器架设在根路径
    // productionSourceMap: false,//用来报错时定位到代码位置,在生产环境下
    devServer: {
        // port: "8080",//端口号
        // open: false,//服务器运行成功后是否打开网页
        // overlay: { //报错全屏展示
        //   warnings: false,
        //   errors: true
        // },
        proxy: {
        "/api": {
            target: "http://172.20.10.7:3000",
            changeOrigin: true,
            ws: true,
            secure: false,
            changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
        }
   };