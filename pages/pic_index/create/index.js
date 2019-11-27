//index.js
//获取应用实例
const app = getApp()
const utils = require('../../../utils/util.js')
Page({
    data: {
        imgSrc: '../../../assets/image/bg.png',
        imgData: null
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
                that.postImg(res.data)
            })
        })
    },
    postImg(data) {
        if (this.imgData) {
            // `data:image/png;base64,${data}`

        }
    }
})