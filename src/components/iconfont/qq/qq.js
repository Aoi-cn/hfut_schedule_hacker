Component({
  properties: {
    // icon-test | icon_selected_fill | tongzhi-shixiang | tongzhi-kebiao | tongzhi-chengji | tongzhi-xitong | 2 | 3 | 1 | jishu | sheji | shipin | yunying | bangongshi | tuiguang | chankai | chanpin | wode_bangzhu | arrow-lift | seleted | wode_shezhi | wode_guanyu | wode_xiaoxi | cloud | cooperate | task | bug1 | addteam | solution | file-text | taolunqu | weixin | like | unlike | info-circle-fill | arrow-right | mine-fill | home | mine | score | schedule | score-fill | home-fill | schedule-fill | login | eye-close | share | sync | eye | calculator | download | swap | plus
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * qq.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    svgSize: 18 / 750 * qq.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
});
