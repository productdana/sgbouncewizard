//  you can use this file to add your custom webpack plugins, loaders and anything you like.
//  This is just the basic way to add additional webpack configurations.
//  For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config
//
//  IMPORTANT
//  When you add this file, we won't add the default configurations which is similar
//  to "React Create App". This only has babel loader to load JavaScript.

module.exports = ({ config, mode }, env) => {
  config.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module.scss$/,
      use: [
        // Style-loader fallback adds CSS to DOM by injecting a <style> tag in dev mode
        "style-loader",
        // Interprets imports/requires and resolves them for .css files
        "css-loader",
        // First converts .scss/.sass files into .css files
        "sass-loader"
      ]
    },
    {
      test: /\.module.scss$/,
      use: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: true,
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        },
        {
          loader: require.resolve("sass-loader"),
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        }
      ]
    }
  );

  config.resolve.extensions.push(".js", ".jsx", ".css");

  return config;
};
