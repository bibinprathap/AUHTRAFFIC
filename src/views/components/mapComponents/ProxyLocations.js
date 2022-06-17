import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
 
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  CCard,
  CCardBody,
  CCardHeader, 
  CImage,
  CButton,
  CProgress,
  CCardFooter,
  CCardGroup, 
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'; 
import CIcon from '@coreui/icons-react'
const ProxyLocations  = ({  officedata,infoLocation,locationsprops  ,employeespercentage,nooflocationemployees}) => { 
  let employeeCount =nooflocationemployees ;
  let employeePercentage = employeespercentage; 
  //console.log( infoLocation);
// if(officedata)
// {
  
//   employeeCount =parseInt(officedata?.nationalcount )||0 ;
//   employeePercentage =  Math.round(  parseInt(officedata?.nationalcount)/ ( parseInt(officedata?.nonnationalcount) + parseInt(officedata?.nationalcount) )* 100) ||0;
 
// }

   return ( 
        <CCard className="mb-4 proxylocation">
          <CCardHeader>
          <CRow  className="fullwidth ">
                    <CCol sm="12">
          <div className="fs-5 fw-semibold headingCenter proxyheadingCenter"> {locationsprops?.DISTRICTNAMEENG}</div>
          </CCol>
                  
                  </CRow>
          
          </CCardHeader>
          <CCardBody style={{justifyContent: 'center', padding:0, margin:0, alignItems: 'center', display: 'flex', flexDirection: 'column'}} >
          
      
                        <CRow  className="fullwidth">
                  <CCol sm="12">
                  <div className="progress-group" style={{padding: 0,margin: 0,marginBottom: '3px'}}>
                    <div className="progress-group-header">
                      {/* <CIcon className="icon icon-lg me-2" name="cil-people" /> */}
              
                     
<div className="text-medium-emphasis small smallproxy">Number Of Employee</div>
                    
                      <span className="ms-auto fs-5 fw-semibold fw-semiboldproxy">
                      {employeeCount} <span className="text-medium-emphasis small">({Math.floor(employeePercentage)}%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={employeePercentage} />
                    </div>
                  </div>
           
                    </CCol>
                  
                     </CRow>

                 <CRow    className="fullwidth">
                    <CCol sm="6">
                    <div className=" py-1 px-3 mb-3 proxymb-3">
                        <div className="text-medium-emphasis small smallproxy ">Duration</div>
                        <div className="fs-5 fw-semibold fw-semiboldproxy"> {  Math.floor((infoLocation?.durationtooffice)/60)  }mnts   </div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                    <div className="py-1 px-3 mb-3 proxymb-3">
                        <div className="text-medium-emphasis small smallproxy">Distance</div>
                        <div className="fs-5 fw-semibold fw-semiboldproxy "> {  Math.floor((infoLocation?.distancetooffice)/1000) }km     </div>
                      </div>
                    </CCol>
                  
                  </CRow>
                 
                
          
      
          </CCardBody>
        </CCard>
     
  );
}

ProxyLocations.propTypes = {
  onCreate: PropTypes.func,
  officedata: PropTypes.array,
  infoLocation: PropTypes.any,
  locationsprops: PropTypes.any,
  employeespercentage: PropTypes.any, 
  nooflocationemployees: PropTypes.any,
}
export default ProxyLocations;
