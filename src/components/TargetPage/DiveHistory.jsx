import React from 'react';

function DiveHistory({ diveList }) {
  return (
    <div>
      {diveList.map((dive) => (
        <section key={dive.id}>
          <strong>{dive.created_at}</strong>
          <br />
          Sukeltaja:
          {' '}
          {dive.diver.name}
          <br />
          Muutokset:
          {' '}
          <i>{dive.change_text || 'ei muutoksia'}</i>
        </section>
      ))}
    </div>
  );
}

export default DiveHistory;
