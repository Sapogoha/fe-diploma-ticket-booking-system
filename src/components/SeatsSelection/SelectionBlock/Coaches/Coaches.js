import React from 'react';
import PropTypes from 'prop-types';

import CoachItem from './CoachItem/CoachItem';

import styles from './Coaches.module.scss';

const a = [
   {
      coach: {
         _id: '63329d7d591d1e00467e8ec3',
         name: 'ВМ-68',
         class_type: 'second',
         have_wifi: true,
         have_air_conditioning: true,
         price: 0,
         top_price: 2487,
         bottom_price: 2148,
         side_price: 0,
         linens_price: 195,
         wifi_price: 136,
         is_linens_included: true,
         available_seats: 22,
         train: '63329d81591d1e00467e9484',
      },
      seats: [
         { index: 1, available: true },
         { index: 2, available: true },
         { index: 3, available: true },
         { index: 4, available: true },
         { index: 5, available: true },
         { index: 6, available: true },
         { index: 7, available: true },
         { index: 8, available: true },
         { index: 9, available: true },
         { index: 10, available: true },
         { index: 11, available: true },
         { index: 12, available: true },
         { index: 13, available: true },
         { index: 14, available: true },
         { index: 15, available: true },
         { index: 16, available: true },
         { index: 17, available: true },
         { index: 18, available: true },
         { index: 19, available: true },
         { index: 20, available: true },
         { index: 21, available: true },
         { index: 22, available: true },
      ],
   },
   {
      coach: {
         _id: '63329d7d591d1e00467e8ec4',
         name: 'ЛТН-27',
         class_type: 'first',
         have_wifi: false,
         have_air_conditioning: true,
         price: 3625,
         top_price: 4925,
         bottom_price: 4895,
         side_price: 0,
         linens_price: 219,
         wifi_price: 245,
         is_linens_included: true,
         available_seats: 8,
         train: '63329d81591d1e00467e9484',
      },
      seats: [
         { index: 1, available: true },
         { index: 2, available: true },
         { index: 3, available: true },
         { index: 4, available: true },
         { index: 5, available: true },
         { index: 6, available: true },
         { index: 7, available: true },
         { index: 8, available: true },
      ],
   },
];

function Coaches({ direction }) {
   return (
      <div className={styles.coaches}>
         <div className={styles.available}>
            <span className={`${styles.text} ${styles.title}`}>Вагоны</span>
            {a.map((item) => (
               <CoachItem
                  direction={direction}
                  key={item.coach.name}
                  name={item.coach.name}
               />
            ))}
         </div>
         <span className={styles.text}>
            Нумерация вагонов начинается с головы поезда
         </span>
      </div>
   );
}

Coaches.propTypes = { direction: PropTypes.string.isRequired };

export default Coaches;
