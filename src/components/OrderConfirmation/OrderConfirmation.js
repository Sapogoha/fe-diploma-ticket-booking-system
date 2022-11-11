import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TrainCard from '../TrainSelection/TrainCard/TrainCard';
import Redirect from '../Redirect/Redirect';
import PasItem from './PasItem/PasItem';

import { selectTrainsOptions } from '../../store/slices/trainsSlice';
import { selectIndex } from '../../store/slices/trainSlice';
import { selectPersonalData } from '../../store/slices/personalDataSlice';
import { selectSelectedSeats } from '../../store/slices/seatsSlice';
import { selectPassengers } from '../../store/slices/passengersSlice';

import links from '../../data/links';
import directions from '../../data/directions';
import fieldNames from '../PaymentOptions/fieldNames';
import calculateSum from '../../utils/calculateSum';
import paymentTypes from '../PaymentOptions/paymentTypes';

import rub from './rub.svg';

import styles from './OrderConfirmation.module.scss';

function OrderConfirmation() {
   const navigate = useNavigate();
   const selectedTrainIndex = useSelector(selectIndex);
   const seatsDep = useSelector(selectSelectedSeats)[directions.departure];
   const seatsArr = useSelector(selectSelectedSeats)[directions.arrival];
   const passengers = useSelector(selectPassengers);
   const paymentOption =
      useSelector(selectPersonalData)[fieldNames.paymentMethod];

   const train = useSelector(selectTrainsOptions);

   const onEditBtnClick = (link) => {
      navigate(link);
   };

   const editBtnMaker = (link) => (
      <button
         type="button"
         onClick={() => onEditBtnClick(link)}
         className={styles.buttonEdit}
      >
         Изменить
      </button>
   );

   const editTrainBtn = editBtnMaker(links.trains);

   const clickHandler = () => {
      // тут реализовать отправку запроса
      navigate(links.success);
   };

   const trainCard = (
      <div className={styles.card}>
         <div className={styles.header}>Поезд</div>
         <TrainCard
            ticket={train[selectedTrainIndex]?.ticket}
            editBtn={editTrainBtn}
         />
      </div>
   );

   const allPassengers = (
      <div className={styles.card}>
         <div className={styles.header}>Пассажиры</div>
         <div className={styles.info}>
            <div className={styles.left}>
               {passengers?.map((pas) => (
                  <PasItem key={pas.id} pas={pas} />
               ))}
            </div>
            <div className={styles.right}>
               <div className={styles.sum}>
                  <span>Всего</span>
                  <span>
                     <span className={styles.amount}>
                        {calculateSum(seatsDep, 1) +
                           calculateSum(seatsDep, 0.5) +
                           calculateSum(seatsArr, 1) +
                           calculateSum(seatsArr, 0.5)}
                     </span>
                     <img
                        className={styles.currency}
                        src={rub}
                        alt="иконка - рубль"
                     />
                  </span>
               </div>
               {editBtnMaker(links.passengers)}
            </div>
         </div>
      </div>
   );

   const payment = (
      <div className={styles.card}>
         <div className={styles.header}>Способ оплаты</div>
         <div className={styles.info}>
            <div className={styles.left}>
               <div className={styles.payment}>
                  {paymentOption === paymentTypes.cashEng
                     ? paymentTypes.cash
                     : paymentTypes.online}
               </div>
            </div>
            <div className={styles.right}>
               {editBtnMaker(links.paymentOptions)}
            </div>
         </div>
      </div>
   );

   const btnForward = (
      <div className={styles.buttonForward}>
         <button onClick={clickHandler} type="submit">
            подтвердить
         </button>
      </div>
   );

   return (
      <>
         {selectedTrainIndex !== null &&
            passengers.length > 0 &&
            paymentOption && (
               <>
                  {trainCard}
                  {allPassengers}
                  {payment}
                  {btnForward}
               </>
            )}
         <Redirect />
      </>
   );
}

export default OrderConfirmation;
