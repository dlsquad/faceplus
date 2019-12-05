const app = getApp()
const utils = require('../../../utils/util.js')
Page({
  data: {
    code: '1111',
    listData: []
  },
  onLoad: function (options) {
    this.getPositionTable(options)
  },

  getPositionTable(options){
      let that = this;
      utils.showLoading()
      utils.http({
        url: `/table/${options.code}`
        // type: 'POST',
        // data: {
        //   code: this.data.code
        // }
      }).then((res) => {
        console.log('getPositionTable res', res)
        utils.hideLoading()
        if (res.data.isSuccess) {
          that.setData({
            listData: res.data.data
            // listData: [
            //   ['', '', '名字1', '', '', '名字1', '', '', '名字1'],
            //   ['/', '名字2', '/', '/', '名字2', '/', '/', '名字2', '/'],
            //   ['名字3', '/', '/', '/', '名字2', '/', '/', '名字2', '/'],
            // ]
          })
          console.log('this.data.listData', this.data.listData)
        } else {
          utils.showToast(res.data.msg)
        }
      }).catch((err) => {
        utils.hideLoading()
        console.log('接口请求失败')
      })
  }
})