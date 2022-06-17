import React, { useCallback, useState, useMemo, useEffect } from 'react'
import {
  CCol,
  CRow,
  CSpinner,
  CButton,
  CCardHeader,
  CCard,
  CCardBody,
  CForm,
  CCollapse,
} from '@coreui/react'
import gql from 'graphql-tag'
import {
  accomodationForm,
  charteragentForm,
  createYatchFrom,
  overViewForm,
  reviewForm,
  specificationForm,
  waterToys,
  yachtCrewForm,
} from './data'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import RenderFormFields from 'src/components/FormWrapper/RenderFormFields'
import { YACH_TYPE_QUERY } from '../yachttype/yachttype'
import FileUploaderInput from '../../fileUploader'
import MapComponents from '../../mapComponents'
import SectionLayout from './sectionLayout'
import { myDummy } from './dummyStates'
import { useFormContext } from 'react-hook-form'
import './index.scss'
import { YATCH_LIST_QUERY } from './yacht'

export const USERS_QUERY = gql`
  {
    userMany {
      name
      email
      password
      date
      avathar
      userType
      _id
      updatedAt
      createdAt
    }
  }
`

const CREATEYATCH_MUTATION = gql`
  mutation YachtCreateOneMutation($yachtCreateOneRecord: CreateOneYatchInput!) {
    yachtCreateOne(record: $yachtCreateOneRecord) {
      record {
        name
        typeid
        parenttypeid
        shortdescription
        fulldescription
        typename
        ownerid
        ownername
        showonhomepage
        point
        isnew
        height
        status
        length
        location {
          type
          coordinates
        }
        overview {
          requirementsforthisBooking
          builder
          refit
          sleeps
          winter
          crew
          length
          summer
          year
          staterooms
          gustes
          description
        }
        specification {
          specificationsdescription
          sleeps
          staterooms
          heads
          bkings
          queens
          twins
          loa
          beam
          maximumdraft
          cruisingspeed
          jacuzzi
          helicopterpad
          bbq
          waterbike
          swimingpool
          fueldetails
          generators
          enginestotalpower
          enginehours
          enginefueltype
          enginetype
          enginemodel
          enginebrand
          engine
        }
        watertoys {
          watertoysdescription
          scuba
          snorkelgear
          adultwaterskis
          kidswaterskis
          kneeboard
          windsurfer
          tube
          scurfer
          wakeboard
          onepersonkayak
          twopersonkayak
          floatmats
          fishinggear
          tender
          tenderHorsepower
          tenderpax
          jetski
          waverunner
          othertoys
        }
        accommodation {
          accommodationdescription
          accommodationfeatures
        }
        charteragent {
          name
          position
          displayorder
          url
          facebook
          twitter
          linkedin
          youtube
        }
      }
    }
  }
`

