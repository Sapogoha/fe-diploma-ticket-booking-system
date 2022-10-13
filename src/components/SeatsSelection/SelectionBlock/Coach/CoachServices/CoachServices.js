import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CoachServiceItem from './CoachServiceItem/CoachServiceItem';

import { selectSelectedCoaches } from '../../../../../store/slices/trainSlice';
import { selectSeatsOptions } from '../../../../../store/slices/seatsSlice';

import serviceNames from './serviceNames';

import conditionerChosen from './img/active/conditioner.svg';
import wifiChosen from './img/active/wifi.svg';
import linensChosen from './img/active/linens.svg';

import linensInactive from './img/inactive/linens.svg';
import foodInactive from './img/inactive/food.svg';

import conditionerHover from './img/hover/conditioner.svg';
import wifiHover from './img/hover/wifi.svg';
import linensHover from './img/hover/linens.svg';
import foodHover from './img/hover/food.svg';

import styles from './CoachServices.module.scss';

function CoachServices({ direction }) {
   const activeCoach = useSelector(selectSelectedCoaches)[direction].name;
   const coach = useSelector(selectSeatsOptions)[direction]?.filter(
      (item) => item?.coach?.name === activeCoach
   )[0]?.coach;

   const services = [
      {
         name: serviceNames.conditioner,
         status: coach?.have_air_conditioning,
         active: conditionerChosen,
         hover: conditionerHover,
      },
      {
         name: serviceNames.wifi,
         status: coach?.have_wifi,
         active: wifiChosen,
         hover: wifiHover,
      },
      {
         name: serviceNames.linens,
         status: !!coach?.linens_price,
         text: `белье не включено. стоимость - ${coach?.linens_price} руб.`,
         included: coach?.is_linens_included,
         active: linensChosen,
         inactive: linensInactive,
         hover: linensHover,
      },
      {
         status: true,
         name: serviceNames.food,
         text: 'питание можно заказать дополнительно',
         inactive: foodInactive,
         hover: foodHover,
      },
   ];
   return (
      <div className={styles.iconsWrapper}>
         {services.map(
            (service) =>
               service.status && (
                  <CoachServiceItem
                     key={activeCoach + service.name}
                     className={styles.icon}
                     name={service.name}
                     included={service.included}
                     text={service.text}
                     active={service?.active}
                     inactive={service.inactive}
                     hover={service.hover}
                     linensPrice={service.linensPrice}
                  />
               )
         )}
      </div>
   );
}

CoachServices.propTypes = {
   direction: PropTypes.string.isRequired,
};

export default CoachServices;
