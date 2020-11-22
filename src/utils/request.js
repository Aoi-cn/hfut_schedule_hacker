import Taro from '@tarojs/taro'
import { relogin } from '../actions/login'

export const config = {
  baseUrl: 'https://api.cavano.vip',
  // baseUrl: 'http://127.0.0.1:3002',
}

const baseOptions = ({ url, data, method }) => Taro.request({
  url: config.baseUrl + url,
  data: data,
  method: method,
  header: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
    Taro.hideLoading()
    Taro.showToast({
      title: '网络连接出错！',
      icon: 'none',
      duration: 1000
    })
    return null
  })

export const GET = (url, data = '') => baseOptions({
  url,
  data: {
    target: 'web',
    ...data,
  },
  method: 'GET'
})

export const POST = (url, data = '') => baseOptions({
  url,
  data,
  method: 'POST'
})


// 存在key过期风险的，可能需要relogin的请求
// 这是一个redux-thunk的action
export const requestWithTry = ({ requestFunc, callback, userType }) => async (dispatch) => {
  let reloginTime = 0
  const res = await requestFunc()
  try {
    if (!res.success) {
      // key过期
      reloginTime++
      dispatch(relogin({
        userType,
        reloginTime,
        callback,
      }))
    } else {
      reloginTime = 0
      return res
    }

  } catch (e) {
    console.log(e)
    Taro.hideLoading()
    Taro.showToast({
      title: '连接出错',
      icon: 'none',
      duration: 2000
    })

  }






}

