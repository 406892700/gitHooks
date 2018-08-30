const fs = require('fs')
const path = require('path')
const standardMsgPrefix = [
  'feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore'
]
// git文件目录
const gitPath = path.resolve(__dirname, '../.git/')
// 提交信息
const commitMsg = fs.readFileSync(path.join(gitPath, 'COMMIT_EDITMSG')).toString().trim()

const length = standardMsgPrefix.length
for (let i = 0; i < length; i++) {
  const reg = new RegExp('^'+standardMsgPrefix[i]+'[\s]{1}')
  if (reg.test(commitMsg)) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}
