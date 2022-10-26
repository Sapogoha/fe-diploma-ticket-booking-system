import React from 'react';

import Layout from '../../components/Layout/Layout';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import SidebarDetails from '../../components/SidebarDetails/SidebarDetails';
import PassengersSelection from '../../components/PassengersSelection/PassengersSelection';

import widthOptions from '../../components/MainSearchBlock/widthOptions';
import picsOptions from '../../components/Layout/picsOptions';

import styles from './PassengersPage.module.scss';

function PassengersPage() {
   const body = (
      <>
         <ProgressBar step={2} />
         <div className={styles.body}>
            <div>
               <SidebarDetails />
            </div>
            <div className={styles['wrapper-main']}>
               <PassengersSelection />
            </div>
         </div>
      </>
   );
   return (
      <Layout pic={picsOptions.search} body={body}>
         <MainSearchBlock width={widthOptions.wide} />
      </Layout>
   );
}

export default PassengersPage;
