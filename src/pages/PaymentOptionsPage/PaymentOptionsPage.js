import React from 'react';

import Layout from '../../components/Layout/Layout';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import SidebarDetails from '../../components/SidebarDetails/SidebarDetails';
import PaymentOptions from '../../components/PaymentOptions/PaymentOptions';

import widthOptions from '../../components/MainSearchBlock/widthOptions';
import picsOptions from '../../components/Layout/picsOptions';

import styles from './PaymentOptionsPage.module.scss';

function PaymentOptionsPage() {
   const body = (
      <>
         <ProgressBar step={3} />
         <div className={styles.body}>
            <div>
               <SidebarDetails />
            </div>
            <div className={styles['wrapper-main']}>
               <PaymentOptions />
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

export default PaymentOptionsPage;
