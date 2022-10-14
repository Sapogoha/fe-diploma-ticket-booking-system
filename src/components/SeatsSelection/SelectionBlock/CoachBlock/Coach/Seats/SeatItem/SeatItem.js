import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import {
   addSelectedSeats,
   removeSelectedSeat,
} from '../../../../../../../store/slices/seatsSlice';

import classes from '../../../../../classes';

import styles from './SeatItem.module.scss';

function SeatItem({
   number,
   coachClass,
   taken,
   direction,
   coachId,
   price,
   clickedSeat,
}) {
   const dispatch = useDispatch();
   const [clicked, setClicked] = useState(clickedSeat);
   const clickHandler = () => {
      setClicked(!clicked);
      if (clicked) {
         dispatch(removeSelectedSeat({ number, direction, coachId }));
      } else {
         dispatch(addSelectedSeats({ number, direction, coachId, price }));
      }
   };

   let className = `${styles[`seat-${coachClass}`]} ${styles.seat} ${
      taken && styles['seat-taken']
   } ${clicked && styles['seat-clicked']} `;

   switch (coachClass) {
      case classes.first:
         className += ` ${
            number % 2 === 1 && styles[`seat-${coachClass}__odd`]
         } 
   ${number === 18 && styles[`seat-${coachClass}-last`]} 
   `;
         break;
      case classes.second:
         className += ` ${
            number % 4 === 1 && styles[`seat-${coachClass}__bottomLeft`]
         } 
     ${number % 4 === 3 && styles[`seat-${coachClass}__bottomRight`]} 
     ${number % 4 === 2 && styles[`seat-${coachClass}__topLeft`]} 
     ${number >= 35 && styles[`seat-${coachClass}-last`]}`;
         break;
      case classes.third:
         className += ` ${
            number % 4 === 1 &&
            number <= 36 &&
            styles[`seat-${coachClass}__bottomLeft`]
         } 
        ${
           number % 4 === 3 &&
           number <= 36 &&
           styles[`seat-${coachClass}__bottomRight`]
        } 
        ${
           number % 4 === 2 &&
           number <= 36 &&
           styles[`seat-${coachClass}__topLeft`]
        } 
        ${(number === 35 || number === 36) && styles[`seat-${coachClass}-last`]}
        ${number > 36 && styles[`seat-${coachClass}-side`]}
        ${
           number > 36 &&
           number % 2 === 0 &&
           styles[`seat-${coachClass}-side-even`]
        }
        ${number === 54 && styles[`seat-${coachClass}-side-even-last`]}`;
         break;
      default:
         className += ` 
         ${
            (number === 1 || number === 2) &&
            styles[`seat-${coachClass}__first`]
         } 
         ${number === 37 && styles[`seat-${coachClass}__37`]}
        ${number === 38 && styles[`seat-${coachClass}__38`]}
        ${number === 68 && styles[`seat-${coachClass}__68`]}
        `;
   }

   return (
      <button
         onClick={clickHandler}
         type="button"
         className={className}
         disabled={taken}
      >
         {number}
      </button>
   );
}

SeatItem.propTypes = {
   number: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   coachClass: PropTypes.string.isRequired,
   taken: PropTypes.bool.isRequired,
   coachId: PropTypes.string,
   direction: PropTypes.string.isRequired,
   clickedSeat: PropTypes.bool.isRequired,
};

SeatItem.defaultProps = {
   coachId: null,
};

export default SeatItem;
