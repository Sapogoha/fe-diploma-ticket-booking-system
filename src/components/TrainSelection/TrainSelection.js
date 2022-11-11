import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import TrainCard from './TrainCard/TrainCard';
import Redirect from '../Redirect/Redirect';

import {
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
   selectReturnDate,
} from '../../store/slices/searchSlice';
import {
   selectOptions,
   selectPrices,
   selectTime,
} from '../../store/slices/sidebarSelectSlice';
import {
   selectLoading,
   selectError,
   selectTrainsOptions,
} from '../../store/slices/trainsSlice';
import {
   selectSort,
   selectLimit,
   selectOffset,
} from '../../store/slices/sortSlice';
import { fetchTrainsOptions } from '../../store/thunks/asyncThunks';

import links from '../../data/links';

import styles from './TrainSelection.module.scss';

function TrainSelection() {
   const dispatch = useDispatch();

   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);
   const returnDate = useSelector(selectReturnDate);

   const options = useSelector(selectOptions);
   const prices = useSelector(selectPrices);
   const time = useSelector(selectTime);

   const loading = useSelector(selectLoading);
   const error = useSelector(selectError);
   const trainsOptions = useSelector(selectTrainsOptions);

   const sort = useSelector(selectSort);
   const limit = useSelector(selectLimit);
   const offset = useSelector(selectOffset);

   // базово направление туда и обратно, время туда и обратно, цена, сортировка, лимит на стр
   let url = `${process.env.REACT_APP_TICKETS}from_city_id=${
      departureCity.id
   }&to_city_id=${arrivalCity.id}&date_start=${dayjs(departureDate).format(
      'YYYY-MM-DD'
   )}&start_departure_hour_from=${Math.floor(
      time.to.departure.min / 60
   )}&start_departure_hour_to=${Math.floor(
      time.to.departure.max / 60
   )}&start_arrival_hour_from=${Math.floor(
      time.to.arrival.min / 60
   )}&start_arrival_hour_to=${Math.floor(time.to.arrival.max / 60)}
   &price_from=${prices.min}&sort=${
      sort.value
   }&limit=${limit}&offset=${offset}`;

   // опциональные параметры
   if (returnDate) {
      url += `&date_end=${dayjs(returnDate).format(
         'YYYY-MM-DD'
      )}&end_departure_hour_from=${Math.floor(
         time.back.departure.min / 60
      )}&end_departure_hour_to=${Math.floor(
         time.back.departure.max / 60
      )}&end_arrival_hour_from=${Math.floor(
         time.back.arrival.min / 60
      )}&end_arrival_hour_to=${Math.floor(time.back.arrival.max / 60)}`;
   }
   if (options.firstClass) {
      url += '&have_first_class=true';
   }
   if (options.secondClass) {
      url += '&have_second_class=true';
   }
   if (options.thirdClass) {
      url += '&have_third_class=true';
   }
   if (options.fourthClass) {
      url += '&have_fourth_class=true';
   }
   if (options.wifi) {
      url += '&have_wifi=true';
   }
   if (options.express) {
      url += '&is_express=true';
   }
   if (prices.max) {
      url += `&price_to=${prices.max}`;
   }

   useEffect(() => {
      dispatch(fetchTrainsOptions(url));
   }, [dispatch, url]);

   return (
      <section className={styles.trainSelection}>
         {error && <div>{error}</div>}
         {trainsOptions?.map((item) => (
            <TrainCard key={item.id} ticket={item.ticket} id={item.id} />
         ))}
         {(!trainsOptions || trainsOptions?.length < 1) && !loading && (
            <Redirect
               mainText="Поезда не найдены. Выберите другую дату или маршрут"
               btnText="На главную"
               link={links.main}
            />
         )}
      </section>
   );
}

export default TrainSelection;
