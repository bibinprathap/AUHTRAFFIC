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
import millify from "millify";
import type { ApexOptions } from 'apexcharts';

import ReactTooltip from "react-tooltip";

import moment from 'moment'
 
import { Chart } from 'src/components/Chart';


import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getTableData } from '@/api/table';

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
      }
    },
    stroke: {
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 5],
      colors: [theme.colors.primary.main, theme.colors.warning.main]
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
      colors: [theme.colors.primary.main, theme.colors.warning.main]
    },
    colors: [theme.colors.primary.main,theme.colors.warning.main ],
    labels: labelsData,
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
      show: false
    },
    xaxis: {
      axisBorder: {
        show: true
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
          show: false
        }
      },
      strokeDashArray: 5,
      borderColor: theme.colors.alpha.black[10]
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
      3,
      false,
      "econ"
      ),
    {
      onSuccess: (data) => {
        let sa1 = []
        let labels = []
        let totalAmt = 0
       
        let totalAmt2021 = 0
        let totalAmt2020 = 0
       
        let sa = data.data.map((r,i) => { 
          if (data.data.length === i+1) {
            setTotalAmount(r["AD_PMI[Adjusted]"])
          }
          if (r) {
          sa1.push(0)
          labels.push(moment(r["AD_PMI[Date]"]).format('MMM-YYYY') )
          if (r["AD_PMI[AD_PMI - SA]"]) totalAmt+=r["AD_PMI[AD_PMI - SA]"]


          let year = moment(r['AD_PMI[MonthYear]']).format('YYYY')
          if (year) {
            if (year==='2021'){
            totalAmt2021+=r["AD_PMI[Adjusted]"]
          }
          if (year==='2020'){
            totalAmt2020+=r["AD_PMI[Adjusted]"]
          }
         }
         
          console.log("==========pmi 234", totalAmt2021, totalAmt2020)
          
          return r["AD_PMI[Adjusted]"]}
        })
        setPercentage((((totalAmt2021-totalAmt2020)/totalAmt2020)*100).toFixed(2))

        setGraphData([
          {
            type: 'line',
            name: 'Previous Period',
            data: sa
          },
        ])
        setLabelsData(labels)
      },
      onError: (error) => {
        console.log("Error", error)
      },
    }
  );

  useEffect(()=> {
    getTableDataAPI({tableName:"AD_PMI",
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
                background: "#A5569A",
                color: `${theme.palette.getContrastText(
                  theme.colors.warning.dark
                )}`,
                width: 35,
                height: 35
              }}
            >
              PMI
            </Avatar>
          </AvatarWrapper>

          <Box>
            <Typography variant="h4" sx={{
              paddingInlineStart: "0.5rem",
            }} noWrap>
              {t('Abu Dhabi’s Purchasing Managers’ Index')}
            </Typography>

          </Box>
          {/* <Box position={"absolute"} right="10px" top={"-2px"} borderRadius={"15px"}>
            <PushPinOutlinedIcon />

          </Box> */}
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
          {millify(totalAmount)}
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
            {/* <span>+67,43%</span>
            <KeyboardArrowUpTwoToneIcon fontSize="small" /> */}
          </Typography>


        </Box>

      </Box>
      <Box
        sx={{
          marginInlineEnd: "10px",
          marginInlineStart: "10px"
        }} >
        <Chart
         options={chartOptions}
         series={graphData}
          type="line"
          height={200}
          />
      </Box>


      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingInlineStart: '20px',
        minHeight: '4vw',
        overflow: 'auto',

      }} >
        <Typography variant="subtitle2" noWrap>
          Insight
        </Typography>
        <a
          data-tip="
          1. Purchasing Managers’ Index is a survey index that aims to measure the prevailing direction of economic trends with values above 50 signifying expansion and below signifying contraction.
              <br />
              2. IHS Markit has recently begun publishing PMI data for Abu Dhabi."
        >
          <Typography lineHeight="1.5" fontSize="12px" justifyContent='flex-start' textAlign='initial' fontWeight="normal" variant="h4">
            {t(
              '1. Purchasing Managers’ Index is a survey index that aims to measure the prevailing direction of economic trends with values above 50 signifying expansion and below signifying contraction.  '
            )}
            <span style={{ color: '#4f5a8a' }}>Read more..</span>
          </Typography>
        </a>
        <ReactTooltip
          multiline={true}
          place="top"
          type="info"
          effect="float" />
        {/* <Typography lineHeight="1.5"  fontSize="12px" justifyContent='flex-start'  textAlign= 'initial' fontWeight="normal" variant="h4">
                {t(
                  '2. IHS Markit has recently begun publishing PMI data for Abu Dhabi.'
                )}
              </Typography> */}
      </Box>



    </Card>
  );
}

export default ConsumerPriceIndex;
