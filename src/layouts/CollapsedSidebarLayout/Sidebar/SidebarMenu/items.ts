import type { ReactNode } from 'react';

import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
 
  {
    heading: 'Foundation',
    items: [
      {
        name: 'Dashboard',
        link: '/',
        icon: DashboardIcon
      },
      {
        name: 'Map',
        icon: MapIcon,
        link: '/dashboards/locations'
      },
      {
        name: 'Discuss',
        icon: PushPinOutlinedIcon,
        link: '/dashboards/itemsToDiscuss'
      }
    ]
  }

];

export default menuItems;
