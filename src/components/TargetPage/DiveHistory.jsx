import React from 'react';
import dayjs from 'dayjs';

function DiveHistory({ diveList }) {
  return (
    <section data-testid="dive-history-list">
      <h3>Sukellushistoria</h3>
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
    </section>
  );
}

export default DiveHistory;
