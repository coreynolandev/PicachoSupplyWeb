module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      fallback: { "querystring": require.resolve("querystring-es3") }
   },
    output: {
      filename: '[name].[contenthash].bundle.js',
    }
  }