import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SeatItem from './SeatItem/SeatItem';

import { selectSelectedSeats } from '../../../../../../store/slices/seatsSlice';

import classes from '../../../../classes';

import styles from './Seats.module.scss';

function Seats({ availableSeats, classType, direction, coachId, prices }) {
   const selectedArr = useSelector(selectSelectedSeats)
      [direction]?.filter((el) => el.coachId === coachId)[0]
      ?.seats?.map((el) => el.seat);

   let totalSeats;

   switch (classType) {
      case classes.first:
         totalSeats = 18;
         break;
      case classes.second:
         totalSeats = 36;
         break;
      case classes.third:
         totalSeats = 54;
         break;

      default:
         totalSeats = 70;
   }

   const seatOptions = Array.from({ length: totalSeats }, (_, i) => i + 1);

   const seats = seatOptions.map((seat) =>
      availableSeats?.includes(seat) ? [seat, 'vacant'] : [seat, 'taken']
   );

   const fourthClassScheme = (
      <div className={styles.coach__fourthCl}>
         <div className={styles.top__fourthCl}>
            <div className={styles.topRow__fourthCl}>
               {seats.map(
                  (seat) =>
                     seat[0] % 2 === 0 &&
                     seat[0] <= 36 && (
                        <SeatItem
                           key={coachId + seat[0]}
                           clickedSeat={
                              !!selectedArr?.some((el) => el === seat[0])
                           }
                           number={seat[0]}
                           taken={seat[1] === 'taken'}
                           coachClass={classType}
                           direction={direction}
                           coachId={coachId}
                           price={prices.bottom}
                        />
                     )
               )}
            </div>

            <div className={styles.bottomRow__fourthCl}>
               {seats.map(
                  (seat) =>
                     seat[0] % 2 === 1 &&
                     seat[0] <= 36 && (
                        <SeatItem
                           key={coachId + seat[0]}
                           clickedSeat={
                              !!selectedArr?.some((el) => el === seat[0])
                           }
                           number={seat[0]}
                           taken={seat[1] === 'taken'}
                           coachClass={classType}
                           direction={direction}
                           coachId={coachId}
                           price={prices.bottom}
                        />
                     )
               )}
            </div>
         </div>

         <div className={styles.bottom__fourthCl}>
            <div className={styles.topRow__fourthCl}>
               {seats.map(
                  (seat) =>
                     seat[0] % 2 === 0 &&
                     seat[0] > 36 &&
                     seat[0] < 69 && (
                        <SeatItem
                           key={coachId + seat[0]}
                           clickedSeat={
                              !!selectedArr?.some((el) => el === seat[0])
                           }
                           number={seat[0]}
                           taken={seat[1] === 'taken'}
                           coachClass={classType}
                           direction={direction}
                           coachId={coachId}
                           price={prices.bottom}
                        />
                     )
               )}
            </div>

            <div className={styles.bottomRow__fourthCl}>
               {seats.map(
                  (seat) =>
                     ((seat[0] % 2 === 1 && seat[0] > 36) ||
                        seat[0] === 70) && (
                        <SeatItem
                           key={coachId + seat[0]}
                           clickedSeat={
                              !!selectedArr?.some((el) => el === seat[0])
                           }
                           number={seat[0]}
                           taken={seat[1] === 'taken'}
                           coachClass={classType}
                           direction={direction}
                           coachId={coachId}
                           price={prices.bottom}
                        />
                     )
               )}
            </div>
         </div>
      </div>
   );

   const otherClassesScheme = (
      <div className={styles.coach}>
         <div className={styles.top}>
            <div className={styles.topRow}>
               {classType === classes.first &&
                  seats.map((seat) => (
                     <SeatItem
                        key={coachId + seat[0]}
                        clickedSeat={
                           !!selectedArr?.some((el) => el === seat[0])
                        }
                        number={seat[0]}
                        taken={seat[1] === 'taken'}
                        coachClass={classType}
                        direction={direction}
                        coachId={coachId}
                        price={prices.bottom}
                     />
                  ))}
               {(classType === classes.second || classType === classes.third) &&
                  seats.map(
                     (seat) =>
                        seat[0] % 2 === 0 &&
                        seat[0] <= 36 && (
                           <SeatItem
                              key={coachId + seat[0]}
                              clickedSeat={
                                 !!selectedArr?.some((el) => el === seat[0])
                              }
                              number={seat[0]}
                              taken={seat[1] === 'taken'}
                              coachClass={classType}
                              direction={direction}
                              coachId={coachId}
                              price={prices.top}
                           />
                        )
                  )}
            </div>

            {(classType === classes.second || classType === classes.third) && (
               <div className={styles.bottomRow}>
                  {seats.map(
                     (seat) =>
                        seat[0] % 2 === 1 &&
                        seat[0] <= 36 && (
                           <SeatItem
                              key={coachId + seat[0]}
                              clickedSeat={
                                 !!selectedArr?.some((el) => el === seat[0])
                              }
                              number={seat[0]}
                              taken={seat[1] === 'taken'}
                              coachClass={classType}
                              direction={direction}
                              coachId={coachId}
                              price={prices.bottom}
                           />
                        )
                  )}
               </div>
            )}
         </div>

         <div className={styles.bottom}>
            {classType === classes.third &&
               seats.map(
                  (seat) =>
                     seat[0] > 36 && (
                        <SeatItem
                           key={coachId + seat[0]}
                           clickedSeat={
                              !!selectedArr?.some((el) => el === seat[0])
                           }
                           number={seat[0]}
                           taken={seat[1] === 'taken'}
                           coachClass={classType}
                           direction={direction}
                           coachId={coachId}
                           price={prices.side}
                        />
                     )
               )}
         </div>
      </div>
   );

   return (
      <section>
         {classType === classes.fourth ? fourthClassScheme : otherClassesScheme}
      </section>
   );
}

Seats.propTypes = {
   availableSeats: PropTypes.arrayOf(PropTypes.number),
   classType: PropTypes.string,
   coachId: PropTypes.string.isRequired,
   direction: PropTypes.string.isRequired,
   prices: PropTypes.objectOf(PropTypes.number).isRequired,
};

Seats.defaultProps = {
   availableSeats: null,
   classType: null,
};

export default Seats;
