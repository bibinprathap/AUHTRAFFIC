import { Box, Card, Grid, Typography, useTheme } from '@mui/material';

import PageHeader from 'src/content/Dashboards/Reports/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gdp from 'src/content/Blocks/SparklinesLarge/Block7';
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

function DashboardReportsContent() {

  const theme = useTheme();

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

  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >

        <Grid item md={12} xs={12}>
          <Grid container spacing={4} >
            <Grid item md={7} xs={12}>
              <Gdp />
            </Grid>
            <Grid item md={5} xs={12}>
              <Block3 />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item md={5} xs={12}>
          <Block3 />
        </Grid> */}
        <Grid item md={7} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>

              <StockMarket />

            </Grid>
            <Grid item md={5} xs={12}>
              <Grid container spacing={4} >
                <Grid item xs={12}>

                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                        PMI
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          pb: 1,
                          pt: 0.5,
                          lineHeight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          color: `${theme.colors.success.main}`
                        }}
                      >
                        <span>54%</span>
                        <KeyboardArrowUpTwoToneIcon fontSize="small" />
                      </Typography>
                      <Typography variant="h3">AED 8,583</Typography>
                    </Box>
                    <Box ml={2} flexGrow={1}>
                      <Chart
                        options={chart1Options}
                        series={chart1Data}
                        type="line"
                        height={80}
                      />
                    </Box>
                  </Card>

                </Grid>
                <Grid item xs={12}>

                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                        OIL PRICE
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          pb: 1,
                          pt: 0.5,
                          lineHeight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          color: `${theme.colors.success.main}`
                        }}
                      >
                        <span>21,59%</span>
                        <KeyboardArrowUpTwoToneIcon fontSize="small" />
                      </Typography>
                      <Typography variant="h3">AED 2,19</Typography>
                    </Box>
                    <Box ml={2} flexGrow={1}>
                      <Chart
                        options={chart2Options}
                        series={chart2Data}
                        type="line"
                        height={80}
                      />
                    </Box>
                  </Card>

                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={5} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>

              <StockMarket
                titleText="RE market Index"
              />

            </Grid>
            <Grid item md={5} xs={12}>
              <Grid container spacing={4} >
                <Grid item xs={12}>

                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                        # CONSTRUCTION PERMITS
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          pb: 1,
                          pt: 0.5,
                          lineHeight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          color: `${theme.colors.success.main}`
                        }}
                      >
                        <span>54%</span>
                        <KeyboardArrowUpTwoToneIcon fontSize="small" />
                      </Typography>
                      <Typography variant="h3">AED 8,583</Typography>
                    </Box>
                    <Box ml={2} flexGrow={1}>
                      <Chart
                        options={chart1Options}
                        series={chart1Data}
                        type="line"
                        height={80}
                      />
                    </Box>
                  </Card>

                </Grid>
                <Grid item xs={12}>

                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                        VALUE OF RE TRANSACTIONS
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          pb: 1,
                          pt: 0.5,
                          lineHeight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          color: `${theme.colors.success.main}`
                        }}
                      >
                        <span>21,59%</span>
                        <KeyboardArrowUpTwoToneIcon fontSize="small" />
                      </Typography>
                      <Typography variant="h3">AED 2,19</Typography>
                    </Box>
                    <Box ml={2} flexGrow={1}>
                      <Chart
                        options={chart2Options}
                        series={chart2Data}
                        type="line"
                        height={80}
                      />
                    </Box>
                  </Card>

                </Grid>

              </Grid>
            </Grid>
          </Grid>

        </Grid>


        {/* Section for consumer price and workforce count */}
        <Grid item xs={7}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <AudienceOverview />
            </Grid>
            <Grid item md={6} xs={12}>
              <WorkForceCount />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <ProfileCharts />
            </Grid>
            <Grid item md={6} xs={12}>
              <TopEvents
              titleText="Top Events"
              />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReportsContent;
