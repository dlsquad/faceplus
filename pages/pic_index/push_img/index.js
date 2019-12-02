//index.js
//获取应用实例
const app = getApp()
const utils = require('../../../utils/util.js')
Page({
    data: {
        imgSrc: '../../../assets/image/bg.png',
        imgData: null,
        showImg: '../../../assets/image/default.png',
        beforeImg: null,
        afterImg: null,
        name: '',
        code: ''
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
                url: '/user/generate',
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
                        afterImg: res.data.data.url
                    })
                } else {
                    utils.showToast(res.data.msg)
                }
            }).catch((err) => {
                utils.hideLoading()
                console.log('接口请求失败')
            })
        }
    },
  onLoad(options) {
        utils.http({
          url: `/picture/${options.code}`
        }).then((res) => {
            this.setData({
                code: options.code,
                beforeImg: res.data.data.url
            })
            console.log(this.data.beforeImg)
        }).catch((err) => {
            console.log('接口请求失败')
        })
    }
})