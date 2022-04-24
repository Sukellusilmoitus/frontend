import { useState, useEffect } from 'react';
import { omit } from 'lodash';
import validator from 'validator';
import { loggedUser } from '../services/users';

const useNotificationForm = ({ props, date }) => {
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
  const [newMapX, setNewMapX] = useState(targetXcoordinate);
  const [newMapY, setNewMapY] = useState(targetYcoordinate);
  const [center, setCenter] = useState([newMapY, newMapX]);
  const user = loggedUser();

  useEffect(() => {
    setCenter([newMapY, newMapX]);
  }, [newMapY, newMapX]);

  useEffect(() => {
    if (user !== null) {
      setRequiredValues({
        ...requiredValues,
        divername: user.name,
      });
      setValues({
        ...values,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [newMapX]);

  const callback = (event) => {
    event.preventDefault();

    createNotification({
      name: requiredValues.divername,
      phone: values.phone || '',
      email: values.email || '',
      locationName: targetName,
      locationId: targetId,
      diveDate: new Intl.DateTimeFormat('fi-FI').format(date),
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
            xcoordinate: 'Anna koordinaatti muodossa xx.xxxxxxxx, esim. 25.34234323',
          });
        } else {
          const newObj = omit(errors, 'xcoordinate');
          setErrors(newObj);
          setNewMapX(value);
          setCenter([newMapY, newMapX]);
        }
        break;
      case 'ycoordinate':

        if (
          !(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/).test(value)
        ) {
          setErrors({
            ...errors,
            ycoordinate: 'Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334',
          });
        } else {
          const newObj = omit(errors, 'ycoordinate');
          setErrors(newObj);
          setNewMapY(value);
          setCenter([newMapY, newMapX]);
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

  const handleCoordinatesClick = (xcoordinate, ycoordinate) => {
    validate(null, 'xcoordinate', xcoordinate);
    validate(null, 'ycoordinate', ycoordinate);
    setRequiredValues({
      ...requiredValues,
      xcoordinate,
      ycoordinate,
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
        xcoordinate: targetXcoordinate,
        ycoordinate: targetYcoordinate,
      });
      setLocationCorrect(false);
      setErrors({
        ...errors,
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
    center,
    handleCoordinatesClick,
  };
};

export default useNotificationForm;
