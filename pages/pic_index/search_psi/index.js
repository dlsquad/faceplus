//index.js
//获取应用实例
const app = getApp()
const utils = require('../../../utils/util.js')
Page({
    data: {
        imgSrc: '../../../assets/image/bg.png',
        imgData: null,
        showImg: '../../../assets/image/default.png',
        pis: null,
        name: '',
        code: ''
    },
    onLoad(options) {
        this.setData({
            code: options.code,
          })
      },
    showSheet() {
        const that = this
        utils.chooseImage(1, ['compressed'], ['album', 'camera']).then((res) => {
            const tempFilePaths = res.tempFilePaths
            utils.getFileSystemManager(tempFilePaths[0]).then((res) => {
                that.setData({
                    imgSrc: tempFilePaths[0],
                    imgData: res.data
                })
            })
        })
    },
    nameChange(e) {
        this.setData({
            name: e.detail.value
        })
    },
    uploadImg() {
        if (this.data.imgData && this.data.name.length > 0) {
            utils.showLoading()
            utils.http({
                url: '/user/find',
                type: 'POST',
                data: {
                    pic: `data:image/png;base64,${this.data.imgData}`,
                    name: this.data.name,
                    code: this.data.code
                }
            }).then((res) => {
                utils.hideLoading()
                if (res.data.isSuccess) {
                    this.setData({
                        showImg: res.data.data.url,
                        pis: res.data.data.position
                    })
                } else {
                    utils.showToast(res.data.msg)
                }
            }).catch((err) => {
                utils.hideLoading()
                console.log('接口请求失败')
            })
        }
    }
})