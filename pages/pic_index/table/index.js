const app = getApp()
const utils = require('../../../utils/util.js')
Page({
  data: {
    code: '',
    listData: []
  },
  onLoad: function (options) {
    this.getPositionTable(options)
  },

  getPositionTable(options){
      utils.showLoading()
      utils.http({
        url: `/code/345686`
        // type: 'POST',
        // data: {
        //   code: this.data.code
        // }
      }).then((res) => {
        utils.hideLoading()
        if (res.data.isSuccess) {
          this.setData({
            listData: [
              { "code": "01", "text": "text1", "type": "type1" },
              { "code": "02", "text": "text2", "type": "type2" },
              { "code": "03", "text": "text3", "type": "type3" },
              { "code": "04", "text": "text4", "type": "type4" },
              { "code": "05", "text": "text5", "type": "type5" },
              { "code": "06", "text": "text6", "type": "type6" },
              { "code": "07", "text": "text7", "type": "type7" },
              { "code": "08", "text": "text4", "type": "type4" },
              { "code": "09", "text": "text5", "type": "type5" },
              { "code": "10", "text": "text6", "type": "type6" },
              { "code": "11", "text": "text7", "type": "type7" }
            ]
          })
        } else {
          utils.showToast(res.data.msg)
        }
      }).catch((err) => {
        utils.hideLoading()
        console.log('接口请求失败')
      })
  }
})