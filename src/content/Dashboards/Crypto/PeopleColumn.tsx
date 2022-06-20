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
import People5 from 'src/components/Common/People/People5';
import People6 from 'src/components/Common/People/People6';
// import GDPCard from 'src/components/Common/Health/GDPCard';
import People1 from 'src/components/Common/People/People1';
import People2 from 'src/components/Common/People/People2';
import People3 from '@/components/Common/People/People3';
import People4 from 'src/components/Common/People/People4';


import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function WatchListColumn() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: [theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.colors.primary.main],
      width: 3
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      tickAmount: 5
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return '';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  const chart1Data = [
    {
      name: 'Bitcoin Price',
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16]
    }
  ];
  const chart2Data = [
    {
      name: 'Ethereum Price',
      data: [13, 16, 14, 20, 8, 11, 20]
    }
  ];
  const chart3Data = [
    {
      name: 'Cardano Price',
      data: [51.85, 41.77, 22.09, 42.0, 71.9, 51.84, 31.84]
    }
  ];
  const handleDrawerToggle = () => {
    router.push('/dashboards/reports')  
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3} 
      onClick={handleDrawerToggle} 
    >
       <Grid item md={4} xs={12}>
     <People1/>
      </Grid>


      <Grid item md={4} xs={12}>
       <People2 />
      </Grid>  
       

      <Grid item md={4} xs={12}>
        <People3 />
      </Grid>


      <Grid item md={4} xs={12}>
         <People4 />
      </Grid>
      <Grid item md={4} xs={12}>

        <People5 />

      </Grid>

      <Grid item md={4} xs={12}>
        <People6 />
      </Grid>

     

    </Grid>
  );
}
export default WatchListColumn;
