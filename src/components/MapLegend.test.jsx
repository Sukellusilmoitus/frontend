import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MapLegend from './MapLegend'

describe('map legend tests', () => {
  it('position default to topright', () => {
    const { container } = render(<MapLegend />)
    expect(container.firstChild).toHaveClass('leaflet-top leaflet-right')
  })

  it('position sets correctly when given as a parameter', () => {
    const { container } = render(<MapLegend position='bottomleft' />)
    expect(container.firstChild).toHaveClass('leaflet-bottom leaflet-left')
  })
})