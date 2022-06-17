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
import { USERS_QUERY } from './addYacht'
import { parseUrl } from 'src/Utils/helpers'
import CIcon from '@coreui/icons-react'
import { notifyToast } from '../../notifications/toasts/notifyToast'

const YATCH_UPDATE_MUTATION = gql`
  mutation YachtUpdateByIdMutation(
    $yachtUpdateByIdId: MongoID!
    $yachtUpdateByIdRecord: UpdateByIdYatchInput!
  ) {
    yachtUpdateById(_id: $yachtUpdateByIdId, record: $yachtUpdateByIdRecord) {
      recordId
    }
  }
`
const GET_YATCH_BY_ID = gql`
  query ExampleQuery($yachtByIdId: MongoID!) {
    yachtById(_id: $yachtByIdId) {
      name
      typeid
      parenttypeid
      shortdescription
      picture {
        pictureid
        title
        url
        description
      }
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
`

const UpdateYatch = () => {
  const history = useHistory()

  const yatchId = parseUrl(history.location.search)?.id
  const { loading: typeLoading, error: typeError, data: typeData } = useQuery(YACH_TYPE_QUERY)
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(USERS_QUERY)
  const { loading: yatchLoading, error: yatchError, data: yatchData } = useQuery(GET_YATCH_BY_ID, {
    variables: { yachtByIdId: yatchId },
  })
  const [YachtUpdateMutation, { data, loading: mutationLoading }] = useMutation(
    YATCH_UPDATE_MUTATION,
    {
      refetchQueries: [{ query: GET_YATCH_BY_ID, variables: { yachtByIdId: yatchId } }],
    },
  )
  useEffect(() => {
    if (data?.yachtUpdateById) {
      notifyToast({ message: 'sucessfully updated!', type: 'success' })
    }
  }, [data])
  const yatchQueryData = yatchData?.yachtById

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

  useEffect(() => {
    if (yatchQueryData?.name) {
      const general = [
        'name',
        'fulldescription',
        'height',
        'isnew',
        'length',
        'ownerid',
        'point',
        'shortdescription',
        'status',
        'showonhomepage',
        'typeid',
        'typename',
        'location',
        'picture',
      ]
      general.forEach((item) => {
        if (item === 'picture')
          setGeneralValues(
            item,
            yatchQueryData[item].map((item) => item.url),
          )
        else if (item === 'location') {
          const [lng, lat] = yatchQueryData[item].coordinates
          setLatLng({ lat, lng })
          setGeneralValues(item, `${lat},${lng}`)
        } else setGeneralValues(item, yatchQueryData[item])
      })
      if (yatchQueryData.overview)
        Object.entries(yatchQueryData.overview).forEach(([key, value]) => {
          setOverViewValues(key, value)
        })
      if (yatchQueryData.specification)
        Object.entries(yatchQueryData.specification).forEach(([key, value]) => {
          setSpecificationValues(key, value)
        })
      if (yatchQueryData.watertoys)
        Object.entries(yatchQueryData.watertoys).forEach(([key, value]) => {
          setWatertoys(key, value)
        })
      if (yatchQueryData.charteragent)
        Object.entries(yatchQueryData.charteragent).forEach(([key, value]) => {
          setCharter(key, value)
        })
      if (yatchQueryData.accommodation)
        Object.entries(yatchQueryData.accommodation).forEach(([key, value]) => {
          setAccomdation(key, value)
        })
    }
  }, [yatchQueryData])

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

  const submitHandler = useCallback(
    (dataValues) => {
      const values = getGeneralValues()
      const overViewValues = overviewmethords.watch()
      const specValues = specificationValues()
      const watertoysValues = checkIfFieldExists(waterToysValues())
      const charterValue = charterAgentValues()
      const accomodationValue = accomodationValues()
      const crewValue = checkIfFieldExists(crewValues())

      delete values.__typename
      if (overViewValues) delete overViewValues.__typename
      if (specValues) delete specValues.__typename
      if (watertoysValues) delete watertoysValues.__typename
      if (charterValue) delete charterValue.__typename
      if (accomodationValue) delete accomodationValue.__typename
      const { ownerid, picture, ...rest } = values

      YachtUpdateMutation({
        variables: {
          yachtUpdateByIdId: yatchId,
          yachtUpdateByIdRecord: {
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
      saveButton: renderSaveButton(),
    }
  }

  const removeImages = (index) => {
    const uploadedPicture = generalmethords.watch('picture').filter((item, idx) => idx !== index)
    setGeneralValues('picture', uploadedPicture)
  }

  const renderPicture = (pictures) => {
    if (pictures?.length)
      return pictures.map((item, idx) => {
        return (
          <div className="picture_pane" key={idx}>
            <CIcon name="cil-trash" className="remove-icon" onClick={() => removeImages(idx)} />
            <img src={item} alt={'mypic'} />
          </div>
        )
      })
  }
  const renderSaveButton = () => {
    return (
      <div className={mutationLoading ? 'animateButton' : ''}>
        <div className="text animated pulse">
          <CButton
            onClick={(e) => {
              e.stopPropagation()
              handleSubmit(submitHandler)()
            }}
          >
            {mutationLoading ? 'Saving...' : 'Save'}
          </CButton>
        </div>
      </div>
    )
  }
  const renderHeader = (title) => {
    return (
      <div className="header-section">
        {title}
        {renderSaveButton()}
      </div>
    )
  }
  return (
    <CRow>
      <CForm onSubmit={handleSubmit(submitHandler)}>
        <CCol xs={12}>
          <h4 className="text-medium-emphasis">Update Yacht</h4>
          <FormProvider {...generalmethords}>
            <CCard>
              <CCardHeader
                className="btn textLeft"
                onClick={() => toogleGeneral((current) => !current)}
              >
                {renderHeader('General')}
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
                        <>
                          <FileUploaderInput
                            required={!value}
                            value={value}
                            isMultiple={true}
                            setResponseUrl={(data) => {
                              onChange(data)
                            }}
                            Label="Picture"
                          />
                          <div className="picturecontainer">{renderPicture(value)}</div>
                        </>
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
                {renderHeader('Overview')}
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
                {renderHeader('Specifications')}
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
                {renderHeader('Water Toys')}
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
            <CButton type="submit">{mutationLoading ? 'Submitting...' : 'Submit'}</CButton>
          </div>
        </CCol>
      </CForm>
    </CRow>
  )
}

export default UpdateYatch
