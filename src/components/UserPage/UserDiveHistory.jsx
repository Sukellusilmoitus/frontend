/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShowMore from 'react-show-more-button';
import dayjs from 'dayjs';
import LoadingSpinner from '../LoadingSpinner';

function UserDiveHistory({ dives }) {
  const [btnText, setBtnText] = useState();

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  if (dives === 'loading...') {
    return (
      <section data-testid="dive-history-list">
        <h3>Sukellushistoria</h3>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section data-testid="dive-history-list">
      <h3>Sukellushistoria</h3>
      <ShowMore
        maxHeight={700}
        button={<button className="btn btn-primary btn-sm" type="button">{btnText ? 'Näytä vähemmän' : 'Näytä kaikki'}</button>}
        onChange={() => setBtnText(!btnText)}
      >
        {dives.length > 0
          ? dives.map((dive) => (
            <div key={dive.id} data-testid={dive.id}>
              <strong>{dayjs(dive.created_at).format('DD.MM.YYYY')}</strong>
              <br />
              Kohde:
              {' '}
              <button type="button" className="btn btn-link p-0" onClick={() => handleClick(dive.target.properties.id)}>{dive.target.properties.name}</button>
              <br />
              Hylyn muutokset:
              {' '}
              <i>{dive.change_text || 'ei muutoksia'}</i>
              <br />
              Muuta:
              {' '}
              <i>{dive.miscellanious || 'ei lisäinfoa'}</i>
              <br />
              Uudet koordinaatit:
              {' '}
              <i>{!dive.location_correct || 'Ei muutoksia koordinaatteihin'}</i>
              <i>
                {(!dive.location_correct && dive.new_x_coordinate) || ''} {(!dive.location_correct && dive.new_y_coordinate) || ''}
              </i>
              <br />
              <i>{(!dive.location_correct && dive.new_location_explanation) || ''}</i>
              <br />
            </div>
          ))
          : <div>Ei rekisteröityjä sukelluksia</div>}
      </ShowMore>
    </section>
  );
}

export default UserDiveHistory;
