import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectIndex } from '../../store/slices/trainSlice';
import { selectSelectedSeats } from '../../store/slices/seatsSlice';
import { selectPassengers } from '../../store/slices/passengersSlice';
import { selectPersonalData } from '../../store/slices/personalDataSlice';

import fieldNames from '../PaymentOptions/fieldNames';
import directions from '../../data/directions';
import links from '../../data/links';

import styles from './Redirect.module.scss';

// стоит ли делать проверку на pathname или убрать это и оставить редирект на главную?
// будет актуальнее как только буду сохранять данные в localStorage

function Redirect() {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const selectedTrainIndex = useSelector(selectIndex);
   const seatsDep = useSelector(selectSelectedSeats)[directions.departure];
   const seatsArr = useSelector(selectSelectedSeats)[directions.arrival];
   const passengers = useSelector(selectPassengers);
   const paymentOption =
      useSelector(selectPersonalData)[fieldNames.paymentMethod];

   const redirectMaker = (mainText, btnText, link) => (
      <>
         <div className={styles.text}>{mainText}</div>
         <div className={styles.buttonWrapper}>
            <button onClick={() => navigate(link)} type="button">
               {btnText}
            </button>
         </div>
      </>
   );

   const redirecttoMain = redirectMaker(
      'Пожалуйста, для последующих действий выберите направление и дату поездки',
      'На главную',
      links.main
   );

   const redirectToSeatsSelection = redirectMaker(
      'Для ввода данных пассажиров сначала нужно выбрать места',
      'Выбрать места',
      links.seats
   );

   const redirectToPassengersSelection = redirectMaker(
      'Для выбора способа оплаты сначала нужно ввести данные всех пассажиров',
      'Выбрать пассажиров',
      links.passengers
   );

   const redirectToPaymentOptions = redirectMaker(
      'Для подтверждения заказа сначала выберите способ оплаты',
      'Выбрать способ оплаты',
      links.paymentOptions
   );

   return (
      <>
         {selectedTrainIndex === null && redirecttoMain}
         {seatsDep.length <= 0 &&
            seatsArr.length <= 0 &&
            (pathname === links.confirmOrder ||
               pathname === links.paymentOptions ||
               pathname === links.passengers) &&
            selectedTrainIndex &&
            redirectToSeatsSelection}
         {(seatsDep.length > 0 || seatsArr.length > 0) &&
            selectedTrainIndex !== null &&
            passengers.length <= 0 &&
            (pathname === links.confirmOrder ||
               pathname === links.paymentOptions) &&
            redirectToPassengersSelection}
         {(seatsDep.length > 0 || seatsArr.length > 0) &&
            selectedTrainIndex !== null &&
            passengers.length > 0 &&
            !paymentOption &&
            pathname === links.confirmOrder &&
            redirectToPaymentOptions}
      </>
   );
}

export default Redirect;
