import React from 'react';

function DiveHistory({ diveList }) {
  return (
    <section>
      {diveList.map((dive) => (
        <div key={dive.id} data-testid={dive.id}>
          <strong>{dive.created_at}</strong>
          <br />
          Sukeltaja:
          {' '}
          {dive.diver.name}
          <br />
          Muutokset:
          {' '}
          <i>{dive.change_text || 'ei muutoksia'}</i>
        </div>
      ))}
    </section>
  );
}

export default DiveHistory;
