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


const upArrow = <svg
  width="20px"
  height="20px"
  fill="currentColor"
  viewBox="0 0 512 512"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>ionicons-v5-b</title>
  <path
    d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,
18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"
  />
</svg>

const downArrow = <svg
  fill="currentColor"
  width="20px"
  height="20px"
  viewBox="0 0 512 512"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>ionicons-v5-b</title>
  <path d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z" />
</svg>
const OfficeCard  = ({  officedata }) => {

  let nationalCount = 277;
  let nationalPercentage = 23;
  let nonnationalemployeeCount = 127;
  let nonnationalPercentage = 23;
  let employeecount = 32352; 
  let employeecountPercentage = 23; 
  let directhirecount = 840; 
  let directhirecountPercentage = 23; 
  let permenentcount = 6698; 
  let permenentcountPercentage = 23; 
  let Regularcount = 196; 
  let RegularcountPercentage = 23; 
  let showwarnerbrosindicators = false ;
  
if(officedata)
{
  
  nationalCount =parseInt(officedata?.nationalcount )||0 ;
  nationalPercentage =  Math.round(  parseInt(officedata?.nationalcount)/ ( parseInt(officedata?.nonnationalcount) + parseInt(officedata?.nationalcount) )* 100) ||0;

  nonnationalemployeeCount =parseInt(officedata?.nonnationalcount) ||0;
  nonnationalPercentage =  Math.round(  parseInt(officedata?.nonnationalcount)/ ( parseInt(officedata?.nationalcount) + parseInt(officedata?.nonnationalcount) )* 100) ||0;

  
  employeecount =parseInt(officedata?.employeecount) ||0;
  employeecountPercentage =  Math.round(  parseInt(officedata?.employeecount)/ ( parseInt(officedata?.directhirecount) + parseInt(officedata?.employeecount) + parseInt(officedata?.permenentcount) + parseInt(officedata?.Regularcount ) )* 100) ||0; 

  directhirecount =parseInt(officedata?.directhirecount) ||0;
  directhirecountPercentage =  Math.round(  parseInt(officedata?.directhirecount)/ ( parseInt(officedata?.directhirecount) + parseInt(officedata?.employeecount) + parseInt(officedata?.permenentcount) + parseInt(officedata?.Regularcount ) )* 100) ||0; 

  permenentcount =parseInt(officedata?.permenentcount) ||0;
  permenentcountPercentage =  Math.round(  parseInt(officedata?.permenentcount)/ ( parseInt(officedata?.directhirecount) + parseInt(officedata?.employeecount) + parseInt(officedata?.permenentcount) + parseInt(officedata?.Regularcount ) )* 100) ||0; 

  Regularcount =parseInt(officedata?.Regularcount) ||0;
  RegularcountPercentage =  Math.round(  parseInt(officedata?.Regularcount)/ ( parseInt(officedata?.directhirecount) + parseInt(officedata?.employeecount) + parseInt(officedata?.permenentcount) + parseInt(officedata?.Regularcount ) )* 100) ||0; 

}

let locoldarrowupTravellingTime =false;
let locoldpercentageTravellingTime = 0;
   return ( 
        <CCard className="mb-4">
          <CCardHeader>
          <CRow  className="fullwidth ">
                    <CCol sm="12">
          <div className="fs-5 fw-semibold headingCenter"> {officedata?.businessgroupname}</div>
          </CCol>
                  
                  </CRow>
          
          </CCardHeader>
          <CCardBody style={{justifyContent: 'center',  alignItems: 'center', display: 'flex', flexDirection: 'column'}} >
                 <CRow  className="fullwidth">
                    <CCol sm="6">
                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Location</div>
                        <div className="fs-5 fw-semibold">  {officedata?.locationname}</div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                       
                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">No. Of Male National Employees</div>
                        <div className="fs-5 fw-semibold">  {officedata?.numberofemployees}</div>
                      </div>
             
                     </CCol>
                  </CRow>
             
                <CRow  className="fullwidth">
                  <CCol sm="6">
                    <div className=" border-start-warning py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold" >Warner bros</div>
                           
                        <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
       {showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div> :null}
   
      </div>


      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Distance:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 22.5 km   </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      </div>

      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Total Duration'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>  85 mins  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      </div>


      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Total Distance'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 103 km </strong>  
                            
                          </div>
                      
     </div>

     {showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      
      </div>

                      </div>
                    </CCol>
                    <CCol sm="6">   
                    <div className="   border-start-warning py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold" >ADNEC</div>
                     
                        <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {!showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      </div>


      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Distance:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 22.5 km   </strong>  
                            
                          </div>
                       
     </div>
     {!showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      </div>

      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Total Duration'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>  85 mins  </strong>  
                            
                          </div>
                       
     </div>
     {!showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      </div>


      <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Total Distance'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 103 km </strong>  
                            
                          </div>
                      
     </div>

     {!showwarnerbrosindicators? <div className="valueContainer" > 
                          <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {locoldpercentageTravellingTime * -1} % </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
     </div>:null}
      
      </div>



                      </div> 
                     </CCol>
                </CRow>
                  
                     
            

                   
                    

              
             

          {/* <CImage
                width="149px"
                src={officedata?.picture[0]?.url}
                className="d-inline-block align-top"
                alt="CoreuiVue"
              /> */}
          
      
          </CCardBody>
        </CCard>
     
  );
}

OfficeCard.propTypes = {
  onCreate: PropTypes.func,
  officedata: PropTypes.array,
}
export default OfficeCard;
