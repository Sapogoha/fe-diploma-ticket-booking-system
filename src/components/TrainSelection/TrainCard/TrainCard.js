/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import MiddlePart from './MiddlePart/MiddlePart';
import RightPart from './RightPart/RightPart';

import { setTrains } from '../../../store/slices/trainSlice';

import train from './img/train.svg';
import arrow from './img/arrow.svg';
import arrowRight from './img/arrow-right.svg';
import arrowLeft from './img/arrow-left.svg';

import directions from '../../../data/directions';
import links from '../../../data/links';

import styles from './TrainCard.module.scss';

// цены и количество билетов совмещать для двух поездов? - сейчас так делаю
// или отдельно выводить для поезда туда и для поезда обратно? - тогда размер карточки увеличится. но это логичнее.

function TrainCard({ ticket }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const availableSeats = ticket?.available_seats_info;
   const priceDep = ticket?.departure?.price_info;
   const priceArr = ticket?.arrival?.price_info;

   const departureFrom = ticket?.departure?.from;
   const departureTo = ticket?.departure?.to;
   const arrivalFrom = ticket?.arrival?.from;
   const arrivalTo = ticket?.arrival?.to;

   const onClick = (evt) => {
      evt.preventDefault();
      dispatch(
         setTrains({ value: ticket.departure, direction: directions.departure })
      );
      if (ticket.arrival) {
         dispatch(
            setTrains({ value: ticket.arrival, direction: directions.arrival })
         );
      }
      navigate(links.seats);
   };
   return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
         <div className={styles.card__left}>
            <div className={styles.img}>
               <img src={train} alt="иконка поезда" />
            </div>
            <span className={styles['train-name']}>
               {ticket.departure.train.name}
            </span>
            <span className={styles['departure-city']}>
               {ticket.departure.from.city.name}
               <img
                  className={styles['departure-arrow']}
                  src={arrow}
                  alt="иконка - стрелка"
               />
            </span>
            <span className={styles['arrival-city']}>
               {ticket.departure.to.city.name}
            </span>
         </div>
         <div className={styles.card__middle}>
            <MiddlePart
               depTime={departureFrom.datetime}
               depCity={departureFrom.city.name}
               depStation={departureFrom.railway_station_name}
               duration={ticket.departure.duration}
               arrow={arrowRight}
               arrTime={departureTo.datetime}
               arrCity={departureTo.city.name}
               arrStation={departureTo.railway_station_name}
            />
            {ticket.arrival && (
               <MiddlePart
                  depTime={arrivalFrom.datetime}
                  depCity={arrivalFrom.city.name}
                  depStation={arrivalFrom.railway_station_name}
                  duration={ticket.arrival.duration}
                  arrow={arrowLeft}
                  arrTime={arrivalTo.datetime}
                  arrCity={arrivalTo.city.name}
                  arrStation={arrivalTo.railway_station_name}
               />
            )}
         </div>
         <div className={styles.card__right}>
            <RightPart
               availableSeats={availableSeats}
               // availableSeatsDep={availableSeatsDep}
               // availableSeatsArr={availableSeatsArr}
               priceDep={priceDep}
               priceArr={priceArr}
            />
         </div>
      </div>
   );
}

// eslint-disable-next-line react/forbid-prop-types
TrainCard.propTypes = { ticket: PropTypes.object.isRequired };

export default TrainCard;
