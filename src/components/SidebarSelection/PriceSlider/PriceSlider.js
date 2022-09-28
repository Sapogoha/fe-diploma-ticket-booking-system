import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Slider } from 'antd';

import {
   selectPrices,
   changePriceFields,
} from '../../../store/slices/sidebarSelectSlice';

import 'antd/dist/antd.css';
import './PriceSlider.scss';
import styles from './PriceSlider.module.scss';

function PriceSlider() {
   const dispatch = useDispatch();
   const prices = useSelector(selectPrices);

   // можно потом динамически менять в зависимости от мин-макс цен из списка билетов
   const min = 0;
   const max = 10000;

   const defaultValue = prices.max ? [prices.min, prices.max] : [min, max];

   const onAfterChange = (value) => {
      dispatch(changePriceFields(value));
   };
   return (
      <div className={styles.wrapper}>
         <div className={styles.top}>
            <span>от</span>
            <span>до</span>
         </div>
         <div className="price-slider">
            <Slider
               range
               tooltip={{
                  open: true,
                  placement: 'bottom',
               }}
               step={10}
               min={min}
               max={max}
               defaultValue={defaultValue}
               onAfterChange={onAfterChange}
            />
         </div>
      </div>
   );
}

export default PriceSlider;
