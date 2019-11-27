//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        isVisible: true
    },
    goCreat() {
        wx.navigateTo({
            url: '/pages/pic_index/create/index'
        })
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