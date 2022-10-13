import React from 'react';
import PropTypes from 'prop-types';

import RightPartItem from './RightPartItem/RightPartItem';

import food from './img/food.svg';
import wifiIcon from './img/wifi.svg';
import conditionerIcon from './img/conditioner.svg';
import expressIcon from './img/express.svg';

import styles from './RightPart.module.scss';

function RightPart({
   availableSeats,
   priceDep,
   priceArr,
   wifi,
   conditioner,
   express,
   onClick,
}) {
   const wifiImg = (
      <div className={styles.icons__content}>
         <img src={wifiIcon} alt="иконкa wifi" />
      </div>
   );
   const conditionerImg = (
      <div className={styles.icons__content}>
         <img src={conditionerIcon} alt="иконкa кондиционер" />
      </div>
   );
   const expressImg = (
      <div className={styles.icons__content}>
         <img src={expressIcon} alt="иконкa экспресс" />
      </div>
   );
   return (
      <>
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
         <div className={styles.icons}>
            {wifi && wifiImg}

            {conditioner && conditionerImg}

            {express && expressImg}
            <div className={styles.icons__content}>
               <img src={food} alt="иконкa еда" />
            </div>
         </div>
         <button type="button" onClick={onClick} className={styles.button}>
            Выбрать места
         </button>
      </>
   );
}

RightPart.propTypes = {
   availableSeats: PropTypes.objectOf(PropTypes.number).isRequired,
   priceDep: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
   priceArr: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
   wifi: PropTypes.bool.isRequired,
   conditioner: PropTypes.bool.isRequired,
   onClick: PropTypes.func.isRequired,
   express: PropTypes.bool,
};

RightPart.defaultProps = {
   priceDep: null,
   priceArr: null,
   express: false,
};

export default RightPart;
