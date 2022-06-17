import React from 'react'
import PropTypes from 'prop-types'
import MapComponents from 'src/views/components/mapComponents'
import {
  CFormLabel,
  CFormControl,
  CFormText,
  CFormCheck,
  CFormSelect,
  CRow,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import RenderMultiInput from './RenderMultiInput'
import DateTimePicker from './DateField'
import { Controller, useFormContext, DeepMap, FieldError } from 'react-hook-form'

export default function RenderFormFields(props) {
  const { fields, register, options, errors, control, defaultValue } = props

  const RenderField = (dataParam) => {
    const {
      type,
      label,
      placeholder,
      id,
      name,
      helpText,
      textAreaRow,
      options: itemOptions,
      dynamicOptionKey,
      customHandlerKey,
      customValueKey,
      labelKey,
      valueKey,
      onTrue,
      onFalse,
      validation = {},
      variableName,
    } = dataParam
    const { control: formControl } = useFormContext()
    console.log('validation >>>>', validation)

    const errorMessage = errors && errors[name] ? errors[name]['message'] : ''

    switch (type) {
      case 'email':
      case 'text':
      case 'password':
      case 'date':
      case 'number':
        return (
          <>
            <CFormLabel htmlFor={id}>{label}</CFormLabel>
            <CFormControl
              className={errorMessage ? 'error-input' : ''}
              {...register(name, { ...validation })}
              placeholder={placeholder}
              type={type}
              step={'any'}
              id={id}
              aria-describedby={`${name}-help`}
            />
            {helpText && (
              <CFormText className id={`${name}-help`}>
                {helpText}
              </CFormText>
            )}
            {errorMessage ? (
              <CFormText className={'error-text'} id={`${name}-error`}>
                {errorMessage}
              </CFormText>
            ) : null}
          </>
        )
      case 'round-number':
        return (
          <>
            <Controller
              control={formControl}
              name={name}
              defaultValue={defaultValue ? defaultValue[name] : ''}
              render={({ field: { onChange, value, name } }) => {
                return (
                  <>
                    <CFormLabel htmlFor={id}>{label}</CFormLabel>
                    <CFormControl
                      className={errorMessage ? 'error-input' : ''}
                      placeholder={placeholder}
                      type={'number'}
                      step={'any'}
                      id={id}
                      value={value}
                      onChange={(e) => {
                        onChange(Math.round(e.target.value).toString())
                      }}
                      aria-describedby={`${name}-help`}
                    />
                    {helpText && (
                      <CFormText className id={`${name}-help`}>
                        {helpText}
                      </CFormText>
                    )}
                    {errorMessage ? (
                      <CFormText className={'error-text'} id={`${name}-error`}>
                        {errorMessage}
                      </CFormText>
                    ) : null}
                  </>
                )
              }}
            />
          </>
        )
      case 'checkbox':
        return (
          <CFormCheck
            id={id}
            key={`${id}-${name}`}
            {...register(name, { ...validation })}
            label={label}
          />
        )
      case 'select':
        const itemsArray = (dynamicOptionKey && options[dynamicOptionKey]) || itemOptions || []
        const items = (value) => {
          return [...itemsArray].map((selectOptions) => {
            if (name === 'adultwaterskis')
              console.log(
                'data',
                name,
                value?.length ? selectOptions[valueKey || 'value'] === value : false,
              )
            return (
              <option
                selected={value?.length ? selectOptions[valueKey || 'value'] === value : false}
                key={selectOptions[valueKey || 'value']}
                value={selectOptions[valueKey || 'value']}
              >
                {selectOptions[labelKey || 'label']}
              </option>
            )
          })
        }

        return (
          <>
            <Controller
              control={formControl}
              name={name}
              defaultValue={defaultValue ? defaultValue[name] : ''}
              render={({ field: { onChange, value, name } }) => {
                return (
                  <>
                    <CFormLabel htmlFor={id}>{label}</CFormLabel>
                    <CFormSelect
                      id={id}
                      value={customValueKey ? value && value[valueKey] : value}
                      onChange={(e) => {
                        let selectedValue = e.target.value
                        if (customValueKey) {
                          itemsArray.every((item) => {
                            if (item[customValueKey] === selectedValue) {
                              selectedValue = item
                              return false
                            }
                            return true
                          })
                        }
                        onChange(selectedValue)
                      }}
                      placeholder={placeholder}
                      aria-describedby={`${name}-help`}
                    >
                      <option disabled selected value={''}>
                        {placeholder || label}
                      </option>
                      {items(value)}
                    </CFormSelect>
                    {helpText && <CFormText id={`${name}-help`}>{helpText}</CFormText>}
                  </>
                )
              }}
            />
          </>
        )
      case 'textArea':
        return (
          <>
            <CFormLabel htmlFor={id}>{label}</CFormLabel>
            <CFormControl
              component="textarea"
              id={id}
              {...register(name, { ...validation })}
              placeholder={placeholder}
              rows={textAreaRow}
            ></CFormControl>
            {helpText && <CFormText id={`${name}-help`}>{helpText}</CFormText>}
          </>
        )
      case 'googlePlaceSearch':
        const customHandler = options[customHandlerKey]
        return (
          <>
            <CFormLabel htmlFor={id}>{label}</CFormLabel>
            <MapComponents
              type="PlacedAutoComplete"
              withLatLng={customHandler}
              error={errorMessage}
              register={{ ...register(name, { ...validation }) }}
            />
            {helpText && <CFormText id={`${name}-help`}>{helpText}</CFormText>}
            {errorMessage && (
              <CFormText className="error-text" id={`${name}-error`}>
                {errorMessage}
              </CFormText>
            )}
          </>
        )

      case 'multiInput':
        return (
          <RenderMultiInput
            {...{
              label,
              placeholder,
              id,
              name,
              helpText,
              customHandlerKey,
              options,
              variableName,
            }}
          />
        )

      default:
        return []
    }
  }

  return (
    <CRow>
      {fields.map((data) => (
        <div key={`${data.id}-${data.name}`} className={`mb-3 ${data.colClass}`}>
          {RenderField(data)}
        </div>
      ))}
    </CRow>
  )
}

RenderFormFields.propTypes = {
  fields: PropTypes.array,
  register: PropTypes.func,
  options: PropTypes.object,
  control: PropTypes.any,
  errors: PropTypes.object,
  defaultValue: PropTypes.object,
}
