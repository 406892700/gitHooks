const chalk = require('chalk')
const standardSample = [
  ['feat', '新增功能'],
  ['fix', '修复bug'],
  ['docs', '文档'],
  ['style', '对代码的格式化改动,代码逻辑并未产生任何变化'],
  ['test', '新增或修改测试用例'],
  ['refactor', '重构代码或其他优化举措'],
  ['chore', '项目工程方面的改动,代码逻辑并未产生任何变化'],
] 

module.exports = {
  consoleFormat: () => {
    console.log('')
    console.log(chalk.red('标准格式:'))
    standardSample.forEach(([type, description]) => {
      console.log(`  - ${chalk.yellow(type)} ${chalk.green(description)}`)
    })
    console.log('')
    console.log(chalk.red('示例:'))
    console.log(chalk.yellow('  $ git commit -m \'feat 新增消息模块\''))
  },
  conosleError: (str) => {
    console.log(`${chalk.red('\n[ERROR]: \n')}  - ${chalk.red(str)}`)
  },
  consoleWarn: (str) => {
    console.log(`${chalk.yellow('\n[WARN]: \n')}  - ${chalk.yellow(str)}`)
  }
}
