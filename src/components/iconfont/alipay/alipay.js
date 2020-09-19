Component({
  props: {
    // caidan | mingxinghuodong | wenjuan | login | aixin | aixin-filled | sync | eye | file-text | swap | info-circle-fill | plus | eye-close | search | arrow-right | arrow-lift | arrow-down | personal | calendar | gift
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
