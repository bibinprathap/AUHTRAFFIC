import Head from 'next/head';

// import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import CollapsedSidebarLayout from 'src/layouts/CollapsedSidebarLayout';
import { Authenticated } from 'src/components/Authenticated';
import DashboardDiscuss from '@/content/DashboardPages/itemsToDiscuss';


function DashboardTasks() {
  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <h1>Items For Discussion</h1>
      <DashboardDiscuss/>
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
