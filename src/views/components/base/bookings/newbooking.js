import React, { useCallback,useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CFormLabel,     CRow } from '@coreui/react';
import axios from 'axios';
import constant from '../../../../constant'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,  
  CForm, CButton 
} from '@coreui/react';
import { BOOKING_QUERY } from './booking'
import { useForm } from 'react-hook-form'
import RenderFormFields from '../../../../components/FormWrapper/RenderFormFields';
const BOOKING_MUTATION = gql`
mutation DestinationCreateOneMutation($destinationCreateOneRecord: CreateOneDestinationInput!) {
  destinationCreateOne(record: $destinationCreateOneRecord) {
    record {
      destinationName
      country
      city
    }
  }
}
  `; 
const CreateYachtType = ({ onCreate }) => {
  const [YachtTypeMutation, { data }] = useMutation(BOOKING_MUTATION, {
    refetchQueries: [
      { query: BOOKING_QUERY, variables: {} }
    ]
  });
 
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [serverimgUrl, setServerImgUrl] = useState(null);
  const handleFileChange = useCallback(
    async (e) => {
      e.preventDefault()
      const { files: [inputFile] } = e.target
      setImg(inputFile)
      //console.log( e.target.files[0])
      setImgUrl(URL.createObjectURL(e.target.files[0]))
     
      try{
        const formData = new FormData()
        formData.append('profileImg', inputFile)
        axios.post(`${constant.apiurl}/api/upload/uploadFile`, formData, {
        }).then(res => {
            //console.log( res)
            setServerImgUrl(res.data.fileurl);
        })
       // const { data: { upload: filename } } = await DestnationImgMutation({ variables : { "uploadImageFile" : inputFile}})
       // //console.log( filename);
      }
      catch(ex)
      {
//console.log( ex)
      }
  
    },
    [],
  );
  
  const { register, getValues, handleSubmit, reset } = useForm();
  // typename
  //   description
  const onSubmit =  (values) => {
    const { destinationName, country } = values;
    //console.log( "checker >>> destinationName", destinationName);
    //console.log( "checker >>> country", country);
    YachtTypeMutation({
      variables: {
        "destinationCreateOneRecord": {  
          "destinationName": destinationName,
        "country": country ,
        "city":destinationName, 
        "picture": {
          "url": serverimgUrl,
          "displayorder":1,
          "description":destinationName,
          "title":country,
          "pictureid":new Date().getUTCMilliseconds().toString()
        }
        
      }
      }
    });
    onCreate();
    // //console.log( "checker >>>", e);
  } ;

  return (
    <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Booking</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              New Booking
                </p>
                <CForm
      onSubmit={handleSubmit((e) => {
        onSubmit(getValues());
        reset(null);
      })}
    >
      <RenderFormFields
        fields={[{ type: 'text', label: 'User ID', id: 'userid', name: 'userid', helpText: 'User ID' },
        { type: 'text', label: 'Username', id: 'username', name: 'username', helpText: 'Username' }]}
        register={register}
      />
        <>
            <CFormLabel htmlFor={"Destination Picture"}>{"Picture"}</CFormLabel>
            <input type="file" className="form-control bg-light" onChange={handleFileChange} id="customFile" required/> 
          </>
      <RenderFormFields
        fields={[{ type: 'text', label: 'Message', id: 'message', name: 'message', helpText: 'Message' },
        { type: 'number', label: 'YachtPoints', id: 'yachtPoints', name: 'yachtPoints', helpText: 'Yacht Points' },
        { type: 'date', label: 'Booking Date', id: 'bookingdate', name: 'bookingdate', helpText: 'Booking Date' },
        { type: 'date', label: 'From', id: 'fromDate', name: 'fromDate', helpText: 'From' },
        { type: 'date', label: 'To', id: 'toDate', name: 'toDate', helpText: 'To' },
        { type: 'text', label: 'Empty Legs', id: 'emptylegs', name: 'emptylegs', helpText: 'Empty Legs' }]}
        register={register}
      />
      <CButton type="submit" color="primary">
        Submit
      </CButton>
    </CForm>
            
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
