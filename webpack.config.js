
var webpack = require('webpack');   // to get webpack utilities

var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';     // on HEROKU NODE_ENV will be set to 'production'

module.exports= {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery:'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$':'jquery',
            'jQuery':'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor:{
                warnings : false
            }
        })
    ],
    output: {
        path:__dirname,
        filename:'./public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories:[
            'node_modules',
            './app/components',
            './app/api'
        ],
        alias:{
            app: 'app',                                // better option. Now we dont need to add specific code for each module in app folder and we can access them with this.
            applicationStyles:'app/styles/app.scss',
            actions: 'app/actions/actions.jsx',
            reducers: 'app/reducers/reducers.jsx',
            configureStore: 'app/store/configureStore.jsx'
        },
        extensions:['','.js','.jsx'],
    },
    module:{
        loaders:[
            {
                loader:'babel-loader',
                query:{
                    presets:['react','es2015','stage-0']
                },
                test:/\.jsx?$/,
                exclude:/(node_modules|bower_components)/
            }
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-source-map'  // run "NODE_ENV=production webpack" on Gitbash and we can see that ./public/bundle.js.map  is not generated
}