import React from 'react';

import Layout from '../../components/Layout/Layout';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Error from '../../components/Error/Error';

import widthOptions from '../../components/MainSearchBlock/widthOptions';
import picsOptions from '../../components/Layout/picsOptions';

import styles from './ErrorPage.module.scss';

function ErrorPage() {
   const body = (
      <>
         <ProgressBar step={0} />
         <div className={styles.body}>
            <Error />
         </div>
      </>
   );

   return (
      <Layout pic={picsOptions.search} body={body}>
         <MainSearchBlock width={widthOptions.wide} />
      </Layout>
   );
}

export default ErrorPage;
