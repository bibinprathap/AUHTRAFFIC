import React, { useState, useCallback, useEffect,useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CContainer,
  CProgress,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow, CSpinner,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { DocsCallout, Example } from 'src/reusable'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import resn from '../../../../views/dashboard/resn'
 
import employeehomelocation from  './employeehomelocation'
import employeepercentage from '../../mapComponents/employeepercentage'
// export const DESTINATION_QUERY = gql`
//   {
//     employeeOfficeMany {
//       businessgroupname 
//       locationname
//       numberofemployees
//       _id
//     }
//   }
// `


const backIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
</svg>;



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
 
  let showwarnerbrosindicators = true ;
  const sideaddresspanel = useRef();
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [openaddressPanel, setOpenaddressPanel] = useState(false);
  const   data  = {employeeOfficeMany: resn.data.destinations } ;
  //relation 
   //employeehomelocation.filter(f=>   f.buildingofficelocation ==   employeeoffice.find(o=>o.businessgroupname == "The Mohamed bin Zayed Species Conservation Fund" )?.locationname &&    f.businessgroupname ==   employeeoffice.find(o=>o.businessgroupname == "The Mohamed bin Zayed Species Conservation Fund" )?.businessgroupname &&   f.officelat.toString().substr(0,8) == employeeoffice.find(o=>o.businessgroupname == "The Mohamed bin Zayed Species Conservation Fund" )?.location.coordinates[1].toString().substr(0,8) && f.officelng.toString().substr(0,8) == employeeoffice.find(o=>o.businessgroupname == "The Mohamed bin Zayed Species Conservation Fund" )?.location.coordinates[0].toString().substr(0,8))
   
     //total duration , total distance 
     var globalduration =  Math.floor(14411703 * 0.0002777778 ) ;
     var globaldistance  =  Math.floor(274587390/1000); 
    //  employeehomelocation.reduce((total, h)=> { 
    //   return total  + (parseInt( h.numberofemployees) * parseInt(h.durationtooffice));
    //  },0); //  14411703
 
    
    //  employeehomelocation.reduce((total, h)=> { 
    //    return total  + (parseInt( h.numberofemployees) * parseInt(h.distancetooffice));
    //   },0);//274587390 
 // employeeoffice 
  //  employeeoffice.filter(f=>f._id==11076479864916376).map(of=>{
//    employeeoffice.filter(f=>f.businessgroupname=="The Mohamed bin Zayed Species Conservation Fund").map(of=>{
//     var homeLocations = employeehomelocation.filter(f=> f.buildingofficelocation ==    of?.city &&    f.businessgroupname ==    of?.businessgroupname  &&  f.officelat.toString().substr(0,8) == of?.location.coordinates[0].toString().substr(0,8) && f.officelng.toString().substr(0,8) == of?.location.coordinates[1].toString().substr(0,8) )  ;
// var totalduration = homeLocations.reduce((total, h)=> {
//  return total  + (parseInt( h.numberofemployees) * parseInt( h.durationtooffice));
// },0);
// of.totalduration = totalduration;
// var totaldistance = homeLocations.reduce((total, h)=> {
//  return total  + (parseInt( h.numberofemployees) * parseInt( h.distancetooffice));
// },0);
// of.totaldistance = totaldistance; 
// var alrahatotalduration = homeLocations.reduce((total, h)=> {
//     var alrahaoff= employeepercentage.find(e=>e.locationid == h.locationid);
//   return total  + (parseInt( h.numberofemployees) * parseInt(alrahaoff?.durationtooffice));
//  },0);
//  of.alrahatotalduration = alrahatotalduration; 
//  var alrahatotaldistance = homeLocations.reduce((total, h)=> {
//   var alrahaoff= employeepercentage.find(e=>e.locationid == h.locationid);
// return total  + (parseInt( h.numberofemployees) * parseInt(alrahaoff?.distancetooffice));
// },0);
// of.alrahatotaldistance = alrahatotaldistance;
//  const diffr = totalduration - alrahatotalduration; 
//  const locoldarrowupTravellingTime =diffr<0
//  const locoldpercentageTravellingTime =  Math.floor((diffr / alrahatotalduration) * 100); 
// of.locoldpercentageTravellingTime =locoldpercentageTravellingTime
// of.locoldarrowupTravellingTime =locoldarrowupTravellingTime
// const diffrdistance = totaldistance - alrahatotaldistance; 
// const locoldarrowupdistance =diffrdistance<0
// const locoldpercentagedistance =  Math.floor((diffrdistance / alrahatotaldistance) * 100); 
// of.locoldpercentagedistance =locoldpercentagedistance
// of.locoldarrowupdistance =locoldarrowupdistance

// var alrahatotaldistance = homeLocations.reduce((total, h)=> {
//   var alrahaoff= employeepercentage.find(e=>e.locationid == h.locationid);
// return total  + (parseInt( h.numberofemployees) * parseInt(alrahaoff?.distancetooffice));
// },0);
// of.alrahatotaldistance = alrahatotaldistance;

// const totaldiffr = totalduration   - alrahatotalduration; 
// const loctotalpercentageTravellingTime =   Math.floor((totaldiffr /  60 )); 
// of.loctotalpercentageTravellingTime =loctotalpercentageTravellingTime;


// const totaldistancediffr = totaldistance   - alrahatotaldistance; 
// const loctotalpercentagedistance =   Math.floor((totaldistancediffr /  60 )); 
// of.loctotalpercentagedistance =loctotalpercentagedistance;

// of.homeLocations  = homeLocations

// of.percentageTravelhomeLocations  = Math.floor( ((totaldistance/274587390 ) * 100) * 100) / 100   
 
//  return  of;
//    })
// const nanon = [
//   "National",
//   "Non-National",
//   "National ",
//   "Non - National",
//   "National/Non-National",
//   "Non National",
//   "Non- National",
//   "National-Non-National",
//   "national",
//   "non-national"
// ]
//  nanon.filter(f=>f!="National" && f!="National " &&f!="national" )
//  nanon.filter(f=>f=="National" ||f=="National " ||f=="national" )



   //employeepercentage.find(e=>e.locationid == "201").durationtooffice


  // useEffect(() => {
  //   getYachtType();
  //   if (data) {
  //     setYachtTypedata(data.employeeOfficeMany);
  //   }
  // }, [data, getYachtType])


  // if (loading) return <CSpinner />;
  // if (error) return `Error! ${error.message}`;
  let averageTravellingTime = 0;
  //let averagelocoldpercentageTravellingTime = 0;
  let averagedistance = 0;
  let noofemployee = 0;

  if ( selectedOffice) {
    averageTravellingTime = 0;
    averagedistance = 0;

    noofemployee =     selectedOffice.homeLocations.reduce((total, h)=> {
                return total  + parseInt(h.numberofemployees);
            },0);

            var totaldistance = selectedOffice.homeLocations.reduce((total, h)=> {
              var alrahaoff= employeepercentage.find(e=>e.locationid == h.locationid);
              return total  + (parseInt( h.numberofemployees) * parseInt(alrahaoff?.distancetooffice));
     
                    },0); 
                    var totalduration = selectedOffice.homeLocations.reduce((total, h)=> {
                        var alrahaoff= employeepercentage.find(e=>e.locationid == h.locationid);
        return total  + (parseInt( h.numberofemployees) * parseInt(alrahaoff?.durationtooffice));
     
    },0); 
  averageTravellingTime = (totalduration / noofemployee);
  averagedistance = (totaldistance / noofemployee);  
// var totalnumberofemployees = selectedOffice.homeLocations.reduce((total, h)=> {
//   return total  + (parseInt(h.numberofemployees));
//   },0); 
//   var totalpercentageTravellingTime = selectedOffice.homeLocations.reduce((total, h)=> {
//     let non=  h.locoldpercentageTravellingTime <0? (h.locoldpercentageTravellingTime * -1) : h.locoldpercentageTravellingTime;
//     return total  + (non);
//    },0); 
//    averagelocoldpercentageTravellingTime =   totalpercentageTravellingTime/totalnumberofemployees; 
  }

  function compare( a, b ) {
    const alocoldpercentageTravellingTime = !a.locoldarrowupTravellingTime?  (a.locoldpercentageTravellingTime ) :a.locoldpercentageTravellingTime 
    const blocoldpercentageTravellingTime = !b.locoldarrowupTravellingTime?  (b.locoldpercentageTravellingTime  ) :b.locoldpercentageTravellingTime 
  
     
      if ( alocoldpercentageTravellingTime  > blocoldpercentageTravellingTime ){
        return -1;
      }
      if ( alocoldpercentageTravellingTime < blocoldpercentageTravellingTime ){
        return 1;
      }
     
    return 0;
  }
  
 const sortedemployeeOfficeMany = data.employeeOfficeMany.filter(f=>f.numberofemployees!=0).sort( compare );

  return (
    <div>
      <CRow>

       
      
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='justify-content-md-between'>
                <CCol sm="auto">
                  <strong>%  of Travel Distance  per office</strong>
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
                        <div className="fs-5 fw-semibold"> {globalduration} Hour </div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total Distance</div>
                        {/* <div className="fs-5 fw-semibold">{Math.round(averagedistance/(1000 * (routeResults?.length ||1)))} KM</div> */}
                        <div className="fs-5 fw-semibold">  {globaldistance} KM</div>
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
              
                    <CTableHeaderCell  scope="col">Warner bros   </CTableHeaderCell>
                    <CTableHeaderCell  scope="col">ADNEC   </CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sortedemployeeOfficeMany.map((yatchtype, index) => {
                    return (
                      <CTableRow key={index + 1}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell> 
              <div  style={{width:"100%" ,cursor: "pointer"}}  onClick={((yatchtype)=>{ 
                
                debugger;
                setSelectedOffice(yatchtype);  setOpenaddressPanel(true) }).bind(this,yatchtype)}  >
               <div style={{padding:"5px"}} className="backIconContainer" >  
                            <h6>  {yatchtype.businessgroupname}  </h6> </div>
              <div style={{padding:"0 5px"}}  className="small text-medium-emphasis">
                <span>  {yatchtype.locationname} </span>
                <span>  {yatchtype._id} </span>
              </div>
              <CButton color="link" className="me-2 small text-medium-emphasis">
                      <CIcon name="cil-list" className="me-2 small text-medium-emphasis" />
                      View Details
                    </CButton> 
            </div> </CTableDataCell> 
                        <CTableDataCell>{yatchtype.numberofemployees}</CTableDataCell> 
                     
                 
                   
                      {/* <CTableDataCell>
                      <div>{Math.floor((yatchtype.alrahatotalduration/60) ||0) } mnts</div>  
                      </CTableDataCell> 
                      <CTableDataCell>
                      <div>{Math.floor((yatchtype.alrahatotaldistance/1000))} KM </div> 
                      </CTableDataCell>  */}

                      <CTableDataCell>
 
<div style={{display:'flex',flexDirection:'column',justifyContent: 'space-around', flex: 1}} >



<div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1, borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance?  <div className="valueContainer"  style={{  flex:1}}  >  
              



             <div className="progressDisplayer" style={{  flex:1}} >



             <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators?  <span className={!yatchtype.locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
        <strong>   {yatchtype.locoldpercentageTravellingTime } % </strong> 
        {yatchtype.locoldarrowupTravellingTime?upArrow:downArrow}
        </span>:null}
   
      </div>
      </div>
             </div> :null}


</div>

<div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1, borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance? <div className="valueContainer"  style={{  flex:1}} >  
             
             <div className="progressDisplayer" style={{  flex:1}}>
             <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{'Total Duration:'}
</small>  <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators?   
        <span className={!yatchtype.locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
        <strong>   { yatchtype.loctotalpercentageTravellingTime * -1} mnts </strong> 
        {yatchtype.locoldarrowupTravellingTime?upArrow:downArrow}
        </span>:null}
      </div>
             </div>
             </div> :null}


</div>

<div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1 , borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance?  <div className="valueContainer"  style={{  flex:1}} >  
             
             <div className="progressDisplayer" style={{  flex:1}}> 
                <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{' Distance%:'}
</small>  
<div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? 
                 <span className={!yatchtype.locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                 <strong>    {yatchtype.locoldpercentagedistance }  % </strong>
                 {yatchtype.locoldarrowupdistance?upArrow: downArrow}
                 </span>:null}
               </div>
             </div>
             </div>   :null}


</div>
<div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1 , borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.loctotalpercentagedistance?  <div className="valueContainer" style={{  flex:1}}>  
             
             <div className="progressDisplayer" style={{  flex:1}}>
             <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{'Total Distance:'}
</small>  
<div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? 
                 <span className={!yatchtype.locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                 <strong>    {yatchtype.loctotalpercentagedistance * -1}  KM </strong>
                 {yatchtype.locoldarrowupdistance?upArrow: downArrow}
                 </span>:null}
               </div>
             </div>
             </div>:null}


</div>

</div> 


                      </CTableDataCell> 
                    
                      <CTableDataCell>

<div style={{display:'flex',flexDirection:'column',justifyContent: 'space-around', flex: 1}} >



<div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1, borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance?  <div className="valueContainer"  style={{  flex:1}}  >  
              



             <div className="progressDisplayer" style={{  flex:1}} >



             <div    className="rowHousingproxy" >
           <small className="text-medium-emphasis">
      {'Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators?  <span className={!yatchtype.locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
        <strong>   {yatchtype.locoldpercentageTravellingTime } % </strong> 
        {yatchtype.locoldarrowupTravellingTime?upArrow:downArrow}
        </span>:null}
   
      </div>
      </div>
             </div> :null}


