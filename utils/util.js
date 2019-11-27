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

module.exports = {
    formatTime: formatTime,
    showActionSheet: showActionSheet,
    chooseImage: chooseImage,
    getFileSystemManager: getFileSystemManager
}