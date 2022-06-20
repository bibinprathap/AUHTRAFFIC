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
  Typography,
  ListItemAvatar,
  Grid
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import PublicIcon from '@mui/icons-material/Public';
import AirIcon from '@mui/icons-material/Air';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
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

function ConsumerPriceIndex() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const chartSeries = [10, 20, 25];

  const entryToEm: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(2) + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: [t('Bitcoin'), t('Ripple'), t('Cardano'), t('Ethereum')],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  return (
    <Card sx={{ minHeight: '21vw', maxHeight: '21vw'  }}>
      <Box
        sx={{
          p: 1
        }}
      >
        <Box display="flex" alignItems="center">
          <AvatarWrapper>
            <Avatar
              sx={{
                fontSize: `${theme.typography.pxToRem(15)}`,
                background: '#A5569A',
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
            <Typography
              variant="h4"
              sx={{
                paddingInlineStart: '0.5rem'
              }}
              noWrap
            >
              {t('Exit from the Emirate')}
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
            AED 230000
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
            <span>+67,43%</span>
            <KeyboardArrowUpTwoToneIcon fontSize="small" />
          </Typography>
        </Box>
      </Box>

      <Box>
        <Chart
          height={200}
          options={entryToEm}
          series={chartSeries}
          type="donut"
        />
      </Box>

      <Box>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} item display="flex" alignItems="right">
            <List
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 'auto'
              }}
            >
              <ListItem disableGutters sx={{ mr: 0.61 }}>
                <ListItemAvatarWrapper>
                  {/* <img
                    style={{
                      height: '30px',
                      width: '30px'
                    }}
                    alt="Land"
                    src="/static/images/placeholders/logo/bitcoin.png"
                  /> */}
                  <PublicIcon />
                </ListItemAvatarWrapper>
                <ListItemText
                  primary="Land"
                  primaryTypographyProps={{
                    variant: 'h5',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                  secondary="Cardano"
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ mr: 0.61 }}>
                <ListItemAvatarWrapper>
                  <AirIcon />
                </ListItemAvatarWrapper>
                <ListItemText
                  primary="Air"
                  primaryTypographyProps={{
                    variant: 'h5',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                  secondary="Cardano"
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatarWrapper>
                  <AccountBalanceIcon />
                </ListItemAvatarWrapper>
                <ListItemText
                  primary="Port"
                  primaryTypographyProps={{
                    variant: 'h5',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                  secondary="Cardano"
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    noWrap: true,
                    style: { fontSize: '.589rem' }
                  }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingInlineStart: '20px',
            minHeight: '6vw',
            overflow: 'auto'
          }}
        >
          <Typography variant="subtitle2" noWrap>
            Insight
          </Typography>
          <Typography
            lineHeight="1.5"
            fontSize="12px"
            justifyContent="flex-start"
            textAlign="initial"
            fontWeight="normal"
            variant="h4"
          >
            {t(
              'High performance React template built with lots of powerful components across multiple product niches.High performance React template built with lots of powerful components across multiple product niches'
            )}
            .
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ConsumerPriceIndex;
