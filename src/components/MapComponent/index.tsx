import React, {
  useState, useRef,
  memo, useEffect, useMemo
} from 'react';


import InfoBoxComponent from './InfoComponent';

import {
  GoogleMap, useJsApiLoader, Marker, Autocomplete, InfoWindow, DirectionsService, DirectionsRenderer, Circle, LoadScript, HeatmapLayer
} from '@react-google-maps/api';
import { MapStyles } from './utilis';

const libraries: any[] = ['places', 'visualization'];
const centerProp = { lat: 24.4211889, lng: 54.4313433 };

const containerStyle = {
  width: '100%',
  height: '100%',
};

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

const MapComponent = ({ center = centerProp,attractionlocations, zoom, markers, updateDataStatus, showDataStatus }: any) => {

  const [currentcenter, setCurrentcenter] = useState(center);
  const [currentzoom, setZoom] = useState(zoom || 12);
  const [infoLocation, setIntfoLocation] = useState(null);
  const [infoLocationData, setIntfoLocationData] = useState(null);


  const [infoLocationAttraction, setIntfoLocationAttraction] = useState(null);
  const [infoAttractionLocationData, setAttractionIntfoLocationData] = useState(null);



  const memorisedMarkers = useMemo(() => markers?.filter((data) => showDataStatus[data?.locationType]), [markers, showDataStatus])
  const memorisedCircles = useMemo(() => attractionlocations , [attractionlocations, showDataStatus])


  useEffect(() => {
    setCurrentcenter(center);
    setZoom(zoom || 9);
  }, [center, zoom])



  const mapid = ["fcc5a7955fc5718e"];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDOqjoKY4YFUV3uS23oYocDSp8Rv36yhmQ',
    libraries,
    mapIds: mapid
  });

  const getCheckboxContent = (containerDiv, labelText) => {
    const checkBoxEle = document.createElement("input");
    checkBoxEle.setAttribute("type", "checkbox");
    checkBoxEle.setAttribute("name", labelText);
    checkBoxEle.checked = true;
    checkBoxEle.addEventListener("change", (event) => {
      const currentValue = event.target.checked;
      updateDataStatus((state) => ({ ...state, [labelText]: currentValue }))
    })
    const spanText = document.createElement("label");
    spanText.htmlFor = labelText;
    spanText.style.color = "rgb(25,25,25)";
    spanText.style.fontFamily = "Roboto,Arial,sans-serif";
    spanText.style.fontSize = "16px";
    spanText.style.lineHeight = "38px";
    spanText.style.paddingLeft = "5px";
    spanText.style.paddingRight = "5px";
    spanText.innerHTML = labelText;
    containerDiv.appendChild(checkBoxEle)
    containerDiv.appendChild(spanText)
  }

  const CenterControl = (controlDiv, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    getCheckboxContent(controlUI, "Projects")
    getCheckboxContent(controlUI, "Attractions")
    // const abudhabi = { lat: 24.4211889, lng: 54.4313433 }; 
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlDiv.appendChild(controlUI);
  }

  const onLoad = React.useCallback((map) => {
    const centerControlDiv = document.createElement("div");
    CenterControl(centerControlDiv, map);
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  }, [])

  const onUnmount = React.useCallback((mapData) => {
  }, []);

  const onMarkerClick = (e, locationData) => {

    const { latLng } = e;
    setIntfoLocationData(locationData);
    setIntfoLocation({ lat: latLng.lat(), lng: latLng.lng() }); 
  }; 


  const onMarkerClickAttraction = (e, locationData) => { 
    const { latLng } = e;
    setIntfoLocationAttraction(locationData);
    setAttractionIntfoLocationData({ lat: latLng.lat(), lng: latLng.lng() }); 
  };

  const clearInfoWindow = () => {
    setIntfoLocation(null);
    setIntfoLocationAttraction(null);
    

  }


  return (<div style={{ height: "100%" }}>
    {isLoaded &&
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentcenter}
        zoom={12}
        options={{
          zoomControlOptions: {
            position: window?.google?.maps?.ControlPosition.LEFT_CENTER,
          },
          fullscreenControlOptions: {
            position: window?.google?.maps?.ControlPosition.LEFT_TOP,
          },
          styles: MapStyles
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      // onZoomChanged ={onZIndexChanged} 
      >

        {memorisedMarkers?.map(((markerdData, i) => { 
              const icon = {
            size: new window.google.maps.Size(markerdData.empno * 4, markerdData.empno * 4),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
          };
          const iconSm2 = `
<svg
id="Layer_1"
data-name="Layer 1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 ${markerdData.empno} ${markerdData.empno}"
>

<title>Marker_01</title>
<circle cx="${markerdData.empno / 8}" cy="${markerdData.empno / 8}" r="${markerdData.empno / 8}" fill="red"/>
</svg> `;
          //  icon.url = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(`<svg width="160" height="160"><circle cx="80" cy="80" r="80" fill="red"/></svg>`);
          icon.url = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(iconSm2);
          // const iconsImg = <img width={} src={markerdData.iconUrl} />

          const iconObj = {
            url: markerdData.iconUrl, // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }; 
          return (
            <>
              <Marker
                
                position={markerdData.points}
                icon={iconObj}
                onClick={(e) => onMarkerClick(e, markerdData)}
              />
            </>
          )
        }))}
 


{memorisedCircles?.map(((markerdData, i) => {


const icon = {
  size: new window.google.maps.Size(markerdData.empno * 4, markerdData.empno * 4),
  origin: new window.google.maps.Point(0, 0),
  anchor: new window.google.maps.Point(16, 32)
};
const iconSm2 = `
<svg
id="Layer_1"
data-name="Layer 1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 ${markerdData.empno} ${markerdData.empno}"
>
<title>Marker_01</title>
<circle cx="${markerdData.empno / 8}" cy="${markerdData.empno / 8}" r="${markerdData.empno / 8}" fill="red"/>
</svg> `;
//  icon.url = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(`<svg width="160" height="160"><circle cx="80" cy="80" r="80" fill="red"/></svg>`);
icon.url = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(iconSm2);

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 0,
  fillColor: '#FF0000',
  fillOpacity: 0.85,

  draggable: false,
  editable: false,
  visible: true,

  zIndex: 1
}


return (
  <>

    <Circle
      strokeColor={"#FF0000"}
      draggable
      strokeOpacity={0.8}
      strokeWeight={0}
      fillColor={"#FF0000"}
      fillOpacity={0.65}
      onClick={(e) => onMarkerClickAttraction(e, markerdData)}
      key={markerdData.points.lat}
      center={markerdData.points}
      radius={Math.sqrt(200) * 10}
      options={{ ...options }}
      optimized={false}

    />
  </>
)
}))}


        {infoLocation ? (
          <InfoWindow position={infoLocation} onCloseClick={clearInfoWindow}>
            <InfoBoxComponent title={infoLocationData?.MEEDTitle}
              ownerType={infoLocationData?.ownerType}
              EstimatedBudget={infoLocationData?.EstimatedBudget}
              Industry={infoLocationData?.Industry}
              SubSector={infoLocationData?.SubSector}
              lastUpdated={infoLocationData?.lastUpdated}
              CompletionYear={infoLocationData?.CompletionYear} />
          </InfoWindow>
        ) : null}
        {infoLocationAttraction ? (
          <InfoWindow position={infoLocationAttraction} onCloseClick={clearInfoWindow}>
            <InfoBoxComponent title={infoAttractionLocationData?.Asset}
              />
          </InfoWindow>
        ) : null}

      </GoogleMap>}
  </div>)
}

export default MapComponent;