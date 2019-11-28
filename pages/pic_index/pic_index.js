//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
Page({
    data: {
        isVisible: false,
        index: 1,
        psw: ''
    },
    goCreat() {
        wx.navigateTo({
            url: '/pages/pic_index/create/index'
        })
    },
    showDialog(e) {
        this.setData({
            index: e.currentTarget.dataset.index,
            isVisible: true
        })
    },
    closeDialog() {
        this.setData({
            isVisible: false
        })
    },
    changePsw(e) {
        this.setData({
            psw: e.detail.value
        })
    },
    submit() {
        if (this.data.psw.length > 0) {
            this.checkPsw()
        }
    },
    checkPsw() {
        if (this.data.psw.length > 0) {
            utils.showLoading()
            utils.http({
                url: `Values/CheckCode/${this.data.psw}`
            }).then((res) => {
                utils.hideLoading()
                if (res.data.isSuccess && !res.data.msg) {
                    if (this.data.index === '1') {
                        this.goSearch()
                    } else {
                        this.goPush()
                    }
                    this.setData({
                        psw: '',
                        isVisible: false
                    })
                } else {
                    utils.showToast('密码错误')
                }
            }).catch((err) => {
                utils.hideLoading()
                console.log('接口请求失败')
            })
        }
    },
    goSearch() {
        wx.navigateTo({
            url: '/pages/pic_index/search_psi/index'
        })
    },
    goPush() {
        wx.navigateTo({
            url: '/pages/pic_index/push_img/index'
        })
    }
})