# VueJS - Starter

This boilerplate is made to work with VueJS (www.vuejs.org)
> If you want to have an example of webpack with vue and ssr, check my demo : https://github.com/Mathieu-R/vue-ssr-demo

## Javascript :

All the **javascript** files are transpiled with babel and use sourcemaps (in developpment) for a better and easier debugging _(what you see in the devtools is the original file and not the transpiled one)_

In case you want more informations about **devtools** : https://webpack.js.org/configuration/devtool/

Feel free to use your owns in the _config.js_ file.

## Styles :

You can work with **.scss** files.  
_dev_ : css is automatically inlined in the **index.html**.   
_prod_ : css is extracted in its own **.css** file.

### Config :

```
module.exports = {
    port: {
        front: 8080 // port for devServer
    },
    entry: {
        front: [path.resolve(__dirname, 'src/index.js')], // entrypoint for front js file
        back: false // entrypoint for server js file
    },
    vendor: ['vue'], // you can add vue-router, vuex if you use it
    devtool: production ? false : 'eval-cheap-module-source-map',
    componentsPath: path.resolve(__dirname, 'src/components'), // path for components (aliases)
    staticPath: path.resolve(__dirname, 'src'), // path for static files (aliases)
    template: './src/index.html' // path of template
}
```

### Plugins :

`ExtractTextPlugin` : Extract the css in its own file.    
`CommonsChunkPlugin` : Avoid duplication of common shared modules.

`DefinePlugin` : Allows to define global constants.    
`OccurenceOrderPlugin` : "Assign the module and chunk ids by occurrence count. Reduce total file size." (1)    
`MinifyPlugin` : (ex-Babili), minify the js.

`HotModuleReplacementPlugin` : Update on the fly the modules that have changed and live reload it (if you authorize with `module.hot.accept()`).    
`NoEmitOnErrorPlugin` : Webpack does not compile assets with errors.     
`NamedModulePlugin` : Name the modules whith their own names in devtool instead of showing numbers.
`HtmlWebpackPlugin` : Generate an html files with js and css built-in.    
`ModuleConcatenationPlugin` : Enable scope hoisting.
`BundleAnalyzerPlugin` : Show a graph to analyse to weight of every module / bundle [Disabled by default].

### Editorconfig :

Editorconfig keeps a consistant configuration between your text editor.

### Usage :

##### Installation :

```
npm install
```    

##### Start :

```
npm run watch
```

##### Build :      
Generate the `assets` _(css, js,...)_ in **dist** folder.

```
npm run build
```

### Caveat : 
- By default, only js files in `src` are transpiled as recommended by https://webpack.js.org/guides/build-performance/

> (1) https://github.com/webpack/docs/wiki/list-of-plugins
