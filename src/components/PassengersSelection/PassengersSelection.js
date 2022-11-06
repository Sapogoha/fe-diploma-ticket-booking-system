import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';

import PassengerCard from './PassengerCard/PassengerCard';

import { selectSelectedSeats } from '../../store/slices/seatsSlice';

import links from '../../data/links';
import passengerTypes from '../SeatsSelection/SelectionBlock/passengerTypes';
import directions from '../../data/directions';

import plus from './img/plus.svg';

import styles from './PassengersSelection.module.scss';

function PassengersSelection() {
   const title = useRef(document.createElement('div'));
   useEffect(() => {
      title.current.scrollIntoView({ behavior: 'smooth' });
   }, []);

   const navigate = useNavigate();
   const [passArray, setPassArray] = useState([{ id: nanoid() }]);
   const seatsDep = useSelector(selectSelectedSeats)[directions.departure];
   const seatsArr = useSelector(selectSelectedSeats)[directions.arrival];

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

   const unchosenSeatsDep = [
      ...seatsDepModified.filter((el) => el.passengerId === null),
   ];
   const unchosenSeatsArr = [
      ...seatsArrModified.filter((el) => el.passengerId === null),
   ];

   const unchosenSeats = [...unchosenSeatsDep, ...unchosenSeatsArr];

   const button = (
      <div className={styles.buttonWrapper}>
         <button
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
      <div ref={title}>
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
