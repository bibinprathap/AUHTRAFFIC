import PropTypes from 'prop-types'
import React, {
  useState, useRef,
  memo,useEffect
} from 'react';
import {
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
  CCallout,
  CSpinner ,
  
  CFormControl
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  GoogleMap, useJsApiLoader, Marker, Autocomplete, InfoWindow, DirectionsService, DirectionsRenderer, Circle, LoadScript ,HeatmapLayer 
} from '@react-google-maps/api'; 
import OfficeCard from './OfficeCard'
 import ProxyLocations from './ProxyLocations'
import geoshap from  './shapesector'
import employeepercentage from './employeepercentage'
import dynamics from 'dynamics.js';

const centerProp = {
  lat: 20.5937,
  lng: 78.9629,
};

const libraries = ['places','visualization'];
var sv =  null ; 
var panorama = null;
var clickedMarker = null;

const backIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
</svg>;

 
export const AutoCompleteComponent = ({ withLatLng, handleAddress, register = {}, error }) => {
  const autoCompltedRef = useRef(null);

 

  const onLoad = (something) => {
    //console.log( 'something on Load', something);
    autoCompltedRef.current = something;
  };

  const onPlaceChanged = (e) => {
    if (autoCompltedRef.current) {
      const place = autoCompltedRef.current.getPlace();
      //console.log( "place got >>", place)
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        //console.log( { lat, lng })
        if (withLatLng) withLatLng({ lat, lng });
        const { address_components } = place;
        if (handleAddress) handleAddress(address_components)
      }
    } else {
      //console.log( 'Autocomplete is not loaded yet!');
    }
  };
  var defaultBounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(24.4211889, 54.4313433) // Dubai area
); 
  const options = { 
    location: new window.google.maps.LatLng(24.4211889, 54.4313433 ), 
    bounds: defaultBounds, 
    componentRestrictions: { country: 'AE' }
  }


  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={options}
    // fields={['geometry']}
    >
      <CFormControl
        className={error ? "error-input" : ""}
        {...register}
        placeholder="SEARCH PLACE"
        type='text' />
    </Autocomplete>
  );
};


const MapComponent = ({
  type, withLatLng, center = centerProp, markers, handleAddress,proxylocationRountingresult, register, error, officeLocations,  currentEmployeeLocations,currentLocations,zoom,onMarkerClickParent
}) => {

  const containerStyle = {
    width: '100%',
    height: '100%',
  };
  const itemsRef = useRef([]);
  const infostreetview = useRef();
  const sideaddresspanel = useRef();
  const [openaddressPanel, setOpenaddressPanel] = useState(true);
  
  const [lodingduration, setLodingduration] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [streetviewvisible, setStreetviewvisible] = useState('block');
  const [infoLocation, setIntfoLocation] = useState(null); 
  const [employeeLocationsInfo, setEmployeeLocationsInfo] = useState(null); 
  const [selectedOffice, setSelectedOffice] = useState(null);
 
  const  [routeResults, setRouteResults] = useState([]);
  // const  [totalrouteResults, settotalRouteResults] = useState([]);
  // const  [directionServiceArray, setDirectionServiceArray] = useState([]);
  const  [currentcenter, setCurrentcenter] = useState(center);
  const  [currentzoom, setZoom] = useState(zoom ||13);
  // const  [zoomforradiusLevel, setzoomforradiusLevel] = useState(zoom ||15);

  

  // const callBackOnLoc = (data, status) => {
  //   //console.log( 'on result >>>>', data, status)
  
  // if(routeResults.length<2)
  //   setRouteResults(oldArray => [...oldArray, data]); 

  // }

  const mapid = ["66980eae2c12742e"];
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCqt7wBbO1QHM051rvUWHKozaDi8Zcq4PQ',
    libraries,
    mapIds:mapid
  });
 
  useEffect(() => { 
     setCurrentcenter(center);
  setZoom(zoom ||13);
 

  }, [center,zoom ])
 
 

 
  const onLoad = React.useCallback((map) => {

    setMapRef(map)
    window.employeeMap = map;
    
   
   
  
  }, []);

 

  const onUnmount = React.useCallback((mapData) => {
  }, []);

  // const onZIndexChanged =  (mapData) => {
  //   var zoomLevel = mapRef?.getZoom();
  //  
  //  // setzoomforradiusLevel(zoomforradiusLevel)
  //  //  resetZoom(zoomLevel)
  // } ;

  var myStyles =[ 
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];
const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
const onLoadHeat = heatmapLayer => {
  //console.log( 'HeatmapLayer onLoad heatmapLayer: ', heatmapLayer)
}

