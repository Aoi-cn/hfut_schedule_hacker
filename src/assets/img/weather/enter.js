import clear_day from './weather_clear_day.png'
import clear_night from './weather_clear_night.png'
import cloudy from './weather_cloudy.png'
import fog from './weather_fog.png'
import haze from './weather_haze.png'
import partly_cloudy_day from './weather_partly_cloudy_day.png'
import partly_cloudy_night from './weather_partly_cloudy_night.png'
import rain from './weather_rain.png'
import snow from './weather_snow.png'
import thunderstorm from './weather_thunderstorm.png'

export default {
  CLEAR_DAY: {
    code: 'clear_day',
    desc: '晴天',
    img: clear_day,
  },
  CLEAR_NIGHT: {
    code: 'clear_night',
    desc: '晴天',
    img: clear_night,
  },
  PARTLY_CLOUDY_DAY: {
    code: 'partly_cloudy_day',
    desc: '多云',
    img: partly_cloudy_day,
  },
  PARTLY_CLOUDY_NIGHT: {
    code: 'partly_cloudy_night',
    desc: '多云',
    img: partly_cloudy_night,
  },
  CLOUDY: {
    code: 'cloudy',
    desc: '阴天',
    img: cloudy,
  },

  LIGHT_RAIN: {
    code: 'rain',
    desc: '小雨',
    img: rain,
  },
  MODERATE_RAIN: {
    code: 'rain',
    desc: '中雨',
    img: rain,
  },
  HEAVY_RAIN: {
    code: 'rain',
    desc: '大雨',
    img: rain,
  },
  STORM_RAIN: {
    code: 'thunderstorm',
    desc: '暴雨',
    img: thunderstorm,
  },

  FOG: {
    code: 'fog',
    desc: '雾',
    img: fog,
  },

  LIGHT_SNOW: {
    code: 'snow',
    desc: '小雪',
    img: snow,
  },
  MODERATE_SNOW: {
    code: 'snow',
    desc: '中雪',
    img: snow,
  },
  HEAVY_SNOW: {
    code: 'snow',
    desc: '大雪',
    img: snow,
  },
  STORM_SNOW: {
    code: 'snow',
    desc: '暴雪',
    img: snow,
  },

  // 特殊天气
  DUST: {
    code: 'fog',
    desc: '浮尘',
    img: fog,
  },
  SAND: {
    code: 'fog',
    desc: '沙尘',
    img: fog,
  },
  WIND: {
    code: 'cloudy',
    desc: '大风',
    img: cloudy,
  },
  LIGHT_HAZE: {
    code: 'haze',
    desc: '轻度雾霾',
    img: haze,
  },
  MODERATE_HAZE: {
    code: 'haze',
    desc: '中度雾霾',
    img: haze,
  },
  HEAVY_HAZE: {
    code: 'haze',
    desc: '重度雾霾',
    img: haze,
  },
}
