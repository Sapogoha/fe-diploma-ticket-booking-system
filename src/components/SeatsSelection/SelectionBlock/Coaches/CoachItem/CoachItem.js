import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
   setSelectedCouches,
   selectSelectedCouches,
} from '../../../../../store/slices/trainSlice';

import styles from './CoachItem.module.scss';

function CoachItem({ name, direction }) {
   const dispatch = useDispatch();
   const activeCouch = useSelector(selectSelectedCouches)[direction];
   const clickHandler = () => {
      dispatch(setSelectedCouches({ direction, name }));
   };
   const classNames =
      name === activeCouch
         ? `${styles.coachNames} ${styles['coachNames-active']}`
         : styles.coachNames;

   return (
      <button type="button" className={classNames} onClick={clickHandler}>
         {name}
      </button>
   );
}

CoachItem.propTypes = {
   name: PropTypes.string.isRequired,
   direction: PropTypes.string.isRequired,
};

export default CoachItem;
