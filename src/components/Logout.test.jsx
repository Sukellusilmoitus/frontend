import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logout from './Logout';
import { wait } from '@testing-library/user-event/dist/utils';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

describe('Logout page', () => {
  let history, mockHistory;
  function setupLogout() {
    history = createMemoryHistory();
    mockHistory = jest.spyOn(history, 'push');
    render(
      <Router history={history}>
        <Logout />
      </Router>
    );
  };

  it('removes auth and redirects to /', () => {
    localStorage.setItem('auth', 'testdata');
    setupLogout();
    expect(localStorage.getItem('auth')).toBeNull;
    expect(mockHistory).toHaveBeenCalledWith('/');
  });

  it('redirects to / even without auth token', () => {
    expect(localStorage.getItem('auth')).toBeNull;
    setupLogout();
    expect(mockHistory).toHaveBeenCalledWith('/');
  });
});