import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  List,
  Card,
  Tooltip,
  alpha,
  LinearProgress,
  Typography,
  Avatar,
  styled,
  ListItemButton,
  useTheme,
  linearProgressClasses,
  Button,
  CardHeader,
  AvatarGroup,
  Badge
} from '@mui/material';

 
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

import Label from 'src/components/Label';
import { useTranslation } from 'react-i18next';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Text from 'src/components/Text';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        margin: ${theme.spacing(1, 0, 2)};
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);




const LinearProgressError = styled(LinearProgress)(
  ({ theme }) => `
        height: 6px;
        border-radius: ${theme.general.borderRadiusLg};
        margin: ${theme.spacing(0, 0, 2)};
        &.${linearProgressClasses.colorPrimary} {
            background: ${alpha(theme.colors.alpha.black[100], 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background: ${theme.colors.error.main};
        }
    `
);

const LinearProgressWarning = styled(LinearProgress)(
  ({ theme }) => `
        height: 6px;
        border-radius: ${theme.general.borderRadiusLg};
        margin: ${theme.spacing(0, 0, 2)};
        &.${linearProgressClasses.colorPrimary} {
            background: ${alpha(theme.colors.alpha.black[100], 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background: ${theme.colors.gradients.orange1};
        }
    `
);

const LinearProgressSuccess = styled(LinearProgress)(
  ({ theme }) => `
        height: 6px;
        border-radius: ${theme.general.borderRadiusLg};
        margin: ${theme.spacing(0, 0, 2)};
        &.${linearProgressClasses.colorPrimary} {
            background: ${alpha(theme.colors.alpha.black[100], 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background: ${theme.colors.gradients.green1};
        }
    `
);

const ListItemButtonWrapper = styled(ListItemButton)(
  ({ theme }) => `
    transition: ${theme.transitions.create(['transform', 'box-shadow'])};
    transform: scale(1);
    background: ${theme.colors.alpha.white[100]};
    position: relative;
    z-index: 5;

    &:hover {
        border-radius: ${theme.general.borderRadius};
        background: ${theme.colors.alpha.white[100]};
        z-index: 6;
        box-shadow: 
            0 0.56875rem 3.3rem ${alpha(theme.colors.alpha.black[100], 0.05)},
            0 0.9975rem 2.4rem ${alpha(theme.colors.alpha.black[100], 0.07)},
            0 0.35rem 1rem ${alpha(theme.colors.alpha.black[100], 0.1)},
            0 0.225rem 0.8rem ${alpha(theme.colors.alpha.black[100], 0.15)};
        transform: scale(1.08);
    }
  `
);

function Block9({titleText}: {titleText?: string}) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      sx={{
        overflow: 'visible'
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Box>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              fontSize: `${theme.typography.pxToRem(12)}`
            }}
          >
            {t('Status')}
          </Typography>
          <Typography variant="h4">{t(titleText ||'Top Projects in AD')}</Typography>
        </Box>
        <IconButton
          size="small"
          color="primary"
          sx={{
            alignSelf: 'center',
            backgroundColor: `${theme.colors.primary.lighter}`,
            transition: `${theme.transitions.create(['all'])}`,

            '&:hover': {
              backgroundColor: `${theme.colors.primary.main}`,
              color: `${theme.palette.getContrastText(
                theme.colors.primary.main
              )}`
            }
          }}
        >
          <MoreVertTwoToneIcon fontSize="small" />
        </IconButton>
      </Box>
      <List disablePadding>
        <Divider />
        <ListItemButtonWrapper
          sx={{
            display: { xs: 'block', sm: 'flex' },
            py: 2,
            px: 2.5
          }}
        >
          <ListItemAvatar
            sx={{
              minWidth: 'auto',
              mr: 2,
              mb: { xs: 2, sm: 0 }
            }}
          >
             <AvatarWrapperSuccess>
                  <CheckTwoToneIcon />
                </AvatarWrapperSuccess>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography color="text.primary" variant="h5">
               Fix Urgent Mobile App Bugs
              </Typography>
            }
            secondary={<Box>
                <Typography variant="subtitle2" gutterBottom>
                  {t('Tasks done')}:{' '}
                  <Text color="black">
                    <b>75</b>
                  </Text>
                  <b> {t('/100')}</b>
                </Typography>
                <LinearProgressSuccess
                  value={75}
                  color="primary"
                  variant="determinate"
                />
                  <Typography variant="subtitle2" gutterBottom>
                  {t('Cost')}:{' '}
                  
                  <Label color="success">{"AED 10000"}</Label>
                </Typography> 
              </Box> 
            }
          />
        </ListItemButtonWrapper>
        <ListItemButtonWrapper
          sx={{
            display: { xs: 'block', sm: 'flex' },
            py: 2,
            px: 2.5
          }}
        >
          <ListItemAvatar
            sx={{
              minWidth: 'auto',
              mr: 2,
              mb: { xs: 2, sm: 0 }
            }}
          >
             <AvatarWrapperWarning>
                  <ErrorOutlineOutlinedIcon />
                </AvatarWrapperWarning>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography color="text.primary" variant="h5">
               Fix Urgent Mobile App Bugs
              </Typography>
            }
            secondary={<Box>
                <Typography variant="subtitle2" gutterBottom>
                  {t('Tasks done')}:{' '}
                  <Text color="black">
                    <b>50</b>
                  </Text>
                  <b> {t('/100')}</b>
                </Typography>
                <LinearProgressWarning
                  value={50}
                  color="primary"
                  variant="determinate"
                />
                  <Typography variant="subtitle2" gutterBottom>
                  {t('Cost')}:{' '}
                  
                  <Label color="warning">{"AED 10000"}</Label>
                </Typography> 
              </Box> 
            }
          />
        </ListItemButtonWrapper>
        <ListItemButtonWrapper
          sx={{
            display: { xs: 'block', sm: 'flex' },
            py: 2,
            px: 2.5
          }}
        >
          <ListItemAvatar
            sx={{
              minWidth: 'auto',
              mr: 2,
              mb: { xs: 2, sm: 0 }
            }}
          >
             <AvatarWrapperError>
                  <GppBadOutlinedIcon />
                </AvatarWrapperError>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography color="text.primary" variant="h5">
               Fix Urgent Mobile App Bugs
              </Typography>
            }
            secondary={<Box>
                <Typography variant="subtitle2" gutterBottom>
                  {t('Tasks done')}:{' '}
                  <Text color="black">
                    <b>25</b>
                  </Text>
                  <b> {t('/100')}</b>
                </Typography>
                <LinearProgressError
                  value={25}
                  color="primary"
                  variant="determinate"
                />
                  <Typography variant="subtitle2" gutterBottom>
                  {t('Cost')}:{' '}
                  
                  <Label color="error">{"AED 10000"}</Label>
                </Typography> 
              </Box> 
            }
          />
        </ListItemButtonWrapper>
      </List>
    </Card>
  );
}

export default Block9;
