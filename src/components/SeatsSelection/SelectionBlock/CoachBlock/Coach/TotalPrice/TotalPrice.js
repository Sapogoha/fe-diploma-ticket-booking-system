import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectSelectedSeats } from '../../../../../../store/slices/seatsSlice';
import { selectNumberOfPassengers } from '../../../../../../store/slices/passengersSlice';

import seatsWordFormatter from '../../../../../../utils/seatsWordFormatter';
import coachesWordFormatter from '../../../../../../utils/coachesWordFormatter';

import rub from './rub.svg';

import styles from './TotalPrice.module.scss';

function TotalPrice({ direction }) {
   // нет механики расчета цены, поэтому сортирую по возрастанию, детям делаю скидку 50% на самые дешевые билеты
   const seats = useSelector(selectSelectedSeats)[direction];
   const pricesDraft = seats?.map((el) => el.seats.map((seat) => seat.price));
   const prices = pricesDraft?.flat();
   const numOfCoaches = pricesDraft.filter((el) => el.length > 0).length;
   const numberOfPassengers = useSelector(selectNumberOfPassengers)[direction];

   let priceCoefficients;
   if (numberOfPassengers?.children) {
      const children = Array.from(
         Array(numberOfPassengers?.children),
         () => 0.5
      );
      const adult = Array.from(Array(numberOfPassengers?.adults), () => 1);
      priceCoefficients = [...children, ...adult];
   } else {
      priceCoefficients = Array.from(
         Array(numberOfPassengers?.adults),
         () => 1
      );
   }

   let sum = 0;
   sum = prices.reduce(
      (curNumber, value, index) =>
         curNumber + value * priceCoefficients[index] || -1,
      0
   );

   return (
      <div className={styles.price}>
         <div className={styles.text}>
            Вы выбрали {prices.length} {seatsWordFormatter(prices.length)} в{' '}
            {numOfCoaches} {coachesWordFormatter(numOfCoaches)}
         </div>
         {sum >= 0 && (
            <div className={styles.total}>
               {sum}
               <img
                  className={styles.currency}
                  src={rub}
                  alt="иконка - рубль"
               />
            </div>
         )}
         {sum < 0 && (
            <div>
               Для рассчета суммы выберите количество взрослых и детских билетов
            </div>
         )}
         {priceCoefficients.length !== prices.length && (
            <div className={styles.prompt}>
               Суммарное количество взрослых и детских билетов должно быть равно
               количеству выбранных вами мест
            </div>
         )}
      </div>
   );
}

TotalPrice.propTypes = { direction: PropTypes.string.isRequired };

export default TotalPrice;
