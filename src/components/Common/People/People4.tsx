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

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { useEffect, useState } from 'react';
import { getTableData } from '@/api/table';
import { useMutation } from 'react-query';
import millify from "millify";

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
    background: ${theme.palette.mode === 'dark'
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

  const [labelsData, setLabelsData] = useState([]);

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "90"
      }
    },

    colors: [theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
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
    xaxis: {
      // categories: ['Service1',
      // 'Service2',
      // 'Service3',
      // 'Service4',
      // 'Service5',
      // ],
      categories: labelsData
    },
    // xaxis: {
    //   labels: {
    //     show: false
    //   },
    //   axisBorder: {
    //     show: false
    //   },
    //   axisTicks: {
    //     show: false
    //   }
    // },
    // yaxis: {
    //   show: false,
    //   tickAmount: 5
    // },
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



  // const chart3Data = [
  //   {
  //     name: 'Cardano Price',
  //     data: [51.85, 41.77, 22.09, 42.0, 71.9]
  //   }
  // ];


  const [graphData, setGraphData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const tableName = 'CRM_COMPLAINS_DESC'
  const displayColumn1 = 'Complains'
  const displayColumn2 = 'CRM_COMPLAINS_DESC'
  const labelColumn = 'SERVICE_NAME'

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
        let labels = []
        let totalAmt = 0
        let ids = data.data.map((r,i) => { 
          labels.push(r[`${tableName}[${labelColumn}]`])
          totalAmt+=r[`${tableName}[${displayColumn1}]`]
          return r[`${tableName}[${displayColumn1}]`]
        })
        setLabelsData(labels)
        setTotalAmount(totalAmt/data.data.length)

        console.log("==========labels 22", labels)
        console.log("==========ids", ids)
        setGraphData([
          {
            name: 'Cardano Price',
            data: ids
          }
        ])
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
           <Box
            sx={{
              p: 1
            }}
          >
 <Box display="flex" alignItems="center" position={"relative"}>
        <Box position={"absolute"} right="10px" borderRadius={"15px"}>
            <PushPinOutlinedIcon />

          </Box>            
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
               VS
              </Avatar>
              </AvatarWrapper>

              <Box>
                <Typography variant="h4" sx={{
                  paddingInlineStart:"0.5rem",
                }} noWrap>
                {t('Services with most complaints – via TAMM')}
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
                 Average {millify(totalAmount)}
              </Typography>
              {/* <Typography
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
            </Typography> */}

             
            </Box>
          
          </Box>

    
   
          <Chart
            options={chartOptions}
            series={graphData}
            type="bar"
            height={200}
            />
              
       
    
    </Card>
  );
}


export default ConsumerPriceIndex;
