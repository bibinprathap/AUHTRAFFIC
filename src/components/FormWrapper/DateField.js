import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types';
const DateTimePicker = (props) => {
  return (
    <Controller
      control={props.control}
      name="date-input"
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <DatePicker
          onChange={onChange}
          onBlur={onBlur}
          selected={value}
        />
      )}
    />
  )
}
DateTimePicker.propTypes = {
    control: PropTypes.any
}
export default DateTimePicker
