'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3001;
const PROTOCOL = 'http';

const semver = require('semver')
const chalk = require('chalk')
const { webpack } = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')
const createDevServerConfig = require('../config/webpack.devConfig')
const { prepareUrls } = require('../utils/webpackDevServerUtils')
const react = require(require.resolve('react', { paths: [paths.appPath] }))
const isInteractive = process.stdout.isTTY;


console.log('child start', process.argv)

const config = configFactory('development')

const proxySetting = require(paths.appPackageJson).proxy;

const urls = prepareUrls(
  PROTOCOL,
  HOST,
  PORT
);

const compiler = webpack(config)

const serverConfig = {
  ...createDevServerConfig(proxySetting, urls.lanUrlForConfig),
  host: HOST,
  port: PORT,
};

const devServer = new WebpackDevServer(serverConfig, compiler);

devServer.startCallback(() => {
  if (isInteractive) {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    );
  }
  if (semver.lt(react.version, '16.10.0')) {
    console.log(
      chalk.yellow(
        `Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`
      )
    );
  }

  console.log(chalk.cyan('Starting the development server...\n'));
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});



// console.log(config)
