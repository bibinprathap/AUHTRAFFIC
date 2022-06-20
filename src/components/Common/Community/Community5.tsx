import { useTranslation } from 'react-i18next';
import {
  CardHeader,
  Divider,
  CardContent,
  Avatar,
  Card,
  ListItemText,
  List,
  alpha,
  ListItem,
  styled,
  useTheme
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';


function VisaSales() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

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
        shadeIntensity: 0.6,
        inverseColors: false,
        opacityFrom: 0.9,
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
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
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
      show: false
    },
    grid: {
      padding: {
        right: 5,
        left: 5
      }
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Store Visits:';
          }
        }
      },
      marker: {
        show: true
      }
    }
  };

  const chartData = [
    {
      name: 'Store Visits',
      data: [26, 48, 59, 45, 59, 23]
    }
  ];


  return (
    <Card sx={{ minHeight:"17vw" }}>
      <CardHeader
        sx={{
          textAlign: 'left'
        }}
        subheaderTypographyProps={{
          variant: 'h3',
          color: 'green',
        }}
        subheader={"10%"}
        title={t('Visa Sales')} />
      <Divider />
      <CardContent>
      <Chart
              options={chartOptions}
              series={chartData}
              type="area"
              height={200}
            />

        <List
          disablePadding dense>
          <ListItem
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <ListItemText
              primary={t('Text 1')}
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            <ListItemText
              primary={t('Text 2')}
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            <ListItemText
              primary={t('Text 3')}
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            {/* <AvatarWrapperError>
              <TrendingDown />
            </AvatarWrapperError> */}
          </ListItem>
          <Divider
          />
        </List>
      </CardContent>
    </Card>
  );
}

export default VisaSales;
