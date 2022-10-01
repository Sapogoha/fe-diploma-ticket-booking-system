import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SelectItem from './SelectItem/SelectItem';
import Button from './Button/Button';

import { selectTotalCount } from '../../../store/slices/trainsSlice';

import styles from './Filters.module.scss';

function Filters({ onChangeFilters }) {
   const totalCount = useSelector(selectTotalCount);
   const sortOptions = [
      {
         value: 'date',
         label: 'времени',
      },
      {
         value: 'price__min',
         label: 'стоимости',
      },
      {
         value: 'duration',
         label: 'длительности',
      },
   ];

   const amounts = [5, 10, 20];

   return (
      <section className={styles.filters}>
         <div className={styles.found}>найдено {totalCount || 0}</div>
         {/* <div className={styles['wrapper-right']}> */}
         <div className={styles.sort}>
            сортировать по:
            <div>
               <SelectItem
                  options={sortOptions}
                  onChangeFilters={onChangeFilters}
               />
            </div>
         </div>
         <div className={styles.show}>
            <span className={styles.show__title}>показывать по:</span>
            {amounts.map((amount) => (
               <Button
                  onChangeFilters={onChangeFilters}
                  key={amount}
                  className={styles.show__amount}
                  amount={amount}
               />
            ))}
         </div>
         {/* </div> */}
      </section>
   );
}

Filters.propTypes = { onChangeFilters: PropTypes.func.isRequired };

export default Filters;
