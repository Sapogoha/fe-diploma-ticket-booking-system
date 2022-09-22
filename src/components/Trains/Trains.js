import React from 'react';
import { useSelector } from 'react-redux';
// , useDispatch

import dayjs from 'dayjs';

import {
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
   selectReturnDate,
} from '../../store/slices/searchSlice';

// import PropTypes from 'prop-types'

function Trains() {
   // const dispatch = useDispatch();
   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);
   const returnDate = useSelector(selectReturnDate);

   // if (departureCity && arrivalCity && departureDate) {
   //    const dateStart = dayjs(departureDate).format('YYYY-DD-MM').toString();
   //    let url = `${process.env.REACT_APP_SEARCH_ROUTES}?from_city_id=${departureCity.id}&to_city_id=${arrivalCity.id}&date_start=${dateStart}`;
   //    if (returnDate) {
   //       const dateEnd = dayjs(returnDate).format('YYYY-DD-MM').toString();
   //       url += `&date_end=${dateEnd}`;
   //    }
   //    console.log(url);
   // }
   return (
      <div>
         <div>departureCity: {departureCity.name}</div>
         <div>arrivalCity: {arrivalCity.name}</div>
         <div>departureDate: {dayjs(departureDate).format('DD/MM/YY')}</div>
         <div>returnDate: {dayjs(returnDate).format('DD/MM/YY')}</div>
      </div>
   );
}

// Trains.propTypes = {}

export default Trains;