const onUnmountHeat = heatmapLayer => {
  //console.log( 'HeatmapLayer onUnmount heatmapLayer: ', heatmapLayer)
} 
 
  if (isLoaded) {
    if (type === 'PlacedAutoComplete') {
      return <AutoCompleteComponent error={error} register={register} withLatLng={withLatLng} handleAddress={handleAddress} />;
    }
 

    const iconSm = `<svg
id="Layer_1"
data-name="Layer 1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 100 120"
>
<defs>
  <style>
    .cls-1{fill:url(#linear-gradient)}
    .cls-2{fill:#fff;}
    .cls-3{fill:url(#linear-gradient-2);}
  </style>
  <linearGradient id="linear-gradient" x1="12" y1="3.01" x2="12" y2="20.59" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ff005c"/><stop offset="0.11" stop-color="#f6005e"/><stop offset="0.29" stop-color="#dc0063"/><stop offset="0.53" stop-color="#b3006b"/><stop offset="0.8" stop-color="#7a0076"/>
    <stop offset="1" stop-color="#4d007f"/></linearGradient><linearGradient id="linear-gradient-2" x1="12" y1="-0.09" x2="12" y2="25.12" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ff005c"/>
    <stop offset="0.17" stop-color="#e60061"/>
    <stop offset="0.54" stop-color="#a6006e"/>
    <stop offset="1" stop-color="#4d007f"/>
  </linearGradient>
</defs>
<title>Marker_01</title>
<path class="cls-1" d="M12,23.69C10.81,22.84,2.49,16.63,2.49,10a9.51,9.51,0,1,1,19,0C21.51,16.63,13.19,22.84,12,23.69Z"/>
<path class="cls-2" d="M12,.7A9.27,9.27,0,0,1,21.26,10c0,6.33-7.67,12.27-9.26,13.43C10.42,22.23,2.74,16.29,2.74,10A9.27,9.27,0,0,1,12,.7m0-.5A9.76,9.76,0,0,0,2.24,10C2.24,17.33,12,24,12,24s9.76-6.67,9.76-14A9.76,9.76,0,0,0,12,.2Z"/>
<circle class="cls-3" cx="12" cy="10" r="4.5"/>
<path class="cls-2" d="M12,6a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-1a5,5,0,1,0,5,5,5,5,0,0,0-5-5Z"/>
</svg>`;

        let averageTravellingTime = 4159;
        let averagedistance = 83299 ;
       // let noofemployee = 40926;
       // let noofoffices = officeLocations?.length ||0;
        if(selectedOffice && selectedOffice.homeLocations?.length>0)
        {
            averageTravellingTime =     selectedOffice.homeLocations.reduce((total, h)=> {
            return total  + parseInt(h.durationtooffice);
            },0)/60;  
            averagedistance = selectedOffice.homeLocations.reduce((total, h)=> {
            return total  + parseInt( h.distancetooffice);
            },0)/1000; 
           averageTravellingTime = parseInt( (averageTravellingTime/selectedOffice.homeLocations.length));
           averagedistance =  parseInt((averagedistance/selectedOffice.homeLocations.length)); 
        }
        const gradient = [
          "rgba(0, 255, 255, 0)",
          "rgba(0, 255, 255, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(0, 127, 255, 1)",
          "rgba(0, 63, 255, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 0, 223, 1)",
          "rgba(0, 0, 191, 1)",
          "rgba(0, 0, 159, 1)",
          "rgba(0, 0, 127, 1)",
          "rgba(63, 0, 91, 1)",
          "rgba(127, 0, 63, 1)",
          "rgba(191, 0, 31, 1)",
          "rgba(255, 0, 0, 1)"
        ];
        // mapId: "66980eae2c12742e",
    return (<>
      <CRow>
            <CCol xs>
      <div className="map-large">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentcenter}
          zoom={currentzoom ||13} 
          options={{  zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_CENTER,
          },
          fullscreenControlOptions:{
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
          styles }}
          onLoad={onLoad}
          onUnmount={onUnmount}
         // onZoomChanged ={onZIndexChanged} 
        >
 



          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
    
     
      </div>
      </CCol>
            </CRow>
     
     
 
        {lodingduration? <CRow>
              <CCol>
              <CButton className="loadingduration" disabled>
    <CSpinner component="span" size="sm" aria-hidden="true"/>
    Loading...
  </CButton>
              </CCol>
            </CRow>:null}   
            </>

    );
  } return <></>;
};

MapComponent.propTypes = {
  withLatLng: PropTypes.func,
  type: "PlacedAutoComplete",
  center: PropTypes.object,
  markers: PropTypes.array,
  handleAddress: PropTypes.func,
  register: PropTypes.object,
  error: PropTypes.string,
  directionServiceOpts: PropTypes.object,
  directionCallback: PropTypes.func,
}

AutoCompleteComponent.propTypes = {
  withLatLng: MapComponent.propTypes['withLatLng'],
  handleAddress: MapComponent.propTypes['handleAddress'],
  register: MapComponent.propTypes['register'],
  error: MapComponent.propTypes['error'],
}


export default memo(MapComponent);


