import React from 'react';

import Layout from '../../components/Layout/Layout';
import SidebarSelection from '../../components/SidebarSelection/SidebarSelection';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import LastTickets from '../../components/LastTickets/LastTickets';
import SeatsSelection from '../../components/SeatsSelection/SeatsSelection';

import styles from './SeatsSelectionPage.module.scss';

function SeatsSelectionPage() {
   const body = (
      <>
         <ProgressBar step={1} />
         <div className={styles.body}>
            <div>
               <SidebarSelection />
               <LastTickets />
            </div>
            <div className={styles['wrapper-main']}>
               <SeatsSelection />
            </div>
         </div>
      </>
   );
   return (
      <Layout pic="search" body={body}>
         <div className={styles.wrapper}>
            <div className={styles.search}>
               <MainSearchBlock width="wide" />
            </div>
         </div>
      </Layout>
   );
}

export default SeatsSelectionPage;
