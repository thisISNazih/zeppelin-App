import {
  render,
  waitFor,
} from '@testing-library/react';
import DispatchersDashboard from './DispatchersDashboard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('DispatchersDashboard', () => {
  it('component renders without errors', () => {
    render(
      <Router>
        <DispatchersDashboard />
      </Router>
    );
  });

  it('component fetches data when `useEffect` hook is executed', () => {
    const mockFetch = jest.spyOn(global, 'fetch');
    render(
      <Router>
        <DispatchersDashboard />
      </Router>
    );
    expect(mockFetch).toHaveBeenCalled();
    mockFetch.mockRestore();
  });

  it('component sets data when `fetch` request is successful', async () => {
    const mockData = [
      {
        asset_type: 'Dump Truck',
        customer: 'Kassulke & Sohn',
        serial_number: '1919-0038-4721-0Xpr',
        service_contract: true,
        warranty: true,
      },
      {
        asset_type: 'Grader',
        customer: 'Bayer-Bergnaum',
        serial_number: '3878-4754-6100-SNDQ',
        service_contract: true,
        warranty: true,
      },
    ];

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockData),
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const { getAllByText } = render(
      <Router>
        <DispatchersDashboard />
      </Router>
    );
    await waitFor(() => expect(getAllByText('Kassulke & Sohn')));
    expect(getAllByText('Grader'));
  });
});
