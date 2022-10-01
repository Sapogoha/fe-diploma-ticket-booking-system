import React, { useState, useEffect } from 'react';
import LastTicketItem from './LastTicketItem/LastTicketItem';
import styles from './LastTickets.module.scss';

function LastTickets() {
   const [error, setError] = useState(null);
   const [tickets, setTickets] = useState(null);

   // последних билета должно быть 3 или сколько приходит по запросу? если все - уберу slice на 51 строчке

   const fetchData = async () => {
      setError(null);
      try {
         const response = await fetch(process.env.REACT_APP_LAST_TICKETS);
         if (!response.ok) {
            throw new Error();
         }
         const data = await response.json();
         setTickets(
            data.map((ticket, index) => ({
               id: index,
               price: ticket.departure.min_price,
               from: {
                  city: ticket.departure.from.city.name,
                  station: ticket.departure.from.railway_station_name,
               },
               to: {
                  city: ticket.departure.to.city.name,
                  station: ticket.departure.to.railway_station_name,
               },
               icons: {
                  wifi: ticket.departure.have_wifi,
                  conditioner: ticket.departure.have_air_conditioning,
                  express: ticket.departure.is_express,
               },
            }))
         );
      } catch (err) {
         setError('Данные о билетах не загрузились');
      }
   };
   useEffect(() => {
      fetchData();
   }, []);
   return (
      <section className={styles['last-tickets']}>
         <h4 className={styles['last-tickets__header']}> последние билеты</h4>
         <div>
            {!error &&
               tickets
                  ?.slice(-3)
                  .map((ticket) => (
                     <LastTicketItem key={ticket.id} ticket={ticket} />
                  ))}
         </div>
         {error && <div className={styles['last-tickets__error']}>{error}</div>}
      </section>
   );
}

export default LastTickets;
