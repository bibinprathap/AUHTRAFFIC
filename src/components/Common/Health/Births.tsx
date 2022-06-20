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
  Typography ,
  Grid
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import Text from 'src/components/Text';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import { getTableData } from '@/api/table';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import millify from 'millify';

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
const CardWrapper = styled(Card)(
  ({ theme }) => `
      background: ${alpha(theme.colors.alpha.black[10], 0.05)};
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

function NumberofDeath() {
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
        colors:{
          ranges: [{
            from: 0,
            to: 0,
            color: undefined
        }]
        },
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
    male: '0',
    female: '0',
    national: '0',
    expatriate:'0',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const tableName = 'Births'
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
        let labels = []
        let totalAmt = 0
        setTotalAmount(totalAmt/data.data.length)

        setGraphData(
          {
            male: millify(
            data.data.filter(x=> x['Births[Type]'] === "Male")[0]['Births[Number]'],{
              // precision: ,  
              
            }),
            female: millify(
            data.data.filter(x=> x['Births[Type]'] === "Female")[0]['Births[Number]'],{
              // precision: ,  
              
            }),
            national: millify(
            data.data.filter(x=> x['Births[Type]'] === "National")[0]['Births[Number]'],{
              // precision: ,  
              
            }),
            expatriate: millify(
            data.data.filter(x=> x['Births[Type]'] === "Expatriate")[0]['Births[Number]'],{
              // precision: ,  
              
            }),
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
    <Card sx={{ minHeight:"17vw"}} >
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
                  background:   "#77C7FE",
                  color: `${theme.palette.getContrastText(
                    theme.colors.warning.dark
                  )}`,
                  width: 35,
                  height: 35
                }}
              >
                NOD
              </Avatar>
              </AvatarWrapper>

              <Box>
                <Typography variant="h4" sx={{
                  paddingInlineStart:"0.5rem",
                }} noWrap>
                {t('Number of Birth')}
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
                }}
              >
             {/* 1202 */}
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

          <Typography
                variant="h5"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
      
           Gender
              </Typography>
   
          <CardWrapper
        elevation={0}
        sx={{
          textAlign: 'center',
          p: 1,
          mx: 3,
          my: 0
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Text color="warning">
              <PersonTwoToneIcon fontSize="medium" />
            </Text>
            <Typography
              variant="h5"
             
            >
                            {graphData.male}
            </Typography>
            <Typography variant="subtitle2">{t('Male')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Text color="success">
            <PersonTwoToneIcon fontSize="medium" />
            </Text>
            <Typography
              variant="h5"
              
            >
              {graphData.female}
            </Typography>
            <Typography variant="subtitle2">{t('Female')}</Typography>
          </Grid>
        </Grid>
      </CardWrapper>
      <Typography
                variant="h5"
                sx={{
                  pr: 1,
                  mb: 1,
                  mt:1
                }}
              >
                  Citizen Type
              </Typography>
      <CardWrapper
        elevation={0}
        sx={{
          textAlign: 'center',
          p: 1,
          mx: 3,
          my: 1
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Text color="warning">
              <PersonTwoToneIcon fontSize="medium" />
            </Text>
            <Typography
              variant="h5"
              
            >
                            {graphData.national}
            </Typography>
            <Typography variant="subtitle2">{t('National')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Text color="success">
            <PersonTwoToneIcon fontSize="medium" />
            </Text>
            <Typography
              variant="h5"
              
            >
                            {graphData.expatriate}

            </Typography>
            <Typography variant="subtitle2">{t('Expatriate')}</Typography>
          </Grid>
        </Grid>
      </CardWrapper>
      
  
    
    </Card>
  );
}

export default NumberofDeath;
