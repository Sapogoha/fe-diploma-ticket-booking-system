import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import CoachItem from './CoachItem/CoachItem';

import {
   selectSeatsOptions,
   selectError,
} from '../../../../store/slices/seatsSlice';
import {
   selectSelectedClasses,
   setSelectedCoaches,
} from '../../../../store/slices/trainSlice';

import styles from './Coaches.module.scss';

function Coaches({ direction }) {
   const dispatch = useDispatch();
   const coaches = useSelector(selectSeatsOptions)[direction];
   const error = useSelector(selectError);
   const selectedClasses = useSelector(selectSelectedClasses)[direction];
   let coachesToDisplay;

   const filter = Object.entries(selectedClasses)
      .map((item) => (item[1] ? item[0] : null))
      .filter((item) => item !== null);

   if (filter.length > 0) {
      coachesToDisplay = coaches.filter(
         (item) =>
            item?.coach?.class_type?.includes(filter[0]) ||
            item?.coach?.class_type?.includes(filter[1]) ||
            item?.coach?.class_type?.includes(filter[2]) ||
            item?.coach?.class_type?.includes(filter[3])
      );
   } else {
      coachesToDisplay = coaches;
   }

   useEffect(() => {
      dispatch(
         setSelectedCoaches({
            direction,
            name: coachesToDisplay[0]?.coach?.name,
         })
      );
   }, [coachesToDisplay, direction, dispatch]);

   return (
      <div className={styles.coaches}>
         <div className={styles.available}>
            <span className={`${styles.text} ${styles.title}`}>Вагоны</span>
            {coachesToDisplay?.map((item) => (
               <CoachItem
                  direction={direction}
                  key={item?.coach?.name}
                  name={item?.coach?.name}
               />
            ))}
            {error && <span className={styles.error}>{error}</span>}
         </div>
         <span className={styles.text}>
            Нумерация вагонов начинается с головы поезда
         </span>
      </div>
   );
}

Coaches.propTypes = { direction: PropTypes.string.isRequired };

export default Coaches;
