import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,CSpinner
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const YACH_TYPE_QUERY = gql`
  {
    yachTypeRequestMany {
      yatchId
      fullname
      email
      phonenumber
      message
    }
  }
`

const Tables = () => {
   
    const { loading, error, data } = useQuery(YACH_TYPE_QUERY);

    if (loading) return <CSpinner />;
   if (error) return `Error! ${error.message}`;

  return (
    <CRow>
     
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Yacht</strong> <small>Request Info</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Request Info from Yacht Details Page 
            </p>
            
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Yacht</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.yachTypeRequestMany.map((yatchtype,index)=>{
                    return (
                      <CTableRow key = {index+1}>
                      <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                      <CTableDataCell>{yatchtype.yatchId}</CTableDataCell> 
                      <CTableDataCell>{yatchtype.fullname}</CTableDataCell>
                      <CTableDataCell>{yatchtype.email}</CTableDataCell>
                      <CTableDataCell>{yatchtype.phonenumber}</CTableDataCell>
                      <CTableDataCell>{yatchtype.message}</CTableDataCell>
                    </CTableRow>
                    );
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
