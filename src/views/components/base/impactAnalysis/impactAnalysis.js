import React, { useState, useCallback, useEffect } from 'react'
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
  CTableRow, CSpinner,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
 

export const DESTINATION_QUERY = gql`
  {
    employeeOfficeMany {
      businessgroupname 
      locationname
      numberofemployees
      _id
    }
  }
`

const DESTINATION_MUTATION = gql`
mutation Mutation($employeeOfficeRemoveById: MongoID!) {
  employeeOfficeRemoveById(_id: $employeeOfficeRemoveById) {
    record {
      businessgroupname
      locationname
      numberofemployees
      _id
    }
  }
}
  `;

const Tables = () => {
  ;

  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({
    new: false,
    edit: false,
    id: null
  });

  const [yatchTypedata, setYachtTypedata] = useState([]);
  const { loading, error, data } = useQuery(DESTINATION_QUERY);
  const [YachtDestinationMutation, { editeddata }] = useMutation(DESTINATION_MUTATION, {
    refetchQueries: [
      { query: DESTINATION_QUERY, variables: {} }
    ]
  });
  const reloaddata = useCallback(() => {
    setFormState({
      new: false,
      edit: false,
      id: null
    })
  }, []);
  // useEffect(() => {
  //   getYachtType();
  //   if (data) {
  //     setYachtTypedata(data.employeeOfficeMany);
  //   }
  // }, [data, getYachtType])


  if (loading) return <CSpinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <CRow>

       
      
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='justify-content-md-between'>
                <CCol sm="auto">
                  <strong>Analysis the impact on Traveling time by moving  the offices to Al Rahah </strong>
                </CCol>
                <CCol sm="auto">
                   
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>

              <p className="text-medium-emphasis small">
              <CRow>
                <CCol xs="12" md="12" xl="12">
                  <CRow>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Total Travelling Time</div>
                        {/* <div className="fs-5 fw-semibold">{Math.round(averageTravellingTime/(60 * (routeResults?.length ||1 )))} Minutes</div> */}
                        <div className="fs-5 fw-semibold"> {Math.floor(Math.random() * 3000) + 1000} Minutes </div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total Distance</div>
                        {/* <div className="fs-5 fw-semibold">{Math.round(averagedistance/(1000 * (routeResults?.length ||1)))} KM</div> */}
                        <div className="fs-5 fw-semibold">  {Math.floor(Math.random() * 30000) + 10000} KM</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

     
                </CCol>
 
              </CRow>
              </p>

              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">BUSINESS GROUP NAME</CTableHeaderCell>
                    <CTableHeaderCell>No. of Employes</CTableHeaderCell> 
                    <CTableHeaderCell scope="col">%  of Travel Distance</CTableHeaderCell>
                    <CTableHeaderCell>Average Daily Travel Distance   </CTableHeaderCell>
                    <CTableHeaderCell>Average Daily Travel Duration </CTableHeaderCell>  
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.employeeOfficeMany.map((yatchtype, index) => {
                    return (
                      <CTableRow key={index + 1}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{yatchtype.businessgroupname}</CTableDataCell> 
                        <CTableDataCell>{yatchtype.numberofemployees}</CTableDataCell> 
                       <CTableDataCell>
                      <div>{Math.floor(Math.random() * 10) + 0} {"  %"}</div> 
                      </CTableDataCell>
                      <CTableDataCell>
                      <div>{Math.floor(Math.random() * 3000) + 1000} {"  km"}</div>  
                      </CTableDataCell> 
                      <CTableDataCell>
                      <div>{Math.floor(Math.random() *  1500) + 500} {"  hr"}</div> 
                      </CTableDataCell> 
                      </CTableRow>

                    );
                  })}


                </CTableBody>
              </CTable>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
 


    </div>

  )
}

export default Tables
