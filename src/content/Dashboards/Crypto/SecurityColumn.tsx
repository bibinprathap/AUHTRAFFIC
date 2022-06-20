import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  useTheme,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Label from 'src/components/Label';
import Text from 'src/components/TextSmall';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';

import NumberofDeath from 'src/components/Common/Health/NumberofDeath';
import OccupancyRateofICUbeds from 'src/components/Common/Health/OccupancyRateofICUbeds';

// import ConsumerPriceIndex from 'src/components/Common/Economy/ConsumerPriceIndex';
import PMI from 'src/components/Common/Economy/PMI';
// import VisaSales from 'src/components/Common/Economy/VisaSales';

// import GDPCard from 'src/components/Common/Health/GDPCard';
import Security from 'src/components/Common/Security/Security';
import Security2 from 'src/components/Common/Security/Security2';
import Security3 from 'src/components/Common/Security/Security3';
import Security4 from 'src/components/Common/Security/Security4';
import Security5 from 'src/components/Common/Security/Security5';
import Security6 from 'src/components/Common/Security/Security6';

import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

function Item(props) {
  const { sx, ...other } = props;
  return <Box {...other} />;
}

function WatchListColumn() {
  const router = useRouter();

  // const handleDrawerToggle = () => {
  //   router.push('/dashboards/reports');
  // };

  return (
    // <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
    //   <Box>
    //     <Security />
    //   </Box>
    //   <Box>
    //     <Security3 />
    //   </Box>
    //   <Box>
    //     <Security />
    //   </Box>
    // </Box>

    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      // onClick={handleDrawerToggle}
    >
      <Grid item md={4} xs={12}>
        <Security />
      </Grid>

      <Grid item md={4} xs={12}>
        <Security3 />
      </Grid>

      <Grid item md={4} xs={12}>
        <Security2 />
      </Grid>

      <Grid item md={4} xs={12}>
        <Security4 />
      </Grid>

      <Grid item md={8} xs={12}>
        <Security6 />
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
