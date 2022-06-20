import { ChangeEvent, useEffect, useState } from 'react';

import FilterSection from 'src/content/DashboardPages/itemsToDiscuss/filterSection';
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
import GDPCard from '../../../../src/components/Common/Economy/GDPCard';
import VisaSales from 'src/components/Common/Economy/VisaSales';
import { useTranslation } from 'react-i18next';
import { destinationsData } from '@/components/MapComponent/utilis';
import MapComponent from '@/components/MapComponent';

import {
  getEvents,
  updateEvent,
  deleteEvent
} from '../../../../src/slices/itenForDiscuss';
import { useDispatch, useSelector } from '../../../../src/store';

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
    padding:10px
  `
);

function DashboardDiscuss() {
  const [currentLocations, setLocations] = useState([]);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [items, setIitems] = useState([]);
  const itemForDiscussVal: any = useSelector((state) => state.itemForDiscuss);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    console.log('reduxState--------', itemForDiscussVal);
    if (itemForDiscussVal && itemForDiscussVal.events) {
      setIitems(itemForDiscussVal.events);
    }
  }, [itemForDiscussVal]);

  useEffect(() => {
    const resolvedDatan = destinationsData.data.destinations?.map((data) => {
      return {
        lat: data.MEEDLatitude,
        MEEDTitle: data.MEEDTitle,
        lng: data.MEEDLongitude,
        _id: data.ProjectId,
        empno: 100,
        locationType: 'Projects'
      };
    });
    setLocations(resolvedDatan);
  }, []);

  return (
    <Card
      sx={{
        mx: 0
      }}
    >
      <FilterSection />
      <Grid container direction="column" alignItems="stretch" spacing={0} p={3}>
        <Typography variant="h4" component="h4">
          {/* ECONOMY */}
          {/* {t('Reports')} */}
        </Typography>

        <Grid container alignItems="stretch" p={5} direction="row" spacing={3}>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
        </Grid>

        <Typography variant="h4" component="h4">
          PEOPLE
          {/* {t('Reports')} */}
        </Typography>
        <Grid container alignItems="stretch" p={5} direction="row" spacing={3}>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
        </Grid>

        <Typography variant="h4" component="h4">
          SECURITY
          {/* {t('Reports')} */}
        </Typography>

        <Grid container alignItems="stretch" p={5} direction="row" spacing={3}>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
        </Grid>

        <Typography variant="h4" component="h4">
          HEALTH
          {/* {t('Reports')} */}
        </Typography>
        <Grid container alignItems="stretch" p={5} direction="row" spacing={3}>
          <Grid item xs={4} md={4}>
            {items && items.length > 0 && items.map((_item) => <GDPCard />)}
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
          <Grid item xs={4} md={4}>
            <GDPCard />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DashboardDiscuss;
