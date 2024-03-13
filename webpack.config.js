module.exports = {
    // Other webpack configuration...
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
      ],
    },
  };