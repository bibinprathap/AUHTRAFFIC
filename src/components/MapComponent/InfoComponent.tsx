import {
  Box,
  Card,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  ListItem,
  Avatar,
  Tooltip,
  circularProgressClasses,
  styled,
  useTheme
} from '@mui/material';
import Text from 'src/components/Text';
import { useTranslation } from 'react-i18next';


import { Chart } from 'src/components/Chart';

import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';


const InfoBoxComponent = ({ title = 'Work Force Count',ownerType,Industry,SubSector,EstimatedBudget,lastUpdated,CompletionYear }: any) => {

  const theme = useTheme();

  const items = [
    {
      id: 1,
      username: 'DMT',
      jobtitle: 'UI Engineer, Apple Inc.',
      progress: 76,
      arrow: '',
      value: '685'
    },
    {
      id: 2,
      username: 'DCT',
      jobtitle: 'Manager, Google Inc.',
      progress: 48,
      arrow: 'up',
      value: '3,685'
    },
    {
      id: 3,
      username: 'DOH',
      jobtitle: 'Project Manager, Spotify',
      progress: 38,
      arrow: '',
      value: '765'
    },
    {
      id: 4,
      username: 'DCT',
      jobtitle: 'Senior Designer, Amazon Inc.',
      progress: 85,
      arrow: '',
      value: '43,548'
    },
    {
      id: 5,
      username: 'ADDA',
      jobtitle: 'Senior Accountant, Microsoft',
      progress: 29,
      arrow: 'up',
      value: '1,584'
    }
  ];

  const Box1Options: ApexOptions = {
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
    colors: [theme.colors.warning.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.colors.warning.main],
      width: 3
    },
    legend: {
      show: false
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last Week',
      'Last Month',
      'Last Year',
      'Last 10 Years'
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
      min: 0
    }
  };
  const Box1Data = [
    {
      name: 'Top grossing products',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  const { t }: { t: any } = useTranslation();

  return (
    <Card
      sx={{
        position: 'relative'

      }}
    >
      <Box sx={{ height: '100%' }} pt={3} px={3}>
     
        <Typography
          variant="h3"
          sx={{
            pb: 1
          }}
        >
          {title}
        </Typography>
      
        <Box display="flex" paddingBottom="20px" alignItems="center">
      
          <Typography
            sx={{
              px: 0.5
            }}
            variant="h4"
          >
            {ownerType}
            
          </Typography>
          {/* <Text color="success">
            <b>+54</b>
          </Text> */}
        </Box>
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '16px'
          }}
          component="h6"
          variant="caption"
        >
          {t('Industry')}
        </Typography>
        <Box display="flex" alignItems="center">
        
          <Typography
            sx={{
              px: 0.5
            }}
             variant="h4"
          >

{/* ,,,lastUpdated,CompletionYear  */}

          {Industry}
          </Typography>
         
        </Box>

        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '16px'
          }}
          component="h6"
          variant="caption"
        >
          {t('Sector')}
        </Typography>
        <Box display="flex" alignItems="center">
        
          <Typography
            sx={{
              px: 0.5
            }}
             variant="h4"
          >

{/* ,,,lastUpdated,CompletionYear  */}

          {SubSector}
          </Typography>
         
        </Box>

        <Box display="flex"  flexDirection="row" > 

        <Box display="flex"  flexDirection="column" paddingRight="20px" > 
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '16px'
          }}
          component="h6"
          variant="caption"
        >
          {t('Estimated Budget ($m)')}
        </Typography>
        <Box display="flex" alignItems="center">
         
          <Typography
            sx={{
              px: 0.5
            }}
             variant="h4"
          >
            {EstimatedBudget}
          </Typography>
         
        </Box>
        </Box>

        <Box display="flex"  flexDirection="column" >
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '16px'
          }}
          component="h6"
          variant="caption"
        >
          {t('Completion Year')}
        </Typography>
        <Box display="flex" alignItems="center">
         
          <Typography
            sx={{
              px: 0.5
            }}
             variant="h4"
          >
            {CompletionYear}
          </Typography>
         
        </Box> 
        </Box>
      </Box> 

      <Box display="flex"  flexDirection="row" justifyContent="flex-end" >
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '16px'
          }}
          component="h6"
          variant="caption"
        >
          {t('Last Updated')}
        </Typography>
        <Box display="flex" alignItems="center">
         
          <Typography
            sx={{
              px: 0.5,
              fontSize: '12px'
            }}
             
          >
            {lastUpdated}
          </Typography>
         
        </Box> 
        </Box>

      </Box>
      {/* <Chart options={Box1Options} series={Box1Data} type="area" height={185} /> */}

    </Card>
  )
}

export default InfoBoxComponent;