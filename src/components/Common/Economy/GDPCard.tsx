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
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Chart } from 'src/components/Chart';
import millify from 'millify';

import ReactTooltip from 'react-tooltip';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getTableData } from '@/api/table';
import { OilBarrelSharp } from '@mui/icons-material';

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

function Conversions() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const [labelsData, setLabelsData] = useState([]);

  const chart3Options: ApexOptions = {
    stroke: {
      width: [0, 0, 0]
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: [
      alpha(theme.colors.primary.main, 0.4),
      alpha(theme.colors.primary.main, 0.6),
      theme.colors.primary.main
    ],
    fill: {
      opacity: 1
    },
    labels: labelsData,
    xaxis: {
      type: 'numeric'
    },
    yaxis: {
      labels: {
        formatter: function (v) {
          return v.toFixed(2);
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
      strokeDashArray: 3
    },
    legend: {
      show: true,
      position: 'top'
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    }
  };

  const [graphData, setGraphData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('0');

  const { mutate: getTableDataAPI, isLoading: tableDataLoader } = useMutation(
    ({ tableName }: { tableName: string }) =>
      // ToDo: Update Limit Here
      getTableData(tableName, 5, true, 'econ'),
    {
      onSuccess: (data) => {
        if (data && data.data) {
          let labels = [];
          let totalAmt = 0;
          let oil = data.data.map((r, i) => {
            if (r) return r['GDP[Oil]'];
          });
          let noil = data.data.map((r, i) => {
            if (r) return r['GDP[Non-oil]'];
          });
          let total = data.data.map((r, i) => {
            if (r['GDP[Total]']) {
              totalAmt += r['GDP[Total]'];
            }

            if (r['GDP[Year]'] !== undefined) {
              labels.push(r['GDP[Year]']);
            }
            return r['GDP[Total]'];
          });

          if (labels && labels.length) {
            setLabelsData(labels);
          }
          setTotalAmount(totalAmt.toFixed(2));
          setGraphData([
            {
              name: 'Oil',
              type: 'bar',
              data: oil
            },
            {
              name: 'Non-Oil',
              type: 'bar',
              data: noil
            },
            {
              name: 'Total',
              type: 'bar',
              data: total
            }
          ]);
        }
      },
      onError: (error) => {
        console.log('Error', error);
      }
    }
  );

  // To handle pined card to redux.
  const handlePinCard = (e) => {
    try {
      e.preventDefault();
      console.log(e);
      dispatch(createEvent(ECOMONY_DATA[0]));
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDrawerToggle = () => {
  //   router.push('/dashboards/reports');
  // };
  useEffect(() => {
    getTableDataAPI({ tableName: 'GDP' });
  }, []);

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
        <Box display="flex" alignItems="center" position={'relative'}>
          <Box position={'absolute'} right="10px" borderRadius={'15px'}>
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
                background: '#77C7FE',
                color: `${theme.palette.getContrastText(
                  theme.colors.warning.dark
                )}`,
                width: 35,
                height: 35
              }}
            >
              GDP
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
              {t('GDP Growth')}
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
            {/* <span>+67,43%</span>
              <KeyboardArrowUpTwoToneIcon fontSize="small" /> */}
          </Typography>
        </Box>
      </Box>

      <Chart
        options={chart3Options}
        series={graphData}
        type="line"
        height={200}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingInlineStart: '20px',
          overflow: 'auto',
          marginRight: '10px'
        }}
      >
        <Typography variant="subtitle2" noWrap>
          Insight
        </Typography>
        <a
          data-tip="
              1. While economy grew by 1.9% in 2021, it still hasn’t achieved 2019 levels.
              <br />
              2. Compared to 2019, non-oil GDP declined by 8% while oil GDP grew by 4%.
              <br />
              3. Construction, Transportation and Storage, Financial and Insurance activities, and Real Estate activities contributed the most to the decline in non-oil GDP."
        >
          <Typography
            lineHeight="1.5"
            fontSize="12px"
            justifyContent="flex-start"
            textAlign="initial"
            fontWeight="normal"
            variant="h4"
          >
            {t(
              '1. While economy grew by 1.9% in 2021, it still hasn’t achieved 2019 levels.  '
            )}
            <span style={{ color: '#4f5a8a' }}>Read more..</span>
          </Typography>
        </a>

        <ReactTooltip multiline={true} place="top" type="info" effect="float" />
      </Box>
    </Card>
  );
}

export default Conversions;
