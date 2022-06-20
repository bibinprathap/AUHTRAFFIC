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
import millify from "millify";

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
import moment from 'moment';

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
    labels: labelsData,
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

  const [graphData, setGraphData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
 
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
        let dt = data.data.map((r,i) => { 
          if (r) {
          labels.push(`${r["Consumer_Prod[MonthYear]"]}`)
          if (r["Consumer_Prod[Weighted Value]"]) totalAmt+=r["Consumer_Prod[Weighted Value]"]
          totalAmt+=r["Consumer_Prod[Weighted Value]"]
          console.log(      "======== cc",     totalAmt, r["Consumer_Prod[Weighted Value]"]          )
          return( r["Consumer_Prod[Weighted Value]"])
          }
        })
        console.log("===== cw", totalAmt)
          setTotalAmount(totalAmt)

        setGraphData([ 
          {
            name: 'Change',
            data: dt
          }
        ])
        setLabelsData(labels)
      },
      onError: (error) => {
        console.log("Error", error)
      },
    }
  );

  useEffect(()=> {
    getTableDataAPI({
      tableName:"Consumer_Prod",
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
                background: "#7D5DE9",
                color: `${theme.palette.getContrastText(
                  theme.colors.warning.dark
                )}`,
                width: 35,
                height: 35
              }}
            >
              CPI
            </Avatar>
          </AvatarWrapper>

          <Box>
            <Typography variant="h4" sx={{
              paddingInlineStart: "0.5rem",
            }} noWrap>
              {t('Consumer Price Index')}
            </Typography>

          </Box>
          <Box position={"absolute"} right="10px" borderRadius={"15px"}>
            <PushPinOutlinedIcon />

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
          {/* {millify(totalAmount)} */}
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
            {/* <span>+67,43%</span> */}
            {/* <KeyboardArrowUpTwoToneIcon fontSize="small" /> */}
          </Typography>


        </Box>

      </Box>


      <Chart
        options={ChartAudienceOptions}
        series={graphData}
        type="line"
        height={180}
      />


      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingInlineStart: '20px',
        minHeight: '4.6vw',
        overflow: 'auto',
      }} >
        <Typography variant="subtitle2" noWrap>
          Insight
        </Typography>
        <a
          data-tip="
              1. Inflation in Dec. 2021 was at 3.1% with most of the increase (~90%) coming from the increased cost of transportation.
              <br />
              2. SCAD is in the process is making changes to CPI calculation methodology."
        >
          <Typography
            lineHeight="1.5"            
            // overflow="hidden"
            // textOverflow={'ellipsis'}
            // whiteSpace='nowrap'
            fontSize="12px"
            justifyContent='flex-start'
            textAlign='initial'
            fontWeight="normal"
            variant="h4">
            {t(
              '1. Inflation in Dec. 2021 was at 3.1% with most of the increase (~90%) coming from the increased cost of transportation.  '
            )}<span style={{ color: '#4f5a8a' }}>Read more..</span>
          </Typography>            
        </a>
        <ReactTooltip
          multiline={true}
          place="top"
          type="info"
          effect="float" />
        {/* <Typography
          lineHeight="1.5"
          fontSize="12px"
          justifyContent='flex-start'
          textAlign='initial'
          fontWeight="normal"
          variant="h4">
          {t(
            '2. SCAD is in the process is making changes to CPI calculation methodology.'
          )}
        </Typography> */}
      </Box>
    </Card>
  );
}

export default ConsumerPriceIndex;
