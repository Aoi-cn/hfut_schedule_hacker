import Taro from '@tarojs/taro'

export const config = {
  baseUrl: 'https://api.cavano.vip'
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
    icon: 'fail',
    duration: 3000
  })
})

export const GET = (url, data = '') => baseOptions({
  url,
  data: {
    ...data,
    target: 'webvpn',
  },
  method: 'GET'
})

export const POST = (url, data = '') => baseOptions({
  url,
  data,
  method: 'POST'
})

