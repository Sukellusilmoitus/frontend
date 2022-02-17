import { useState } from 'react';
import { omit } from 'lodash';
import targets from '../services/targets';
import REACT_APP_SERVER_URL from '../util/config';

const useForm = (createNotification) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const callback = (event) => {
    event.preventDefault();
    // Try to generate target id until free one is found
    let targetID = null;
    while (targetID === null) {
      targetID = targets.generateUniqueID();
    }
    createNotification({
      id: targetID,
      name: values.divername,
      town: values.locationname || '',
      type: values.targetdescription,
      x_coordinate: values.xcoordinate,
      y_coordinate: values.ycoordinate,
      location_method: values.coordinateinfo || '',
      location_accuracy: values.diverinfo || '',
      is_ancient: false,
      created_at: Date.now() / 1000.0,
      url: REACT_APP_SERVER_URL === 'http://localhost:5000' ? 'http://localhost.com' : REACT_APP_SERVER_URL,
      source: 'ilmoitus',
      phone: values.phone,
      email: values.email,
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
      case 'diverinfo':

        if (!(/^[\S\s]{4,1000}$/).test(value)) {
          setErrors({
            ...errors,
            diverinfo: 'Kirjoita pyydetyt tiedot',
          });
        } else {
          const newObj = omit(errors, 'diverinfo');
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

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (values.phone === undefined && values.email === undefined) {
      // eslint-disable-next-line no-alert
      alert('Ilmoita puhellinumero tai sähköpostiosoite!');
      return;
    }

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback(event);
    } else {
      // eslint-disable-next-line no-alert
      alert('Lomakkeessa on virheitä tai sen tiedot ovat puutteellisia!');
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
