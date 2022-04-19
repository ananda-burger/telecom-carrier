import HomePage from '@/components/HomePage'
import { render, screen } from '@/testUtils/config'

describe('HomePage', () => {
  it('renders a list of DID numbers', () => {
    const store = {
      preloadedState: {
        phones: {
          list: [
            {
              value: '51 5112 129121',
              monthyPrice: '10',
              setupPrice: '1',
              currency: 'U$',
              id: 1
            },
            {
              value: '51 5112 129121',
              monthyPrice: '10',
              setupPrice: '1',
              currency: 'U$',
              id: 2
            }
          ],
          totalCount: 2,
          isLoading: false,
          isPolling: false,
          currentPhone: {}
        }
      }
    }

    render(<HomePage />, { store })

    expect(screen.queryAllByTestId('phone')).toHaveLength(2)
  })
})
