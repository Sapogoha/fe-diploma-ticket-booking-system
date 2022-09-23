import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Direction from './Direction/Direction';
import Calendar from './Calendar/Calendar';

import {
   swapValues,
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
   // selectReturnDate,
} from '../../store/slices/searchSlice';

import location from './img/location.svg';
import arrows from './img/arrows.svg';
import date from './img/date.svg';

import consts from './consts';
import links from '../../data/links';

import styles from './MainSearchBlock.module.scss';

// store для формы, проверку при сабмите

function MainSearchBlock({ width }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);
   // const returnDate = useSelector(selectReturnDate);
   const formCN =
      width === 'wide' ? `${styles.form} ${styles['form-wide']}` : styles.form;
   const inputGroupCN =
      width === 'normal'
         ? `${styles.inputGroup} ${styles['inputGroup-normal']}`
         : `${styles.inputGroup} ${styles['inputGroup-wide']}`;

   const inpGrHeaderStyle = styles.inputGroup__header;
   const directionStyle = styles.direction;
   const dateStyle = styles.date;
   const btnStyle = styles.button;

   const headerInvalidCl = `${inpGrHeaderStyle} ${styles['inputGroup__header-invalid']}`;
   const directionInvalidCl = `${directionStyle} ${styles['direction-invalid']}`;
   const dateInvalidCl = `${dateStyle} ${styles['date-invalid']}`;
   const btnInvCl = `${btnStyle} ${styles['button-invalid']}`;

   const [inpGrHeaderDirClasses, setInpGrHeaderDirClasses] =
      useState(inpGrHeaderStyle);
   const [inpGrHeaderDateClasses, setInpGrHeaderDateClasses] =
      useState(inpGrHeaderStyle);
   const [depCityDirClasses, setDepCityDirClasses] = useState(directionStyle);
   const [arrCityDirClasses, setArrCityDirClasses] = useState(directionStyle);
   const [depDateClasses, setDepDateClasses] = useState(dateStyle);
   const [disabled, setDisabled] = useState(true);
   const [btnClasses, setBtnClasses] = useState(btnInvCl);

   useEffect(() => {
      // если поля стали валидными - снимаем выделения
      if (departureCity.name && departureCity?.name !== arrivalCity?.name) {
         setInpGrHeaderDirClasses(inpGrHeaderStyle);
         setDepCityDirClasses(directionStyle);
      }
      if (arrivalCity.name && departureCity?.name !== arrivalCity?.name) {
         setInpGrHeaderDirClasses(inpGrHeaderStyle);
         setArrCityDirClasses(directionStyle);
      }
      if (departureDate) {
         setInpGrHeaderDateClasses(inpGrHeaderStyle);
         setDepDateClasses(dateStyle);
      }
      if (departureCity && arrivalCity && departureDate) {
         setDisabled(false);
         setBtnClasses(btnStyle);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [departureCity.name, arrivalCity.name, departureDate]);

   const submitHandler = (evt) => {
      evt.preventDefault();
      setDisabled(true);
      setBtnClasses(btnInvCl);

      if (
         departureCity &&
         arrivalCity &&
         departureDate &&
         departureCity?.name !== arrivalCity?.name
      ) {
         setDisabled(false);
         setBtnClasses(btnStyle);
         navigate(links.trains);
      } else {
         // выделяем невалидные поля

         if (!departureCity.name || departureCity?.name === arrivalCity?.name) {
            setDepCityDirClasses(directionInvalidCl);
            setInpGrHeaderDirClasses(headerInvalidCl);
         }
         if (!arrivalCity.name || departureCity?.name === arrivalCity?.name) {
            setInpGrHeaderDirClasses(headerInvalidCl);
            setArrCityDirClasses(directionInvalidCl);
         }
         if (!departureDate) {
            setInpGrHeaderDateClasses(headerInvalidCl);
            setDepDateClasses(dateInvalidCl);
         }
      }
   };

   const clickHandler = (evt) => {
      evt.preventDefault();
      dispatch(swapValues());
   };

   return (
      <form className={formCN} onSubmit={submitHandler}>
         <div className={inputGroupCN}>
            <div className={inpGrHeaderDirClasses}>направление</div>
            <div className={styles.inputGroup__directions}>
               <div className={depCityDirClasses}>
                  <Direction
                     className={styles.direction__input}
                     name={consts.depCity}
                     placeholder="откуда"
                  />
                  <div className={styles.direction__icon}>
                     <img src={location} alt="иконка - геолокация" />
                  </div>
               </div>

               <button
                  onClick={clickHandler}
                  className={styles.buttonArrows}
                  type="button"
               >
                  <img src={arrows} alt="иконка - круглые стрелки" />
               </button>
               <div className={arrCityDirClasses}>
                  <Direction
                     className={styles.direction__input}
                     name={consts.arrCity}
                     placeholder="куда"
                  />
                  <div className={styles.direction__icon}>
                     <img src={location} alt="иконка - геолокация" />
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.inputGroup}>
            <div className={inpGrHeaderDateClasses}>дата</div>
            <div className={styles.inputGroup__dates}>
               <div className={depDateClasses}>
                  <Calendar
                     name={consts.depDate}
                     className={styles.date__input}
                  />
                  <div className={styles.date__icon}>
                     <img src={date} alt="иконка - календарь" />
                  </div>
               </div>

               <div className={styles.date}>
                  <Calendar
                     name={consts.retDate}
                     className={styles.date__input}
                  />
                  <div className={styles.date__icon}>
                     <img src={date} alt="иконка - календарь" />
                  </div>
               </div>
            </div>
         </div>
         <button type="submit" className={btnClasses} disabled={disabled}>
            найти билеты
         </button>
      </form>
   );
}

MainSearchBlock.propTypes = {
   width: PropTypes.string.isRequired,
};

export default MainSearchBlock;
