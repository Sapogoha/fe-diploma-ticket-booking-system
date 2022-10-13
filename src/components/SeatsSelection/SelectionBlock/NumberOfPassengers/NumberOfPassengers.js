import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import {
   setNumOfPassengers,
   selectNumberOfPassengers,
} from '../../../../store/slices/passengersSlice';

import ticketWordFormatter from '../../../../utils/ticketWordFormatter';

import styles from './NumberOfPassengers.module.scss';

function NumberOfPassengers({ direction }) {
   const dispatch = useDispatch();
   const maxAdultTicketsCount = 5;
   const [childrenMax, setChildrenMax] = useState(0);
   const [toddlerMax, setToddlerMax] = useState(0);

   const numberOfPassengers = useSelector(selectNumberOfPassengers)[direction];

   const adultCount = numberOfPassengers.adults;
   const childrenCount = numberOfPassengers.children;
   const toddlerCount = numberOfPassengers.toddlers;

   const ticketWord = ticketWordFormatter(childrenMax);

   useEffect(() => {
      const rest = adultCount * 2 - childrenCount - toddlerCount;

      if (rest < 0 && toddlerCount > 0) {
         dispatch(
            setNumOfPassengers({
               category: 'toddlers',
               direction,
               value: toddlerCount - 1,
            })
         );
      }
      if (rest < 0 && toddlerCount === 0) {
         dispatch(
            setNumOfPassengers({
               category: 'children',
               direction,
               value: childrenCount - 1,
            })
         );
      }
      setChildrenMax(rest);
      setToddlerMax(rest);
   }, [adultCount, childrenCount, direction, dispatch, toddlerCount]);

   return (
      <div className={styles.seats}>
         <h4 className={styles.title}>Количество билетов</h4>
         <Form className={styles.form}>
            <Form.Item className={styles.formItem}>
               <Input
                  type="number"
                  prefix="Взрослых — "
                  defaultValue={0}
                  value={adultCount}
                  min={0}
                  max={maxAdultTicketsCount}
                  className={styles.input}
                  onChange={(evt) =>
                     dispatch(
                        setNumOfPassengers({
                           category: 'adults',
                           direction,
                           value: Number(evt.target.value),
                        })
                     )
                  }
               />
               <div>
                  {` Можно добавить еще ${maxAdultTicketsCount - adultCount}  ${
                     maxAdultTicketsCount - adultCount === 1
                        ? 'пассажира'
                        : 'пассажиров'
                  }`}
               </div>
            </Form.Item>
            <Form.Item className={styles.formItem}>
               <Input
                  type="number"
                  prefix="Детских — "
                  defaultValue={0}
                  value={childrenCount}
                  min={0}
                  max={childrenMax + childrenCount}
                  className={styles.input}
                  onChange={(evt) =>
                     dispatch(
                        setNumOfPassengers({
                           category: 'children',
                           direction,
                           value: Number(evt.target.value),
                        })
                     )
                  }
               />
               <div>
                  {`Можно добавить еще ${childrenMax} ${ticketWord} для детей до 10 лет.
                  Свое место в вагоне, как у взрослых, но дешевле в среднем на
                  50-65%`}
               </div>
            </Form.Item>
            <Form.Item className={styles.formItem}>
               <Input
                  type="number"
                  prefix="Детских «без места» — "
                  defaultValue={0}
                  value={toddlerCount}
                  min={0}
                  max={toddlerMax + toddlerCount}
                  className={styles.input}
                  onChange={(evt) =>
                     dispatch(
                        setNumOfPassengers({
                           category: 'toddlers',
                           direction,
                           value: Number(evt.target.value),
                        })
                     )
                  }
               />
               <div>
                  {` Можно добавить еще ${toddlerMax} ${ticketWord} для младенцев.`}
               </div>
            </Form.Item>
         </Form>
      </div>
   );
}

NumberOfPassengers.propTypes = {
   direction: PropTypes.string.isRequired,
};

export default NumberOfPassengers;
