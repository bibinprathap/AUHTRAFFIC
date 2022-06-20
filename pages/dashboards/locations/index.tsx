import Head from 'next/head';

// import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import CollapsedSidebarLayout from 'src/layouts/CollapsedSidebarLayout';
import { Authenticated } from 'src/components/Authenticated';
import DashboardLocations from '@/content/DashboardPages/locations';


function DashboardTasks() {
  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <DashboardLocations/>
    </>
  );
}

DashboardTasks.getLayout = (page) => (
  <Authenticated>
     <CollapsedSidebarLayout>{page}</CollapsedSidebarLayout>
    {/* <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout> */}
  </Authenticated>
);

export default DashboardTasks;
