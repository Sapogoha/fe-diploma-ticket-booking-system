/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

import ru_RU from 'antd/lib/locale/ru_RU';

import {
   Form,
   Select,
   Input,
   Checkbox,
   ConfigProvider,
   Radio,
   Button,
   InputNumber,
} from 'antd';

import { addPassengerId } from '../../../store/slices/seatsSlice';
import {
   addNewPassenger,
   removePassenger,
} from '../../../store/slices/passengersSlice';

import minusRound from '../img/minus-round.svg';
import cross from '../img/cross.svg';
import plusRound from '../img/plus-round.svg';

import passengerTypes from '../../SeatsSelection/SelectionBlock/passengerTypes';
import docTypes from './docTypes';
import directions from '../../../data/directions';
import fieldNames from './fieldNames';
import rules from './rules';

import styles from './PassengerCard.module.scss';
import './PassengerCard.scss';

require('dayjs/locale/ru');

dayjs.locale('ru');

const DatePicker = generatePicker(dayjsGenerateConfig);

function PassengerCard({
   passengerType,
   pasNumber,
   clickOnRemovePassHandler,
   clickOnNextPassHandler,
   id,
   unchosenSeatsDep,
   unchosenSeatsArr,
}) {
   const dispatch = useDispatch();
   const [expanded, setExpanded] = useState(true);
   const [showError, setShowError] = useState(false);
   const [departureOnly, setDepartureOnly] = useState(!unchosenSeatsArr);
   const [form] = Form.useForm();
   const [documentType, setDocumentType] = useState(
      passengerType === passengerTypes.adults
         ? docTypes.passport
         : docTypes.birthCertif
   );
   const [unchosenSeatsDepSourse, setUnchosenSeatsDepSourse] = useState(
      unchosenSeatsDep.filter(
         (el) =>
            el.priceCoefficient ===
            (passengerType === passengerTypes.adults ? 1 : 0.5)
      )
   );
   const [unchosenSeatsArrSourse, setUnchosenSeatsArrSourse] = useState(
      unchosenSeatsArr.length > 0 &&
         unchosenSeatsArr.filter(
            (el) =>
               el.priceCoefficient ===
               (passengerType === passengerTypes.adults ? 1 : 0.5)
         )
   );
   const bottomSectionStyles = showError
      ? `${styles.passengerCard__bottom} ${styles['passengerCard__bottom-error']}`
      : styles.passengerCard__bottom;

   const initialValues = {
      passengerType,
      documentType:
         passengerType === passengerTypes.adults
            ? docTypes.passport
            : docTypes.birthCertif,
   };

   const docTypeselectClasses =
      documentType === docTypes.passport
         ? 'passengerCard-doc-select-pass'
         : 'passengerCard-doc-select-birth-sertificate';

   const disabledDate = (current) => current && current > dayjs(new Date());

   const title = useRef(document.createElement('div'));
   useEffect(() => {
      title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, []);

   const dispatchMaker = (data, direct, idToSend = null) =>
      dispatch(
         addPassengerId({
            seat: Number(data.split(':')[1]),
            direction: direct,
            coachId: data.split(':')[0],
            passengerId: idToSend,
         })
      );

   const clickOnHeaderHandler = () => {
      setExpanded(!expanded);
   };

   const clickOnRemoveCardHandler = () => {
      if (form.getFieldValue(fieldNames.seatArr)) {
         dispatchMaker(
            form.getFieldValue(fieldNames.seatArr),
            directions.arrival
         );
      }

      if (form.getFieldValue(fieldNames.seatDep)) {
         dispatchMaker(
            form.getFieldValue(fieldNames.seatDep),
            directions.departure
         );
      }

      dispatch(removePassenger(id));

      clickOnRemovePassHandler(id);
   };

   const onFinishFailed = () => {
      setShowError(true);
   };

   const onFinish = (values) => {
      if (values.seatDep) {
         dispatchMaker(values.seatDep, directions.departure, id);
      }
      if (values.seatArr) {
         dispatchMaker(values.seatArr, directions.arrival, id);
      }

      dispatch(
         addNewPassenger({
            id,
            ...values,
            dateOfBirth: values.dateOfBirth.format('DD.MM.YYYY'),
         })
      );

      if (
         unchosenSeatsDep.length - (values.seatDep ? 1 : 0) > 0 ||
         unchosenSeatsArr.length - (values.seatArr ? 1 : 0) > 0
      ) {
         clickOnNextPassHandler(id);
      }
   };

   const fieldChangeHandler = (value) => {
      if (value.passengerType) {
         const doc =
            value.passengerType === passengerTypes.adults
               ? docTypes.passport
               : docTypes.birthCertif;
         form.setFieldValue('documentType', doc);
         setDocumentType(doc);

         setUnchosenSeatsDepSourse(
            unchosenSeatsDep.filter(
               (el) =>
                  el.priceCoefficient ===
                  (value.passengerType === passengerTypes.adults ? 1 : 0.5)
            )
         );
         if (unchosenSeatsArr.length > 0 && !departureOnly) {
            setUnchosenSeatsArrSourse(
               unchosenSeatsArr.filter(
                  (el) =>
                     el.priceCoefficient ===
                     (value.passengerType === passengerTypes.adults ? 1 : 0.5)
               )
            );
         }
      }
      if (value.documentType) {
         setDocumentType(value.documentType);
      }

      setTimeout(() => {
         if (
            form.getFieldsError().filter((item) => item.errors.length > 0)
               .length === 0
         ) {
            setShowError(false);
         }
      }, 10);

      if (Object.entries(value)[0][0] === fieldNames.depOnly) {
         setDepartureOnly(Object.entries(value)[0][1]);

         if (form.getFieldValue(fieldNames.seatArr)) {
            dispatchMaker(
               form.getFieldValue(fieldNames.seatArr),
               directions.arrival
            );
            form.setFieldValue(fieldNames.seatArr, null);
         }
      }
   };

   const passengerCardClosed = (
      <button
         type="button"
         onClick={clickOnHeaderHandler}
         className={styles.closedPassengerCard}
      >
         <img src={plusRound} alt="иконка - плюс" />
         <span className={styles.text}>Пассажир {pasNumber}</span>
      </button>
   );

   const passSerNum = (
      <Form.Item
         label="Серия"
         name={fieldNames.docSerialNumber}
         className={styles.documentType}
         rules={rules.docSerialNumber}
      >
         <InputNumber
            placeholder="_ _ _ _"
            className={styles.inputFieldPassport}
            controls={false}
         />
      </Form.Item>
   );

   const passNum = (
      <Form.Item
         label="Номер"
         name={fieldNames.docNumberPass}
         className={styles.documentType}
         rules={rules.docNumberPass}
      >
         <InputNumber
            placeholder="_ _ _ _ _ _"
            className={styles.inputFieldPassport}
            controls={false}
         />
      </Form.Item>
   );

   const birthCertif = (
      <Form.Item
         label="Номер"
         name={fieldNames.docNumberSertif}
         className={styles.documentType}
         rules={rules.docNumberSertif}
      >
         <Input
            placeholder="12 символов"
            className={styles.inputFieldBirthSertif}
         />
      </Form.Item>
   );

   const seatDep = (
      <Form.Item
         label="Место туда"
         name={fieldNames.seatDep}
         className={styles.documentType}
         rules={rules.seatDep}
      >
         <Select
            className="passengerCard-seat-select"
            showArrow
            allowClear={false}
         >
            {unchosenSeatsDepSourse?.map((item) => (
               <Select.Option
                  key={`${item.coachId}:${item.seat}`}
                  value={`${item.coachId}:${item.seat}`}
               >
                  {` Вагон: ${item.coachName}, место: ${item.seat}`}
               </Select.Option>
            ))}
         </Select>
      </Form.Item>
   );

   const depOnly = (
      <Form.Item
         className={`${styles.departureOnly} passengerCard-checkbox-departureOnly`}
         valuePropName="checked"
         name={fieldNames.depOnly}
         label="Только туда"
      >
         <Checkbox className="passengerCard-checkbox-departureOnly" />
      </Form.Item>
   );

   const seatArr = (
      <Form.Item
         label="Место обратно"
         name={fieldNames.seatArr}
         className={styles.documentType}
         rules={rules.seatArr}
      >
         {unchosenSeatsArrSourse.length > 0 && (
            <Select
               className="passengerCard-seat-select"
               showArrow
               allowClear={false}
            >
               {unchosenSeatsArrSourse.length > 0 &&
                  unchosenSeatsArrSourse?.map((item) => (
                     <Select.Option
                        key={`${item.coachId}:${item.seat}`}
                        value={`${item.coachId}:${item.seat}`}
                     >
                        {` Вагон: ${item.coachName}, место: ${item.seat}`}
                     </Select.Option>
                  ))}
            </Select>
         )}
      </Form.Item>
   );

   return (
      <div id={id} ref={title}>
         {!expanded && passengerCardClosed}
         {expanded && (
            <div className={styles.passengerCard}>
               <div
                  tabIndex="0"
                  role="button"
                  className={`${styles.passengerCard__header} ${styles.section}`}
                  onClick={clickOnHeaderHandler}
               >
                  <div className={styles.left}>
                     <img src={minusRound} alt="иконка - минус" />
                     <span className={styles.text}>Пассажир {pasNumber}</span>
                  </div>
                  <button type="button" onClick={clickOnRemoveCardHandler}>
                     <img src={cross} alt="иконка - крестик" />
                  </button>
               </div>

               <Form
                  form={form}
                  initialValues={initialValues}
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  onValuesChange={fieldChangeHandler}
                  scrollToFirstError
               >
                  <div className={styles.section}>
                     <div className={styles.row}>
                        <Form.Item
                           name={fieldNames.passengerType}
                           value={form.passengerType}
                           rules={rules.passengerType}
                        >
                           <Select
                              className="passengerCard-select"
                              popupClassName="passengerCard-select"
                           >
                              <Select.Option value={passengerTypes.adults}>
                                 Взрослый
                              </Select.Option>
                              <Select.Option value={passengerTypes.children}>
                                 Детский
                              </Select.Option>
                           </Select>
                        </Form.Item>
                     </div>
                     <div className={styles.row}>
                        <Form.Item
                           name={fieldNames.lastName}
                           label="Фамилия"
                           rules={rules.lastName}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                        <Form.Item
                           name={fieldNames.firstName}
                           label="Имя"
                           rules={rules.firstName}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                        <Form.Item
                           name={fieldNames.fathersName}
                           label="Отчество"
                           rules={rules.fathersName}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                     </div>
                     <div className={`${styles.row} ${styles.rowShort}`}>
                        <Form.Item
                           label="Пол"
                           name={fieldNames.gender}
                           className={styles.genderRadioBtn}
                           rules={rules.gender}
                        >
                           <Radio.Group
                              optionType="button"
                              buttonStyle="solid"
                              className="passengerCard-radio"
                           >
                              <Radio.Button value="true" defaultChecked>
                                 М
                              </Radio.Button>
                              <Radio.Button value="false">Ж</Radio.Button>
                           </Radio.Group>
                        </Form.Item>

                        <ConfigProvider locale={ru_RU}>
                           <Form.Item
                              label="Дата рождения"
                              name={fieldNames.dateOfBirth}
                              rules={rules.dateOfBirth}
                              value={form.dateOfBirth}
                           >
                              <DatePicker
                                 className="passengerCard-datepicker"
                                 popupClassName="passengerCard-datepicker"
                                 placeholder="дд/мм/гг"
                                 disabledDate={disabledDate}
                                 format="DD.MM.YYYY"
                                 allowClear
                                 showToday={false}
                              />
                           </Form.Item>
                        </ConfigProvider>
                     </div>
                     <div className={styles.row}>
                        <Form.Item valuePropName="checked" name="specialNeeds">
                           <Checkbox className="passengerCard-checkbox">
                              ограниченная подвижность
                           </Checkbox>
                        </Form.Item>
                     </div>
                  </div>
                  <div className={styles.section}>
                     <div className={`${styles.row} ${styles.rowShort}`}>
                        <Form.Item
                           label="Тип документа"
                           name={fieldNames.docType}
                           className={styles.documentType}
                           rules={rules.docType}
                        >
                           <Select
                              className={docTypeselectClasses}
                              popupClassName="passengerCard-doc-select"
                              showArrow
                              allowClear={false}
                           >
                              <Select.Option value={docTypes.passport}>
                                 Паспорт
                              </Select.Option>
                              <Select.Option value={docTypes.birthCertif}>
                                 Свидетельство о рождении
                              </Select.Option>
                           </Select>
                        </Form.Item>
                        {documentType === docTypes.passport && passSerNum}
                        {documentType === docTypes.passport && passNum}
                        {documentType === docTypes.birthCertif && birthCertif}
                     </div>
                  </div>
                  {(unchosenSeatsDepSourse.length > 0 ||
                     unchosenSeatsArrSourse.length > 0) && (
                     <div className={styles.section}>
                        <div className={`${styles.row} ${styles.rowSeats}`}>
                           {unchosenSeatsDepSourse.length > 0 && seatDep}

                           {unchosenSeatsArrSourse.length > 0 &&
                              unchosenSeatsDepSourse.length > 0 &&
                              depOnly}

                           {unchosenSeatsArrSourse.length > 0 &&
                              !departureOnly &&
                              seatArr}
                        </div>
                     </div>
                  )}
                  <Form.Item className={bottomSectionStyles}>
                     <Button
                        type="primary"
                        htmlType="submit"
                        className={`${styles.btn} passengerCard__button`}
                     >
                        Следующий пассажир
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         )}
      </div>
   );
}

const shapedObj = {
   coachId: PropTypes.string.isRequired,
   coachName: PropTypes.string.isRequired,
   passengerId: PropTypes.string,
   price: PropTypes.number.isRequired,
   priceCoefficient: PropTypes.number.isRequired,
   seat: PropTypes.number.isRequired,
};

PassengerCard.propTypes = {
   passengerType: PropTypes.string.isRequired,
   pasNumber: PropTypes.number.isRequired,
   clickOnRemovePassHandler: PropTypes.func.isRequired,
   clickOnNextPassHandler: PropTypes.func.isRequired,
   id: PropTypes.string.isRequired,
   unchosenSeatsDep: PropTypes.arrayOf(PropTypes.shape(shapedObj)).isRequired,
   unchosenSeatsArr: PropTypes.arrayOf(PropTypes.shape(shapedObj)),
};

PassengerCard.defaultProps = {
   unchosenSeatsArr: null,
};

export default PassengerCard;
