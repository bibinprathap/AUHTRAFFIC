import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import PageHeader from 'src/content/Dashboards/Tasks/PageHeader';
import Footer from 'src/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Divider,
  Card,
  Box,
  Button,
  useTheme,
  Avatar,
  styled,
  Slider
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { useTranslation } from 'react-i18next';
import { destinationsData } from '@/components/MapComponent/utilis'
import MapComponent from '@/components/MapComponent';
import { height } from '@mui/system';

function valuetext(value: number) {
  return `${value}°C`;
}


function DashboardLocations() {
  const [currentLocations, setLocations] = useState([]);
  const [attarctCurrentLocations, setAttarctLocations] = useState([]);
  const [totalLocations, setTotalLocations] = useState([]);
  const [showDataStatus, updateDataStatus] = useState({
    Projects: true,
    Attractions: true,
  })
  const [uptoThis, updateProjectsLimit] = useState(0);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const iconsUrls = [
    '/static/images/icons/airplane.png',
    '/static/images/icons/camping-gas.png',
    '/static/images/icons/factory.png',
    '/static/images/icons/reuse-water.png',
    '/static/images/icons/save-energy.png'
  ];

  useEffect(() => {

    console.log("uptoThis >>", uptoThis)
    if( showDataStatus.Projects)
    {
      const filteredLocations = totalLocations?.filter((data) => Number(data?.CompletionYear) <= Number(uptoThis));
      setLocations(filteredLocations);
    }
    else
    {
      setLocations([]);
    }

  }, [uptoThis])

  
  useEffect(() => {

    console.log("showDataStatus >>", showDataStatus)
    if( showDataStatus.Projects)
    {
      const filteredLocations = totalLocations;
      //?.filter((data) => Number(data?.CompletionYear) <= Number(uptoThis));
      setLocations(filteredLocations);
    }
    else
    {
      setLocations([]);
    } 
    if(showDataStatus.Attractions)
    { 

      const attr =destinationsData.data.attraction.map(data => {
        return ({
          lat: data.Lat,
          lng: data.Long,
          Asset: data.Asset
        });

        });

      setAttarctLocations(attr); 
    }
    else
    {
      setAttarctLocations([]);
    } 
  }, [showDataStatus])

  // const resolvedDatanAttractions = destinationsData.data.destinations?.Attactions.map(data => {
  //   return ({
  //     lat: data.MEEDLatitude,
  //     lng: data.MEEDLongitude,
  //     MEEDTitle: data.MEEDTitle,
  //     ownerType: data["Owner Type"],
  //     Industry: data["Industry"],
  //     SubSector: data["SubSector"],
  //     lastUpdated: data["Last Updated"],
  //     EstimatedBudget: data["Estimated Budget ($m)"],
  //     CompletionYear: data["CompletionYear"],
  //     _id: data.ProjectId,
  //     empno: 100,
  //     locationType: "Attractions",
  //     ...data,

  //   })
  // });



  useEffect(() => {
    const resolvedDatanProjects = destinationsData.data.destinations?.Projects.map(data => {
      return ({
        lat: data.MEEDLatitude,
        lng: data.MEEDLongitude,
        MEEDTitle: data.MEEDTitle,
        ownerType: data["Owner Type"],
        Industry: data["Industry"],
        SubSector: data["SubSector"],
        lastUpdated: data["Last Updated"],
        EstimatedBudget: data["Estimated Budget ($m)"],
        CompletionYear: data["CompletionYear"],
        _id: data.ProjectId,
        empno: 100,
        locationType: 'Projects',
        iconUrl: iconsUrls[Number(Math.floor((Math.random() * iconsUrls.length)))],
      });
    })
    
    setLocations([ ...resolvedDatanProjects]);
    setTotalLocations(resolvedDatanProjects)
  }, [])

  const markers = useMemo(() => {
    if(showDataStatus.Projects, totalLocations.length) {
     const projectsLocations = totalLocations.filter((data) => data?.locationType === 'Projects' );
      const totalYears = new Set(projectsLocations.map(data => data.CompletionYear ));
      const yearsSet = [];
      totalYears.forEach(data =>  yearsSet.push(data));
      const sortedData = yearsSet.sort();
      const startPoint = Number(sortedData[0]);
      const endPoint = Number(sortedData[sortedData.length-1]);
      const netArray = new Array(endPoint - startPoint).fill("").map((data, i) => (  {
        value: i * 10 ,
        label: String(startPoint + i),
      }) )
      return netArray
      console.log("data set >>", yearsSet, startPoint, endPoint, netArray)
    }
    return [];
  }, [showDataStatus,totalLocations])

  function valueLabelFormat(value: number) {
    return markers.find((mark) => mark.value === value)?.label;
  }
  
  function DiscreteSliderValues() {
    return (
      <Box sx={{ width: 600, marginLeft: "200px" }}>
        <Slider
          aria-label="Custom marks"
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          defaultValue={markers[markers.length -1]?.value}
          onChange={(event, number) => {
            const markerValue = markers.find(data => data?.value == number);
            console.log("testing", markerValue?.label);
            updateProjectsLimit(markerValue?.label);
          }}
          valueLabelDisplay="auto"
          marks={markers}
        />
      </Box>
    );
  }
  

  return (
    <>
      <h1>Locations</h1>
{showDataStatus?.Projects ?  DiscreteSliderValues() : null }
      <Card
        sx={{
          mx: 0
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid item sx={{ height: '80vh' }} xs={12} md={12}>
            <MapComponent
            showDataStatus={showDataStatus}
            updateDataStatus={updateDataStatus}
            attractionlocations={attarctCurrentLocations.length > 0 ? attarctCurrentLocations.map((c, i) => {
              return {
               points: { lat: c.lat, lng: c.lng }, _id: 1,  ...c
              }
            }) : []
          }


              markers={currentLocations.length > 0 ? currentLocations.map((c, i) => {
                return {
                  MEEDTitle: c.MEEDTitle,
                  ownerType: c.ownerType,
                  Industry: c.Industry,
                  SubSector: c.SubSector,
                  EstimatedBudget: c.EstimatedBudget,
                  lastUpdated: c.lastUpdated,
                  CompletionYear: c.CompletionYear, locationType: c.locationType, points: { lat: c.lat, lng: c.lng }, _id: c._id, empno: c.empno, ...c
                }
              }) : []}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default DashboardLocations;
