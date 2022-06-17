import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CForm, CButton } from '@coreui/react'
import RenderFormFields from './RenderFormFields'
import { FormProvider } from 'react-hook-form'

const FromWrapper = ({ fieldsData, mutation, initialData }) => {
  const methords = useForm({
    defaultValues: useMemo(() => {
      return initialData
    }, [initialData]),
  })

  const { register, getValues, handleSubmit, reset } = methords
  return (
    <CForm
      onSubmit={handleSubmit((e) => {
        mutation(getValues())
        reset(null)
      })}
    >
      <FormProvider {...methords}>
        <RenderFormFields fields={fieldsData} register={register} />
      </FormProvider>
      <CButton type="submit" color="primary">
        Submit
      </CButton>
    </CForm>
  )
}
FromWrapper.propTypes = {
  fieldsData: PropTypes.array,
  mutation: PropTypes.func,
  initialData: PropTypes.object,
}
export default FromWrapper
