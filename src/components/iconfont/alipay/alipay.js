Component({
  props: {
    // aixin-filled | aixin | icon-test | icon_selected_fill | tongzhi-shixiang | tongzhi-kebiao | tongzhi-chengji | tongzhi-xitong | 2 | 3 | 1 | jishu | sheji | shipin | yunying | bangongshi | tuiguang | chankai | chanpin | wode_bangzhu | arrow-lift | seleted | wode_shezhi | wode_guanyu | wode_xiaoxi | cloud | cooperate | task | bug1 | addteam | solution | file-text | taolunqu | weixin | like | unlike | info-circle-fill | arrow-right | mine-fill | home | mine | score | schedule | score-fill | home-fill | schedule-fill | login | eye-close | share | sync | eye | calculator | download | swap | plus
    name: null,
    // string | string[]
    color: '',
    size: 18,
  },
  data: {
    quot: '"',
    svgSize: 18,
    isStr: true,
  },
  didMount() {
    const size = this.props.size;
    const color = this.props.color;

    this.setData({
      isStr: typeof color === 'string',
    });

    if (size !== this.data.svgSize) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
  disUpdate(prevProps) {
    const size = this.props.size;
    const color = this.props.color;

    if (color !== prevProps.color) {
      this.setData({
        isStr: typeof color === 'string',
      });
    }

    if (size !== prevProps.size) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
});
