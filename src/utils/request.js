import Taro from '@tarojs/taro'

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
    ...data,
    target: 'web',
  },
  method: 'GET'
})

export const POST = (url, data = '') => baseOptions({
  url,
  data,
  method: 'POST'
})

