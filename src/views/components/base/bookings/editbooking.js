import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow, CSpinner
} from '@coreui/react';
import FromWrapper from '../../../../components/FormWrapper'
import { BOOKING_QUERY } from './booking'

const BOOKING_MUTATION = gql`
mutation TypenameMutation($yachTypeUpdateByIdId: MongoID!, $yachTypeUpdateByIdRecord: UpdateByIdYachtTypeInput!) {
  yachTypeUpdateById(_id: $yachTypeUpdateByIdId, record: $yachTypeUpdateByIdRecord) {
    record {
      typename
      description
    }
  }
} 
  `;


const BOOKING_QUERY_EDIT = gql`
query Query($yachTypeByIdsIds: [MongoID!]!) {
  yachTypeByIds(_ids: $yachTypeByIdsIds) {
    typename
    description
    typenameConst
    _id
  }
}

`



const EditYachtType = ({ onCreate, yachtId }) => {
  const { loading, error, data } = useQuery(BOOKING_QUERY_EDIT, {
    variables: {
      "yachTypeByIdsIds": yachtId
    }
  });


  const [YachtTypeMutation, { editeddata }] = useMutation(BOOKING_MUTATION, {
    refetchQueries: [
      { query: BOOKING_QUERY, variables: {} }
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
        "yachTypeUpdateByIdId": yachtId,
        "yachTypeUpdateByIdRecord": {
          "typename": typename,
          "description": description
        }
      }
    });
    onCreate();
    // //console.log( "checker >>>", e);
  }, [YachtTypeMutation]);
  if (loading) return <CSpinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Yacht</strong> <small>Type</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Edit Booking
                </p>
            <FromWrapper mutation={onSubmit} initialData={data.yachTypeByIds[0]} fieldsData={[{ type: 'text', label: 'Type Name', id: 'typename', name: 'typename', helpText: 'Type Name' },
            { type: 'text', label: 'Description', id: 'description', name: 'description', helpText: 'Description' }]} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

EditYachtType.propTypes = {
  onCreate: PropTypes.func,
  yachtId: PropTypes.string,
}
export default EditYachtType;
