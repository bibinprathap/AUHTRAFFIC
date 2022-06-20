import { Box, Card, Grid, Typography, useTheme } from '@mui/material';

import PageHeader from 'src/content/Dashboards/Reports/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Loader from 'src/components/Loader';
import Conversions from 'src/content/Dashboards/Analytics/Conversions';
import WatchListColumn from 'src/content/Dashboards/Crypto/WatchListColumn';
import { Chart } from 'src/components/Chart';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gdp from 'src/content/Blocks/SparklinesLarge/Block77';
import StockMarket from 'src/content/Dashboards/Banking/Investments';
import Block1 from 'src/content/Blocks/Statistics/Block3';
import Block2 from 'src/content/Blocks/ListsLarge/Block8';
import Block3 from 'src/content/Dashboards/Reports/Block3';
import Block4 from 'src/content/Dashboards/Reports/Block4';
import Block5 from 'src/content/Dashboards/Reports/Block5';
import Block6 from 'src/content/Dashboards/Reports/Block6';
import Block7 from 'src/content/Dashboards/Reports/Block7';
import Block8 from 'src/content/Dashboards/Reports/Block8';
import Block9 from 'src/content/Dashboards/Reports/Block9';
import Block10 from 'src/content/Blocks/ListsSmall/Block7';
import Block11 from 'src/content/Blocks/ListsSmall/Block8';
import Block12 from 'src/content/Dashboards/Reports/Block12';
import Block13 from 'src/content/Dashboards/Reports/Block13';
import WorkForceCount from 'src/content/Dashboards/Statistics/Block3';
import ProfileCharts from 'src/content/Blocks/ListsLarge/Block9';
import TopEvents from 'src/content/Blocks/ListsLarge/BlockTopEvents';
import AudienceOverview from 'src/content/Dashboards/Analytics/AudienceOverview';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';



function DashboardReportsContent() {

  const [isReportOpen, setReportOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setReportOpen(true);
    }, 500)
  })

  const chart1Options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    },
    stroke: {
      colors: [theme.colors.warning.main],
      width: 3
    },
    colors: [theme.colors.warning.main],
    markers: {
      size: 0
    },
    grid: {
      padding: {
        right: 5,
        left: 5
      }
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return '$';
          }
        }
      },
      marker: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    }
  };
  const chart1Data = [
    {
      name: 'Bitcoin',
      data: [47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chart2Options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    },
    stroke: {
      colors: [theme.colors.error.main],
      width: 3
    },
    colors: [theme.colors.error.main],
    markers: {
      size: 0
    },
    grid: {
      padding: {
        right: 5,
        left: 5
      }
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return '$';
          }
        }
      },
      marker: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };
  const chart2Data = [
    {
      name: 'Cardano',
      data: [38, 44, 56, 47, 26, 24, 45]
    }
  ];
  if (!isReportOpen) {
    return (<div >  <Loader /> </div>);
  }


  return (
    <>
      <PageTitleWrapper>
        <Card style={{ marginLeft:"-25px", marginRight:"-25px", marginBottom:"-25px", display: "flex", justifyContent: "flex-start" }}>
          <div style={{ marginTop: "9px", marginLeft: "9px" }}>
            <PaidTwoToneIcon fontSize='large' />
          </div>

          <Typography variant="h3" p={"10px"} component="h3"  >
            Economy
            {/* {t('Reports')} */}
          </Typography>
        </Card>
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 2,
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#52526a'

        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >

        <Grid item md={12} xs={12}>
          <Grid container spacing={2} >
            <Grid item md={12} xs={12} overflow="hidden"
              maxHeight="77vh">
              {/* <Gdp /> */}

              <WatchListColumn />
            </Grid>
            {/* <Grid item md={5} xs={12}>
              <Block3 />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardReportsContent;
