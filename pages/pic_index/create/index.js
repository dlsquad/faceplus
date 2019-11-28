//index.js
//获取应用实例
const app = getApp()
const utils = require('../../../utils/util.js')
Page({
    data: {
        imgSrc: '../../../assets/image/bg.png',
        imgData: null,
        psw: null
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
    uploadImg() {
        if (this.data.imgData) {
            utils.showLoading()
            utils.http({
                url: 'Values/UpLoad',
                type: 'POST',
                data: {
                    pic: `data:image/png;base64,${this.data.imgData}`
                }
            }).then((res) => {
                utils.hideLoading()
                if (res.data.isSuccess) {
                    this.setData({
                        psw: res.data.data.code
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