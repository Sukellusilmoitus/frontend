import { useState } from 'react';
import { omit } from 'lodash';
import validator from 'validator';
import parseDMS from 'parse-dms';

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
    coordinateinfo: '',
  });
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [locationCorrect, setLocationCorrect] = useState(true);

  const callback = (event) => {
    event.preventDefault();

    createNotification({
      name: requiredValues.divername,
      phone: values.phone || '',
      email: values.email || '',
      locationName: targetName,
      locationId: targetId,
      locationCorrect,
      xCoordinate: requiredValues.xcoordinate,
      yCoordinate: requiredValues.ycoordinate,
      coordinateText: requiredValues.coordinateinfo,
      changeText: requiredValues.changeText || '',
      miscText: values.misctext || '',
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
        if ((/^$/).test(value) && (!(/^$/).test(values.email))) {
          const newObj = omit(errors, 'phone');
          setErrors(newObj);
          break;
        }
        if (!(/\+?[0-9]{3}-?[0-9]{6,12}/).test(value)) {
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
        if ((/^$/).test(value) && (!(/^$/).test(values.phone))) {
          const newObj = omit(errors, 'email');
          setErrors(newObj);
          break;
        }
        if (
          !validator.isEmail(value)
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
          !(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/).test(value)
        ) {
          setErrors({
            ...errors,
            xcoordinate: 'Syötä muodossa asteet, minuutit, sekunnit, esim 59° 46′ 56.93160″ N tai 59 46 56',
          });
        } else {
          const newObj = omit(errors, 'xcoordinate');
          setErrors(newObj);
        }
        break;
      case 'ycoordinate':
        if (
          !(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/).test(value)
        ) {
          setErrors({
            ...errors,
            ycoordinate: 'Syötä muodossa asteet, minuutit, sekunnit, esim 59° 46′ 56.93160″ N tai 59 46 56',
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
    let val = event.target.value;

    if (name === 'xcoordinate' || name === 'ycoordinate') {
      try {
        const parsed = parseDMS(val);
        if (typeof parsed === 'object') {
          val = parsed[Object.keys(parsed)[0]];
        } else {
          val = parsed;
        }
      } catch (err) {
        val = 'error';
      }
    }

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

  const handleCoordinateChange = (value) => {
    if (value === 'yes') {
      setRequiredValues({
        ...requiredValues,
        xcoordinate: targetXcoordinate,
        ycoordinate: targetYcoordinate,
        coordinateinfo: '',
      });
      const newObj = omit(errors, ['xcoordinate', 'ycoordinate', 'coordinateinfo']);
      setErrors(newObj);
      setLocationCorrect(true);
    }
    if (value === 'no') {
      setRequiredValues({
        ...requiredValues,
        xcoordinate: null,
        ycoordinate: null,
      });
      setLocationCorrect(false);
      setErrors({
        ...errors,
        xcoordinate: 'Syötä muodossa asteet, minuutit, sekunnit, esim 59° 46′ 56.93160″ N tai 59 46 56',
        ycoordinate: 'Syötä muodossa asteet, minuutit, sekunnit, esim 59° 46′ 56.93160″ N tai 59 46 56',
        coordinateinfo: 'Kerro miten paikannus on selvitetty',
      });
    }
  };

  const handleSubmit = (changeRadio) => (event) => {
    if (event) event.preventDefault();

    if (!Object.keys(requiredValues).includes('divername')) {
      setMessage('Ilmoita sukeltajan nimi!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setMessage('Lomakkeesta puuttui tietoja tai siinä on virheitä!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    if (!values.phone && !values.email) {
      setMessage('Ilmoita puhelinnumero tai sähköpostiosoite!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    if ((changeRadio === 'no' && Object.keys(requiredValues).length === 4)
        || (changeRadio === 'yes' && Object.keys(requiredValues).length === 5)) {
      callback(event);
      setMessage('Lomake lähetetty!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
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
    resetChangeText,
    handleCoordinateChange,
  };
};

export default useNotificationForm;
