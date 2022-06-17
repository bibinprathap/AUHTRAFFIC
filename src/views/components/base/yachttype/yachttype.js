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
import CreateYachtType from './newyachttype';
import EditYachtType from './edityachttype';

export const YACH_TYPE_QUERY = gql`
  {
    yachTypeMany {
      typenameConst
      typename
      description
      _id
    }
  }
`

const YACHTTYPE_MUTATION = gql` 
mutation Mutation($yachTypeRemoveByIdId: MongoID!) {
  yachTypeRemoveById(_id: $yachTypeRemoveByIdId) {
    record {
      typenameConst
      typename
      description
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
  const { loading, error, data } = useQuery(YACH_TYPE_QUERY);
  const [YachtTypeMutation, { editeddata }] = useMutation(YACHTTYPE_MUTATION, {
    refetchQueries: [
      { query: YACH_TYPE_QUERY, variables: {} }
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
  //     setYachtTypedata(data.yachTypeMany);
  //   }
  // }, [data, getYachtType])


  if (loading) return <CSpinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <CRow>

        {formState.new ? <CCol xs={12}>
          <CRow className='justify-content-md-between'>
            <CCol>
              <CreateYachtType onCreate={reloaddata}  ></CreateYachtType>
            </CCol>
          </CRow>

        </CCol> : null}
        {formState.edit ? <CCol xs={12}>
          <CRow className='justify-content-md-between'>
            <CCol>
              <EditYachtType yachtId={formState.id} onCreate={reloaddata}  ></EditYachtType>
            </CCol>
          </CRow>

        </CCol> : null}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='justify-content-md-between'>
                <CCol sm="auto">
                  <strong>Yacht</strong> <small>Type</small>
                </CCol>
                <CCol sm="auto">
                  <CButton onClick={() => {
                    setFormState({
                      new: !formState.new,
                      edit: false
                    });
                  }}   >{formState.new ? "Close" : "Add Yacht Type"}</CButton>
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>

              <p className="text-medium-emphasis small">
                Yacht Type List
            </p>

              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.yachTypeMany.map((yatchtype, index) => {
                    return (
                      <CTableRow key={index + 1}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{yatchtype.typename}</CTableDataCell>
                        <CTableDataCell>{yatchtype.description}</CTableDataCell>
                        <CTableDataCell> <CButton onClick={() => {
                          setFormState({
                            new: false,
                            edit: true,
                            id: yatchtype._id
                          });
                        }}   >{"Edit"}</CButton></CTableDataCell>
                        <CTableDataCell> <CButton onClick={() => {
                          setVisible(true);
                          setFormState({
                            new: false,
                            edit: false,
                            id: yatchtype._id
                          })
                        }}  >{"Delete"}</CButton></CTableDataCell>
                      </CTableRow>

                    );
                  })}


                </CTableBody>
              </CTable>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>Delete ! </CModalTitle>
        </CModalHeader>
        <CModalBody>        Do you want to delete this?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>

          <CButton onClick={() => {
            YachtTypeMutation({
              variables: {
                "yachTypeRemoveByIdId": formState.id,
              }
            });
            setVisible(false);
          }} color="primary">{"Delete"}</CButton>
        </CModalFooter>
      </CModal>


    </div>

  )
}

export default Tables
