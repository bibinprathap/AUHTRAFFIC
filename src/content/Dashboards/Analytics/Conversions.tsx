import { useTranslation } from 'react-i18next';
import {
  CardHeader,
  Divider,
  CardContent,
  Avatar,
  Card,
  ListItemText,
  List,
  alpha,
  ListItem,
  styled,
  useTheme
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { Chart } from 'src/components/Chart';
import Gauge from 'src/components/Gauge';
import { buildStyles } from 'react-circular-progressbar';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingFlat from '@mui/icons-material/TrendingFlat';

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

function Conversions() {
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
      '01 Aug 2021',
      '02 Aug 2021',
      '03 Aug 2021',
      '04 Aug 2021',
      '05 Aug 2021',
      '06 Aug 2021',
      '07 Aug 2021',
      '08 Aug 2021',
      '09 Aug 2021',
      '10 Aug 2021',
      '11 Aug 2021',
      '12 Aug 2021'
    ],
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    }
  };

  const chart3Data = [
    {
      name: 'Income',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    },
    {
      name: 'Expenses',
      type: 'line',
      data: [231, 442, 335, 227, 433, 222, 117, 316, 242, 252, 162, 176]
    }
  ];


  return (
    <Card>
      <CardHeader title={t('GDP Growth')} />
      <Divider />
      <CardContent>
      <Chart
              options={chart3Options}
              series={chart3Data}
              type="line"
              height={200}
            />

        <List disablePadding dense>
          <ListItem>
            <ListItemText
              primary={t('Description')}
              primaryTypographyProps={{
                variant: 'subtitle2',
                gutterBottom: true,
                noWrap: true
              }}
              secondary={"item1"}
              secondaryTypographyProps={{
                variant: 'h3',
                color: 'textPrimary',
                noWrap: true
              }}
            />
            {/* <AvatarWrapperError>
              <TrendingDown />
            </AvatarWrapperError> */}
          </ListItem>
          <Divider
            sx={{
              my: 1
            }}
          />
         
        </List>
      </CardContent>
    </Card>
  );
}

export default Conversions;
