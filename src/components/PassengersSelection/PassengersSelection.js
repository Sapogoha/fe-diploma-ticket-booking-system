import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { nanoid } from 'nanoid';

import PassengerCardOpen from './PassengerCardOpen/PassengerCardOpen';

// import { selectNumberOfPassengers } from '../../store/slices/passengersSlice';
import {
   selectSelectedSeats,
   // addPassengerId,
} from '../../store/slices/seatsSlice';
// import { selectSelectedCoaches } from '../../store/slices/trainSlice';

import links from '../../data/links';
// import passengerTypes from '../SeatsSelection/SelectionBlock/passengerTypes';
import directions from '../../data/directions';

import plus from './img/plus.svg';

import styles from './PassengersSelection.module.scss';

function PassengersSelection() {
   const title = useRef(document.createElement('div'));
   useEffect(() => {
      title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, []);
   const navigate = useNavigate();
   const { pathname } = useLocation();
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
   // seatsDep
   //    .map((el) =>
   //       el.seats.map((item) => ({
   //          ...item,
   //          coachId: el.coachId,
   //          coachName: el.coachName,
   //       }))
   //    )
   //    .flat();
   const seatsArrModified = seatsModifier(seatsArr);
   // seatsArr
   //    .map((el) =>
   //       el.seats.map((item) => ({
   //          ...item,
   //          coachId: el.coachId,
   //          coachName: el.coachName,
   //       }))
   //    )
   //    .flat();

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

      // setTimeout(() => {
      //    if (
      //       form.getFieldsError().filter((item) => item.errors.length > 0)
      //          .length === 0
      //    ) {
      //       setShowError(false);
      //    }
      // }, 10);
      // console.log(unchosenSeats);
      // console.log(unchosenSeats.length);
      // console.log(passArray);
      if (index === passArray.length - 1 && unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      } else {
         // console.log(
         //    <HashLink to={`${pathname}#${passArray[index + 1].id}`} />
         // );
         // console.log(`${pathname}#${passArray[index + 1].id}`);

         // переделать
         navigate(`${pathname}#${passArray[index + 1].id}`);
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
            <PassengerCardOpen
               key={item.id}
               passengerType={
                  unchosenAdultSeats.length >= 1 ? 'adults' : 'children'
               }
               id={item.id}
               pasNumber={index + 1}
               clickOnRemovePassHandler={clickOnRemovePassHandler}
               clickOnNextPassHandler={clickOnNextPassHandler}
               // seatsDep={seatsDepModified}
               // seatsArr={seatsArrModified}
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
