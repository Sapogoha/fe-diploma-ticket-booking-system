import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, InputNumber, Radio } from 'antd';

import Redirect from '../Redirect/Redirect';

import {
   addPersonalData,
   selectPersonalData,
} from '../../store/slices/personalDataSlice';
import { selectTrains } from '../../store/slices/trainSlice';
import { selectSelectedSeats } from '../../store/slices/seatsSlice';
import { selectPassengers } from '../../store/slices/passengersSlice';

import links from '../../data/links';
import fieldNames from './fieldNames';
import rules from './rules';
import directions from '../../data/directions';

import styles from './PaymentOptions.module.scss';
import './PaymentOptions.scss';

function PaymentOptions() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [form] = Form.useForm();

   const trains = useSelector(selectTrains);
   const seatsDep = useSelector(selectSelectedSeats)[directions.departure];
   const seatsArr = useSelector(selectSelectedSeats)[directions.arrival];
   const passengers = useSelector(selectPassengers);
   const personalData = useSelector(selectPersonalData);
   const initialValues = personalData;

   const clickHandler = () => {
      form.validateFields().then((values) => {
         dispatch(addPersonalData(values));
         navigate(links.confirmOrder);
      });
      // .catch((errorInfo) => {
      //    console.log(errorInfo);
      // });
   };

   const fullForm = (
      <section className={styles.card}>
         <Form
            form={form}
            layout="vertical"
            scrollToFirstError
            initialValues={initialValues}
         >
            <div className={`${styles.header} ${styles.section}`}>
               <span className={styles.text}>Персональные данные</span>
            </div>
            <div className={styles.section}>
               <div className={styles.row}>
                  <Form.Item
                     className="paymentOption"
                     name={fieldNames.lastName}
                     label="Фамилия"
                     rules={rules.lastName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>
                  <Form.Item
                     className="paymentOption"
                     name={fieldNames.firstName}
                     label="Имя"
                     rules={rules.firstName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>
                  <Form.Item
                     className="paymentOption"
                     name={fieldNames.fathersName}
                     label="Отчество"
                     rules={rules.fathersName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>
               </div>

               <div className={styles.rowShort}>
                  <Form.Item
                     className="paymentOption"
                     name={fieldNames.phone}
                     label="Контактный телефон"
                     rules={rules.phone}
                  >
                     <InputNumber
                        className={styles.inputField}
                        prefix="+7"
                        placeholder="_ _ _  _ _ _  _ _  _ _"
                        controls={false}
                     />
                  </Form.Item>
               </div>

               <div className={styles.rowShort}>
                  <Form.Item
                     className="paymentOption"
                     name={fieldNames.email}
                     label="E-mail"
                     rules={rules.email}
                  >
                     <Input
                        placeholder="inbox@gmail.com"
                        className={styles.inputField}
                     />
                  </Form.Item>
               </div>
            </div>

            <div className={`${styles.header} ${styles.section}`}>
               <span className={styles.text}>Способ оплаты</span>
            </div>
            <Form.Item
               name={fieldNames.paymentMethod}
               rules={rules.paymentMethod}
            >
               <Radio.Group className={styles.radioGroup}>
                  <div className={styles.section}>
                     <Radio
                        className={` ${styles.radioRow} radioRow`}
                        value="online"
                     >
                        Онлайн
                        <div className={styles.onlinePayments}>
                           <div className={styles.paymentMethod}>
                              Банковской картой
                           </div>
                           <div className={styles.paymentMethod}>PayPal</div>
                           <div className={styles.paymentMethod}>
                              Visa QIWI Wallet
                           </div>
                        </div>
                     </Radio>
                  </div>
                  <div className={styles.section}>
                     <Radio
                        value="cash"
                        className={` ${styles.radioRow} radioRow`}
                     >
                        Наличными
                     </Radio>
                  </div>
               </Radio.Group>
            </Form.Item>
         </Form>
      </section>
   );

   const button = (
      <div className={styles.buttonWrapper}>
         <button onClick={clickHandler} type="submit">
            купить билеты
         </button>
      </div>
   );

   const redirecttoMain = (
      <Redirect
         mainText="Пожалуйста, выберете поезд. Без этого нельзя выбирать способ оплаты"
         btnText="На главную"
         link={links.main}
      />
   );

   const redirectToSeatsSelection = (
      <Redirect
         mainText="Для ввода данных пассажиров сначала нужно выбрать места"
         btnText="Выбрать места"
         link={links.seats}
      />
   );

   const redirectToPassengersSelection = (
      <Redirect
         mainText="Для выбора способа оплаты сначала нужно ввести данные всех пассажиров"
         btnText="Выбрать пассажиров"
         link={links.passengers}
      />
   );

   return (
      <>
         {(trains[directions.departure] || trains[directions.arrival]) && (
            <>
               {fullForm}
               {button}
            </>
         )}

         {!trains[directions.departure] &&
            !trains[directions.arrival] &&
            redirecttoMain}
         {seatsDep.length <= 0 &&
            seatsArr.length <= 0 &&
            (trains[directions.departure] || trains[directions.arrival]) &&
            redirectToSeatsSelection}
         {(seatsDep.length > 0 || seatsArr.length > 0) &&
            (trains[directions.departure] || trains[directions.arrival]) &&
            passengers.length <= 0 &&
            redirectToPassengersSelection}
      </>
   );
}

export default PaymentOptions;
