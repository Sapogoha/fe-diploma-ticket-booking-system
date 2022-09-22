import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import DatePicker, { registerLocale } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.scss';

import dayjs from 'dayjs';
import consts from '../consts';

import {
   changeSearchFields,
   selectDepartureDate,
   selectReturnDate,
} from '../../../store/slices/searchSlice';

registerLocale('ru', ru);

function Calendar({ name }) {
   const dispatch = useDispatch();
   const [selectedDate, setSelectedDate] = useState('');
   const departureDate = useSelector(selectDepartureDate);
   const returnDate = useSelector(selectReturnDate);

   // надо видимо переводить на DatePicker antd - делал этот компонент первым, поэтому с другой библиотекой. Бесят разные крестики для автоочистки. Позже переделаю.

   let minDate = new Date();
   // максимум 100 дней от текущей даты
   let maxDate = new Date(dayjs(minDate).add(100, 'day').toJSON());
   if (name === consts.retDate && departureDate) {
      minDate = new Date(departureDate);
   }
   if (name === consts.depDate && returnDate) {
      maxDate = new Date(returnDate);
   }

   const changeHandler = (date) => {
      setSelectedDate(date);
      dispatch(changeSearchFields({ name, value: dayjs(date).toJSON() }));
   };

   return (
      <DatePicker
         locale="ru"
         placeholderText="дд/мм/гг"
         selected={selectedDate}
         onChange={changeHandler}
         minDate={minDate}
         maxDate={maxDate}
         dateFormat="dd/MM/yy"
         isClearable
      />
   );
}
Calendar.propTypes = {
   name: PropTypes.string.isRequired,
};

export default Calendar;
