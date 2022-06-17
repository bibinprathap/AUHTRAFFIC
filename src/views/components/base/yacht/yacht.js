import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CButton,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { setSelectedYatchToEdit } from 'src/redux/slices/yatchSlice'
import CIcon from '@coreui/icons-react'
import './index.scss'

export const YATCH_LIST_QUERY = gql`
  {
    yachtMany {
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
      length
      status
      _id
      location {
        type
        coordinates
      }
      accommodation {
        accommodationdescription
        accommodationfeatures
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
    }
  }
`

const DELETE_YATCH_MUTATION = gql`
  mutation YachtRemoveByIdMutation($yachtRemoveByIdId: MongoID!) {
    yachtRemoveById(_id: $yachtRemoveByIdId) {
      record {
        name
        fulldescription
      }
    }
  }
`

const Tables = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [deleteYatchMutation, { data: deleteYatchData }] = useMutation(DELETE_YATCH_MUTATION, {
    refetchQueries: [{ query: YATCH_LIST_QUERY, variables: {} }],
  })
  const { loading, error, data } = useQuery(YATCH_LIST_QUERY)

  if (loading) return <CSpinner />
  if (error) return `Error! ${error.message}`

  const handleAddYacth = () => {
    history.push('/base/addYacht')
  }

  const onClickEditYatch = (data) => {
    // dispatch(setSelectedYatchToEdit(data))
    history.push(`/base/updateYacht?id=${data._id}`)
  }
  const onClickDeleteYatch = (id) => {
    deleteYatchMutation({
      variables: {
        yachtRemoveByIdId: id,
      },
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow className="justify-content-md-between">
              <CCol sm="auto">
                <strong>Yachts</strong>
              </CCol>
              <CCol sm="auto">
                <CButton onClick={handleAddYacth}>Add Yatch</CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Yachts List</p>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Points</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Typename</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Height</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Length</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Owner Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.yachtMany.map((yatch, index) => {
                  return (
                    <CTableRow key={index + 1}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{yatch.name}</CTableDataCell>
                      <CTableDataCell>{yatch.point}</CTableDataCell>
                      <CTableDataCell>{yatch.shortdescription}</CTableDataCell>
                      <CTableDataCell>{yatch.typename}</CTableDataCell>
                      <CTableDataCell>{yatch.height}</CTableDataCell>
                      <CTableDataCell>{yatch.length}</CTableDataCell>
                      <CTableDataCell>{yatch.ownername}</CTableDataCell>
                      <CTableDataCell>{yatch._id}</CTableDataCell>
                      <CTableDataCell>
                        <div className="buttoncontainer">
                          <div className="buttonpane" onClick={() => onClickEditYatch(yatch)}>
                            <CIcon name="cil-pencil" className="nav-icon" />
                          </div>
                          <div className="buttonpane" onClick={() => onClickDeleteYatch(yatch._id)}>
                            <CIcon name="cil-trash" className="nav-icon" />
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
