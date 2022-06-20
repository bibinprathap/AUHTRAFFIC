import { useTranslation } from 'react-i18next';
import {
  CardHeader,
  Divider,
  Card,
  Box,
  Typography,
  Grid
} from '@mui/material';

import GrossSales from 'src/content/Dashboards/Commerce/GrossSales';
import Customers from 'src/content/Dashboards/Commerce/Customers';

function PMICard() {
  const { t }: { t: any } = useTranslation();

  return (
    <Card sx={{ minHeight: '21vw', maxHeight: '21vw'  }}>
      <CardHeader
        sx={{
          textAlign: 'left'
        }}
        subheaderTypographyProps={{
          variant: 'h3',
          color: 'green'
        }}
        subheader={'55'}
        title={t('Number of Serious Crimes')}
      />
      <Divider />
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          p={2}
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

export default PMICard;
