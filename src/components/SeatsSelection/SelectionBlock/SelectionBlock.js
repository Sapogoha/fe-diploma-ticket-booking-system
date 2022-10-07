import React from 'react';
import PropTypes from 'prop-types';

import TrainInfo from './TrainInfo/TrainInfo';
import NumberOfTickets from './NumberOfTickets/NumberOfTickets';
import CoachType from './CoachType/CoachType';
import Coaches from './Coaches/Coaches';

import departureArrow from './img/arrow-departure.svg';
import arrivalArrow from './img/arrow-arrival.svg';

import directions from '../../../data/directions';

import styles from './SelectionBlock.module.scss';

function SelectionBlock({ direction }) {
   const img =
      direction === directions.departure ? departureArrow : arrivalArrow;
   const changeTrainClassName =
      direction === directions.departure
         ? `${styles['card__change-train']}`
         : `${styles['card__change-train']} ${styles['card__change-train-arrival']}`;

   return (
      <div className={styles.card}>
         <div className={changeTrainClassName}>
            <div className={styles.img}>
               <img src={img} alt="иконка - направление" />
            </div>

            <button type="button">Выбрать другой поезд</button>
         </div>
         <TrainInfo direction={direction} />
         <NumberOfTickets />
         <CoachType direction={direction} />
         <Coaches direction={direction} />
      </div>
   );
}

SelectionBlock.propTypes = {
   direction: PropTypes.string.isRequired,
};

export default SelectionBlock;
