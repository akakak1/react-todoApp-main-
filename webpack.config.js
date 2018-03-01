
var webpack = require('webpack');   // to get webpack utilities
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';     // on HEROKU NODE_ENV will be set to 'production'


// NOTE: we are using try-catch so that if we try to include the file which is not present it will throw an error
// also note that its going to happen on the heroku as there is no production file (also not that we are going to exclude the config folder from the production)
try{
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));    // note: our file name is same as the environment name
} catch (e) {

}  
// With the above code we will load all the variables in process.env 
// till now only half work is done as these variables are only in the webpack and we want them in the bundle file.


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
        }),
        new webpack.DefinePlugin({                          // this plugin will help define variables in the bundle file.
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
                PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
                MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
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