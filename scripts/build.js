'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { webpack } = require('webpack');
const configFactory = require('./../config/webpack.config')

console.log('child start', process.argv)

const config = configFactory('production')

function build() {
  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      console.log(stats)
      if (err) {
        // console.log(err, stats)
        return reject(new Error(err))
      }
      resolve({
        success: true
      })
    })
  })
}

build().then(res => {
  console.log(res)
  process.exit(1)
})