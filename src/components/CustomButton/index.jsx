import React, { Component } from 'react'
import { AtButton } from 'taro-ui'

import './index.less'

export default class CustomButton extends Component {

  render() {
    const { value, isFixed, type, disabled, loading, onSubmit, openType} = this.props;
    const className = `${isFixed ? `fixed-circle-button fixed-circle-button_${type}`
      : `relative-circle-button relative-circle-button_${type}`}`

    return (
      <AtButton
        className={className}
        disabled={disabled}
        loading={loading}
        openType={openType}
        onClick={onSubmit}
        onGetUserInfo={onSubmit}
      >
        {value}
      </AtButton>
    )
  }
}

CustomButton.defaultProps = {
  value: '提交',
  isFixed: false,
  type: 'default',
  disabled: false,
  loading: false,
}