</div>

<div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1, borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance? <div className="valueContainer"  style={{  flex:1}} >  
             
             <div className="progressDisplayer" style={{  flex:1}}>
             <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{'Total Duration:'}
</small>  <div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators?   
        <span className={!yatchtype.locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
        <strong>   { yatchtype.loctotalpercentageTravellingTime * -1} mnts </strong> 
        {yatchtype.locoldarrowupTravellingTime?upArrow:downArrow}
        </span>:null}
      </div>
             </div>
             </div> :null}


</div>

<div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1 , borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.locoldpercentagedistance?  <div className="valueContainer"  style={{  flex:1}} >  
             
             <div className="progressDisplayer" style={{  flex:1}}> 
                <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{' Distance%:'}
</small>  
<div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? 
                 <span className={!yatchtype.locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                 <strong>    {yatchtype.locoldpercentagedistance }  % </strong>
                 {yatchtype.locoldarrowupdistance?upArrow: downArrow}
                 </span>:null}
               </div>
             </div>
             </div>   :null}


</div>
<div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between" , flex: 1 , borderBottom:'1px solid #c1bdbd33'}} >
{yatchtype.loctotalpercentagedistance?  <div className="valueContainer" style={{  flex:1}}>  
             
             <div className="progressDisplayer" style={{  flex:1}}>
             <div    className="rowHousingproxy" >
             <small className="text-medium-emphasis">
{'Total Distance:'}
</small>  
<div className="valueContainer" ><div className="dataWrapper">
                            <strong> 19 mnts  </strong>  
                            
                          </div>
                       
     </div>
     {showwarnerbrosindicators? 
                 <span className={!yatchtype.locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                 <strong>    {yatchtype.loctotalpercentagedistance * -1}  KM </strong>
                 {yatchtype.locoldarrowupdistance?upArrow: downArrow}
                 </span>:null}
               </div>
             </div>
             </div>:null}


</div>

</div> 

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
      <CRow>
        <CCol xs>
        <div ref={sideaddresspanel} className={openaddressPanel?"sidepanelAddressComparison":"sidepanelAddressClosed"}>

<div  style={{width:"100%"}} >
<div style={{padding:"10px"}} className="backIconContainer" >
  <div onClick={()=>{ setOpenaddressPanel(false)}} className="backIcon">
        {backIcon}
      </div>
                <h6>
                  {selectedOffice?.businessgroupname}
                </h6> </div>
              <div className="small text-medium-emphasis">
                <span>  </span>
              </div>
              <hr className="mt-0" />
            </div>
            <CRow className="noofemployeeAnalisis"  >

            <CCol >
                  <CRow>
                    <CCol >
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Average Travelling Time</div>

                        <div className="valueContainer" > 
                        <div className="fs-5 fw-semibold">{Math.round(averageTravellingTime/(60  ))} mnts </div>
                        {/* Old ({Math.round(oldaverageTravellingTime/(60 * (routeResults?.length ||1 )))}) %      {percentageTravellingTime * -1}   Up? {arrowupTravellingTime.toString()} green? {(!arrowupTravellingTime).toString() */}
                       
                      {selectedOffice?.locoldpercentageTravellingTime?<div className="progressDisplayer">
                            
                            <span className={ !selectedOffice?.locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed'}>
                            <strong className="fs-5 fw-semibold" >   {selectedOffice?.locoldpercentageTravellingTime }% </strong> 
                              {selectedOffice?.locoldarrowupTravellingTime ?upArrow: downArrow}
                            </span>
                         
                        </div>:null}    
     </div>

                      
                        {/* <div className="fs-5 fw-semibold"> 3 Minutes </div> */}
                      </div>
                    </CCol>
                    <CCol >
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Average Distance</div>
                        <div className="valueContainer" > 
                        <div className="fs-5 fw-semibold">{Math.round(averagedistance/(1000 ))} KM </div>
                        {/* old {Math.round(oldaveragedistance/(1000 * (oldlocationrouteResults?.length ||1)))} %    { percentagedistance * -1}  Up? {arrowupdistance.toString()} green? {(!arrowupdistance).toString()}  */}
                      {selectedOffice?.locoldpercentagedistance?<div className="progressDisplayer">
                            
                            <span className={ !selectedOffice?.locoldarrowupdistance? 'indicator green': 'indicator darkRed'}>
                            <strong className="fs-5 fw-semibold" >   {selectedOffice?.locoldpercentagedistance }% </strong> 
                              {selectedOffice?.locoldarrowupdistance ?upArrow: downArrow}
                            </span>
                          
                        </div>:null}  
                          </div>
                         

                        {/* <div className="fs-5 fw-semibold">  5 KM</div>  */}
                      </div>
                    </CCol>
                 
                  </CRow>

                  <hr className="mt-0" />

     
                </CCol>



                </CRow>
                <CRow className="noofemployeeAnalisis" >
                  
                  <CCol>
                      <div className=" py-1 px-3 mb-3 noofemployeeAnalisisWrapper">
                        <div className="text-medium-emphasis small">No. of Employees</div>
                        <div className="fs-5 fw-semibold">  {selectedOffice?.numberofemployees}</div>
                      </div>
                    </CCol>
                      <CCol>
                    </CCol> 
                  </CRow>
                  <CRow className="distanceAnalisisWrapper">
              <CContainer  className="distanceAnalisisContainer " >
             
                <CRow className="distanceAnalisisHeadWrapper">
                  <CCol>
                    <h5>Location</h5>
                  </CCol>
                  <CCol>
                    <h5>Old</h5>
                  </CCol>
                  <CCol>
                    <h5>New</h5>
                  </CCol>
                   <CCol>
                    <h5>Change</h5>
                  </CCol>
                </CRow>
           
{selectedOffice && selectedOffice.homeLocations?.map((routeResultsdata,idx) => {
  //console.log( 'routeResultsdata',routeResultsdata);
  let locationname =routeResultsdata.locationname;    
  const noofemployees = routeResultsdata.numberofemployees ||0 ; 

  let locoldTravellingTime = 0 ;
  let locolddistance = 0 ;
 
   let localraha = employeepercentage.find(e=>e.locationid == routeResultsdata.locationid);
  let locTravellingTime =localraha?.durationtooffice;
  let locdistance = localraha?.distancetooffice;;
 
  let locoldpercentageTravellingTime = 0;

  let loctotalpercentageTravellingTime = 0;
  let locoldpercentagedistance = 0;
  let loctotalpercentagedistance = 0;

  let locoldarrowupTravellingTime =false;
  let locoldarrowupdistance =false;
  let oldroutinfo =  routeResultsdata; 
   if(oldroutinfo) 
   {
    locoldTravellingTime =   oldroutinfo.durationtooffice;
    locolddistance =  oldroutinfo.distancetooffice;

     const diffr = locoldTravellingTime - locTravellingTime; 
     locoldarrowupTravellingTime =diffr<0
     locoldpercentageTravellingTime =  Math.floor((diffr / locoldTravellingTime) * 100); 

     const totaldiffr = (locoldTravellingTime * noofemployees)  - (locTravellingTime  * noofemployees); 
     loctotalpercentageTravellingTime =   Math.floor((totaldiffr /  60 )); 

 
      
     
     const diffduration = locolddistance - locdistance; 
     locoldarrowupdistance =diffduration<0
     locoldpercentagedistance =   Math.floor((diffduration / locolddistance) * 100); 

     const totaldiffkm = (locolddistance * noofemployees)  - (locdistance  * noofemployees); 

     loctotalpercentagedistance  =   Math.floor((totaldiffkm /  1000 )); 

   }
 
 

               
                  const oldtotalDuration =  Math.floor((oldroutinfo.durationtooffice  * noofemployees)/60) ||0;
                  const oldtotalDistance = Math.floor((oldroutinfo.distancetooffice * noofemployees)/1000) ||0;
                 
             
                  return (
                      <CRow key={`nameKey${idx}`} className="distanceAnalisisBodyWrapper">
                        <CCol className="text-center d-flex justify-content-center align-items-center">
                 
 
  <div>
  <div className="small  "> 

  {/* <strong>  
    { routeResultsdata.routes[0]?.legs[0]?.end_address?.indexOf("Musaffah")  >-1 ? 
     routeResultsdata.routes[0]?.legs[0]?.end_address?.split("-")[2]:
      routeResultsdata.routes[0]?.legs[0]?.end_address?.split("-")[1] }  
  </strong> */}
   <strong>  
    {locationname}  
  </strong> 
  </div>
 
       
           <small className="text-medium-emphasis small">
      {'No. of Employees: '}
        </small>  <strong>   { noofemployees } </strong>
 
  </div>

                        </CCol>
                        <CCol className="comparisonWrapper">

                          
  <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-around', flex: 1}} >
 
 
    
     <div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
           <small className="text-medium-emphasis">
      {'Average Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>    {  Math.floor((oldroutinfo.durationtooffice)/60)    }mnts    </strong>  
                            
                          </div>
                       
     </div>
      
      </div>
     <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
           <small className="text-medium-emphasis">
      {'Total Duration:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>  {oldtotalDuration} mnts </strong>  
                            
                          </div>
                       
     </div>
      
      </div>

      <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
           <small className="text-medium-emphasis">
      {'Average Distance:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>  {  Math.floor((oldroutinfo.distancetooffice)/1000)  } km   </strong>  
                            
                          </div>
                       
     </div>
      
      </div>
      <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
           <small className="text-medium-emphasis">
      {'Total Distance:'}
        </small>   <div className="valueContainer" ><div className="dataWrapper">
                            <strong>  {oldtotalDistance} km </strong>  
                            
                          </div>
                       
     </div>
      
      </div>
 
  </div>

                     
                        </CCol>
                        <CCol className="comparisonWrapper">
                                       
                
                        <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-around', flex: 1}} >
 
 
    
 <div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
          <div className="valueContainer" ><div className="dataWrapper">
                        <strong>  {Math.floor((localraha?.durationtooffice)/60)} mnts   </strong>  
                        
                      </div>
                   
 </div>
  
  </div>
 <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
         <div className="valueContainer" ><div className="dataWrapper">
                        <strong>  {Math.floor((localraha?.durationtooffice * noofemployees)/60)} mnts </strong>  
                        
                      </div>
                   
 </div>
  
  </div>

  <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
         <div className="valueContainer" ><div className="dataWrapper">
                        <strong>  {  Math.floor((localraha?.distancetooffice)/1000)  } km    </strong>  
                        
                      </div>
                   
 </div>
  
  </div>
  <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
         <div className="valueContainer" ><div className="dataWrapper">
                        <strong>  {Math.floor((localraha?.distancetooffice * noofemployees)/1000)} km </strong>  
                        
                      </div>
                   
 </div>
  
  </div>

</div>
                        </CCol>
                        <CCol className="comparisonWrapper">
                           
                        <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-around', flex: 1}} >
 
 
    
 <div  style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
 {locoldpercentagedistance?  <div className="valueContainer" >  
                                   
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
 <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
 {locoldpercentagedistance? <div className="valueContainer" >  
                                   
                                   <div className="progressDisplayer">
                                   <div className='staticsWrapper'>
                              <span className={!locoldarrowupTravellingTime? 'indicator green': 'indicator darkRed' }>
                              <strong>   {loctotalpercentageTravellingTime * -1} mnts </strong> 
                              {locoldarrowupTravellingTime?upArrow:downArrow}
                              </span>
                            </div>
                                   </div>
                                   </div> :null}

  
  </div>

  <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
  {locoldpercentagedistance?  <div className="valueContainer" >  
                                   
                                   <div className="progressDisplayer">
                                     <div className='staticsWrapper'>
                                       <span className={!locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                                       <strong>    {locoldpercentagedistance * -1}  % </strong>
                                       {locoldarrowupdistance?upArrow: downArrow}
                                       </span>
                                     </div>
                                   </div>
                                   </div>   :null}

  
  </div>
  <div   style={{display:'flex',flexDirection:'row',justifyContent: "space-between"}} >
  {loctotalpercentagedistance?  <div className="valueContainer" >  
                                   
                                   <div className="progressDisplayer">
                                     <div className='staticsWrapper'>
                                       <span className={!locoldarrowupdistance? 'indicator green': 'indicator darkRed'  }>
                                       <strong>    {loctotalpercentagedistance * -1}  KM </strong>
                                       {locoldarrowupdistance?upArrow: downArrow}
                                       </span>
                                     </div>
                                   </div>
                                   </div>:null}

  
  </div>

</div>
                                       
                                                             </CCol>
                      </CRow>)
                  }) }
                 
              </CContainer>
                </CRow>  


         

          </div>
</CCol>
            </CRow> 


    </div>

  )
}

export default Tables
