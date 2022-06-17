import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CFormLabel,
  CFormControl,
  CFormText,
  CInputGroup,
} from '@coreui/react'
import { Controller, useFormContext } from 'react-hook-form'

export default function RenderMultiInput({
  label,
  name,
  id,
  helpText,
  defaultValue = []
}) {
  const [fieldValue, setFieldValue] = useState('')

  const { control: formControl } = useFormContext()

  return (
    <>
      <Controller
        control={formControl}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, name } }) => {
          return (
            <CInputGroup className="multiInputWrapper">
              <CFormLabel htmlFor={id}>{label}</CFormLabel>
              <div className="d-flex flex-col">
                <CFormControl
                  placeholder={label}
                  type={'text'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const updatedValue = value?[...value,fieldValue]:[fieldValue]
                      onChange(updatedValue)
                      setFieldValue('')
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  onChange={(e) => setFieldValue(e.target.value)}
                  value={fieldValue}
                  id={`multiInput-${id}`}
                  aria-describedby={`${name}-help`}
                />
              </div>
              {helpText && <CFormText id={`${name}-help`}>{helpText}</CFormText>}
              {value.map((dataString, index) => (
                <div className="mulltiListWrapper" key={dataString}>
                  <span>{dataString}</span>
                  <span onClick={() =>{
                       const updatedValue = value.filter(({},idx)=> idx!==index);
                       onChange(updatedValue);
                       }} className="cross">
                    x
                  </span>
                </div>
              ))}
            </CInputGroup>
          )
        }}
      />
    </>
  )
}

RenderMultiInput.propTypes = {
  label: PropTypes.string,
  variableName: PropTypes.string,
  customHandlerKey: PropTypes.func,
  options: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  helpText: PropTypes.string,
  defaultValue: PropTypes.array
}
