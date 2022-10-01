import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import SidebarSelection from '../../components/SidebarSelection/SidebarSelection';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import LastTickets from '../../components/LastTickets/LastTickets';
import Filters from '../../components/TrainSelection/Filters/Filters';
import TrainSelection from '../../components/TrainSelection/TrainSelection';
import PaginationItem from '../../components/TrainSelection/Pagination/Pagination';

import {
   selectOffset,
   selectLimit,
   changeOffset,
} from '../../store/slices/sortSlice';

import { selectTotalCount } from '../../store/slices/trainsSlice';

import styles from './TrainSelectionPage.module.scss';

function TrainSelectionPage() {
   const dispatch = useDispatch();
   const offset = useSelector(selectOffset);
   const limit = useSelector(selectLimit);
   const total = useSelector(selectTotalCount);

   const [currentPage, setCurrentPage] = useState(offset / limit + 1);
   const onChangePage = (value) => {
      setCurrentPage(value);
      dispatch(changeOffset(value * limit - limit));
   };
   const onChangeFilters = () => {
      dispatch(changeOffset(0));
      setCurrentPage(1);
   };
   const body = (
      <>
         <ProgressBar step={1} />
         <div className={styles.body}>
            <div>
               <SidebarSelection />
               <LastTickets />
            </div>
            <div className={styles['wrapper-main']}>
               <Filters onChangeFilters={onChangeFilters} />
               <TrainSelection />

               <PaginationItem
                  current={currentPage}
                  onChange={onChangePage}
                  total={total}
                  pageSize={limit}
               />
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

export default TrainSelectionPage;
