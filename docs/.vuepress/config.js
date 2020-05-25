const sidebar = require('./sidebar')
console.log(sidebar.targetFilePath)
module.exports = {
  title: 'FrontNode',
  description: '吾日三省吾身',
  themeConfig: {
    sidebarDepth: 2,
    // sidebar: 'auto',
    sidebar: sidebar.targetFilePath
    // sidebar: [
    //   {
    //     title: '开始',
    //     children: ['index/']
    //   },
    //   {
    //     title: '格式化函数',
    //     children: [
    //       '格式化函数/time'
    //     ]
    //   },
    //   {
    //     title: '每日积累',
    //     children: [
    //       '每日积累/js',
    //       '每日积累/css',
    //       '每日积累/html'
    //     ]
    //   }
    // ]
  }
}