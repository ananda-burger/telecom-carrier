import { pagesRange, default as Pagination } from '@/components/Pagination'
import { render, screen } from '@/testUtils/config'

describe('Pagination', () => {
  describe('.pagesRange', () => {
    it('returns array of page numbers within max number of pages', () => {
      expect(pagesRange({ page: 0, nPages: 0 })).toEqual([])
      expect(pagesRange({ page: 1, nPages: 1 })).toEqual([1])
      expect(pagesRange({ page: 1, nPages: 6 })).toEqual([1, 2, 3, 4, 5, 6])
      expect(pagesRange({ page: 2, nPages: 6 })).toEqual([1, 2, 3, 4, 5, 6])
      expect(pagesRange({ page: 3, nPages: 6 })).toEqual([1, 2, 3, 4, 5, 6])
      expect(pagesRange({ page: 4, nPages: 6 })).toEqual([1, 2, 3, 4, 5, 6])
      expect(pagesRange({ page: 5, nPages: 6 })).toEqual([2, 3, 4, 5, 6])
      expect(pagesRange({ page: 6, nPages: 6 })).toEqual([3, 4, 5, 6])
      expect(pagesRange({ page: 7, nPages: 6 })).toEqual([3, 4, 5, 6])
      expect(pagesRange({ page: 8, nPages: 6 })).toEqual([3, 4, 5, 6])
      expect(pagesRange({ page: 8, nPages: 7 })).toEqual([4, 5, 6, 7])
      expect(pagesRange({ page: 9, nPages: 7 })).toEqual([4, 5, 6, 7])
      expect(pagesRange({ page: 7, nPages: 14 })).toEqual([4, 5, 6, 7, 8, 9, 10])
    })
  })

  it('renders previous link, page links and next link', () => {
    const store = {
      preloadedState: {
        phones: {
          totalCount: 34
        }
      }
    }

    const router = {
      query: { page: 2 }
    }

    render(<Pagination />, { store, router })

    expect(screen.queryByTestId('previous')).toBeVisible()
    expect(screen.queryByTestId('next')).toBeVisible()
    expect(screen.queryAllByTestId('page')).toHaveLength(3)
  })
})
