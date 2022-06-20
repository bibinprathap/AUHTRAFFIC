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

import GaugeChart from 'react-gauge-chart';
import { Chart } from 'src/components/Chart';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { getTableData } from '@/api/table';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';

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

function OccupancyRateofICUbeds() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const data = {
    percentage: 67,
    sales: 127,
    customers: 1.358,
    earnings: '$15,864.00'
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
      'Heart disease',
      'Cancer',
      'Covid',
      'Other',
       
    ],
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '20%',
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -15,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    },
    xaxis: {
      labels: {
        show: true
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
  };

  const chart3Data = [
    {
      name: 'Income',
      type: 'column',
      data: [30, 20, 15, 6 ]
    } 
  ];



  const [graphData, setGraphData] = useState({
    total: 0 ,
    critical: 0
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const tableName = 'Occupancy'
  const displayColumn1 = 'Satisfaction'
  const labelColumn = 'Short_Name'
 
  const {
    mutate: getTableDataAPI,
    isLoading: tableDataLoader,
  } = useMutation(
    ({
      tableName,
    }: {
      tableName: string;
    }) =>
    // ToDo: Update Limit Here
    getTableData(
      tableName,
      5,
      true,
      "adda"
      ),
    {
      onSuccess: (data) => {
        setGraphData(
          {
            total: data.data.filter(x=> 
              (x['Occupancy[Type]'] === "Total" && x['Occupancy[KPI]'] === "Occupied")
            )[0]['Occupancy[Value]'],
            critical: data.data.filter(x=> 
              (x['Occupancy[Type]'] === "Critical" && x['Occupancy[KPI]'] === "Occupied")
              )[0]['Occupancy[Value]'],
          }
        )
      },
      onError: (error) => {
        console.log("Error", error)
      },
    }
  );

  useEffect(()=> {
    getTableDataAPI({tableName})
  }, [])



  return (
    <Card sx={{ minHeight:"17vw" }}>
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
           {/* <Box
            sx={{
              p: 1
            }}
          > */}
 <Box display="flex" alignItems="center" position={"relative"}>
        <Box position={"absolute"} right="10px" borderRadius={"15px"}>
            <PushPinOutlinedIcon />

          </Box>                {/* <AvatarWrapper>
                <img
                  alt="ADA"
                  src="/static/images/placeholders/logo/cardano.png"
                />
              </AvatarWrapper> */}
          <AvatarWrapper>
              <Avatar
                sx={{
                  fontSize: `${theme.typography.pxToRem(15)}`,
                  background:   "#77C7FE",
                  color: `${theme.palette.getContrastText(
                    theme.colors.warning.dark
                  )}`,
                  width: 35,
                  height: 35
                }}
              >
                ICU
              </Avatar>
              </AvatarWrapper>

              <Box>
                <Typography variant="h4" sx={{
                  paddingInlineStart:"0.5rem",
                }} noWrap>
                {t('Occupancy Rate of ICU beds')}
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
              style={{padding: '100px 0'}}
            >
              {/* <Typography
                variant="h3"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
             1202
              </Typography>
              

             
            </Box>
          
          </Box>

          <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 3,
                        mb: 1,
                        mx: 'auto',
                        maxWidth: '12vw',
                        justifyContent:'center'
                      }}
                    >
                     <div style={{maxWidth: '12vw',display: 'flex',justifyContent:'center',flexDirection: 'column'}}>
                     <Typography variant="h5"  component="h5"  >
          Total
            {/* {t('Reports')} */}
          {/* </Typography> */}
          
          <div style={{maxWidth: '15vw',display: 'flex',justifyContent:'center',flexDirection: 'column'}}>
                      <Typography variant="h5"  component="h5"  >
                      Total
            {/* {t('Reports')} */}
          </Typography>
                      <GaugeChart
                      
                        nrOfLevels={24}
                        textColor={theme.colors.alpha.trueWhite[100]}
                        needleColor={theme.colors.alpha.trueWhite[30]}
                        needleBaseColor={theme.colors.alpha.trueWhite[100]}
                        colors={[
                          alpha(theme.colors.info.main, 0.9),
                          alpha(theme.colors.success.main, 1)
                        ]}
                        arcWidth={0.3}
                        percent={graphData.total}
                      />
                      </div>
                      <div style={{maxWidth: '12vw',display: 'flex',justifyContent:'center',flexDirection: 'column'}}>
                      <Typography variant="h5"  component="h5"  >
                      Critical
            {/* {t('Reports')} */}
          </Typography>
                 <GaugeChart
                        nrOfLevels={24}
                        textColor={theme.colors.alpha.trueWhite[100]}
                        needleColor={theme.colors.alpha.trueWhite[30]}
                        needleBaseColor={theme.colors.alpha.trueWhite[100]}
                        colors={[
                          alpha(theme.colors.warning.main, 0.8),
                          alpha(theme.colors.error.main, 0.9)
                        ]}
                        arcWidth={0.3}
                        percent={graphData.critical}
                      />
                   </div>
                    </Box>
   
        {/* <Chart
          options={chart3Options}
          series={chart3Data}
          type="line"
          height={120}
        /> */}
    
    </Card>
  );
}

export default OccupancyRateofICUbeds;
