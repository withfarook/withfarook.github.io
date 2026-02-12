const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 150000, // 150 KiB limit to stay under warnings
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        // React core libraries
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 40,
          maxSize: 150000,
        },
        // GSAP core only
        gsapCore: {
          test: /[\\/]node_modules[\\/]gsap[\\/](?!.*\.js$)/,
          name: 'gsap-core',
          chunks: 'all',
          priority: 35,
          maxSize: 100000,
        },
        // GSAP plugins as separate chunks
        gsapPlugins: {
          test: /[\\/]node_modules[\\/]gsap[\\/].*\.js$/,
          name: 'gsap-plugins',
          chunks: 'async',
          priority: 30,
          maxSize: 50000,
        },
        // TypeScript and other dev dependencies
        typescript: {
          test: /[\\/]node_modules[\\/](typescript|@types)[\\/]/,
          name: 'typescript',
          chunks: 'all',
          priority: 25,
          maxSize: 100000,
        },
        // Other vendor libraries - split into smaller chunks
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          maxSize: 150000,
          minChunks: 1,
        },
        // Common chunks
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          maxSize: 100000,
        },
      },
    },
    // Enable tree shaking
    usedExports: true,
    sideEffects: false,
    // Enable module concatenation
    concatenateModules: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ...(process.env.ANALYZE === 'true' ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: true,
      })
    ] : []),
  ],
  performance: {
    hints: isProduction ? 'warning' : false, // Disable warnings in development
    maxEntrypointSize: isProduction ? 500000 : 2000000, // 2MB limit in dev
    maxAssetSize: isProduction ? 200000 : 1000000, // 1MB limit in dev
    assetFilter: function(assetFilename) {
      // Don't count font files, source maps, and development files in asset size warnings
      return !assetFilename.endsWith('.otf') && 
             !assetFilename.endsWith('.woff') && 
             !assetFilename.endsWith('.woff2') &&
             !assetFilename.endsWith('.map') &&
             !assetFilename.includes('development') &&
             !assetFilename.includes('hot-update');
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3101,
    historyApiFallback: true,
  },
  };
}; 