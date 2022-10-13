import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
   toggleSelectedCoaches,
   selectSelectedCoaches,
} from '../../../../../store/slices/trainSlice';

import styles from './CoachItem.module.scss';

function CoachItem({ name, direction, coachId }) {
   const dispatch = useDispatch();
   const activeCoach = useSelector(selectSelectedCoaches)[direction];

   const clickHandler = () => {
      dispatch(toggleSelectedCoaches({ direction, coachId, name }));
   };
   const classNames =
      name === activeCoach.name
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
   coachId: PropTypes.string.isRequired,
};

export default CoachItem;
