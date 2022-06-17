import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
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
  CTableRow, CSpinner
} from '@coreui/react';
import FromWrapper from '../../../../components/FormWrapper'
import { YACH_TYPE_QUERY } from './yachttype'

const YACHTTYPE_MUTATION = gql`
mutation TypenameMutation($yachTypeCreateOneRecord: CreateOneYachtTypeInput!) {
    yachTypeCreateOne(record: $yachTypeCreateOneRecord) {
      record {
        typename
        description
      }
    }
  }
  `;


const CreateYachtType = ({ onCreate }) => {
  const [YachtTypeMutation, { data }] = useMutation(YACHTTYPE_MUTATION, {
    refetchQueries: [
      { query: YACH_TYPE_QUERY, variables: {} }
    ]
  });
  // typename
  //   description
  const onSubmit = useCallback((values) => {
    const { typename, description } = values;
    //console.log( "checker >>> typename", typename);
    //console.log( "checker >>> description", description);
    YachtTypeMutation({
      variables: {
        "yachTypeCreateOneRecord": {
          "typename": typename,
          "description": description
        }
      }
    });
    onCreate();
    // //console.log( "checker >>>", e);
  }, [YachtTypeMutation]);

  return (
    <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Yacht</strong> <small>Type</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              New Yacht Type
                </p>
            <FromWrapper mutation={onSubmit} fieldsData={[{ type: 'text', label: 'Type Name', id: 'typename', name: 'typename', helpText: 'Type Name' },
            { type: 'text', label: 'Description', id: 'description', name: 'description', helpText: 'Description' }]} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

CreateYachtType.propTypes = {
  onCreate: PropTypes.func,
}
export default CreateYachtType;
