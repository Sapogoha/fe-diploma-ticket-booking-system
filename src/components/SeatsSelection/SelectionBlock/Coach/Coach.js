/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import CoachServices from './CoachServices/CoachServices';

import {
   selectTrains,
   selectSelectedCoaches,
} from '../../../../store/slices/trainSlice';
import { selectSeatsOptions } from '../../../../store/slices/seatsSlice';
import { fetchSeats } from '../../../../store/thunks/asyncThunks';

import classes from '../../classes';

import rub from './rub.svg';

import styles from './Coach.module.scss';

function Coach({ direction }) {
   const dispatch = useDispatch();
   const train = useSelector(selectTrains)[direction];
   const activeCoach = useSelector(selectSelectedCoaches)[direction];

   const coach = useSelector(selectSeatsOptions)[direction]?.filter(
      (item) => item?.coach?.name === activeCoach
   )[0];

   const availableSeats = coach?.seats
      .map((item) => (item.available ? item.index : null))
      .filter((item) => item !== null);

   let url;

   if (train?._id) {
      url = `${process.env.REACT_APP_SEARCH_ROUTES}/${train?._id}/seats`;
   }

   useEffect(() => {
      dispatch(fetchSeats({ url, direction }));
   }, [direction, dispatch, url]);

   const numOfSide = availableSeats?.filter((item) => item > 36)?.length;
   const numOfTop = availableSeats?.filter(
      (item) => item <= 36 && item % 2 === 0
   ).length;
   const numOfBottom = availableSeats?.filter(
      (item) => item <= 36 && item % 2 === 1
   ).length;

   const top = (
      <div className={styles.details}>
         <span>верхние</span>
         <span className={styles.seatsNumber}>
            {numOfTop === -1 ? 0 : numOfTop}
         </span>
      </div>
   );

   const bottom = (
      <div className={styles.details}>
         <span>нижние</span>
         {(coach?.coach?.class_type === classes.first ||
            coach?.coach?.class_type === classes.fourth) && (
            <span className={styles.seatsNumber}>{availableSeats?.length}</span>
         )}
         {(coach?.coach?.class_type === classes.second ||
            coach?.coach?.class_type === classes.third) && (
            <span className={styles.seatsNumber}>
               {numOfBottom === -1 ? 0 : numOfBottom}
            </span>
         )}
      </div>
   );

   const side = (
      <div className={styles.details}>
         <span>боковые</span>
         <span className={styles.seatsNumber}>
            {numOfSide === -1 ? 0 : numOfSide}
         </span>
      </div>
   );

   const topPrice = (
      <div className={styles.priceAmount}>
         <span>{coach?.coach?.top_price}</span>
         <div className={styles.currency}>
            <img src={rub} alt="иконка - руб." />
         </div>
      </div>
   );

   const bottomPrice = (
      <div className={styles.priceAmount}>
         {coach?.coach?.class_type !== classes.first && (
            <span>{coach?.coach?.bottom_price}</span>
         )}
         {coach?.coach?.class_type === classes.first && (
            <span>{coach?.coach?.price}</span>
         )}
         <div className={styles.currency}>
            <img src={rub} alt="иконка - руб." />
         </div>
      </div>
   );

   const sidePrice = (
      <div className={styles.priceAmount}>
         <div>{coach?.coach?.side_price}</div>
         <span className={styles.currency}>
            <img src={rub} alt="иконка - руб." />
         </span>
      </div>
   );

   return (
      <div className={styles.coach}>
         <div className={styles.top}>
            <div className={styles.coachNumber}>
               <span className={styles.coachNumber__name}>
                  {coach?.coach?.name}
               </span>
               <span className={styles.coachNumber__coach}>вагон</span>
            </div>
            <div className={styles.seats}>
               <div className={styles.header}>
                  <span>места</span>
                  <span className={styles.seatsTotal}>
                     {availableSeats?.length}
                  </span>
               </div>
               {(coach?.coach?.class_type === classes.second ||
                  coach?.coach?.class_type === classes.third) &&
                  numOfTop > 0 &&
                  top}

               {numOfBottom > 0 && bottom}

               {coach?.coach?.class_type === classes.third &&
                  numOfSide > 0 &&
                  side}
            </div>
            <div className={styles.price}>
               <div className={styles.header}>стоимость</div>
               <div>
                  {(coach?.coach?.class_type === classes.second ||
                     coach?.coach?.class_type === classes.third) &&
                     numOfTop > 0 &&
                     topPrice}

                  {numOfBottom > 0 && bottomPrice}

                  {coach?.coach?.class_type === classes.third &&
                     numOfSide > 0 &&
                     sidePrice}
               </div>
            </div>

            <div className={styles.service}>
               <div className={styles.header}>
                  <span>обслуживание</span>
                  <span className={styles.serviceProvider}>фпк</span>
               </div>

               <CoachServices direction={direction} />
            </div>
         </div>
         <div>{availableSeats}</div>
      </div>
   );
}

Coach.propTypes = { direction: PropTypes.string.isRequired };

export default Coach;
