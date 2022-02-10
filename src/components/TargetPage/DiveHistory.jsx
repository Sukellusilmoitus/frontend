import React from 'react';

function DiveHistory({ diveList }) {
  return (
    <div>
      {diveList.map((dive) => (
        dive.created_at
      ))}
    </div>
  );
}

export default DiveHistory;
