const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } require('child_process')
const standardMsgPrefix = [
  'feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore'
]
// git文件目录
const gitPath = path.resolve(__dirname, '../.git/')
// 提交信息
const commitMsg = fs.readFileSync(path.join(gitPath, 'COMMIT_EDITMSG')).toString().trim()

const length = standardMsgPrefix.length

const reg = new RegExp('^('+standardMsgPrefix.join('|')+')\\s{1}')
console.log(commitMsg)
if (reg.test(commitMsg)) {
  process.exit(0)
} else {
  console.log('格式有误~')
  exec('doge');
  process.exit(1)
}
