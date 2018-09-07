const path = require('path')
const fs = require('fs')

const headRef = fs
  .readFileSync(path.join(__dirname, '.git/HEAD'))
  .toString()
  .trim()
  .match(/^ref: (.+)$/)[1]

const headSha = fs
  .readFileSync(path.join(__dirname, '.git/' + headRef))
  .toString()
  .trim()

const ciBadge =
  '[![CircleCI](https://circleci.com/gh/chrisvfritz/vue-enterprise-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/chrisvfritz/vue-enterprise-boilerplate/tree/master)'
const divergeDate = new Date().toString().slice(4, 15)
const compareUrl = `https://github.com/chrisvfritz/vue-enterprise-boilerplate/compare/${headSha}...master`
const startNote = `**You diverged from the boilerplate on ${divergeDate}. See [what's been added](${compareUrl}) since then.**`

const newReadmeContent = fs
  .readFileSync(path.join(__dirname, 'README.md'))
  .toString()
  .replace(ciBadge, startNote)

fs.writeFileSync(path.join(__dirname, 'README.md'), newReadmeContent)

require('./aliases.config')
