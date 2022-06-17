import React, { lazy,useMemo, useState, useEffect } from 'react';
import { useMutation,useQuery } from '@apollo/react-hooks';

import {
  CFormLabel,
  CFormControl,
  CFormText,
  CFormCheck,
  CFormSelect,
 
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCallout
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { Controller, useFormContext,FormProvider, useForm } from 'react-hook-form'
import MapComponents from '../components/mapComponents/index.js' 
import axios from 'axios';
import resn from './resn'

import gql from 'graphql-tag'; 

const WidgetsDropdown = lazy(() => import('../components/widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../components/widgets/WidgetsBrand.js'))

export const YACH_TYPE_QUERY = gql`
{
  employeeOfficeMany {
    businessgroupname
    locationname 
    _id
  }
}
`

const Dashboard = () => {

  const LocationList = useForm();
  const [selectedLatLng, setLatLang] = useState(null); 
  const [customValueKey, setCustomValueKey] = useState(null); 
  const [selectedoffice, setSelectedoffice] = useState(null); 
  const [currentLocations, setLocations] = useState([]);
  const [averagevalues, setAveragevalues] = useState({
                                                    averageTravellingTime: 4159,
                                                    averagedistance : 83299 
                                                    }); 
  const [currentEmployeeLocations, setCurrentEmployeeLocations] = useState([]);
  const [officeLocations, setOfficeLocations] = useState([]);
  const [employeeHome, setEmployeeHome] = useState([]);
 
  const  typeData  =  {employeeOfficeMany: resn.data.destinations }

  const yatchTypeOptions = useMemo(() => {
    if (typeData) {
      const { employeeOfficeMany } = typeData
      //console.log( 'type data >>', employeeOfficeMany)
      return [...employeeOfficeMany.map(e=>{return {...e, typename: e.businessgroupname +  ' - ' + e.locationname}})]
    }
    return []
  }, [typeData])

  const { register, getValues, handleSubmit, reset, setValue, watch } = LocationList;

  useEffect(() => {
    getLocations()
  }, [])

  const onSubmit = (values) => {
    //console.log( 'test user >>>', values)
  };

  const getLocations = () => {
   // axios.get('https://joinyasalam.com/yatch/api/yacht/getAllOfficeLocations').then(res => {
  // axios.get('http://10.10.158.47:4000/api/yacht/getAllOfficeLocations').then(resn => {
  //console.log( 'resn',resn);
     // //console.log( 'testing res data >>>', res.data)
   //  //console.log( 'getAllOfficeLocations res data >>>', res.data)
//   const resn = {data:  {
//     "destinations": [
//         {
//             "location": {
//                 "type": "Point",
//                 "coordinates": [
//                     54.4579429,
//                     24.4226169
//                 ]
//             },
//             "_id": "6165328c53429b1f08fa6577",
//             "businessgroupname": "Department of Finance - Abu Dhabi",
//             "businessgroupid": "81",
//             "locationid": "85",
//             "locationname": "Abu Dhabi Customs Main Office",
//             "numberofemployees": "70",
//             "picture": [
//                 {
//                     "_id": "6165328c53429b1f08fa6578",
//                     "pictureid": "609",
//                     "title": "Department of Finance - Abu Dhabi",
//                     "description": "Department of Finance - Abu DhabiAbu Dhabi Customs Main Office",
//                     "displayorder": 1,
//                     "url": "http://10.10.158.47:4000/public/03fcbc84-97a0-4a1e-8c8e-d6a748b9c6f7-ded.jpg"
//                 }
//             ],
//             "updatedAt": "2021-10-12T07:00:28.817Z",
//             "createdAt": "2021-10-12T07:00:28.817Z",
//             "__v": 0
//         },
//         {
//             "location": {
//                 "type": "Point",
//                 "coordinates": [
//                     54.609451,
//                     24.32172400000001
//                 ]
//             },
//             "_id": "61653c0153429b1f08fa65ba",
//             "businessgroupname": "Zayed Higher Organization for People of Determination",
//             "businessgroupid": "809",
//             "locationid": "106405",
//             "locationname": "ZHO Zayed Higher Organization-Al Que - Eastern Region",
//             "numberofemployees": "17",
//             "picture": [
//                 {
//                     "_id": "61653c0153429b1f08fa65bb",
//                     "pictureid": "392",
//                     "title": "Zayed Higher Organization for People of Determination",
//                     "description": "Zayed Higher Organization for People of DeterminationZHO Zayed Higher Organization-Al Que - Eastern Region",
//                     "displayorder": 1,
//                     "url": "http://10.10.158.47:4000/public/452ef34c-2e0e-4462-8b89-d27428e46ad6-adphc.jpg"
//                 }
//             ],
//             "updatedAt": "2021-10-12T07:40:49.650Z",
//             "createdAt": "2021-10-12T07:40:49.650Z",
//             "__v": 0
//         }
//     ],
//     "totalPages": 1,
//     "currentPage": 1
// }}    
      const resolvedDatan = resn.data.destinations.map(data => {
        return ({
          lat: data.location.coordinates[1],
          lng: data.location.coordinates[0],
          _id: data._id, 
          empno: data.numberofemployees

        });
      })
      setLocations(resolvedDatan)
      setOfficeLocations(resn.data.destinations);
      //console.log( 'testing res data >>>', resolvedDatan)
    // }).catch(err => {
    //   //console.log( 'on error >>>', err);

    // });

//  axios.get('http://10.10.158.47:4000/api/yacht/getAllEmployeeHome').then(res => {
//     //console.log( 'getAllEmployeeHome res data >>>', res.data)
//     //   const res = {data: {
//     //     "destinations": [
//     //         {
//     //             "location": {
//     //                 "type": "Point",
//     //                 "coordinates": [
//     //                     54.5686489,
//     //                     24.4140115
//     //                 ]
//     //             },
//     //             "_id": "61654aa953429b1f08fa65d1",
//     //             "businessgroupname": "Department of Finance - Abu Dhabi",
//     //             "businessgroupid": "6165328c53429b1f08fa6577",
//     //             "locationid": "2",
//     //             "employename": "sijo",
//     //             "locationname": "Khalifa City - Abu Dhabi - United Arab Emirates",
//     //             "picture": [
//     //                 {
//     //                     "_id": "61654aa953429b1f08fa65d2",
//     //                     "pictureid": "902",
//     //                     "title": "Department of Finance - Abu Dhabi",
//     //                     "description": "Department of Finance - Abu DhabiKhalifa City - Abu Dhabi - United Arab Emirates",
//     //                     "displayorder": 1,
//     //                     "url": "http://10.10.158.47:4000/public/eb6df64d-bbd3-49c1-9840-3d47debfac5f-arab_boy.png"
//     //                 }
//     //             ],
//     //             "updatedAt": "2021-10-12T08:43:21.149Z",
//     //             "createdAt": "2021-10-12T08:43:21.149Z",
//     //             "__v": 0
//     //         },
//     //         {
//     //             "location": {
//     //                 "type": "Point",
//     //                 "coordinates": [
//     //                     54.351714,
//     //                     24.470069
//     //                 ]
//     //             },
//     //             "_id": "616572f54348691ca4895c0e",
//     //             "businessgroupname": "Zayed Higher",
//     //             "businessgroupid": "61653c0153429b1f08fa65ba",
//     //             "locationid": "22",
//     //             "employename": "John",
//     //             "locationname": "Khalidiyah Mall, Khalidiyah - Mubarak Bin Mohammed Street - Abu Dhabi - United Arab Emirates",
//     //             "picture": [
//     //                 {
//     //                     "_id": "616572f54348691ca4895c0f",
//     //                     "pictureid": "928",
//     //                     "title": "Zayed Higher",
//     //                     "description": "Zayed HigherKhalidiyah Mall, Khalidiyah - Mubarak Bin Mohammed Street - Abu Dhabi - United Arab Emirates",
//     //                     "displayorder": 1,
//     //                     "url": "http://10.10.158.47:4000/public/fbd29927-066f-4dc2-a257-8866a98775ae-arab_girl.png"
//     //                 }
//     //             ],
//     //             "updatedAt": "2021-10-12T11:35:18.014Z",
//     //             "createdAt": "2021-10-12T11:35:18.014Z",
//     //             "__v": 0
//     //         },
//     //         {
//     //             "location": {
//     //                 "type": "Point",
//     //                 "coordinates": [
//     //                     54.7125815,
//     //                     24.4256644
//     //                 ]
//     //             },
//     //             "_id": "616579624348691ca4895c30",
//     //             "businessgroupname": "Department of finance",
//     //             "businessgroupid": "6165328c53429b1f08fa6577",
//     //             "locationid": "34",
//     //             "employename": "Cheriyan",
//     //             "locationname": "Al Falah - Abu Dhabi - United Arab Emirates",
//     //             "picture": [
//     //                 {
//     //                     "_id": "616579624348691ca4895c31",
//     //                     "pictureid": "94",
//     //                     "title": "Department of finance",
//     //                     "description": "Department of financeAl Falah - Abu Dhabi - United Arab Emirates",
//     //                     "displayorder": 1,
//     //                     "url": "http://10.10.158.47:4000/public/524c7805-9002-4db8-9e73-addf2eea99ee-arab_girl.png"
//     //                 }
//     //             ],
//     //             "updatedAt": "2021-10-12T12:02:42.168Z",
//     //             "createdAt": "2021-10-12T12:02:42.168Z",
//     //             "__v": 0
//     //         }
//     //     ],
//     //     "totalPages": 1,
//     //     "currentPage": 1
//     // }}  
//       const resolvedData = res.data.destinations.map(data => {
//         return ({
//           lat: data.location.coordinates[1],
//           lng: data.location.coordinates[0],
//           _id: data._id, 
//           empno: data.employename,
//           businessgroupid: data.businessgroupid,
//           ...data

//         });
//       })
//       setCurrentEmployeeLocations(resolvedData)
//      setEmployeeHome(res.data.destinations);
//       //console.log( 'testing res data >>>', resolvedData)
//     }).catch(err => {
//       //console.log( 'on error >>>', err);

//     });

  }
  const handleAddress = (addressData) => {
    //console.log( addressData)
    const countryEntry = addressData.find(addArray => addArray?.types?.includes("country"))
    const cityEntry = addressData.find(addArray => addArray?.types?.includes("administrative_area_level_2"))
    const employeeOfficeEntry = addressData.find(addArray => addArray?.types?.includes("locality"))
    setValue('country', countryEntry ? countryEntry['long_name'] : "")
    setValue('city', cityEntry ? cityEntry['long_name'] : "")
    setValue('employeeOfficeName', employeeOfficeEntry ? employeeOfficeEntry['long_name'] : "")
  }
 
  const proxylocationRountingresult =  (averageTravellingTime,averagedistance)=>{

                    setAveragevalues({  averageTravellingTime,
                                        averagedistance 
                                         }); 
  }
  const onSelectLocation = ({ lat, lng }) => {
    setLatLang({ lat, lng });
    if(window.employeeMap)
    {
    window.employeeMap.panTo(new window.google.maps.LatLng(lat, lng ) );
    setTimeout(()=>{ 
        window.employeeMap.setZoom(16)
    },1000)
    }
     
    // axios({
    //   method: 'get',
    //   url: 'http://10.10.158.47:4000/api/yacht/getAllOfficeLocations',
    //   params,
    // }).then(resn => {
    //   //console.log( 'getAllOfficeLocations res data >>>', resn.data)
     
    //   const resolvedDatan = resn.data.destinations.map(data => {
    //     return ({
    //       lat: data.location.coordinates[1],
    //       lng: data.location.coordinates[0],
    //       _id: data._id,
    //       empno: data.numberofemployees

    //     });
    //   })
    //   //setLocations(resolvedDatan)
    //   //setOfficeLocations(resn.data.destinations);
    //   //console.log( 'testing res data >>>', resolvedDatan)
    // }).catch(err => {
    //   //console.log( 'on error >>>', err);

    // });

    // axios({
    //   method: 'get',
    //   url: 'http://10.10.158.47:4000/api/yacht/getAllEmployeeHome',
    //   params,
    // } ).then(res => {
    //   //console.log( 'getAllEmployeeHome res data >>>', res.data)
    //      const resolvedData = res.data.destinations.map(data => {
    //       return ({
    //         lat: data.location.coordinates[1],
    //         lng: data.location.coordinates[0],
    //         _id: data._id,
    //         empno: data.employename,
    //         businessgroupid: data.businessgroupid,
    //         ...data

    //       });
    //     })
    //     setCurrentEmployeeLocations(resolvedData)
    //     setEmployeeHome(res.data.destinations);
    //     //console.log( 'testing res data >>>', resolvedData)
    //   }).catch(err => {
    //     //console.log( 'on error >>>', err);

    //   });
  };

  //console.log( 'currentLocations >>>', currentLocations);

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  let maleCount = 19832;
  let malePercentage = 23;
  let femaleCount = 20668;
  let femalePercentage = 23;
  let nationalCount = 27741;
  let nationalPercentage = 23;
  let nonnationalemployeeCount = 12759;
  let nonnationalPercentage = 23;
  let employeecount = 32352; 
  let employeecountPercentage = 23; 
  let directhirecount = 840; 
  let directhirecountPercentage = 23; 
  let permenentcount = 6698; 
  let permenentcountPercentage = 23; 
  let Regularcount = 196; 
  let RegularcountPercentage = 23; 
  let singlecount = 9201; 
  let singlePercentage = 23; 
  let marriedcount = 31135; 
  let marriedPercentage = 23;



  let noofemployee = 40926;
  let noofoffices = officeLocations?.length ||0;


if(selectedoffice)
{

  noofemployee =  selectedoffice?.numberofemployees ||0;
  maleCount = selectedoffice?.malecount ||0;
  malePercentage =  Math.round(   parseInt(selectedoffice?.malecount)/ ( parseInt(selectedoffice?.malecount) + parseInt(selectedoffice?.femalecount) )* 100) ||0;

  femaleCount =parseInt(selectedoffice?.femalecount) ||0;
  femalePercentage =  Math.round(  parseInt(selectedoffice?.femalecount)/ ( parseInt(selectedoffice?.malecount) + parseInt(selectedoffice?.femalecount) )* 100) ||0;

  nationalCount =parseInt(selectedoffice?.nationalcount )||0 ;
  nationalPercentage =  Math.round(  parseInt(selectedoffice?.nationalcount)/ ( parseInt(selectedoffice?.nonnationalcount) + parseInt(selectedoffice?.nationalcount) )* 100) ||0;

  nonnationalemployeeCount =parseInt(selectedoffice?.nonnationalcount) ||0;
  nonnationalPercentage =  Math.round(  parseInt(selectedoffice?.nonnationalcount)/ ( parseInt(selectedoffice?.nationalcount) + parseInt(selectedoffice?.nonnationalcount) )* 100) ||0;

  singlecount =parseInt(selectedoffice?.singlecount) ||0;
  singlePercentage =  Math.round(  parseInt(selectedoffice?.singlecount)/ ( parseInt(selectedoffice?.marriedcount) + parseInt(selectedoffice?.singlecount) )* 100) ||0;

  marriedcount =parseInt(selectedoffice?.marriedcount) ||0;
  marriedPercentage =  Math.round(parseInt(selectedoffice?.marriedcount)/(parseInt(selectedoffice?.marriedcount) + parseInt(selectedoffice?.singlecount) )* 100) ||0;

  employeecount =parseInt(selectedoffice?.employeecount) ||0;
  employeecountPercentage =  Math.round(  parseInt(selectedoffice?.employeecount)/ ( parseInt(selectedoffice?.directhirecount) + parseInt(selectedoffice?.employeecount) + parseInt(selectedoffice?.permenentcount) + parseInt(selectedoffice?.Regularcount ) )* 100) ||0; 

  directhirecount =parseInt(selectedoffice?.directhirecount) ||0;
  directhirecountPercentage =  Math.round(  parseInt(selectedoffice?.directhirecount)/ ( parseInt(selectedoffice?.directhirecount) + parseInt(selectedoffice?.employeecount) + parseInt(selectedoffice?.permenentcount) + parseInt(selectedoffice?.Regularcount ) )* 100) ||0; 

  permenentcount =parseInt(selectedoffice?.permenentcount) ||0;
  permenentcountPercentage =  Math.round(  parseInt(selectedoffice?.permenentcount)/ ( parseInt(selectedoffice?.directhirecount) + parseInt(selectedoffice?.employeecount) + parseInt(selectedoffice?.permenentcount) + parseInt(selectedoffice?.Regularcount ) )* 100) ||0; 

  Regularcount =parseInt(selectedoffice?.Regularcount) ||0;
  RegularcountPercentage =  Math.round(  parseInt(selectedoffice?.Regularcount)/ ( parseInt(selectedoffice?.directhirecount) + parseInt(selectedoffice?.employeecount) + parseInt(selectedoffice?.permenentcount) + parseInt(selectedoffice?.Regularcount ) )* 100) ||0; 

}
else
{
   //debugger;
  
   malePercentage = Math.round( maleCount/ ( maleCount + femaleCount) * 100)  ||0;
   
   femalePercentage =  Math.round( femaleCount/ ( maleCount + femaleCount) * 100) ||0;

    
  nationalPercentage =  Math.round(  nationalCount/ ( nonnationalemployeeCount + nationalCount) * 100) ||0;
 
  nonnationalPercentage =  Math.round(  nonnationalemployeeCount/ ( nationalCount + nonnationalemployeeCount) * 100) ||0;
 
  singlePercentage =  Math.round(  singlecount/ ( marriedcount + singlecount) * 100) ||0;
 
  marriedPercentage =  Math.round(marriedcount/(marriedcount + singlecount) * 100) ||0;
 
  employeecountPercentage =  Math.round(  employeecount/ ( directhirecount + employeecount + permenentcount + Regularcount ) * 100) ||0; 
 
  directhirecountPercentage =  Math.round(  directhirecount/ ( directhirecount + employeecount + permenentcount + Regularcount ) * 100) ||0; 
 
  permenentcountPercentage =  Math.round(  permenentcount/ ( directhirecount + employeecount + permenentcount + Regularcount ) * 100) ||0; 
 
  RegularcountPercentage =  Math.round(  Regularcount/ ( directhirecount + employeecount + permenentcount + Regularcount ) * 100) ||0; 




}
//businessgroupname,businessgroupid, locationid,locationname,numberofemployees,malecount,femalecount,nationalcount,nonnationalcount,city,singlecount,marriedcount,
//employeecount,directhirecount,permenentcount ,Regularcount



// let nonnationalemployeeCount = 23;
// let percentage = 23;
return (
    <>
 
     
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Government Office Locations
              </h4>
              <div className="small text-medium-emphasis">October  2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            
            </CCol>
          </CRow>
          <CForm
              onSubmit={handleSubmit((e) => {
                onSubmit(getValues());
                reset(null);
              })}
            >
              <FormProvider {...LocationList}>
              <CRow  className="fullwidth">
              
                <CCol className={'mb-3'} xs={6}>
                  <MapComponents
                    type='PlacedAutoComplete'
                    withLatLng={onSelectLocation}
                 
                     
                    handleAddress={handleAddress}
                  />
                </CCol>
                <CCol  className={'mb-3'} xs={6}>
                <Controller 
             
              name={"offices"}
              defaultValue={  ''}
              render={({ field: { onChange, value, name } }) => {
                return (
                  <>
                    {/* <CFormLabel htmlFor={"GovernmentOffices"}>{"Government Offices"}</CFormLabel> */}
                    <CFormSelect
                      id={"GovernmentOffices"}
                      value={customValueKey ? value && value["_id"] : value}
                      onChange={(e) => {
                        let selectedValue = e.target.value
                               debugger;
                              yatchTypeOptions.every((item) => {
                                if (item["_id"] == selectedValue) {
                                  selectedValue = item
                                  return false
                                }
                                return true
                              })
                              //const abudhabi = { lat: selectedValue.location.coordinates[1], lng: selectedValue.location.coordinates[0] } ;
                           if(window.employeeMap)
                           {
                            window.employeeMap.panTo(new window.google.maps.LatLng(selectedValue.location.coordinates[1], selectedValue.location.coordinates[0]))
                            // .setCenter(abudhabi);
                            window.employeeMap.setZoom(16)
                           }
                           
                              onChange(selectedValue["_id"]);
                      }}
                      placeholder={"Government Offices"}
                      aria-describedby={`${name}-help`}
                    >
                      <option disabled selected value={''}>
                        {"Government Offices"  }
                      </option>
                     {[...yatchTypeOptions].map((selectOptions) => {
         
            return (
              <option
                selected={value?.length ? selectOptions[ '_id'] === value : false}
                key={selectOptions[ '_id']}
                value={selectOptions[ '_id']}
              >
                {selectOptions['typename']}
              </option>
            )
          })}
                    </CFormSelect> 
                  </>
                )
              }}
            />
                  </CCol>
                <CCol className="my-2" xs={12}  >
                {(selectedoffice || selectedLatLng || currentLocations.length >0)? <MapComponents 
                   proxylocationRountingresult={proxylocationRountingresult}
                officeLocations={officeLocations} employeeHome={employeeHome} 
                 currentLocations={currentLocations}  onMarkerClickParent={(yatch)=>{
                  setLatLang(null);
                  setSelectedoffice(yatch);
                  //console.log( 'selectedoffice',yatch);
                 }}
                 zoom={selectedLatLng && selectedLatLng.lat && selectedLatLng.lng ?13:13}
               
          
                 currentEmployeeLocations={currentEmployeeLocations}
                    markers={currentLocations.length>0 ? currentLocations.map((c,i)=>{ return { points: {lat: c.lat,lng: c.lng}, _id: c._id, empno:c.empno }}) : [ ]}
                  
                    center={selectedLatLng && selectedLatLng.lat && selectedLatLng.lng ?{
                      lat: Number(selectedLatLng.lat) || 0,
                      lng: Number(selectedLatLng.lng) || 0,
                    }: (currentLocations[0] || { lat: 24.4211889, lng: 54.4313433 })}
                  />:null}  
                </CCol>
                </CRow>
                </FormProvider>
                </CForm>
        </CCardBody>
        <CCardFooter>
         
        </CCardFooter>
      </CCard>
   
      {/* <WidgetsBrand withCharts /> */}
    

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader> {selectedoffice?.businessgroupname?selectedoffice?.businessgroupname + " (" + selectedoffice?.locationname + ") " :"Employees Count   &  Percentage"} </CCardHeader>
            <CCardBody>
     
              <CRow>
                <CCol xs="12" md="6" xl="6">
                 <div className="progress-group mb-4">
                    <div className="progress-group-header">
                    <svg className="icon icon-lg me-2" xmlns="http://www.w3.org/2000/svg"   
width="20" height="20" viewBox="0 0 20 20" version="1.1">
<g id="surface1">
  <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 6.933594 0.0390625 C 6.332031 0.117188 5.484375 0.441406 5.078125 0.753906 C 4.980469 0.824219 4.835938 0.898438 4.757812 0.914062 C 4.261719 1.007812 3.777344 1.441406 3.625 1.933594 C 3.503906 2.320312 3.523438 3.261719 3.664062 4.003906 L 3.742188 4.390625 L 3.554688 4.558594 C 3.316406 4.773438 3.222656 5.039062 3.25 5.449219 C 3.265625 5.667969 3.292969 5.777344 3.375 5.914062 C 3.488281 6.105469 3.695312 6.269531 3.878906 6.304688 C 3.9375 6.316406 4.027344 6.335938 4.078125 6.347656 C 4.15625 6.363281 4.179688 6.40625 4.21875 6.570312 C 4.285156 6.863281 4.570312 7.4375 4.78125 7.710938 L 4.960938 7.941406 L 4.960938 8.285156 C 4.960938 8.601562 4.953125 8.632812 4.875 8.675781 C 4.824219 8.699219 4.582031 8.917969 4.335938 9.160156 L 3.886719 9.601562 L 3.046875 9.921875 C 2.171875 10.257812 1.960938 10.351562 1.796875 10.476562 C 1.378906 10.796875 1.128906 11.167969 1.011719 11.640625 L 0.929688 11.960938 L 1.050781 15.050781 C 1.121094 16.789062 1.191406 18.191406 1.214844 18.25 C 1.304688 18.472656 1.625 18.480469 1.722656 18.265625 C 1.757812 18.195312 1.734375 17.394531 1.644531 15.089844 C 1.53125 12.253906 1.523438 11.757812 1.597656 11.757812 C 1.613281 11.757812 1.863281 12 2.15625 12.292969 C 2.734375 12.882812 2.863281 13.078125 2.929688 13.480469 C 2.953125 13.632812 2.96875 14.628906 2.96875 16.003906 L 2.96875 18.277344 L 3.070312 18.355469 C 3.191406 18.449219 3.238281 18.457031 3.378906 18.390625 C 3.441406 18.363281 3.492188 18.292969 3.519531 18.207031 C 3.546875 18.113281 3.554688 17.292969 3.546875 15.703125 C 3.53125 13.390625 3.53125 13.335938 3.445312 13.082031 C 3.316406 12.691406 3.109375 12.414062 2.464844 11.777344 L 1.875 11.195312 L 1.984375 11.082031 C 2.042969 11.019531 2.144531 10.9375 2.207031 10.898438 C 2.316406 10.832031 3.929688 10.195312 3.992188 10.195312 C 4.007812 10.195312 4.300781 10.613281 4.644531 11.121094 C 4.984375 11.632812 5.304688 12.089844 5.355469 12.136719 C 5.574219 12.335938 6.011719 12.40625 6.25 12.285156 C 6.359375 12.230469 6.367188 12.230469 6.367188 12.292969 C 6.371094 12.332031 6.3125 13.6875 6.242188 15.308594 L 6.117188 18.253906 L 6.226562 18.34375 C 6.285156 18.394531 6.355469 18.4375 6.386719 18.4375 C 6.5 18.4375 6.636719 18.347656 6.675781 18.246094 C 6.695312 18.191406 6.757812 17.027344 6.8125 15.664062 C 6.871094 14.300781 6.925781 13.074219 6.9375 12.9375 L 6.960938 12.695312 L 7.289062 12.695312 C 7.601562 12.695312 7.617188 12.699219 7.617188 12.78125 C 7.617188 13.320312 7.863281 18.230469 7.890625 18.285156 C 7.949219 18.394531 8.074219 18.445312 8.207031 18.417969 C 8.457031 18.363281 8.449219 18.492188 8.324219 15.503906 C 8.257812 14.011719 8.199219 12.671875 8.191406 12.527344 C 8.175781 12.269531 8.175781 12.261719 8.257812 12.285156 C 8.4375 12.34375 8.792969 12.351562 8.917969 12.304688 C 9.171875 12.203125 9.289062 12.0625 9.902344 11.140625 C 10.246094 10.621094 10.539062 10.195312 10.558594 10.195312 C 10.574219 10.195312 10.890625 10.3125 11.261719 10.453125 C 11.628906 10.597656 11.980469 10.714844 12.039062 10.714844 C 12.257812 10.71875 12.386719 10.441406 12.253906 10.257812 C 12.226562 10.222656 11.863281 10.058594 11.445312 9.898438 L 10.683594 9.601562 L 10.234375 9.160156 C 9.984375 8.914062 9.734375 8.695312 9.675781 8.675781 C 9.574219 8.636719 9.570312 8.628906 9.570312 8.296875 C 9.570312 7.964844 9.570312 7.957031 9.71875 7.777344 C 9.996094 7.441406 10.195312 7.046875 10.355469 6.523438 C 10.386719 6.425781 10.4375 6.34375 10.46875 6.339844 C 10.839844 6.292969 11.0625 6.148438 11.210938 5.863281 C 11.371094 5.542969 11.339844 5.003906 11.148438 4.710938 C 11.046875 4.558594 11.046875 4.554688 11.089844 4.226562 C 11.148438 3.828125 11.148438 3.019531 11.09375 2.679688 C 10.871094 1.292969 9.984375 0.378906 8.574219 0.09375 C 8.230469 0.0234375 7.292969 -0.0078125 6.933594 0.0390625 Z M 8.28125 0.644531 C 9.671875 0.855469 10.429688 1.664062 10.542969 3.066406 C 10.570312 3.390625 10.535156 4.167969 10.488281 4.289062 C 10.476562 4.320312 10.417969 4.335938 10.328125 4.328125 C 10.191406 4.316406 10.1875 4.308594 10.03125 3.933594 C 9.828125 3.441406 9.816406 3.4375 9.269531 3.53125 C 8.414062 3.679688 7.492188 3.679688 6.894531 3.535156 C 6.4375 3.421875 5.945312 3.164062 5.640625 2.871094 C 5.402344 2.644531 5.355469 2.613281 5.238281 2.625 C 5.0625 2.640625 4.9375 2.796875 4.976562 2.957031 C 4.992188 3.015625 5.109375 3.167969 5.234375 3.289062 C 5.6875 3.734375 6.203125 3.988281 6.957031 4.140625 C 7.566406 4.265625 8.625 4.253906 9.367188 4.117188 C 9.449219 4.101562 9.492188 4.109375 9.492188 4.136719 C 9.492188 4.164062 9.554688 4.320312 9.632812 4.488281 C 9.804688 4.867188 9.910156 4.941406 10.261719 4.929688 C 10.398438 4.921875 10.542969 4.9375 10.582031 4.960938 C 10.753906 5.050781 10.785156 5.539062 10.625 5.683594 C 10.585938 5.71875 10.476562 5.757812 10.382812 5.769531 C 10.023438 5.816406 9.898438 5.949219 9.769531 6.417969 C 9.230469 8.390625 6.789062 9.015625 5.40625 7.535156 C 5.066406 7.167969 4.929688 6.921875 4.785156 6.417969 C 4.703125 6.121094 4.664062 6.054688 4.527344 5.925781 C 4.398438 5.808594 4.335938 5.78125 4.210938 5.78125 C 4.09375 5.78125 4.03125 5.753906 3.941406 5.667969 C 3.84375 5.570312 3.828125 5.523438 3.828125 5.339844 C 3.828125 4.941406 4.0625 4.804688 4.355469 5.039062 C 4.550781 5.195312 4.664062 5.21875 4.828125 5.140625 C 5.121094 5.003906 5.546875 4.511719 5.546875 4.3125 C 5.546875 4.164062 5.417969 4.046875 5.253906 4.046875 C 5.128906 4.046875 5.085938 4.070312 5.003906 4.179688 C 4.949219 4.253906 4.859375 4.363281 4.804688 4.425781 L 4.703125 4.539062 L 4.53125 4.449219 C 4.433594 4.402344 4.351562 4.359375 4.34375 4.351562 C 4.304688 4.324219 4.171875 3.496094 4.144531 3.089844 C 4.089844 2.308594 4.175781 1.949219 4.46875 1.6875 C 4.59375 1.578125 4.921875 1.445312 5.070312 1.445312 C 5.097656 1.445312 5.234375 1.367188 5.371094 1.269531 C 6.167969 0.699219 7.199219 0.476562 8.28125 0.644531 Z M 6.308594 8.785156 C 7.09375 9.042969 8.039062 8.957031 8.777344 8.558594 L 8.984375 8.445312 L 8.984375 8.761719 L 8.980469 9.082031 L 8.199219 9.765625 C 7.769531 10.140625 7.382812 10.472656 7.34375 10.5 C 7.273438 10.550781 7.191406 10.488281 6.40625 9.800781 L 5.546875 9.050781 L 5.546875 8.433594 L 5.8125 8.570312 C 5.957031 8.644531 6.179688 8.742188 6.308594 8.785156 Z M 5.988281 10.214844 C 6.453125 10.621094 6.835938 10.964844 6.835938 10.980469 C 6.835938 10.992188 6.660156 11.171875 6.449219 11.378906 C 6.058594 11.757812 5.980469 11.800781 5.800781 11.734375 C 5.765625 11.71875 5.453125 11.285156 5.109375 10.769531 L 4.484375 9.832031 L 4.730469 9.585938 C 4.96875 9.347656 4.976562 9.34375 5.058594 9.40625 C 5.101562 9.441406 5.523438 9.804688 5.988281 10.214844 Z M 10.039062 9.851562 C 10.039062 9.902344 8.859375 11.65625 8.792969 11.707031 C 8.757812 11.734375 8.679688 11.757812 8.617188 11.757812 C 8.527344 11.757812 8.429688 11.683594 8.117188 11.378906 C 7.90625 11.171875 7.738281 10.984375 7.746094 10.960938 C 7.753906 10.941406 8.160156 10.566406 8.65625 10.132812 L 9.550781 9.34375 L 9.796875 9.582031 C 9.929688 9.714844 10.039062 9.835938 10.039062 9.851562 Z M 7.578125 11.882812 L 7.578125 12.113281 L 6.976562 12.089844 L 6.988281 11.875 C 6.996094 11.6875 7.015625 11.640625 7.140625 11.511719 L 7.28125 11.367188 L 7.429688 11.511719 C 7.566406 11.648438 7.578125 11.671875 7.578125 11.882812 Z M 7.578125 11.882812 "/>
    <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 12.773438 11.039062 C 12.609375 11.109375 12.402344 11.304688 12.3125 11.464844 C 12.265625 11.546875 12.242188 11.71875 12.226562 12.050781 L 12.207031 12.519531 L 11.09375 12.539062 C 9.832031 12.5625 9.769531 12.574219 9.457031 12.886719 C 9.164062 13.179688 9.0625 13.515625 9.0625 14.199219 C 9.0625 14.699219 9.121094 15.019531 9.253906 15.289062 L 9.371094 15.527344 L 9.394531 19.042969 L 9.523438 19.308594 C 9.617188 19.5 9.710938 19.617188 9.851562 19.726562 C 10.210938 20.015625 10.019531 20.003906 14.144531 19.992188 L 17.832031 19.980469 L 18.027344 19.890625 C 18.28125 19.773438 18.527344 19.53125 18.640625 19.28125 C 18.730469 19.085938 18.730469 19.058594 18.75 17.285156 C 18.769531 15.527344 18.769531 15.484375 18.855469 15.351562 C 19.03125 15.070312 19.070312 14.808594 19.054688 14.109375 C 19.042969 13.550781 19.027344 13.429688 18.957031 13.277344 C 18.847656 13.03125 18.617188 12.789062 18.382812 12.664062 L 18.183594 12.558594 L 17.066406 12.546875 L 15.945312 12.535156 L 15.933594 12.097656 C 15.914062 11.558594 15.828125 11.351562 15.527344 11.132812 L 15.335938 10.996094 L 14.121094 10.988281 C 13.105469 10.980469 12.886719 10.988281 12.773438 11.039062 Z M 15.203125 11.617188 C 15.3125 11.699219 15.351562 11.859375 15.351562 12.210938 L 15.351562 12.539062 L 12.8125 12.539062 L 12.8125 12.152344 C 12.8125 11.824219 12.824219 11.753906 12.894531 11.664062 L 12.972656 11.5625 L 14.054688 11.5625 C 14.878906 11.566406 15.152344 11.578125 15.203125 11.617188 Z M 18.101562 13.179688 C 18.171875 13.210938 18.28125 13.300781 18.34375 13.382812 C 18.453125 13.527344 18.457031 13.539062 18.46875 14.105469 C 18.484375 14.75 18.453125 14.90625 18.269531 15.179688 C 18.042969 15.519531 17.261719 16.058594 17.183594 15.933594 C 17.164062 15.902344 17.148438 15.859375 17.148438 15.832031 C 17.148438 15.808594 17.109375 15.757812 17.0625 15.726562 C 16.992188 15.675781 16.84375 15.664062 16.253906 15.664062 C 15.292969 15.664062 15.351562 15.613281 15.351562 16.464844 C 15.351562 17.0625 15.355469 17.105469 15.453125 17.296875 C 15.675781 17.742188 16.222656 17.925781 16.660156 17.707031 C 16.964844 17.550781 17.148438 17.261719 17.179688 16.882812 L 17.199219 16.632812 L 17.457031 16.511719 C 17.597656 16.445312 17.804688 16.332031 17.917969 16.261719 C 18.03125 16.191406 18.132812 16.132812 18.144531 16.132812 C 18.15625 16.132812 18.160156 16.78125 18.15625 17.574219 C 18.144531 18.960938 18.140625 19.023438 18.0625 19.125 C 18.019531 19.183594 17.933594 19.269531 17.875 19.3125 C 17.769531 19.394531 17.734375 19.394531 14.117188 19.40625 C 10.542969 19.414062 10.464844 19.414062 10.316406 19.335938 C 10.234375 19.296875 10.121094 19.195312 10.074219 19.113281 C 9.980469 18.964844 9.980469 18.957031 9.96875 17.546875 C 9.960938 16.769531 9.96875 16.132812 9.984375 16.132812 C 9.996094 16.132812 10.109375 16.195312 10.234375 16.269531 C 10.355469 16.34375 10.574219 16.460938 10.71875 16.527344 L 10.976562 16.648438 L 10.976562 16.878906 C 10.976562 17.421875 11.339844 17.789062 11.875 17.789062 C 12.261719 17.789062 12.574219 17.59375 12.714844 17.253906 L 12.777344 17.105469 L 13.195312 17.136719 C 13.425781 17.152344 13.8125 17.167969 14.050781 17.167969 C 14.449219 17.167969 14.496094 17.160156 14.574219 17.082031 C 14.6875 16.96875 14.691406 16.769531 14.582031 16.679688 C 14.515625 16.628906 14.375 16.609375 13.898438 16.589844 C 13.570312 16.574219 13.191406 16.550781 13.058594 16.539062 L 12.8125 16.511719 L 12.8125 16.25 C 12.8125 15.949219 12.757812 15.757812 12.65625 15.703125 C 12.617188 15.679688 12.261719 15.664062 11.867188 15.664062 C 11.195312 15.664062 11.140625 15.667969 11.0625 15.742188 C 11.015625 15.789062 10.976562 15.859375 10.976562 15.898438 C 10.976562 16.003906 10.921875 15.996094 10.667969 15.855469 C 10.332031 15.667969 10.011719 15.394531 9.859375 15.167969 C 9.6875 14.90625 9.636719 14.636719 9.65625 14.0625 C 9.675781 13.523438 9.738281 13.367188 9.976562 13.222656 L 10.136719 13.125 L 14.054688 13.125 C 17.316406 13.125 17.992188 13.132812 18.101562 13.179688 Z M 12.226562 16.5625 C 12.226562 16.945312 12.164062 17.117188 11.996094 17.183594 C 11.898438 17.226562 11.851562 17.226562 11.757812 17.1875 C 11.585938 17.117188 11.5625 17.042969 11.5625 16.625 L 11.5625 16.25 L 12.226562 16.25 Z M 16.59375 16.640625 C 16.582031 17.074219 16.535156 17.164062 16.304688 17.210938 C 16.210938 17.226562 16.160156 17.210938 16.0625 17.128906 C 15.9375 17.023438 15.9375 17.023438 15.9375 16.636719 L 15.9375 16.25 L 16.609375 16.25 Z M 16.59375 16.640625 "/>
     </g>
</svg>
                      <span>Employee</span>
                      <span className="ms-auto font-semibold">
                       {employeecount} <span className="text-medium-emphasis small">({employeecountPercentage}%)</span> 
                        </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={34} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                    <svg className="icon icon-lg me-2" xmlns="http://www.w3.org/2000/svg"   
width="20" height="20" viewBox="0 0 20 20" version="1.1">
<g id="surface1">
  <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 9.652344 0.0390625 C 8.949219 0.136719 8.078125 0.46875 7.644531 0.800781 C 7.542969 0.878906 7.367188 0.964844 7.246094 0.996094 C 6.601562 1.164062 6.21875 1.535156 6.03125 2.167969 C 5.910156 2.570312 5.953125 3.632812 6.121094 4.46875 C 6.179688 4.765625 6.179688 4.777344 6.109375 4.816406 C 5.992188 4.878906 5.824219 5.078125 5.730469 5.25 C 5.660156 5.382812 5.644531 5.476562 5.644531 5.78125 C 5.644531 6.125 5.652344 6.167969 5.765625 6.363281 C 5.921875 6.640625 6.144531 6.800781 6.40625 6.828125 C 6.621094 6.847656 6.652344 6.878906 6.699219 7.109375 C 6.777344 7.484375 7.066406 8.058594 7.351562 8.402344 L 7.5 8.585938 L 7.5 9 C 7.5 9.359375 7.492188 9.414062 7.433594 9.414062 C 7.398438 9.414062 7.140625 9.640625 6.859375 9.917969 L 6.347656 10.425781 L 5.441406 10.777344 C 4.261719 11.234375 4.144531 11.292969 3.859375 11.554688 C 3.46875 11.914062 3.246094 12.328125 3.164062 12.824219 C 3.101562 13.210938 3.375 19.742188 3.457031 19.867188 C 3.574219 20.050781 3.867188 20.023438 3.945312 19.828125 C 3.96875 19.765625 3.933594 18.554688 3.847656 16.398438 C 3.722656 13.316406 3.714844 12.878906 3.785156 12.742188 C 3.800781 12.710938 4.027344 12.910156 4.421875 13.3125 C 4.941406 13.832031 5.054688 13.96875 5.164062 14.199219 L 5.292969 14.472656 L 5.3125 17.128906 C 5.324219 18.589844 5.347656 19.816406 5.367188 19.855469 C 5.441406 20.011719 5.640625 20.042969 5.796875 19.917969 L 5.898438 19.839844 L 5.898438 17.199219 C 5.898438 14.300781 5.902344 14.339844 5.65625 13.851562 C 5.5625 13.667969 5.375 13.449219 4.8125 12.878906 L 4.085938 12.148438 L 4.214844 12.015625 C 4.285156 11.941406 4.425781 11.839844 4.527344 11.785156 C 4.707031 11.6875 6.449219 11.003906 6.464844 11.023438 C 6.46875 11.03125 6.773438 11.484375 7.136719 12.03125 C 7.503906 12.578125 7.859375 13.082031 7.925781 13.148438 C 8.167969 13.386719 8.625 13.453125 8.921875 13.300781 C 8.984375 13.265625 9.039062 13.246094 9.042969 13.25 C 9.046875 13.257812 8.984375 14.707031 8.910156 16.472656 C 8.832031 18.242188 8.78125 19.734375 8.796875 19.796875 C 8.824219 19.902344 8.960938 20 9.082031 20 C 9.113281 20 9.183594 19.960938 9.242188 19.910156 L 9.347656 19.820312 L 9.476562 16.910156 C 9.546875 15.3125 9.605469 13.945312 9.609375 13.875 L 9.609375 13.75 L 10.390625 13.75 L 10.390625 13.875 C 10.394531 13.945312 10.453125 15.3125 10.523438 16.910156 L 10.652344 19.820312 L 10.757812 19.910156 C 10.816406 19.960938 10.886719 20 10.917969 20 C 11.039062 20 11.175781 19.902344 11.203125 19.796875 C 11.21875 19.734375 11.167969 18.242188 11.089844 16.472656 C 11.015625 14.707031 10.953125 13.257812 10.957031 13.25 C 10.960938 13.246094 11.015625 13.265625 11.078125 13.300781 C 11.375 13.453125 11.832031 13.386719 12.074219 13.148438 C 12.140625 13.082031 12.496094 12.578125 12.863281 12.03125 C 13.226562 11.484375 13.53125 11.03125 13.535156 11.023438 C 13.550781 11.003906 15.292969 11.6875 15.476562 11.785156 C 15.574219 11.839844 15.714844 11.941406 15.785156 12.015625 L 15.914062 12.148438 L 15.1875 12.878906 C 14.625 13.449219 14.4375 13.667969 14.34375 13.851562 C 14.097656 14.339844 14.101562 14.300781 14.101562 17.199219 L 14.101562 19.839844 L 14.203125 19.917969 C 14.359375 20.042969 14.558594 20.011719 14.632812 19.855469 C 14.652344 19.816406 14.675781 18.589844 14.6875 17.128906 L 14.707031 14.472656 L 14.835938 14.199219 C 14.945312 13.96875 15.058594 13.832031 15.578125 13.3125 C 15.972656 12.910156 16.199219 12.710938 16.214844 12.742188 C 16.285156 12.878906 16.277344 13.316406 16.152344 16.398438 C 16.066406 18.554688 16.03125 19.765625 16.054688 19.828125 C 16.101562 19.945312 16.25 20.019531 16.382812 19.984375 C 16.605469 19.929688 16.59375 20.042969 16.742188 16.402344 C 16.894531 12.628906 16.898438 12.738281 16.636719 12.199219 C 16.46875 11.851562 16.007812 11.382812 15.691406 11.234375 C 15.570312 11.175781 15.058594 10.972656 14.558594 10.777344 L 13.652344 10.425781 L 13.140625 9.917969 C 12.859375 9.640625 12.601562 9.414062 12.566406 9.414062 C 12.507812 9.414062 12.5 9.359375 12.5 9 L 12.5 8.585938 L 12.648438 8.402344 C 12.933594 8.058594 13.222656 7.484375 13.300781 7.109375 C 13.347656 6.878906 13.378906 6.847656 13.59375 6.828125 C 13.855469 6.800781 14.078125 6.640625 14.234375 6.363281 C 14.347656 6.167969 14.355469 6.125 14.351562 5.78125 C 14.351562 5.402344 14.320312 5.292969 14.136719 5.039062 C 14.070312 4.945312 14.070312 4.917969 14.125 4.53125 C 14.214844 3.933594 14.179688 3.035156 14.050781 2.539062 C 13.699219 1.195312 12.832031 0.398438 11.386719 0.0976562 C 11.019531 0.0234375 10.015625 -0.0117188 9.652344 0.0390625 Z M 11.035156 0.640625 C 12.105469 0.78125 12.871094 1.277344 13.257812 2.074219 C 13.355469 2.277344 13.460938 2.5625 13.5 2.714844 C 13.585938 3.082031 13.617188 3.960938 13.554688 4.390625 L 13.507812 4.730469 L 13.15625 4.707031 L 12.988281 4.304688 C 12.894531 4.082031 12.796875 3.875 12.769531 3.839844 C 12.710938 3.769531 12.523438 3.78125 11.875 3.886719 C 11.242188 3.988281 10.207031 3.980469 9.714844 3.871094 C 9.019531 3.714844 8.574219 3.484375 8.164062 3.070312 C 7.984375 2.882812 7.929688 2.851562 7.808594 2.851562 C 7.605469 2.851562 7.46875 3.035156 7.535156 3.214844 C 7.585938 3.34375 7.96875 3.722656 8.230469 3.894531 C 9 4.40625 10.105469 4.632812 11.367188 4.53125 C 11.675781 4.507812 12.019531 4.46875 12.125 4.449219 C 12.230469 4.429688 12.335938 4.414062 12.359375 4.414062 C 12.382812 4.414062 12.457031 4.546875 12.519531 4.714844 C 12.589844 4.890625 12.695312 5.074219 12.777344 5.164062 L 12.917969 5.3125 L 13.25 5.3125 C 13.554688 5.3125 13.585938 5.320312 13.675781 5.414062 C 13.757812 5.5 13.769531 5.550781 13.769531 5.785156 C 13.769531 6.023438 13.757812 6.066406 13.664062 6.15625 C 13.589844 6.234375 13.511719 6.265625 13.363281 6.28125 C 13.203125 6.296875 13.128906 6.328125 13.003906 6.441406 C 12.867188 6.5625 12.832031 6.628906 12.746094 6.933594 C 12.597656 7.476562 12.378906 7.855469 12.011719 8.226562 C 11.53125 8.714844 11.007812 8.976562 10.335938 9.0625 C 9.746094 9.144531 9.097656 9.003906 8.542969 8.683594 C 8.410156 8.605469 8.160156 8.398438 7.988281 8.226562 C 7.621094 7.855469 7.402344 7.476562 7.253906 6.933594 C 7.167969 6.628906 7.132812 6.5625 6.996094 6.441406 C 6.871094 6.328125 6.796875 6.296875 6.636719 6.28125 C 6.488281 6.265625 6.410156 6.234375 6.335938 6.15625 C 6.242188 6.066406 6.230469 6.023438 6.230469 5.785156 C 6.230469 5.550781 6.242188 5.5 6.324219 5.414062 C 6.445312 5.285156 6.671875 5.273438 6.78125 5.394531 C 6.953125 5.582031 7.210938 5.636719 7.382812 5.523438 C 7.691406 5.316406 8.085938 4.847656 8.085938 4.6875 C 8.085938 4.550781 7.980469 4.425781 7.839844 4.390625 C 7.738281 4.367188 7.703125 4.394531 7.445312 4.667969 C 7.246094 4.878906 7.152344 4.957031 7.128906 4.921875 C 7.113281 4.894531 7.027344 4.839844 6.933594 4.800781 L 6.769531 4.730469 L 6.6875 4.289062 C 6.570312 3.695312 6.511719 2.828125 6.566406 2.5 C 6.648438 1.984375 6.953125 1.652344 7.425781 1.558594 C 7.597656 1.523438 7.726562 1.464844 7.894531 1.34375 C 8.726562 0.730469 9.839844 0.480469 11.035156 0.640625 Z M 8.789062 9.445312 C 9.71875 9.804688 10.761719 9.726562 11.671875 9.230469 L 11.914062 9.09375 L 11.914062 9.828125 L 10.976562 10.644531 C 10.457031 11.097656 10.019531 11.464844 10 11.464844 C 9.980469 11.464844 9.542969 11.097656 9.023438 10.644531 L 8.085938 9.828125 L 8.085938 9.09375 L 8.332031 9.230469 C 8.464844 9.300781 8.671875 9.398438 8.789062 9.445312 Z M 8.570312 11.023438 L 9.5625 11.894531 L 9.121094 12.34375 C 8.722656 12.738281 8.660156 12.789062 8.539062 12.789062 C 8.464844 12.789062 8.375 12.761719 8.335938 12.730469 C 8.265625 12.671875 6.953125 10.722656 6.953125 10.675781 C 6.953125 10.613281 7.484375 10.117188 7.53125 10.136719 C 7.558594 10.144531 8.027344 10.546875 8.570312 11.023438 Z M 12.78125 10.378906 C 12.929688 10.523438 13.046875 10.65625 13.046875 10.671875 C 13.046875 10.722656 11.738281 12.671875 11.664062 12.734375 C 11.625 12.761719 11.535156 12.789062 11.460938 12.789062 C 11.339844 12.789062 11.277344 12.738281 10.878906 12.339844 L 10.433594 11.894531 L 11.449219 11.003906 C 12.007812 10.515625 12.476562 10.117188 12.492188 10.117188 C 12.503906 10.117188 12.636719 10.234375 12.78125 10.378906 Z M 10.191406 12.480469 C 10.34375 12.648438 10.351562 12.664062 10.351562 12.910156 L 10.351562 13.164062 L 9.648438 13.164062 L 9.648438 12.910156 C 9.648438 12.664062 9.65625 12.648438 9.808594 12.480469 C 9.898438 12.382812 9.984375 12.304688 10 12.304688 C 10.015625 12.304688 10.101562 12.382812 10.191406 12.480469 Z M 10.191406 12.480469 "/>
    <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 6.726562 14.753906 C 6.699219 14.765625 6.652344 14.824219 6.617188 14.886719 C 6.570312 14.984375 6.566406 15.019531 6.609375 15.105469 C 6.699219 15.296875 6.792969 15.316406 7.542969 15.304688 C 8.160156 15.292969 8.242188 15.285156 8.316406 15.21875 C 8.421875 15.121094 8.425781 14.910156 8.320312 14.804688 C 8.246094 14.730469 8.191406 14.726562 7.511719 14.730469 C 7.105469 14.730469 6.753906 14.742188 6.726562 14.753906 Z M 6.726562 14.753906 "/>
     </g>
</svg>
                      <span>Direct Hire</span>
                      <span className="ms-auto font-semibold">
                       {directhirecount} <span className="text-medium-emphasis small">({directhirecountPercentage}%)</span> 
                        </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={directhirecountPercentage} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                    
                    <svg className="icon icon-lg me-2" xmlns="http://www.w3.org/2000/svg"   
width="20" height="20" viewBox="0 0 20 20" version="1.1">
<g id="surface1">
  <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 8.222656 0.0664062 C 7.089844 0.308594 6.195312 1.214844 5.960938 2.351562 C 5.914062 2.582031 5.898438 2.902344 5.898438 3.738281 L 5.898438 4.824219 L 5.695312 4.917969 C 5.441406 5.035156 5.046875 5.421875 4.925781 5.675781 C 4.664062 6.21875 4.664062 6.753906 4.925781 7.292969 C 5.050781 7.546875 5.4375 7.925781 5.707031 8.054688 L 5.925781 8.160156 L 5.972656 8.40625 C 6.1875 9.542969 6.921875 10.582031 7.917969 11.160156 L 8.238281 11.347656 L 8.242188 11.644531 L 8.242188 11.945312 L 5.324219 13.113281 L 2.402344 14.28125 L 2.390625 17.140625 L 2.382812 20 L 17.617188 20 L 17.609375 17.140625 L 17.597656 14.28125 L 14.679688 13.113281 L 11.757812 11.945312 L 11.757812 11.640625 C 11.757812 11.363281 11.765625 11.332031 11.839844 11.308594 C 12.015625 11.25 12.621094 10.808594 12.882812 10.539062 C 13.25 10.164062 13.425781 9.925781 13.640625 9.507812 C 13.835938 9.128906 13.957031 8.785156 14.027344 8.40625 L 14.074219 8.160156 L 14.292969 8.054688 C 14.5625 7.925781 14.949219 7.546875 15.074219 7.292969 C 15.335938 6.753906 15.335938 6.214844 15.074219 5.675781 C 14.945312 5.417969 14.558594 5.035156 14.308594 4.917969 L 14.101562 4.824219 L 14.101562 3.738281 C 14.101562 2.898438 14.085938 2.585938 14.039062 2.351562 C 13.800781 1.199219 12.902344 0.300781 11.75 0.0625 C 11.324219 -0.0234375 8.632812 -0.0234375 8.222656 0.0664062 Z M 11.53125 1.214844 C 11.871094 1.285156 12.148438 1.441406 12.402344 1.695312 C 12.789062 2.082031 12.929688 2.472656 12.929688 3.144531 L 12.929688 3.515625 L 12.574219 3.515625 C 11.945312 3.515625 11.757812 3.328125 11.757812 2.695312 L 11.757812 2.34375 L 8.242188 2.34375 L 8.242188 2.699219 C 8.242188 3.328125 8.054688 3.515625 7.421875 3.515625 L 7.070312 3.515625 L 7.070312 3.144531 C 7.070312 2.46875 7.210938 2.078125 7.59375 1.699219 C 7.84375 1.449219 8.089844 1.308594 8.417969 1.226562 C 8.675781 1.164062 11.234375 1.152344 11.53125 1.214844 Z M 10.777344 3.71875 C 10.832031 3.839844 10.972656 4.023438 11.109375 4.160156 C 11.503906 4.546875 11.878906 4.6875 12.53125 4.6875 L 12.929688 4.6875 L 12.929688 5.898438 L 13.28125 5.898438 C 13.71875 5.898438 13.902344 5.976562 14.023438 6.210938 C 14.125 6.410156 14.121094 6.574219 14.015625 6.765625 C 13.882812 6.996094 13.710938 7.070312 13.289062 7.070312 L 12.941406 7.070312 L 12.917969 7.605469 C 12.894531 8.246094 12.835938 8.488281 12.589844 8.984375 C 12.4375 9.289062 12.34375 9.414062 12.070312 9.6875 C 11.695312 10.0625 11.4375 10.226562 10.945312 10.414062 L 10.605469 10.542969 L 10.59375 11.148438 L 10.582031 11.757812 L 9.417969 11.757812 L 9.40625 11.148438 L 9.394531 10.542969 L 9.0625 10.417969 C 8.140625 10.070312 7.5 9.40625 7.203125 8.496094 C 7.121094 8.238281 7.097656 8.082031 7.082031 7.625 L 7.058594 7.070312 L 6.707031 7.070312 C 6.417969 7.070312 6.332031 7.054688 6.203125 6.984375 C 5.808594 6.761719 5.808594 6.207031 6.203125 5.984375 C 6.332031 5.914062 6.417969 5.898438 6.714844 5.898438 L 7.070312 5.898438 L 7.070312 4.6875 L 7.472656 4.6875 C 8.125 4.6875 8.503906 4.546875 8.890625 4.164062 C 9.027344 4.027344 9.167969 3.839844 9.222656 3.71875 L 9.316406 3.515625 L 10.683594 3.515625 Z M 10.863281 13.503906 L 10.71875 14.082031 L 9.28125 14.082031 L 9.136719 13.503906 L 8.992188 12.929688 L 11.007812 12.929688 Z M 7.925781 13.503906 C 7.949219 13.585938 8.023438 13.894531 8.097656 14.1875 L 8.230469 14.722656 L 7.984375 16.726562 C 7.847656 17.828125 7.734375 18.753906 7.734375 18.777344 C 7.734375 18.816406 7.289062 18.828125 5.644531 18.828125 L 3.554688 18.828125 L 3.554688 15.085938 L 5.695312 14.226562 C 6.871094 13.753906 7.84375 13.363281 7.859375 13.363281 C 7.875 13.359375 7.90625 13.425781 7.925781 13.503906 Z M 14.328125 14.238281 L 16.445312 15.085938 L 16.445312 18.828125 L 14.355469 18.828125 C 12.710938 18.828125 12.265625 18.816406 12.265625 18.777344 C 12.265625 18.753906 12.152344 17.828125 12.015625 16.726562 L 11.765625 14.722656 L 11.902344 14.1875 C 12.109375 13.351562 12.109375 13.351562 12.160156 13.371094 C 12.1875 13.382812 13.160156 13.769531 14.328125 14.238281 Z M 10.664062 15.308594 C 10.664062 15.359375 11.050781 18.503906 11.078125 18.683594 L 11.101562 18.828125 L 8.898438 18.828125 L 8.921875 18.683594 C 8.949219 18.5 9.335938 15.359375 9.335938 15.308594 C 9.335938 15.289062 9.621094 15.273438 10 15.273438 C 10.382812 15.273438 10.664062 15.289062 10.664062 15.308594 Z M 10.664062 15.308594 "/>
    <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 8.242188 7.734375 C 8.242188 7.886719 8.332031 8.230469 8.429688 8.4375 C 8.5625 8.722656 8.941406 9.09375 9.230469 9.230469 C 9.894531 9.542969 10.652344 9.429688 11.195312 8.9375 C 11.425781 8.726562 11.648438 8.328125 11.714844 8.015625 C 11.796875 7.628906 11.839844 7.65625 11.171875 7.65625 C 10.671875 7.65625 10.585938 7.664062 10.585938 7.714844 C 10.585938 7.855469 10.425781 8.085938 10.273438 8.164062 C 10.074219 8.265625 9.910156 8.261719 9.71875 8.15625 C 9.566406 8.070312 9.414062 7.847656 9.414062 7.714844 C 9.414062 7.664062 9.328125 7.65625 8.828125 7.65625 C 8.273438 7.65625 8.242188 7.660156 8.242188 7.734375 Z M 8.242188 7.734375 "/>
    <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 12.929688 17.03125 L 12.929688 17.617188 L 15.273438 17.617188 L 15.273438 16.445312 L 12.929688 16.445312 Z M 12.929688 17.03125 "/>
     </g>
</svg>
                      <span>Permenent</span>
                      <span className="ms-auto font-semibold">
                       {permenentcount} <span className="text-medium-emphasis small">({permenentcountPercentage}%)</span> 
                        </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={permenentcountPercentage} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                    {/* <CIcon className="icon icon-lg me-2" name="cil-user" /> */}
                    <svg className="icon icon-lg me-2" xmlns="http://www.w3.org/2000/svg"   
width="20" height="20" viewBox="0 0 20 20" version="1.1">
<g id="surface1">
  <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 9.570312 0.0234375 C 9.214844 0.0703125 8.765625 0.167969 8.488281 0.261719 C 6.910156 0.789062 5.683594 2.105469 5.277344 3.710938 C 5.144531 4.21875 5.109375 4.695312 5.125 5.722656 C 5.136719 6.65625 5.140625 6.707031 5.226562 6.875 C 5.410156 7.226562 5.738281 7.464844 6.117188 7.523438 L 6.277344 7.546875 L 6.363281 7.878906 C 6.636719 8.960938 7.394531 9.878906 8.414062 10.355469 C 8.980469 10.621094 9.261719 10.679688 9.980469 10.679688 C 10.65625 10.679688 10.824219 10.652344 11.421875 10.421875 C 12.097656 10.160156 12.828125 9.527344 13.226562 8.855469 C 13.402344 8.558594 13.621094 7.996094 13.6875 7.65625 C 13.707031 7.570312 13.742188 7.546875 13.9375 7.507812 C 14.34375 7.425781 14.671875 7.136719 14.808594 6.738281 C 14.851562 6.617188 14.863281 6.332031 14.859375 5.527344 C 14.859375 4.414062 14.832031 4.148438 14.660156 3.554688 C 14.152344 1.789062 12.675781 0.441406 10.867188 0.09375 C 10.554688 0.0351562 9.808594 -0.0078125 9.570312 0.0234375 Z M 10.683594 1.273438 C 12.015625 1.527344 13.125 2.554688 13.539062 3.925781 C 13.640625 4.261719 13.648438 4.324219 13.664062 5.300781 L 13.679688 6.328125 L 13.46875 6.328125 C 13.1875 6.328125 12.71875 6.234375 12.300781 6.09375 C 11.738281 5.90625 11.300781 5.667969 10.699219 5.210938 C 10.230469 4.859375 10.199219 4.84375 9.992188 4.84375 C 9.800781 4.84375 9.675781 4.914062 9.25 5.238281 C 8.433594 5.867188 7.476562 6.257812 6.632812 6.316406 L 6.289062 6.339844 L 6.289062 5.65625 C 6.289062 5.277344 6.308594 4.789062 6.328125 4.570312 C 6.484375 3.058594 7.515625 1.808594 8.984375 1.351562 C 9.550781 1.175781 10.039062 1.152344 10.683594 1.273438 Z M 10.398438 6.453125 C 10.953125 6.824219 11.679688 7.160156 12.277344 7.324219 C 12.542969 7.398438 12.550781 7.4375 12.402344 7.839844 C 12.085938 8.671875 11.367188 9.289062 10.496094 9.46875 C 9.929688 9.585938 9.40625 9.515625 8.871094 9.253906 C 8.203125 8.925781 7.609375 8.175781 7.488281 7.515625 L 7.464844 7.394531 L 7.765625 7.308594 C 8.382812 7.132812 9.175781 6.75 9.707031 6.375 C 9.859375 6.265625 10 6.191406 10.019531 6.203125 C 10.042969 6.214844 10.210938 6.328125 10.398438 6.453125 Z M 10.398438 6.453125 "/>
    <path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 5.683594 11.628906 C 3.921875 11.945312 2.535156 13.371094 2.265625 15.136719 C 2.238281 15.3125 2.226562 16.171875 2.234375 17.527344 C 2.246094 19.585938 2.25 19.644531 2.324219 19.75 C 2.367188 19.808594 2.464844 19.886719 2.539062 19.925781 C 2.667969 19.996094 2.945312 20 10 20 C 17.054688 20 17.332031 19.996094 17.460938 19.925781 C 17.535156 19.886719 17.632812 19.808594 17.675781 19.75 C 17.75 19.644531 17.753906 19.585938 17.765625 17.527344 C 17.773438 16.171875 17.761719 15.3125 17.734375 15.136719 C 17.464844 13.351562 16.070312 11.933594 14.277344 11.625 C 13.773438 11.535156 6.171875 11.539062 5.683594 11.628906 Z M 8.179688 13.183594 C 7.949219 13.433594 7.746094 13.621094 7.734375 13.605469 C 7.703125 13.574219 7.34375 12.78125 7.34375 12.75 C 7.34375 12.742188 7.625 12.734375 7.972656 12.734375 L 8.601562 12.734375 Z M 12.65625 12.75 C 12.65625 12.78125 12.296875 13.574219 12.265625 13.605469 C 12.253906 13.621094 12.050781 13.433594 11.820312 13.183594 L 11.398438 12.734375 L 12.027344 12.734375 C 12.375 12.734375 12.65625 12.742188 12.65625 12.75 Z M 6.542969 13.875 C 7.082031 15.058594 7.179688 15.207031 7.4375 15.257812 C 7.742188 15.3125 7.828125 15.25 8.621094 14.433594 C 9.027344 14.015625 9.371094 13.671875 9.386719 13.671875 C 9.402344 13.671875 9.410156 14.828125 9.40625 16.238281 L 9.394531 18.808594 L 6.398438 18.820312 L 3.398438 18.828125 L 3.398438 17.171875 C 3.398438 15.371094 3.417969 15.164062 3.617188 14.660156 C 3.90625 13.933594 4.429688 13.378906 5.140625 13.039062 C 5.425781 12.90625 5.808594 12.785156 5.980469 12.777344 C 6.023438 12.773438 6.1875 13.09375 6.542969 13.875 Z M 14.292969 12.832031 C 15.214844 13.050781 16.023438 13.757812 16.382812 14.660156 C 16.582031 15.164062 16.601562 15.371094 16.601562 17.171875 L 16.601562 18.828125 L 10.585938 18.828125 L 10.585938 13.613281 L 11.351562 14.402344 C 12.171875 15.253906 12.257812 15.3125 12.5625 15.257812 C 12.820312 15.207031 12.917969 15.058594 13.457031 13.875 C 13.734375 13.269531 13.976562 12.773438 14 12.773438 C 14.023438 12.773438 14.15625 12.800781 14.292969 12.832031 Z M 14.292969 12.832031 "/>
     </g>
</svg>
                      <span>Regular</span>
                      <span className="ms-auto font-semibold">
                       {Regularcount} <span className="text-medium-emphasis small">({RegularcountPercentage}%)</span> 
                        </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={RegularcountPercentage} />
                    </div>
                  </div>
                
                </CCol>

                <CCol xs="12" md="6" xl="6">
               

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="icon icon-lg me-2" name="cil-user" />
                      <span>Male</span>
                      <span className="ms-auto font-semibold">
                       {maleCount} <span className="text-medium-emphasis small">({malePercentage}%)</span> 
                        </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="warning" value={malePercentage} />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="icon icon-lg me-2" name="cil-user-female" />
                      <span>Female</span>
                      <span className="ms-auto font-semibold">
                    {femaleCount} <span className="text-medium-emphasis small">({femalePercentage}%)</span> 
                        </span> 
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="warning" value={femalePercentage} />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      {/* <CIcon className="icon icon-lg me-2" name="cil-people" /> */}
                      <svg className="icon icon-lg me-2" xmlns="http://www.w3.org/2000/svg"   
width="20" height="20" viewBox="0 0 20 20" version="1.1">
<g id="surface1">
<path style={{ stroke:"none",fillRule:"nonzero",fill:"rgb(255,255,255)",fillOpacity:1}} d="M 9.53125 0.0234375 C 8.941406 0.113281 8.492188 0.246094 8.066406 0.460938 C 7.265625 0.859375 6.53125 1.589844 6.136719 2.371094 L 6.015625 2.617188 L 5.710938 2.617188 C 5.289062 2.617188 5.050781 2.695312 4.804688 2.914062 C 4.539062 3.15625 4.445312 3.347656 4.421875 3.695312 C 4.378906 4.375 4.820312 4.882812 5.519531 4.949219 C 5.757812 4.96875 5.777344 4.980469 5.761719 5.054688 C 5.753906 5.101562 5.734375 5.3125 5.722656 5.527344 C 5.636719 6.96875 5.335938 8.613281 4.960938 9.703125 C 4.503906 11.027344 4.089844 11.699219 2.683594 13.40625 C 2.429688 13.710938 2.097656 14.148438 1.945312 14.371094 C 1.105469 15.625 0.6875 17.035156 0.546875 19.078125 C 0.5 19.765625 0.519531 19.878906 0.6875 19.957031 C 0.824219 20.019531 19.171875 20.019531 19.308594 19.957031 C 19.480469 19.878906 19.496094 19.777344 19.453125 19.089844 C 19.324219 17.125 18.914062 15.695312 18.132812 14.492188 C 17.867188 14.078125 17.6875 13.84375 17.082031 13.117188 C 15.90625 11.703125 15.410156 10.859375 14.980469 9.53125 C 14.636719 8.460938 14.359375 6.890625 14.277344 5.546875 C 14.265625 5.34375 14.246094 5.128906 14.238281 5.074219 C 14.222656 4.972656 14.230469 4.972656 14.46875 4.953125 C 15.136719 4.898438 15.601562 4.410156 15.601562 3.769531 C 15.601562 3.441406 15.496094 3.191406 15.261719 2.957031 C 15.03125 2.726562 14.8125 2.644531 14.371094 2.625 L 13.996094 2.609375 L 13.910156 2.425781 C 13.425781 1.425781 12.417969 0.550781 11.355469 0.214844 C 10.808594 0.0390625 9.992188 -0.0429688 9.53125 0.0234375 Z M 10.917969 0.742188 C 11.554688 0.902344 12.265625 1.324219 12.722656 1.808594 C 12.929688 2.027344 13.304688 2.566406 13.273438 2.597656 C 13.261719 2.609375 11.78125 2.613281 9.984375 2.609375 L 6.714844 2.597656 L 6.875 2.347656 C 7.449219 1.457031 8.3125 0.886719 9.386719 0.679688 C 9.769531 0.605469 10.511719 0.636719 10.917969 0.742188 Z M 14.683594 3.3125 C 15.0625 3.503906 15.085938 4.003906 14.734375 4.246094 C 14.632812 4.3125 14.402344 4.316406 10.097656 4.328125 C 6.984375 4.335938 5.523438 4.328125 5.421875 4.296875 C 5.34375 4.277344 5.226562 4.195312 5.160156 4.121094 C 4.941406 3.867188 5.019531 3.457031 5.316406 3.308594 C 5.4375 3.25 5.835938 3.242188 10 3.242188 C 14.257812 3.242188 14.558594 3.246094 14.683594 3.3125 Z M 7.148438 10.808594 L 7.148438 16.660156 L 6.980469 16.484375 C 6.421875 15.894531 3.828125 13.046875 3.828125 13.027344 C 3.828125 13.015625 3.929688 12.867188 4.058594 12.703125 C 5.363281 10.988281 6.0625 8.890625 6.3125 5.957031 C 6.34375 5.546875 6.382812 5.15625 6.390625 5.085938 L 6.410156 4.960938 L 7.148438 4.960938 Z M 12.179688 7.3125 L 12.167969 9.667969 L 11.894531 9.875 C 11.03125 10.527344 10.070312 10.707031 9.140625 10.394531 C 8.765625 10.269531 8.300781 10.027344 7.960938 9.777344 L 7.773438 9.640625 L 7.773438 4.960938 L 12.1875 4.960938 Z M 13.609375 5.085938 C 13.621094 5.15625 13.640625 5.382812 13.652344 5.585938 C 13.714844 6.585938 13.917969 7.917969 14.140625 8.828125 C 14.53125 10.394531 15.0625 11.53125 15.960938 12.71875 L 16.320312 13.191406 L 12.8125 16.699219 L 12.8125 4.960938 L 13.589844 4.960938 Z M 8.050781 10.582031 C 8.664062 10.953125 9.234375 11.128906 9.902344 11.160156 C 10.625 11.191406 11.242188 11.03125 11.871094 10.644531 C 12.027344 10.546875 12.164062 10.46875 12.171875 10.46875 C 12.179688 10.46875 12.1875 10.84375 12.1875 11.300781 L 12.1875 12.132812 L 11.097656 12.570312 L 10.007812 13.003906 L 7.773438 12.136719 L 7.773438 11.28125 C 7.773438 10.8125 7.78125 10.429688 7.789062 10.429688 C 7.796875 10.429688 7.917969 10.496094 8.050781 10.582031 Z M 8.730469 13.179688 L 9.667969 13.542969 L 9.679688 13.738281 C 9.691406 13.929688 9.691406 13.933594 9.535156 14.003906 C 9.339844 14.089844 9.121094 14.304688 9.011719 14.511719 C 8.945312 14.632812 8.925781 14.738281 8.925781 14.980469 C 8.925781 15.253906 8.941406 15.320312 9.042969 15.503906 C 9.160156 15.714844 9.429688 15.960938 9.597656 16 C 9.683594 16.023438 9.6875 16.039062 9.6875 16.425781 L 9.6875 16.824219 L 9.53125 16.894531 C 9.304688 16.996094 9.046875 17.289062 8.964844 17.535156 C 8.792969 18.058594 9.078125 18.699219 9.5625 18.875 C 9.683594 18.921875 9.6875 18.929688 9.6875 19.148438 L 9.6875 19.375 L 1.160156 19.375 L 1.1875 18.933594 C 1.257812 17.730469 1.53125 16.539062 1.945312 15.621094 C 2.175781 15.109375 2.792969 14.199219 3.25 13.703125 L 3.417969 13.515625 L 5.3125 15.589844 C 6.355469 16.730469 7.242188 17.6875 7.285156 17.71875 C 7.40625 17.804688 7.535156 17.785156 7.660156 17.660156 L 7.773438 17.546875 L 7.773438 15.179688 C 7.773438 13.878906 7.777344 12.8125 7.785156 12.8125 C 7.789062 12.8125 8.214844 12.976562 8.730469 13.179688 Z M 12.1875 15.15625 C 12.1875 17.636719 12.191406 17.683594 12.363281 17.75 C 12.578125 17.832031 12.5625 17.84375 14.6875 15.722656 L 16.738281 13.675781 L 16.996094 13.996094 C 17.914062 15.132812 18.371094 16.109375 18.632812 17.5 C 18.722656 17.972656 18.828125 18.867188 18.828125 19.167969 L 18.828125 19.375 L 10.3125 19.375 L 10.3125 19.148438 C 10.3125 18.929688 10.316406 18.921875 10.441406 18.875 C 10.921875 18.699219 11.207031 18.058594 11.035156 17.535156 C 10.953125 17.289062 10.695312 16.996094 10.46875 16.894531 L 10.3125 16.824219 L 10.3125 16.425781 C 10.3125 16.039062 10.316406 16.023438 10.402344 16 C 10.570312 15.960938 10.839844 15.714844 10.957031 15.503906 C 11.058594 15.320312 11.074219 15.253906 11.074219 14.980469 C 11.074219 14.738281 11.054688 14.632812 10.988281 14.511719 C 10.878906 14.304688 10.660156 14.089844 10.464844 14.003906 C 10.308594 13.933594 10.308594 13.929688 10.320312 13.738281 L 10.332031 13.546875 L 11.230469 13.183594 C 11.726562 12.984375 12.140625 12.816406 12.160156 12.816406 C 12.175781 12.8125 12.1875 13.867188 12.1875 15.15625 Z M 10.257812 14.59375 C 10.566406 14.796875 10.515625 15.269531 10.164062 15.417969 C 9.96875 15.5 9.746094 15.425781 9.621094 15.238281 C 9.472656 15.019531 9.511719 14.796875 9.71875 14.621094 C 9.847656 14.511719 10.113281 14.5 10.257812 14.59375 Z M 10.234375 17.480469 C 10.5 17.617188 10.542969 18.007812 10.316406 18.210938 C 10.101562 18.402344 9.898438 18.402344 9.6875 18.210938 C 9.28125 17.847656 9.746094 17.226562 10.234375 17.480469 Z M 10.234375 17.480469 "/>
</g>
</svg>
                     
                      <span>National Employees</span>
                      <span className="ms-auto font-semibold">
                      {nationalCount} <span className="text-medium-emphasis small">({nationalPercentage}%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={nationalPercentage} />
                    </div>
                  </div>
                  {/* <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon name="cil-people" className="icon icon-lg me-2" />
                      <span>Non National Employees</span>
                      <span className="ms-auto font-semibold">
                       {nonnationalemployeeCount}<span className="text-medium-emphasis small">({nonnationalPercentage}%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={nonnationalPercentage} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cil-user" className="icon icon-lg me-2" />
                      <span>Single </span>
                      <span className="ms-auto font-semibold">
                       {singlecount}<span className="text-medium-emphasis small">({singlePercentage}%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={singlePercentage} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cil-people" className="icon icon-lg me-2" />
                      <span>Married</span>
                      <span className="ms-auto font-semibold">
                       {marriedcount}<span className="text-medium-emphasis small">({marriedPercentage}%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={marriedPercentage} />
                    </div>
                  </div> */}
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
       

      <WidgetsDropdown />
    </>
  )
};

export default Dashboard
