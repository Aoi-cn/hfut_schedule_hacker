import React from 'react'
import { AtButton } from 'taro-ui'

// import './index.scss'

function CustomButton(props) {

  const { value, isFixed, type='default', disabled, loading, onSubmit, openType } = props;
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

export default CustomButton
