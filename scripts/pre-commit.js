
/* eslint-disable no-console */
const nodegit = require('nodegit')
const chalk = require('chalk')
const path = require('path')
const { exec } = require('child_process')

nodegit.Repository.open(path.resolve(__dirname, '../.git'))
  .then((repo) => {
    repo.getStatus().then((statuses) => {
      function statusToText(status) {
        const words = []
        if (status.isNew()) { words.push('NEW') }
        if (status.isModified()) { words.push('MODIFIED') }
        if (status.isTypechange()) { words.push('TYPECHANGE') }
        if (status.isRenamed()) { words.push('RENAMED') }
        if (status.isIgnored()) { words.push('IGNORED') }
        if (status.isDeleted()) { words.push('DELETED') }
        return words.join(' ')
      }

      const fileList = statuses
        .filter((file) => !file.isDeleted() && /^src/.test(file.path())) // 排除被删除文件和非src下的文件
        .map((file) => file.path()) // 获取文件目录
      if (fileList.length) { // 目标文件夹下有文件更改
        console.log('---------------src下所有暂存区文件---------------')
        statuses.forEach(file => {
          if (/^src/.test(file.path())) {
            console.log(`${chalk.yellow('[')}${chalk.green(statusToText(file))}${chalk.yellow(']')}: ${chalk.yellow(file.path())}`)
          }
        })
        console.log('-------------------------------------------------')
        exec(`./node_modules/.bin/eslint ${fileList.join(' ')} --color --ext .js`, (err, stdout) => {
          if (err && stdout) { // 报错
            console.log(stdout)
            process.exit(1)
          } else if (!err && stdout) { // 警告
            console.log(stdout)
            process.exit(0)
          } else { // 无报错警告
            process.exit(0)
          }
        })
      } else { // 目标文件夹下没有文件更改
        process.exit(0)
      }
    })
})
