import { IoAnalytics } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { CgDatabase } from 'react-icons/cg';

export interface Route {
  icon?: IconType;
  name: string;
  path: string;
  children?: Route[];
  isBlocked?: boolean;
}

export const ROUTES: Route[] = [
  {
    icon: IoAnalytics,
    name: 'Integrations',
    path: '/dashboard/integrations/providers',
    children: [
      {
        name: 'Providers',
        path: '/dashboard/integrations/providers'
      },
      {
        name: 'Synchronizations',
        path: '/dashboard/integrations/synchronizations'
      },
      {
        name: 'History',
        path: '/dashboard/integrations/history'
      }
    ]
  },
  {
    icon: CgDatabase,
    name: 'Data Management',
    path: '/dashboard/data/query',
    children: [
      {
        name: 'Query',
        path: '/dashboard/data/query'
      },
      {
        name: 'Views',
        path: '/dashboard/data/views'
      }
    ]
  }
  // {
  //   icon: TbDeviceDesktopAnalytics,
  //   name: 'Analytics',
  //   path: '/dashboard/analytics/views',
  //   isBlocked: true,
  //   children: [
  //     {
  //       name: 'Views',
  //       path: '/dashboard/analytics/views'
  //     },
  //     {
  //       name: 'Statistics',
  //       path: '/dashboard/analytics/statistics'
  //     }
  //   ]
  // }
];
