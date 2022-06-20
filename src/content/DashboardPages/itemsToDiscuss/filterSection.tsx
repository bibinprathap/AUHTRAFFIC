import { ChangeEvent, useEffect, useState } from 'react';

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
  styled
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { useTranslation } from 'react-i18next';
import { destinationsData } from '@/components/MapComponent/utilis'
import MapComponent from '@/components/MapComponent';

const AvatarWrapperWarning = styled(Avatar)(
    ({ theme }) => `
        background-color: rgb(25, 118, 210);
        height: ${theme.spacing(4)};
    width: ${theme.spacing(20)};
    border-radius: 50px;
    padding:10px
  `
  );

function FilterSection() {
  const [currentLocations, setLocations] = useState([]);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if(destinationsData.data.destinations)
    {
      const resolvedDatan = destinationsData.data.destinations?.map(data => {
        return ({
          lat: data.MEEDLatitude,
          lng: data.MEEDLongitude,
          _id: data.ProjectId, 
          empno: 100,
          locationType:  "Projects" ,
  
        });
      })
      setLocations(resolvedDatan)
    }
    
  }, [])


  return (
    <Card
      sx={{
        mx: 0
      }}
    >
        
         <Typography variant="h4" p={"10px"} component="h4"  >
          Stratagies (0 Selecetd)
            {/* {t('Reports')} */}
          </Typography>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        spacing={0}
      >
        <Grid item  xs={2} md={2} p={5}>
            <AvatarWrapperWarning>
         Economy
         </AvatarWrapperWarning>
        </Grid>
        <Grid item  xs={2} md={2} p={5}>
        <AvatarWrapperWarning>
         People
         </AvatarWrapperWarning>
        </Grid>
        <Grid item  xs={2} md={2} p={5}>
        <AvatarWrapperWarning>
         Security
         </AvatarWrapperWarning>
        </Grid>
        <Grid item  xs={2} md={2} p={5}>
        <AvatarWrapperWarning>
         Health
         </AvatarWrapperWarning>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FilterSection;
