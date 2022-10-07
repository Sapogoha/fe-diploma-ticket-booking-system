import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';

import ticketWordFormatter from '../../../../utils/ticketWordFormatter';

import styles from './NumberOfTickets.module.scss';

function NumberOfTickets() {
   const maxAdultTicketsCount = 5;
   const [adultCount, setAdultCount] = useState(0);
   const [childrenCount, setChildrenCount] = useState(0);
   const [childrenMax, setChildrenMax] = useState(0);
   const [toddlerCount, setToddlerCount] = useState(0);
   const [toddlerMax, setToddlerMax] = useState(0);

   const ticketWord = ticketWordFormatter(childrenMax);

   useEffect(() => {
      const rest = adultCount * 2 - childrenCount - toddlerCount;
      if (rest < 0 && toddlerCount > 0) {
         setToddlerCount(toddlerCount - 1);
      }
      if (rest < 0 && toddlerCount === 0) {
         setChildrenCount(childrenCount - 1);
      }
      setChildrenMax(rest);
      setToddlerMax(rest);
   }, [adultCount, childrenCount, toddlerCount]);
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
                  onChange={(evt) => setAdultCount(Number(evt.target.value))}
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
                  onChange={(evt) => setChildrenCount(Number(evt.target.value))}
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
                  onChange={(evt) => setToddlerCount(Number(evt.target.value))}
               />
               <div>
                  {` Можно добавить еще ${toddlerMax} ${ticketWord} для младенцев.`}
               </div>
            </Form.Item>
         </Form>
      </div>
   );
}

export default NumberOfTickets;
