/* eslint-disable react/no-array-index-key, react/jsx-one-expression-per-line */
import { React, useState } from 'react';
import {
  Container, Table,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ShowMore from 'react-show-more-button';
import LoadingSpinner from '../LoadingSpinner';

function UserTargetnotes({ targetnotes }) {
  const [btnText, setBtnText] = useState();

  if (targetnotes === 'loading...') {
    return (
      <section data-testid="user-target-notes">
        <LoadingSpinner />
      </section>
    );
  }

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  return (
    <Container data-testid="targetnote-list" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <ShowMore
        maxHeight={700}
        button={<button className="btn btn-primary btn-sm" type="button">{btnText ? 'Näytä vähemmän' : 'Näytä kaikki'}</button>}
        onChange={() => setBtnText(!btnText)}
      >
        {(targetnotes.length > 0) ? (
          <Table bordered size="sm">
            <tbody>
              <tr>
                <td />
                <td><strong>Ilmoitus</strong></td>
                <td><strong>Tila</strong></td>
              </tr>
              {(targetnotes.length > 0)
              && targetnotes.map((note, idx) => (
                <tr key={`row-${idx}`}>
                  <td>
                    Nimi:
                    <br />
                    Ilmoitettu:
                    <br />
                    Alue:
                    <br />
                    Koordinaatit:
                    <br />
                    Tarkkuus:
                    <br />
                    Mittaustapa:
                    <br />
                    Tyyppi:
                    <br />
                    Muuta:
                  </td>
                  <td>
                    {note.target.properties.name}
                    <br />
                    {note.target.properties.created_at}
                    <br />
                    {note.target.properties.town}
                    <br />
                    {note.target.geometry.coordinates[0]}, {note.target.geometry.coordinates[1]}
                    <br />
                    {note.target.properties.location_accuracy}
                    <br />
                    {note.target.properties.location_method}
                    <br />
                    {note.target.properties.type}
                    <br />
                    {note.miscellaneous}
                  </td>
                  <td>
                    {note.target.properties.is_pending
                      || (
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => handleClick(note.target.properties.id)}
                        >
                          Hyväksytty
                        </button>
                      )}
                    {!note.target.properties.is_pending || 'Odottaa'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
          : <div>Ei ilmoitettuja hylkyjä</div>}
      </ShowMore>
    </Container>
  );
}

export default UserTargetnotes;
