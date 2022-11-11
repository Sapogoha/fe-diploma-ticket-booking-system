import React from 'react';

import Layout from '../../components/Layout/Layout';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import SidebarDetails from '../../components/SidebarDetails/SidebarDetails';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';

import widthOptions from '../../components/MainSearchBlock/widthOptions';
import picsOptions from '../../components/Layout/picsOptions';

import styles from './OrderConfirmationPage.module.scss';

function OrderConfirmationPage() {
   const body = (
      <>
         <ProgressBar step={4} />
         <div className={styles.body}>
            <div>
               <SidebarDetails />
            </div>
            <div className={styles['wrapper-main']}>
               <OrderConfirmation />
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

export default OrderConfirmationPage;
