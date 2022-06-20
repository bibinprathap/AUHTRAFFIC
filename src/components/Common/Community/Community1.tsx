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


function PMICard() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();


  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 5],
      colors: [theme.colors.error.main, theme.colors.primary.main]
    },
    fill: {
      opacity: [1, 0.2]
    },
    theme: {
      mode: theme.palette.mode
    },
    markers: {
      hover: {
        sizeOffset: 1
      },
      shape: 'circle',
      size: 3,
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeColors: theme.colors.alpha.white[100],
      colors: [theme.colors.error.main, theme.colors.primary.main]
    },
    colors: [theme.colors.error.main, theme.colors.primary.main],
    labels: [
      '12:00 AM',
      '3:00 AM',
      '6:00 AM',
      '9:00 AM',
      '12:00 PM',
      '3:00 PM',
      '6:00 PM',
      '9:00 PM',
      '12:00 PM'
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      labels: {
        useSeriesColors: true
      },
      itemMargin: {
        horizontal: 15,
        vertical: 0
      },
      show: true
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      labels: {
        show: true
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      strokeDashArray: 5,
      borderColor: theme.colors.alpha.black[10]
    }
  };

  const chartData = [
    {
      type: 'line',
      name: 'Previous Period',
      data: [344, 512, 829, 696, 847, 437, 935, 433, 962]
    },
    {
      type: 'area',
      name: 'Current Period',
      data: [740, 367, 372, 478, 459, 630, 894, 556, 369]
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
        subheader={"55"}
        title={t('Abu Dhabi’s Purchasssing Managers’ Index (PMI)')} />
      <Divider />
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartData}
          type="line"
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

export default PMICard;
