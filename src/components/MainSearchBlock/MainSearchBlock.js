import React from 'react';
import PropTypes from 'prop-types';

import location from './img/location.svg';
import arrows from './img/arrows.svg';
import date from './img/date.svg';

import styles from './MainSearchBlock.module.scss';

function MainSearchBlock({ width }) {
   const formCN =
      width === 'wide' ? `${styles.form} ${styles['form-wide']}` : styles.form;
   const inputGroupCN =
      width === 'normal'
         ? `${styles.inputGroup} ${styles['inputGroup-normal']}`
         : `${styles.inputGroup} ${styles['inputGroup-wide']}`;
   return (
      <form className={formCN}>
         <div className={inputGroupCN}>
            <div className={styles.inputGroup__header}>направление</div>
            <div className={styles.inputGroup__directions}>
               <div className={styles.direction}>
                  <input
                     className={styles.direction__input}
                     type="text"
                     placeholder="откуда"
                  />
                  <div className={styles.direction__icon}>
                     <img src={location} alt="иконка - геолокация" />
                  </div>
               </div>

               <button className={styles.buttonArrows} type="button">
                  <img src={arrows} alt="иконка - круглые стрелки" />
               </button>
               <div className={styles.direction}>
                  <input
                     className={styles.direction__input}
                     type="text"
                     placeholder="куда"
                  />
                  <div className={styles.direction__icon}>
                     <img src={location} alt="иконка - геолокация" />
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.inputGroup}>
            <div className={styles.inputGroup__header}>дата</div>
            <div className={styles.inputGroup__dates}>
               <div className={styles.date}>
                  <input
                     className={styles.date__input}
                     //  type="date"
                     placeholder="дд/мм/гг"
                  />
                  <div className={styles.date__icon}>
                     <img src={date} alt="иконка - календарь" />
                  </div>
               </div>

               <div className={styles.date}>
                  <input
                     className={styles.date__input}
                     //  type="date"
                     placeholder="дд/мм/гг"
                  />
                  <div className={styles.date__icon}>
                     <img src={date} alt="иконка - календарь" />
                  </div>
               </div>
            </div>
         </div>
         <button type="submit" className={styles.button}>
            найти билеты
         </button>
      </form>
   );
}

MainSearchBlock.propTypes = {
   width: PropTypes.string.isRequired,
};

export default MainSearchBlock;
