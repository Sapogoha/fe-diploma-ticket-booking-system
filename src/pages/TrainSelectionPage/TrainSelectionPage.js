import React, { useEffect } from 'react';
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
   selectLimit,
   selectCurrentPage,
   changeOffset,
   setCurrentPage,
} from '../../store/slices/sortSlice';
import { selectTotalCount } from '../../store/slices/trainsSlice';
import { removeTrainInfo } from '../../store/slices/trainSlice';
import { clearSeatsSlice } from '../../store/slices/seatsSlice';
import { removeAllPassengers } from '../../store/slices/passengersSlice';

import widthOptions from '../../components/MainSearchBlock/widthOptions';
import picsOptions from '../../components/Layout/picsOptions';

import styles from './TrainSelectionPage.module.scss';

function TrainSelectionPage() {
   const dispatch = useDispatch();
   const limit = useSelector(selectLimit);
   const total = useSelector(selectTotalCount);
   const currentPage = useSelector(selectCurrentPage);

   useEffect(() => {
      dispatch(removeTrainInfo());
      dispatch(clearSeatsSlice());
      dispatch(removeAllPassengers());
   }, [dispatch]);

   const onChangePage = (value) => {
      dispatch(setCurrentPage(value));
      dispatch(changeOffset(value * limit - limit));
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
               <Filters />
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
      <Layout pic={picsOptions.search} body={body}>
         <MainSearchBlock width={widthOptions.wide} />
      </Layout>
   );
}

export default TrainSelectionPage;
