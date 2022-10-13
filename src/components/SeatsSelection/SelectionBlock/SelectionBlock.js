import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import TrainInfo from './TrainInfo/TrainInfo';
import NumberOfPassengers from './NumberOfPassengers/NumberOfPassengers';
import CoachType from './CoachType/CoachType';
import Coaches from './Coaches/Coaches';
import Coach from './Coach/Coach';
import TotalPrice from './Coach/TotalPrice/TotalPrice';

import departureArrow from './img/arrow-departure.svg';
import arrivalArrow from './img/arrow-arrival.svg';

import directions from '../../../data/directions';
import links from '../../../data/links';

import styles from './SelectionBlock.module.scss';

function SelectionBlock({ direction }) {
   const navigate = useNavigate();
   const img =
      direction === directions.departure ? departureArrow : arrivalArrow;
   const changeTrainClassName =
      direction === directions.departure
         ? `${styles['card__change-train']}`
         : `${styles['card__change-train']} ${styles['card__change-train-arrival']}`;

   const clickHandler = () => {
      navigate(links.trains);
   };

   function getRandomInt(min, max) {
      const minInt = Math.ceil(min);
      const maxInt = Math.floor(max);
      return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
   }

   const NumOfPplView = useMemo(() => getRandomInt(2, 25), []);

   return (
      <div className={styles.card}>
         <div className={changeTrainClassName}>
            <div className={styles.img}>
               <img src={img} alt="иконка - направление" />
            </div>

            <button onClick={clickHandler} type="button">
               Выбрать другой поезд
            </button>
         </div>
         <TrainInfo direction={direction} />
         <NumberOfPassengers direction={direction} />
         <CoachType direction={direction} />
         <Coaches direction={direction} />
         <Coach direction={direction} NumOfPplView={NumOfPplView} />
         <TotalPrice direction={direction} />
      </div>
   );
}

SelectionBlock.propTypes = {
   direction: PropTypes.string.isRequired,
};

export default SelectionBlock;
