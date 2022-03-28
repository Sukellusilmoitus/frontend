import React, { useState } from 'react';
import ShowMore from 'react-show-more-button';
import dayjs from 'dayjs';
import LoadingSpinner from '../LoadingSpinner';

function DiveHistory({ diveList }) {
  const [btnText, setBtnText] = useState();

  if (diveList === 'loading...') {
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
        {diveList.length > 0
          ? diveList.map((dive) => (
            <div key={dive.id} data-testid={dive.id}>
              <strong>{dayjs(dive.created_at).format('DD.MM.YYYY')}</strong>
              <br />
              Sukeltaja:
              {' '}
              {dive.diver.name}
              <br />
              Muutokset:
              {' '}
              <i>{dive.change_text || 'ei muutoksia'}</i>
            </div>
          ))
          : <div>Ei rekisteröityjä sukelluksia</div>}
      </ShowMore>
    </section>
  );
}

export default DiveHistory;
