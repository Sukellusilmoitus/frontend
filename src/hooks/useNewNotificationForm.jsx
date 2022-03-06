import { useState } from 'react';
import { omit } from 'lodash';

const useNotificationForm = (props) => {
  const {
    targetName,
    targetId,
    targetXcoordinate,
    targetYcoordinate,
    createNotification,
  } = props;

  const [requiredValues, setRequiredValues] = useState({
    xcoordinate: targetXcoordinate,
    ycoordinate: targetYcoordinate,
  });
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const callback = (event, coordinateRadio) => {
    event.preventDefault();

    createNotification({
      name: requiredValues.divername,
      phone: values.phone,
      email: values.email,
      locationName: targetName,
      locationId: targetId,
      locationCorrect: coordinateRadio === 'yes',
      xCoordinate: requiredValues.xcoordinate,
      yCoordinate: requiredValues.ycoordinate,
      coordinateText: requiredValues.coordinateinfo,
      changeText: requiredValues.changeText,
      miscText: values.misctext,
    });
  };

  const validate = (event, name, value) => {
    switch (name) {
      case 'divername':

        if (
          !(/(?!.*?\s{2})[ A-Za-zäöåÅÄÖ]{7,20}/).test(value)
        ) {
          setErrors({
            ...errors,
            divername: 'Tulee olla 7-20 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä',
          });
        } else {
          const newObj = omit(errors, 'divername');
          setErrors(newObj);
        }
        break;
      case 'phone':

        if (
          !(/\+?[0-9]{3}-?[0-9]{6,12}/).test(value)
        ) {
          setErrors({
            ...errors,
            phone: 'Virheellinen puhelinnumero',
          });
        } else {
          const newObj = omit(errors, 'phone');
          setErrors(newObj);
        }
        break;
      case 'email':

        if (
          !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Virheellinen sähköposti',
          });
        } else {
          const newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;
      case 'targetdescription':

        if (!(/^[\S\s]{4,1000}$/).test(value)) {
          setErrors({
            ...errors,
            targetdescription: 'Kirjoita kuvaus kohteesta, enintään 1000 merkkiä pitkä',
          });
        } else {
          const newObj = omit(errors, 'targetdescription');
          setErrors(newObj);
        }
        break;
      case 'locationname':

        if (!(/^[\S\s]{4,1000}$/).test(value)) {
          setErrors({
            ...errors,
            locationname: 'Paikan tai alueen nimi puuttuu',
          });
        } else {
          const newObj = omit(errors, 'locationname');
          setErrors(newObj);
        }
        break;
      case 'xcoordinate':

        if (
          !(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/).test(value)
        ) {
          setErrors({
            ...errors,
            xcoordinate: 'Anna koordinaatti muodossa xx.xxxxxxxx, esim. 25.34234323',
          });
        } else {
          const newObj = omit(errors, 'xcoordinate');
          setErrors(newObj);
        }
        break;
      case 'ycoordinate':

        if (
          !(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)/).test(value)
        ) {
          setErrors({
            ...errors,
            ycoordinate: 'Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334',
          });
        } else {
          const newObj = omit(errors, 'ycoordinate');
          setErrors(newObj);
        }
        break;
      case 'coordinateinfo':

        if (!(/^[\S\s]{3,1000}$/).test(value)) {
          setErrors({
            ...errors,
            coordinateinfo: 'Kerro miten paikannus on selvitetty',
          });
        } else {
          const newObj = omit(errors, 'coordinateinfo');
          setErrors(newObj);
        }
        break;
      case 'changeText':

        if (!(/^[\S\s]{4,1000}$/).test(value)) {
          setErrors({
            ...errors,
            changeText: 'Tulee olla enintään 1000 merkkiä pitkä',
          });
        } else {
          const newObj = omit(errors, 'changeText');
          setErrors(newObj);
        }
        break;
      case 'misctext':

        if (!(/^[\S\s]{0,1000}$/).test(value)) {
          setErrors({
            ...errors,
            misctext: 'Tulee olla enintään 1000 merkkiä pitkä',
          });
        } else {
          const newObj = omit(errors, 'misctext');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();

    const { name } = event.target;
    const val = event.target.value;

    validate(event, name, val);

    if (name === 'phone' || name === 'email' || name === 'misctext') {
      setValues({
        ...values,
        [name]: val,
      });
      return;
    }
    setRequiredValues({
      ...requiredValues,
      [name]: val,
    });
  };

  const resetChangeText = () => {
    const newErrors = omit(errors, 'changeText');
    setErrors(newErrors);

    const newRequiredValues = omit(requiredValues, 'changeText');
    setRequiredValues(newRequiredValues);
  };

  const handleSubmit = (coordinateRadio, changeRadio) => (event) => {
    if (event) event.preventDefault();

    if (values.phone === undefined && values.email === undefined) {
      console.log(Object.keys(requiredValues).length);
      setMessage('Ilmoita puhelinnumero tai sähköpostiosoite!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    if ((changeRadio === 'yes' && coordinateRadio === 'yes')
    || (changeRadio === 'no' && coordinateRadio === 'no')) {
      if (Object.keys(errors).length === 0 && Object.keys(requiredValues).length === 4) {
        console.log(Object.keys(requiredValues).length);
        callback(event, coordinateRadio);
        setMessage('Lomake lähetetty!');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        console.log(Object.keys(requiredValues).length);
        console.log(errors);
        setMessage('Lomakkeesta puuttui tietoja tai siinä on virheitä!');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      return;
    }

    if (changeRadio === 'yes' && coordinateRadio === 'no') {
      if (Object.keys(errors).length === 0 && Object.keys(requiredValues).length === 5) {
        console.log(Object.keys(requiredValues).length);
        callback(event, coordinateRadio);
        setMessage('Lomake lähetetty!');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        console.log(Object.keys(requiredValues).length);
        console.log(errors);
        setMessage('Lomakkeesta puuttui tietoja tai siinä on virheitä!');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      return;
    }

    if (Object.keys(errors).length === 0 && Object.keys(requiredValues).length === 3) {
      console.log(Object.keys(requiredValues).length);
      callback(event, coordinateRadio);
      setMessage('Lomake lähetetty!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      console.log(Object.keys(requiredValues).length);
      console.log(errors);
      setMessage('Lomakkeesta puuttui tietoja tai siinä on virheitä!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return {
    errors,
    message,
    handleChange,
    handleSubmit,
    resetChangeText
  };
};

export default useNotificationForm;
