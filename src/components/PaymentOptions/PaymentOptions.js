import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input, InputNumber, Radio } from 'antd';

import { addPersonalData } from '../../store/slices/personalDataSlice';

import links from '../../data/links';
import fieldNames from './fieldNames';
import rules from './rules';

import styles from './PaymentOptions.module.scss';
import './PaymentOptions.scss';

function PaymentOptions() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [form] = Form.useForm();

   const clickHandler = () => {
      form.validateFields().then((values) => {
         dispatch(addPersonalData(values));
         navigate(links.confirmOrder);
      });
      // .catch((errorInfo) => {
      //    console.log(errorInfo);
      // });
   };

   return (
      <>
         <div className={styles.card}>
            <Form form={form} layout="vertical" scrollToFirstError>
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
               <Form.Item name="payment_method" rules={rules.paymentMethod}>
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
         </div>

         <div className={styles.buttonWrapper}>
            <button onClick={clickHandler} type="submit">
               купить билеты
            </button>
         </div>
      </>
   );
}

export default PaymentOptions;
