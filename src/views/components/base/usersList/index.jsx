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
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { format } from 'date-fns'

const GET_USERS_QUERY = gql`
  {
    userMany {
      name
      email
      date
      avathar
      points
      userType
      createdAt
    }
  }
`

const UsersList = () => {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_USERS_QUERY)

  if (loading) return <CSpinner />
  if (error) return `Error! ${error.message}`

  const generateTableBody = () => {
    return data.userMany.map(({ name, email, userType, date, points }, index) => {
      return (
        <CTableRow key={index + 1}>
          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
          <CTableDataCell>{name}</CTableDataCell>
          <CTableDataCell>{email}</CTableDataCell>
          <CTableDataCell>{userType}</CTableDataCell>
          <CTableDataCell>{points}</CTableDataCell>
          <CTableDataCell>{format(new Date(date), 'dd-MM-yyyy')}</CTableDataCell>
        </CTableRow>
      )
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow className="justify-content-md-between">
              <CCol sm="auto">
                <strong>Users</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Users List</p>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">UserType</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User Points</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{generateTableBody()}</CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersList
