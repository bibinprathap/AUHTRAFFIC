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
  Grid
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';

import GrossSales from 'src/content/Dashboards/Commerce/GrossSales';
import Customers from 'src/content/Dashboards/Commerce/Customers';

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

function ConsumerPriceIndex() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ minHeight: '17vw' }}>
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
              {t('Number of serious accidents')}
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

      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item lg={6} sm={12} xs={12}>
            <GrossSales />
          </Grid>
          <Grid item lg={6} sm={12} xs={12}>
            <Customers />
          </Grid>
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
    </Card>
  );
}

export default ConsumerPriceIndex;
