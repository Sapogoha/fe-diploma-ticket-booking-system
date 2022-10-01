import React from 'react';
import PropTypes from 'prop-types';
import RightPartItem from './RightPartItem/RightPartItem';
// import styles from './RightPart.module.scss';

function RightPart({
   availableSeats,
   //  availableSeatsDep,
   //  availableSeatsArr,
   priceDep,
   priceArr,
}) {
   return (
      <div>
         {availableSeats.fourth && (
            <RightPartItem
               type="Сидячий"
               seatsNum={availableSeats?.fourth}
               priceDep={priceDep?.fourth}
               priceArr={priceArr?.fourth}
            />
         )}
         {availableSeats.third && (
            <RightPartItem
               type="Плацкарт"
               seatsNum={availableSeats?.third}
               priceDep={priceDep?.third}
               priceArr={priceArr?.third}
            />
         )}
         {availableSeats.second && (
            <RightPartItem
               type="Купе"
               seatsNum={availableSeats.second}
               priceDep={priceDep?.second}
               priceArr={priceArr?.second}
            />
         )}
         {availableSeats.first && (
            <RightPartItem
               type="Люкс"
               seatsNum={availableSeats.first}
               priceDep={priceDep?.first}
               priceArr={priceArr?.first}
            />
         )}
      </div>
   );
}

RightPart.propTypes = {
   availableSeats: PropTypes.objectOf(PropTypes.number).isRequired,
   //  availableSeatsDep: PropTypes.objectOf(PropTypes.number).isRequired,
   //  availableSeatsArr: PropTypes.objectOf(PropTypes.number).isRequired,
   priceDep: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
   priceArr: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
};

RightPart.defaultProps = {
   priceDep: null,
   priceArr: null,
};

export default RightPart;
