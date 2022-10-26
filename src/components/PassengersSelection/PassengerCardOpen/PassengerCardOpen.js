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
} from 'antd';

import { addPassengerId } from '../../../store/slices/seatsSlice';

import minusRound from '../img/minus-round.svg';
import cross from '../img/cross.svg';
import plusRound from '../img/plus-round.svg';

import styles from './PassengerCardOpen.module.scss';
import './PassengerCardOpen.scss';

require('dayjs/locale/ru');

dayjs.locale('ru');

const DatePicker = generatePicker(dayjsGenerateConfig);

function PassengerCardOpen({
   passengerType,
   pasNumber,
   clickOnRemovePassHandler,
   clickOnNextPassHandler,
   id,
   // seatsDep,
   // seatsArr,
   unchosenSeatsDep,
   unchosenSeatsArr,
}) {
   const title = useRef(document.createElement('div'));
   useEffect(() => {
      title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, []);
   const dispatch = useDispatch();

   const [expanded, setExpanded] = useState(true);
   const [showError, setShowError] = useState(false);
   const [departureOnly, setDepartureOnly] = useState(!unchosenSeatsArr);
   const [documentType, setDocumentType] = useState(
      passengerType === 'adults' ? 'passport' : 'birth sertificate'
   );
   const [unchosenSeatsDepSourse, setUnchosenSeatsDepSourse] = useState(
      unchosenSeatsDep.filter(
         (el) => el.priceCoefficient === (passengerType === 'adults' ? 1 : 0.5)
      )
   );
   const [unchosenSeatsArrSourse, setUnchosenSeatsArrSourse] = useState(
      unchosenSeatsArr.length > 0 &&
         unchosenSeatsArr.filter(
            (el) =>
               el.priceCoefficient === (passengerType === 'adults' ? 1 : 0.5)
         )
   );

   const [form] = Form.useForm();

   const bottomSectionStyles = showError
      ? `${styles.passengerCard__bottom} ${styles['passengerCard__bottom-error']}`
      : styles.passengerCard__bottom;

   const clickOnHeaderHandler = () => {
      setExpanded(!expanded);
   };

   const initialValues = {
      passengerType,
      documentType:
         passengerType === 'adults' ? 'passport' : 'birth sertificate',
   };

   const onFinish = (values) => {
      if (values.seatDep) {
         dispatch(
            addPassengerId({
               seat: Number(values.seatDep.split(':')[1]),
               direction: 'departure',
               coachId: values.seatDep.split(':')[0],
               passengerId: id,
            })
         );
      }
      if (values.seatArr) {
         dispatch(
            addPassengerId({
               seat: Number(values.seatArr.split(':')[1]),
               direction: 'arrival',
               coachId: values.seatArr.split(':')[0],
               passengerId: id,
            })
         );
      }

      if (
         unchosenSeatsDep.length - (values.seatDep ? 1 : 0) > 0 ||
         unchosenSeatsArr.length - (values.seatArr ? 1 : 0) > 0
      ) {
         clickOnNextPassHandler(id);
      }
   };

   const docTypeselectClasses =
      documentType === 'passport'
         ? 'passengerCard-doc-select-pass'
         : 'passengerCard-doc-select-birth-sertificate';

   const disabledDate = (current) => current && current > dayjs(new Date());

   const fieldChangeHandler = (value) => {
      if (value.passengerType) {
         const doc =
            value.passengerType === 'adults' ? 'passport' : 'birth sertificate';
         form.setFieldValue('documentType', doc);
         setDocumentType(doc);

         setUnchosenSeatsDepSourse(
            unchosenSeatsDep.filter(
               (el) =>
                  el.priceCoefficient ===
                  (value.passengerType === 'adults' ? 1 : 0.5)
            )
         );
         if (unchosenSeatsArr.length > 0 && !departureOnly) {
            setUnchosenSeatsArrSourse(
               unchosenSeatsArr.filter(
                  (el) =>
                     el.priceCoefficient ===
                     (value.passengerType === 'adults' ? 1 : 0.5)
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

      if (Object.entries(value)[0][0] === 'departureOnly') {
         setDepartureOnly(Object.entries(value)[0][1]);

         if (form.getFieldValue('seatArr')) {
            dispatch(
               addPassengerId({
                  seat: Number(form.getFieldValue('seatArr').split(':')[1]),
                  direction: 'arrival',
                  coachId: form.getFieldValue('seatArr').split(':')[0],
                  passengerId: null,
               })
            );
            form.setFieldValue('seatArr', null);
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
   const onFinishFailed = () => {
      setShowError(true);
   };

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
                  <button
                     type="button"
                     onClick={() => {
                        clickOnRemovePassHandler(id);
                     }}
                  >
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
                  // scrollToFirstError
               >
                  <div className={styles.section}>
                     <div className={styles.row}>
                        <Form.Item
                           name="passengerType"
                           value={form.passengerType}
                           rules={[
                              {
                                 required: true,
                                 message: 'Выберите тип пассажира',
                              },
                           ]}
                        >
                           <Select
                              className="passengerCard-select"
                              popupClassName="passengerCard-select"
                           >
                              <Select.Option value="adults">
                                 Взрослый
                              </Select.Option>
                              <Select.Option value="children">
                                 Детский
                              </Select.Option>
                           </Select>
                        </Form.Item>
                     </div>
                     <div className={styles.row}>
                        <Form.Item
                           name="lastName"
                           label="Фамилия"
                           rules={[
                              {
                                 required: true,
                                 message: 'Введите фамилию',
                              },
                           ]}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                        <Form.Item
                           name="firstName"
                           label="Имя"
                           rules={[
                              {
                                 required: true,
                                 message: 'Введите имя',
                              },
                           ]}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                        <Form.Item
                           name="fathersName"
                           label="Отчество"
                           rules={[
                              {
                                 required: true,
                                 message: 'Введите отчество',
                              },
                           ]}
                        >
                           <Input className={styles.inputField} />
                        </Form.Item>
                     </div>
                     <div className={`${styles.row} ${styles.rowShort}`}>
                        <Form.Item
                           label="Пол"
                           name="gender"
                           className={styles.genderRadioBtn}
                           rules={[
                              {
                                 required: true,
                                 message: 'Выберите пол',
                              },
                           ]}
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
                              name="dateOfBirth"
                              rules={[
                                 {
                                    required: true,
                                    message: 'Выберите дату рождения',
                                 },
                              ]}
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
                           name="documentType"
                           className={styles.documentType}
                           rules={[
                              {
                                 required: true,
                                 message: 'Выберите тип проездного документа',
                              },
                           ]}
                        >
                           <Select
                              className={docTypeselectClasses}
                              popupClassName="passengerCard-doc-select"
                              showArrow
                              allowClear={false}
                           >
                              <Select.Option value="passport">
                                 Паспорт
                              </Select.Option>
                              <Select.Option value="birth sertificate">
                                 Свидетельство о рождении
                              </Select.Option>
                           </Select>
                        </Form.Item>
                        {documentType === 'passport' && (
                           <Form.Item
                              label="Серия"
                              name="DocumentSerialNumber"
                              className={styles.documentType}
                              rules={[
                                 {
                                    required: true,
                                    message: 'Введите серию документа',
                                 },
                              ]}
                           >
                              <Input
                                 placeholder="_ _ _ _"
                                 className={styles.inputFieldPassport}
                              />
                           </Form.Item>
                        )}
                        <Form.Item
                           label="Номер"
                           name="DocumentNumber"
                           className={styles.documentType}
                           rules={[
                              {
                                 required: true,
                                 message: 'Введите номер документа',
                              },
                           ]}
                        >
                           <Input
                              placeholder="_ _ _ _ _ _"
                              className={styles.inputFieldPassport}
                           />
                        </Form.Item>
                     </div>
                  </div>
                  {(unchosenSeatsDepSourse.length > 0 ||
                     unchosenSeatsArrSourse.length > 0) && (
                     <div className={styles.section}>
                        <div className={`${styles.row} ${styles.rowSeats}`}>
                           {unchosenSeatsDepSourse.length > 0 && (
                              <Form.Item
                                 label="Место туда"
                                 name="seatDep"
                                 className={styles.documentType}
                                 rules={[
                                    {
                                       required: true,
                                       message: 'Выберите место',
                                    },
                                 ]}
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
                           )}

                           {unchosenSeatsArrSourse.length > 0 &&
                              unchosenSeatsDepSourse.length > 0 && (
                                 <Form.Item
                                    className={`${styles.departureOnly} passengerCard-checkbox-departureOnly`}
                                    valuePropName="checked"
                                    name="departureOnly"
                                    label="Только туда"
                                 >
                                    <Checkbox className="passengerCard-checkbox-departureOnly" />
                                 </Form.Item>
                              )}

                           {unchosenSeatsArrSourse.length > 0 &&
                              !departureOnly && (
                                 <Form.Item
                                    label="Место обратно"
                                    name="seatArr"
                                    className={styles.documentType}
                                    rules={[
                                       {
                                          required: true,
                                          message: 'Выберите место',
                                       },
                                    ]}
                                 >
                                    {unchosenSeatsArrSourse.length > 0 && (
                                       <Select
                                          className="passengerCard-seat-select"
                                          showArrow
                                          allowClear={false}
                                       >
                                          {unchosenSeatsArrSourse.length > 0 &&
                                             unchosenSeatsArrSourse?.map(
                                                (item) => (
                                                   <Select.Option
                                                      key={`${item.coachId}:${item.seat}`}
                                                      value={`${item.coachId}:${item.seat}`}
                                                   >
                                                      {` Вагон: ${item.coachName}, место: ${item.seat}`}
                                                   </Select.Option>
                                                )
                                             )}
                                       </Select>
                                    )}
                                 </Form.Item>
                              )}
                        </div>
                     </div>
                  )}
                  <Form.Item className={bottomSectionStyles}>
                     <Button
                        type="primary"
                        htmlType="submit"
                        className={`${styles.btn} passengerCard__button`}
                        // onClick={() => {
                        //    clickOnNextPassHandler(id);
                        // }}
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

PassengerCardOpen.propTypes = {
   passengerType: PropTypes.string.isRequired,
   pasNumber: PropTypes.number.isRequired,
   clickOnRemovePassHandler: PropTypes.func.isRequired,
   clickOnNextPassHandler: PropTypes.func.isRequired,
   id: PropTypes.string.isRequired,
   // seatsDep: PropTypes.arrayOf(PropTypes.shape(shapedObj)).isRequired,
   // seatsArr: PropTypes.arrayOf(PropTypes.shape(shapedObj)),
   unchosenSeatsDep: PropTypes.arrayOf(PropTypes.shape(shapedObj)).isRequired,
   unchosenSeatsArr: PropTypes.arrayOf(PropTypes.shape(shapedObj)),
};

PassengerCardOpen.defaultProps = {
   // seatsArr: null,
   unchosenSeatsArr: null,
};

export default PassengerCardOpen;
