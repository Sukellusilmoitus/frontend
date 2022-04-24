import { useState, useEffect } from 'react';
import { omit } from 'lodash';
import targets from '../services/targets';
import { loggedUser } from '../services/users';

const useForm = (postTarget) => {
  const [requiredValues, setRequiredValues] = useState({});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [newMapX, setNewMapX] = useState(25.0);
  const [newMapY, setNewMapY] = useState(60.1);
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

  const callback = async (event) => {
    event.preventDefault();
    // Try to generate target id until free one is found
    const targetID = await targets.generateUniqueID();
    const baseUrl = 'https://sukellusilmo-front-staging.herokuapp.com';
    const targetUrl = `${baseUrl}/hylyt/${targetID}`;

    postTarget({
      id: targetID,
      targetname: requiredValues.targetname,
      divername: requiredValues.divername,
      town: requiredValues.locationname || '',
      type: requiredValues.targetdescription,
      x_coordinate: requiredValues.xcoordinate,
      y_coordinate: requiredValues.ycoordinate,
      location_method: requiredValues.coordinateinfo || '',
      location_accuracy: requiredValues.diverinfo || '',
      is_ancient: false,
      is_pending: true,
      created_at: Date.now() / 1000.0,
      url: targetUrl,
      source: 'ilmoitus',
      phone: values.phone || '',
      email: values.email || '',
      miscText: values.misctext || '',
    });
  };

  const validate = (event, name, value) => {
    switch (name) {
      case 'targetname':

        if (
          !(/(?!.*?\s{2})[ A-Za-zäöåÅÄÖ]{4,30}/).test(value)
        ) {
          setErrors({
            ...errors,
            divername: 'Tulee olla 4-30 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä',
          });
        } else {
          const newObj = omit(errors, 'divername');
          setErrors(newObj);
        }
        break;
      case 'divername':

        if (
          !(/(?!.*?\s{2})[ A-Za-zäöåÅÄÖ]{4,30}/).test(value)
        ) {
          setErrors({
            ...errors,
            divername: 'Tulee olla 4-30 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä',
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
        if ((/^$/).test(value) && (!(/^$/).test(values.phone))) {
          const newObj = omit(errors, 'email');
          setErrors(newObj);
          break;
        }
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
      case 'diverinfo':

        if (!(/^[\S\s]{4,1000}$/).test(value)) {
          setErrors({
            ...errors,
            diverinfo: 'Tulee olla enintään 1000 merkkiä pitkä',
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

  const handleCoordinatesClick = (latlng) => {
    validate(null, 'xcoordinate', latlng.lng);
    validate(null, 'ycoordinate', latlng.lat);
    setRequiredValues({
      ...requiredValues,
      xcoordinate: latlng.lng,
      ycoordinate: latlng.lat,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if ((values.phone === undefined && values.email === undefined)
    || (values.phone === '' && values.email === undefined)
    || (values.phone === undefined && values.email === '')
    || (values.phone === '' && values.email === '')) {
      setMessage('Ilmoita puhelinnumero tai sähköpostiosoite!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    const newObj = omit(errors, 'email');
    setErrors(newObj);
    const neObj = omit(errors, 'phone');
    setErrors(neObj);

    if (Object.keys(errors).length === 0 && Object.keys(requiredValues).length === 8) {
      callback(event);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
    center,
    handleCoordinatesClick,
  };
};

export default useForm;
