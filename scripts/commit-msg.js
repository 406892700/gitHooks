const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const chalkAnimation = require('chalk-animation')
const { exec } = require('child_process')
const Spinner = require('cli-spinner').Spinner;
const { consoleFormat, conosleError, conosleWarn } = require('./consoleFormat')

const standardMsgPrefix = [
  'feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore'
]
// git文件目录
const gitPath = path.resolve(__dirname, '../.git/')
// 提交信息
const commitMsg = fs.readFileSync(path.join(gitPath, 'COMMIT_EDITMSG')).toString().trim()

const length = standardMsgPrefix.length

const reg = new RegExp('^('+standardMsgPrefix.join('|')+')\\s{1}')
var spinner = new Spinner('验证提交信息..');
spinner.setSpinnerString('|/-\\');
spinner.start();

if (reg.test(commitMsg)) {
  process.exit(0)
} else {
  process.stdout.clearLine()
  conosleError(`提交信息 \'${commitMsg}\' 不符合标准`)
  consoleFormat()
  process.exit(1)
}
