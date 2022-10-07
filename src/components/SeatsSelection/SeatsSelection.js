/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';

import SelectionBlock from './SelectionBlock/SelectionBlock';

import { selectTrains } from '../../store/slices/trainSlice';

import directions from '../../data/directions';

import styles from './SeatsSelection.module.scss';

function SeatsSelection() {
   const arrival = useSelector(selectTrains)[directions.arrival]?._id;

   return (
      <section className={styles['seats-selection']}>
         <h3 className={styles['seats-selection__header']}>выбор мест</h3>
         <SelectionBlock direction={directions.departure} />
         {arrival && <SelectionBlock direction={directions.arrival} />}
         <div className={styles['seats-selection__button-wrapper']}>
            <button type="button"> далее</button>
         </div>
      </section>
   );
}

export default SeatsSelection;