const Tables = () => {
  const history = useHistory()
  const [CreateYatchMutation, { data, loading: mutationLoading }] = useMutation(
    CREATEYATCH_MUTATION,
    {
      refetchQueries: [{ query: YATCH_LIST_QUERY, variables: {} }],
    },
  )
  const [isDraft, setisDraft] = useState(false)

  const { loading: typeLoading, error: typeError, data: typeData } = useQuery(YACH_TYPE_QUERY)
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(USERS_QUERY)

  const [selectedLatLng, setLatLng] = useState(null)
  // const [bookingRequirments, setRequiments] = useState([])
  const [showGeneral, toogleGeneral] = useState(true)
  const [showOverview, toogleOverview] = useState(false)
  const [showSpecifications, toogleSpecifications] = useState(false)
  const [showWatertoys, toogleWatertoys] = useState(false)
  const [toggleStates, setToggleStates] = useState({})
  const generalmethords = useForm()
  const {
    register: generalRegister,
    handleSubmit,
    getValues: getGeneralValues,
    formState: { errors },
    setValue: setGeneralValues,
  } = generalmethords

  useEffect(() => {
    if (!isDraft && data) history.push('/base/Yacht')
  }, [data, isDraft])
  
  const overviewmethords = useForm()
  const {
    register: overVIewRegister,
    getValues: getOverViewValues,
    setValue: setOverViewValues,
  } = overviewmethords

  const specifcationmethords = useForm()
  const {
    register: specificationRegister,
    getValues: specificationValues,
    setValue: setSpecificationValues,
  } = specifcationmethords

  const watertoysmethords = useForm()
  const {
    register: waterToysRegister,
    getValues: waterToysValues,
    setValue: setWatertoys,
    watch,
  } = watertoysmethords

  const chartermethords = useForm()
  const {
    register: charterAgentRegister,
    getValues: charterAgentValues,
    setValue: setCharter,
  } = chartermethords

  const accomodationmethords = useForm()
  const {
    register: accomodationRegister,
    getValues: accomodationValues,
    setValue: setAccomdation,
  } = accomodationmethords

  const yachtCrewmethords = useForm()
  const {
    register: crewRegister,
    getValues: crewValues,
    setValue: setCrewValue,
  } = yachtCrewmethords

  const checkIfFieldExists = (data) => {
    let updatedData = {}
    let found = false
    Object.entries(data).forEach(([key, value]) => {
      if (value?.length) {
        found = true
        updatedData[key] = value
      }
    })
    return found ? updatedData : null
  }
  useEffect(() => {}, [])
  const submitHandler = useCallback(
    (dataValues) => {
      const values = getGeneralValues()
      const overViewValues = getOverViewValues()
      const specValues = specificationValues()
      const watertoysValues = checkIfFieldExists(waterToysValues())
      const charterValue = charterAgentValues()
      const accomodationValue = accomodationValues()
      const crewValue = checkIfFieldExists(crewValues())
      const { ownerid, picture, ...rest } = values
      CreateYatchMutation({
        variables: {
          yachtCreateOneRecord: {
            ownerid: ownerid?._id,
            ownername: ownerid?.name,
            ...rest,
            height: Number(values.height),
            point: Number(values.point),
            length: Number(values.length),
            status: Number(values.status),
            location: {
              type: 'Point',
              coordinates: [selectedLatLng.lng, selectedLatLng.lat],
            },
            overview: {
              ...overViewValues,
            },
            specification: {
              ...specValues,
              swimingpool: specValues.swimingpool ? 'Yes' : 'No',
              waterbike: specValues.waterbike ? 'Yes' : 'No',
              bbq: specValues.bbq ? 'Yes' : 'No',
              helicopterpad: specValues.helicopterpad ? 'Yes' : 'No',
              jacuzzi: specValues.jacuzzi ? 'Yes' : 'No',
            },
            ...(watertoysValues ? { watertoys: { ...watertoysValues } } : {}),
            charteragent: {
              ...charterValue,
              displayorder: Number(charterValue.displayorder),
            },
            accommodation: {
              ...accomodationValue,
            },
            ...(crewValue ? { crew: { ...crewValue } } : {}),
            picture: picture?.map((url, i) => ({
              pictureid: '',
              title: '',
              description: '',
              displayorder: i,
              url,
            })),
          },
        },
      })
    },
    [selectedLatLng],
  )

  const yatchTypeOptions = useMemo(() => {
    if (typeData) {
      const { yachTypeMany } = typeData
      //console.log( 'type data >>', yachTypeMany)
      return [...yachTypeMany]
    }
    return []
  }, [typeData])

  const usersOptions = useMemo(() => {
    if (typeData) {
      const { userMany } = usersData || {}
      //console.log( 'user data >>', userMany)
      return [...userMany]
    }
    return []
  }, [usersData])

  const handlePlaceSearch = useCallback((latLng) => {
    //console.log( 'selected lat lng')
    setLatLng(latLng)
  }, [])

  // const handleMultiInput = useCallback(
  //   (type) => {
  //     return {
  //       onDelete: (index) => {
  //         setMultiSelectStates((prev) => {
  //           return { ...prev, [type]: prev[type].filter((s, i) => i !== index) }
  //         })
  //       },
  //       action: (data) => {
  //         setMultiSelectStates((prev) => {
  //           return { ...prev, [type]: [...prev[type], data] }
  //         })
  //       },
  //       data: multiSelectStates[type],
  //     }
  //   },
  //   [multiSelectStates],
  // )

  const memorizedOptions = useMemo(
    () => ({
      yatchTypeOptions,
      handlePlaceSearch,
      usersOptions,
    }),
    [yatchTypeOptions, handlePlaceSearch, usersOptions],
  )

  //console.log( 'errorss >>> ', errors)

  const handleToggles = useCallback(
    ({ type }) => {
      setToggleStates((prev) => ({ ...prev, [type]: !prev[type] }))
    },
    [toggleStates],
  )

  const sessionLayoutCommonProps = () => {
    return {
      handleToggles,
      collapseStates: toggleStates,
    }
  }

  const renderSaveButton = () => {
    return (
      <div className={mutationLoading && isDraft ? 'animateButton' : ''}>
        <div className="text animated pulse">
          <CButton
            onClick={(e) => {
              e.stopPropagation()
              setisDraft(true)
              handleSubmit(submitHandler)()
            }}
          >
            {mutationLoading && isDraft ? 'Saving...' : 'Save'}
          </CButton>
        </div>
      </div>
    )
  }
  return (
    <CRow>
      <CForm onSubmit={handleSubmit(submitHandler)}>
        <CCol xs={12}>
          <h4 className="text-medium-emphasis">Add Yacth</h4>
          <FormProvider {...generalmethords}>
            <CCard>
              <CCardHeader
                className="btn textLeft"
                onClick={() => toogleGeneral((current) => !current)}
              >
                <div className="header-section">
                  General
                  {renderSaveButton()}
                </div>
              </CCardHeader>
              <CCollapse visible={showGeneral}>
                <CCardBody>
                  <RenderFormFields
                    errors={errors}
                    fields={createYatchFrom}
                    register={generalRegister}
                    options={memorizedOptions}
                  ></RenderFormFields>
                  <CCol className="col-sm-6 col-4">
                    <MapComponents
                      withLatLng={setLatLng}
                      markers={[{ points: selectedLatLng, _id: 'marker1' }]}
                      center={selectedLatLng || undefined}
                    />
                  </CCol>
                  <Controller
                    control={generalmethords.control}
                    name={'picture'}
                    render={({ field: { onChange, value, name } }) => {
                      return (
                        <FileUploaderInput
                          value={value}
                          required={!value}
                          isMultiple={true}
                          setResponseUrl={(data) => {
                            onChange(data)
                          }}
                          Label="Picture"
                        />
                      )
                    }}
                  />
                </CCardBody>
              </CCollapse>
            </CCard>
          </FormProvider>
          <FormProvider {...overviewmethords}>
            <CCard>
              <CCardHeader
                className="btn textLeft"
                onClick={() => toogleOverview((current) => !current)}
              >
                <div className="header-section">
                  Overview
                  {renderSaveButton()}
                </div>
              </CCardHeader>
              <CCollapse visible={showOverview}>
                <CCardBody>
                  <RenderFormFields
                    fields={overViewForm}
                    register={overVIewRegister}
                    options={memorizedOptions}
                  ></RenderFormFields>
                </CCardBody>
              </CCollapse>
            </CCard>
          </FormProvider>
          <FormProvider {...specifcationmethords}>
            <CCard>
              <CCardHeader
                className="btn textLeft"
                onClick={() => toogleSpecifications((current) => !current)}
              >
                <div className="header-section">
                  Specifications
                  {renderSaveButton()}
                </div>
              </CCardHeader>
              <CCollapse visible={showSpecifications}>
                <CCardBody>
                  <RenderFormFields
                    fields={specificationForm}
                    register={specificationRegister}
                    options={memorizedOptions}
                  ></RenderFormFields>
                </CCardBody>
              </CCollapse>
            </CCard>
          </FormProvider>
          <FormProvider {...watertoysmethords}>
            <CCard>
              <CCardHeader
                className="btn textLeft"
                onClick={() => toogleWatertoys((current) => !current)}
              >
                <div className="header-section">
                  Water Toys
                  {renderSaveButton()}
                </div>
              </CCardHeader>
              <CCollapse visible={showWatertoys}>
                <CCardBody>
                  <RenderFormFields
                    fields={waterToys}
                    register={waterToysRegister}
                  ></RenderFormFields>
                </CCardBody>
              </CCollapse>
            </CCard>
          </FormProvider>
          <FormProvider {...chartermethords}>
            <SectionLayout
              saveButton={renderSaveButton()}
              {...sessionLayoutCommonProps()}
              cardHeaderText="Charter Agent"
              type="charterAgent"
              cardBody={
                <RenderFormFields
                  fields={charteragentForm}
                  register={charterAgentRegister}
                ></RenderFormFields>
              }
            />
          </FormProvider>
          <FormProvider {...accomodationmethords}>
            <SectionLayout
              saveButton={renderSaveButton()}
              {...sessionLayoutCommonProps()}
              cardHeaderText="Accomodation"
              type="accomodation"
              cardBody={
                <RenderFormFields
                  fields={accomodationForm}
                  register={accomodationRegister}
                  options={memorizedOptions}
                ></RenderFormFields>
              }
            />
          </FormProvider>
          <FormProvider {...yachtCrewmethords}>
            <SectionLayout
              saveButton={renderSaveButton()}
              {...sessionLayoutCommonProps()}
              cardHeaderText="Crew Members"
              type="crewmembers"
              cardBody={
                <RenderFormFields
                  fields={yachtCrewForm}
                  register={crewRegister}
                  options={memorizedOptions}
                ></RenderFormFields>
              }
            />
          </FormProvider>

          <div>
            <CButton type="submit">Submit</CButton>
          </div>
        </CCol>
      </CForm>
    </CRow>
  )
}

export default Tables
