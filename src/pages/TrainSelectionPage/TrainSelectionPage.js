import React from 'react';

import Layout from '../../components/Layout/Layout';
import Trains from '../../components/Trains/Trains';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';

import styles from './TrainSelectionPage.module.scss';

function TrainSelectionPage() {
   const body = (
      <div>
         <h1> TrainSelectionPage</h1>
         <div>
            <Trains />
         </div>
      </div>
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

export default TrainSelectionPage;
