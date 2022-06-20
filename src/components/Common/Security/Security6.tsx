import { useTranslation } from 'react-i18next';
import {
  CardHeader,
  Box,
  Divider,
  CardContent,
  Avatar,
  Card,
  ListItemText,
  List,
  alpha,
  ListItem,
  styled,
  useTheme,
  Typography
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5)};
    width: ${theme.spacing(5)};
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

function ConsumerPriceIndex() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const data = {
    percentage: 67,
    sales: 127,
    customers: 1.358,
    earnings: '$15,864.00'
  };

  const chartOptions: ApexOptions = {
    stroke: {
      curve: 'smooth',
      width: [0, 5]
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    markers: {
      hover: {
        sizeOffset: 2
      },
      shape: 'circle',
      size: 6,
      strokeWidth: 3,
      strokeOpacity: 1,
      strokeColors: theme.colors.alpha.white[100],
      colors: [theme.colors.error.main]
    },
    colors: [theme.colors.primary.main, theme.colors.error.main],
    fill: {
      opacity: 1
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        columnWidth: '20%'
      }
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
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };

  const chartData = [
    {
      name: 'Visitors',
      type: 'column',
      data: [434, 827, 123, 367, 818, 833, 860]
    },
    {
      name: 'Revenue',
      type: 'line',
      data: [434, 108, 912, 767, 855, 840, 756]
    }
  ];

  return (
    <Card sx={{ minHeight: '17vw' }}>
      {/* <CardHeader
        sx={{
          textAlign: 'left'
        }}
        subheaderTypographyProps={{
          variant: 'h3',
          color: 'green',
        }}
        subheader={"20%"}
        title={t('GDP Growth')} /> */}
      <Box
        sx={{
          p: 1
        }}
      >
        <Box display="flex" alignItems="center">
          {/* <AvatarWrapper>
                <img
                  alt="ADA"
                  src="/static/images/placeholders/logo/cardano.png"
                />
              </AvatarWrapper> */}
          <AvatarWrapper>
            <Avatar
              sx={{
                fontSize: `${theme.typography.pxToRem(15)}`,
                background: '#A5569A',
                color: `${theme.palette.getContrastText(
                  theme.colors.warning.dark
                )}`,
                width: 35,
                height: 35
              }}
            >
              VS
            </Avatar>
          </AvatarWrapper>

          <Box>
            <Typography
              variant="h4"
              sx={{
                paddingInlineStart: '0.5rem'
              }}
              noWrap
            >
              {t('Number of Incidents')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 0
          }}
        >
          <Typography
            variant="h3"
            sx={{
              pr: 1,
              mb: 1
            }}
          >
            AED 230000
          </Typography>
          <Typography
            variant="h5"
            sx={{
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              color: `${theme.colors.success.main}`
            }}
          >
            <span>+67,43%</span>
            <KeyboardArrowUpTwoToneIcon fontSize="small" />
          </Typography>
        </Box>
      </Box>

      <Chart
        options={chartOptions}
        series={chartData}
        type="line"
        height={250}
      />
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingInlineStart: '20px',
          minHeight: '6vw',

          overflow: 'auto'
        }}
      >
        <Typography variant="subtitle2" noWrap>
          Insight
        </Typography>
        <Typography
          lineHeight="1.5"
          fontSize="12px"
          justifyContent="flex-start"
          textAlign="initial"
          fontWeight="normal"
          variant="h4"
        >
          {t(
            'High performance React template built with lots of powerful components across multiple product niches.High performance React template built with lots of powerful components across multiple product niches'
          )}
          .
        </Typography>
      </Box> */}
    </Card>
  );
}

export default ConsumerPriceIndex;
