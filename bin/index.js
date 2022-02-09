#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process')

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'start'
);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

if (['build', 'start'].includes(script)) {
  console.log(process.execPath)
  const result = spawnSync(process.execPath, [require.resolve(`../scripts/${script}`)], {
    stdio: 'inherit'
  })
  // console.log(result)
} else {
  console.log('Unknown script "' + script + '".');
}