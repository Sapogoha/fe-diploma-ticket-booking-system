import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';

import PassengerCard from './PassengerCard/PassengerCard';

import { selectSelectedSeats } from '../../store/slices/seatsSlice';
import { selectPassengers } from '../../store/slices/passengersSlice';

import links from '../../data/links';
import passengerTypes from '../SeatsSelection/SelectionBlock/passengerTypes';
import directions from '../../data/directions';

import plus from './img/plus.svg';

import styles from './PassengersSelection.module.scss';

function PassengersSelection() {
   const navigate = useNavigate();
   const [passArray, setPassArray] = useState([]);
   const seatsDep = useSelector(selectSelectedSeats)[directions.departure];
   const seatsArr = useSelector(selectSelectedSeats)[directions.arrival];
   const passengers = useSelector(selectPassengers);

   useEffect(() => {
      passengers.forEach((pas) =>
         setPassArray((prev) => [...prev, { id: pas.id }])
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const seatsModifier = (obj) =>
      obj
         .map((el) =>
            el.seats.map((item) => ({
               ...item,
               coachId: el.coachId,
               coachName: el.coachName,
            }))
         )
         .flat();
   const seatsDepModified = seatsModifier(seatsDep);
   const seatsArrModified = seatsModifier(seatsArr);

   const clickHandler = () => {
      navigate(links.paymentOptions);
   };

   const unchosenSeatsDep = useMemo(
      () => [...seatsDepModified.filter((el) => el.passengerId === null)],
      [seatsDepModified]
   );
   const unchosenSeatsArr = useMemo(
      () => [...seatsArrModified.filter((el) => el.passengerId === null)],
      [seatsArrModified]
   );

   const unchosenSeats = useMemo(
      () => [...unchosenSeatsDep, ...unchosenSeatsArr],
      [unchosenSeatsArr, unchosenSeatsDep]
   );

   const forwardBtn = useRef(document.createElement('button'));

   useEffect(() => {
      if (!unchosenSeats.length > 0) {
         forwardBtn.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
         });
      }
   }, [unchosenSeats]);

   useEffect(() => {
      if (unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const button = (
      <div className={styles.buttonWrapper}>
         <button
            ref={forwardBtn}
            onClick={clickHandler}
            type="button"
            disabled={unchosenSeats.length > 0}
         >
            далее
         </button>
      </div>
   );

   const unchosenAdultSeats = unchosenSeats.filter(
      (el) => el.priceCoefficient === 1
   );

   const clickOnAddPassHandler = () => {
      if (unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      }
   };

   const clickOnNextPassHandler = (id) => {
      const index = passArray.findIndex((el) => el.id === id);

      if (index === passArray.length - 1 && unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      } else {
         const element = document.getElementById(`${passArray[index + 1].id}`);
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   const clickOnRemovePassHandler = (id) => {
      setPassArray((prev) => prev.filter((el) => el.id !== id));
   };

   const addPassenger = (
      <button
         type="button"
         className={styles.addPassenger}
         onClick={clickOnAddPassHandler}
      >
         <span className={styles.text}>Добавить пассажира</span>
         <img src={plus} alt="иконка - добавить" />
      </button>
   );

   return (
      <div>
         {passArray.map((item, index) => (
            <PassengerCard
               key={item.id}
               passengerType={
                  unchosenAdultSeats.length >= 1
                     ? passengerTypes.adults
                     : passengerTypes.children
               }
               id={item.id}
               pasNumber={index + 1}
               clickOnRemovePassHandler={clickOnRemovePassHandler}
               clickOnNextPassHandler={clickOnNextPassHandler}
               unchosenSeats={unchosenSeats}
               unchosenSeatsDep={unchosenSeatsDep}
               unchosenSeatsArr={unchosenSeatsArr}
            />
         ))}
         {unchosenSeats.length > 0 && addPassenger}

         {button}
      </div>
   );
}

export default PassengersSelection;
