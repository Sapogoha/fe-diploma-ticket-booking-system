import React from 'react';

import Layout from '../../components/Layout/Layout';
import SidebarSelection from '../../components/SidebarSelection/SidebarSelection';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import styles from './TrainSelectionPage.module.scss';

function TrainSelectionPage() {
   const body = (
      <div>
         <ProgressBar step={1} />
         <div className={styles.body}>
            <aside>
               <SidebarSelection />
               <div className={styles['last-tickets']}>Последние билеты</div>
            </aside>
            <main>
               <div className={styles.sorting}>Строка сортировки</div>
               <div className={styles.tickets}>блок с билетами</div>
               <div className={styles.pages}>переключение страниц</div>
            </main>
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
