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

  const data = {
    percentage: 67,
    sales: 127,
    customers: 1.358,
    earnings: '$15,864.00'
  };

  const [labelsData, setLabelsData] = useState([]);

  const chart3Options: ApexOptions = {
    stroke: {
      width:[0,0,2]
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      // stacked: true,
      toolbar: {
        show: false
      },
    },
    colors: [alpha(theme.colors.primary.main, 0.4), theme.colors.primary.main,theme.colors.alpha.trueWhite[100]],
    fill: {
      opacity: 1
    },
    labels: labelsData,
    xaxis: {
      type: 'category',
    
    },

    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
      strokeDashArray:3
    },
    legend: {
      show: true,
      position: 'top',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  };

  const [graphData, setGraphData] = useState([]);
 
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
      false,
      "adda"
      ),
    {
      onSuccess: (data) => {
        let totalAmt = 0
        // let labels = []
        // let oil = []
        // let noil = []

      
        let oil = data.data.map((r,i) => { if (r) return r["Job_Seekers[Male]"]})
        let noil = data.data.map((r,i) => { if (r) return r["Job_Seekers[Female]"]})
        
      //   data.data.map((r,i) => { 
      //     if (r["Job_Seekers[Gender]"] === "Male") {
      //       oil.push(r["Job_Seekers[Count]"])
      //       noil.push(0)
      //     }
      //     if (r["Job_Seekers[Gender]"] === "Female") {
      //       noil.push(r["Job_Seekers[Count]"])
      //       oil.push(0)
      //     }
      // })
        
        console.log("======= ooo", oil, noil)
        let labels:[] = data.data.map((r,i) => { return r["Job_Seekers[Age Group]"]}) 
        setLabelsData(labels)
        setGraphData([
            {
              name: 'Male',
              type:"bar",
              data: oil
            }, {
              name: 'Female',
              type:"bar",
              data: noil
            },
            // {
            //   name: 'Expenses',
            //   type: 'line',
            //   data: total
            // }
          ])
      },
      onError: (error) => {
        console.log("Error", error)
      },
    }
  );

  useEffect(()=> {

    getTableDataAPI({tableName:"Job_Seekers",
  })
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
                  background:   "#77C7FE",
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
                <Typography variant="h4" sx={{
                  paddingInlineStart:"0.5rem",
                }} noWrap>
                {t('Job Seekers')}
                </Typography>
                
              </Box>
            </Box>
            
          
          </Box>

    
   
          {/* // <Chart
          //   options={chartOptions}
          //   series={chart3Data}
          //   type="area"
          //   height={155}
          // /> */}

<Chart
          options={chart3Options}
          series={graphData}
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
              primary={
                <Typography lineHeight="1.5"  fontSize="12px" justifyContent='flex-start'  textAlign= 'initial' fontWeight="normal" variant="h4">
              { t('1. High performance GDP Growth')}
              .
            </Typography> 
               }
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            <ListItemText
              primary={  <Typography lineHeight="1.5"  fontSize="12px" justifyContent='flex-start'  textAlign= 'initial' fontWeight="normal" variant="h4">
              {t(
                '2. High performance GDP Growth'
              )}
              .
            </Typography>  }
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            <ListItemText
              primary={
                <Typography lineHeight="1.5"  fontSize="12px" justifyContent='flex-start'  textAlign= 'initial' fontWeight="normal" variant="h4">
                { t('3. High   Non Oil GDP Growth')}
                .
              </Typography> 

                }
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
    
    </Card>
  );
}

export default Conversions;
