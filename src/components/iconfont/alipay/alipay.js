Component({
  props: {
    // dayu | san | dizhi | lishi | dianzan | help | task-filling | map-filling | rili | sousuo | taolunqu | tishi | daibanshixiang | gongpai | jixiaopinggu | network | dingwei | moreandroid | anquan | bulletin | arrow-up-filling | arrow-down-filling | shibai | ceshi | tanhao | file-text | paihangbang | shezhi | swap | caidan | mingxinghuodong | wenjuan | aixin | aixin-filled | eye | info-circle-fill | plus | eye-close | search | arrow-right | arrow-lift | arrow-down | personal | calendar | gift
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
