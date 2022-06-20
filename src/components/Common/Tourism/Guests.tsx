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
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

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

function Guests() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const data = {
    percentage: 67,
    sales: 127,
    customers: 1.358,
    earnings: '$15,864.00'
  };

  const ChartAudienceOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: [theme.colors.primary.main],
    labels: [
        "01 Jun",
        "02 Jun",
        "03 Jun",
        "04 Jun",
        "05 Jun",
        "06 Jun",
        "07 Jun",
        "08 Jun",
        "09 Jun",
        "10 Jun",
        "11 Jun",
        "12 Jun"
    ],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      strokeDashArray: 5,
      borderColor: theme.colors.alpha.black[10]
    },
    legend: {
      show: false
    },
    markers: {
      hover: {
        sizeOffset: 2
      },
      shape: 'circle',
      size: 2,
      strokeWidth: 2,
      strokeOpacity: 2,
      strokeColors: [theme.colors.primary.main],
      colors: [theme.colors.alpha.white[100]]
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 1
    },
    theme: {
      mode: theme.palette.mode
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
      tickAmount: 3,
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
  const chart3Options: ApexOptions = {
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
      }
    },
    colors: [alpha(theme.colors.primary.main, 0.4), theme.colors.primary.main],
    fill: {
      opacity: 1
    },
    labels: [
      '01 Aug 2021',
      '02 Aug 2021',
      '03 Aug 2021',
      '04 Aug 2021',
      '05 Aug 2021',
      '06 Aug 2021',
      '07 Aug 2021',
      '08 Aug 2021',
      '09 Aug 2021',
      '10 Aug 2021',
      '11 Aug 2021',
      '12 Aug 2021'
    ],
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    }
  };

 

  const chart3Data = [
    {
      name: 'Cardano Price',
      data: [51.85, 41.77, 22.09, 42.0, 71.9, 51.84, 31.84]
    }
  ];

  return (
    <Card sx={{ minHeight:"26vw" }}>
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
            <Box display="flex" alignItems="center" position={"relative"}>
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
                  background:"#A5569A",
                  color: `${theme.palette.getContrastText(
                    theme.colors.warning.dark
                  )}`,
                  width: 35,
                  height: 35
                }}
              >
               GS
              </Avatar>
              </AvatarWrapper>

              <Box>
                <Typography variant="h4" sx={{
                  paddingInlineStart:"0.5rem",
                }} noWrap>
                {t('Guests')}
                </Typography>
                
              </Box>
              <Box position={"absolute"} right="1px"    borderRadius={"15px"}>
                <PushPinOutlinedIcon/>
                
              </Box>
            </Box>
         
          
          </Box>

    
          <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                px: 1

              }}
            >
              <Typography
                variant="h3"
                sx={{
                  pr: 3,
                }}
              >
                 351792 

              </Typography>
              

             
            </Box>
          
          <Chart
            options={ChartAudienceOptions}
            series={[ 
              {
                name: 'Guests',
                data: [
                  32039,31931,34074,34924,26768,27821,28106,27582,26816,28635,29067,24029
                ]
              }
            ]}
            type="line"
            height={225}
          />
              
  
       
    
    </Card>
  );
}

export default Guests;
