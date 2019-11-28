const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * @description: 列项选择
 */
export const showActionSheet = (itemList = []) => {
    return new Promise((resolve, reject) => {
        wx.showActionSheet({
            itemList: itemList,
            success: (res) => {
                resolve(res)
            },
            error: (err) => {
                console.log('选择出错', err)
                reject(err)
            }
        })
    })
}

/**
 * @description: 选择图片
 */
export const chooseImage = (count, sizeType = [], sourceType = []) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: count,
            sizeType: sizeType,
            sourceType: sourceType,
            success: (res) => {
                resolve(res)
            },
            error: (err) => {
                console.log('选择图片出错', err)
                reject(err)
            }
        })
    })
}

/**
 * @description: 图片编码
 */
export const getFileSystemManager = (filePath) => {
    return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
            filePath: filePath, //  选择图片返回的相对路径
            encoding: 'base64', //  编码格式
            success: (res) => { //  成功的回调
                resolve(res)
            },
            error: (err) => {
                reject(err)
            }
        })
    })
}

/**
 * @description: 图片编码
 */
var baseUrl = 'http://devff.thpot.com/api/'
export const http = (config) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + config.url,
            data: config.data || {},
            method: config.type || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                resolve(res)
            },
            fail: function() {
                reject()
            },
            complete: function() {
                // complete
            }
        })
    })
}


/**
 * @description: 显示toast弹窗
 * @param {String} content loading显示文字
 */
export const showToast = (content, time = 1500) => {
    if (isShowLoading) hideLoading()
    wx.showToast({
        title: content,
        icon: 'none',
        mask: true,
        duration: time
    })
}

/**
 * @description: 显示loading弹窗
 * @param {String} title loading显示文字
 */
var isShowLoading = false
export const showLoading = (title = '加载中...') => {
    if (isShowLoading) return
    isShowLoading = true
    wx.showLoading({
        title: title,
        mask: true
    })
}

/**
 * @description: 隐藏loading弹窗
 */
export const hideLoading = () => {
    isShowLoading = false
    wx.hideLoading()
}

module.exports = {
    formatTime: formatTime,
    showActionSheet: showActionSheet,
    chooseImage: chooseImage,
    getFileSystemManager: getFileSystemManager,
    http: http,
    showToast: showToast,
    showLoading: showLoading,
    hideLoading: hideLoading
}