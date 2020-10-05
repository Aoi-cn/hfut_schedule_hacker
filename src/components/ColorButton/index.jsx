import React from 'react'
import { AtButton } from 'taro-ui'

import './index.scss'

function CustomButton(props) {

  const { value, disabled, loading, onSubmit, openType, theme, backgroundColor } = props;
  const className = `custom-color-button courseBox-boxColor-${backgroundColor}_${theme} courseBox-fontColor-${backgroundColor}_${theme}`

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

export default CustomButton
