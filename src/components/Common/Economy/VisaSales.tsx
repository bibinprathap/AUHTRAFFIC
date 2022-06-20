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

import ReactTooltip from "react-tooltip";

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { useMutation } from 'react-query';
import { getTableData } from '@/api/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
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
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    labels: labelsData,
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
    xaxis: {
      labels: {
        show: true
      },
      // axisBorder: {
      //   show: false
      // },
      // axisTicks: {
      //   show: false
      // }
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

  const [graphData, setGraphData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentage, setPercentage] = useState('0');
 
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
      30,
      false,
      "econ"
      ),
    {
      onSuccess: (data) => {
        let labels = []
        let totalAmt = 0

        let totalAmt2021 = 0
        let totalAmt2020 = 0

        let sa = data.data.map((r,i) => { 
          labels.push(`${r["VIsa_Summarized[Month Name]"]}-${r['VIsa_Summarized[YEAR]']}`)

          if (r['VIsa_Summarized[YEAR]']==="2021"){
            totalAmt2021+=r["VIsa_Summarized[Spend]"]
          }
          if (r['VIsa_Summarized[YEAR]']==="2020"){
            totalAmt2020+=r["VIsa_Summarized[Spend]"]
          }

          if (r["VIsa_Summarized[Spend]"]) totalAmt+=r["VIsa_Summarized[Spend]"]
          return r["VIsa_Summarized[Spend]"]
        })
        setLabelsData(labels)
        setTotalAmount(totalAmt2021)
        setPercentage((((totalAmt2021-totalAmt2020)/totalAmt2020)*100).toFixed(2))

        setGraphData([
          {
            name: 'Cardano Price',
            data: sa
          }
        ])
      },
      onError: (error) => {
        console.log("Error", error)
      },
    }
  );

  useEffect(()=> {
    getTableDataAPI({
      tableName:"VIsa_Summarized",
  })
  }, [])

  return (
    <Card sx={{ minHeight: "17vw" }}>
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

          </Box>              {/* <AvatarWrapper>
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
                {t('Visa Sales')}
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
                  AED {millify(totalAmount)}
              </Typography>
              <Typography
              variant="h5"
              sx={{
                fontSize: `${theme.typography.pxToRem(15)}`,
                // background: "#A5569A",
                
                color: `${theme.colors.success.main}`,
                width: 35,
                height: 35
              }}
            >
              {/* <span>   {percentage}%</span>
              <KeyboardArrowUpTwoToneIcon fontSize="small" /> */}
            </Typography>

          </Box>
          {/* <Box right="10px" borderRadius={"15px"}>
            <PushPinOutlinedIcon /> */}

    
   
          <Chart
            options={chartOptions}
            series={graphData}
            type="area"
            height={200}
            />
                   <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingInlineStart: '20px',
        minHeight: '4.7vw',
        overflow: 'auto',
      }} >
       
        <ReactTooltip
          multiline={true}
          place="top"
          type="info"
          effect="float" />
      </Box>
        

 
    </Card>
  );
}

export default ConsumerPriceIndex;
