import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { User } from '@/types/types';

const mockUser: User = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'SOC Analyst',
  created_at: '2023-01-01T00:00:00Z',
}

const defaultProps = {
  user: mockUser,
  onRaiseTicket: jest.fn(),
  onToggleTimeRange: jest.fn(),
  timeRange: 'Last 24 hours',
}

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the default values on desktop', () => {
    render(<Header {...defaultProps} />)
    expect(screen.getByText('SOC Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
    expect(screen.getByText('Raise Ticket')).toBeInTheDocument()
    const shieldIcon = document.querySelector('svg')
    expect(shieldIcon).toBeInTheDocument()
  })

  it('calls onToggleTimeRange when time range button is clicked', () => {
    render(<Header {...defaultProps} />)
    const timeRangeButton = screen.getByText('Last 24 hours')
    fireEvent.click(timeRangeButton)
    expect(defaultProps.onToggleTimeRange).toHaveBeenCalledTimes(1)
  })

  it('calls onRaiseTicket when raise ticket button is clicked', () => {
    render(<Header {...defaultProps} />)
    const raiseTicketButton = screen.getByRole('button', { name: /raise ticket|\+/i })
    fireEvent.click(raiseTicketButton)
    expect(defaultProps.onRaiseTicket).toHaveBeenCalledTimes(1)
  })

  it('displays user information', () => {
    render(<Header {...defaultProps} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('SOC Analyst')).toBeInTheDocument()
  })

  describe('Responsive Design', () => {
    beforeAll(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 640, // Mobile width
      })
    });

    it('hides SOC Dashboard title on mobile screens', () => {
      render(<Header {...defaultProps} />)
      const title = screen.getByText('SOC Dashboard')
      expect(title).toHaveClass('hidden', 'md:block')
    })

    it('shows plus icon on mobile for raise ticket button', () => {
      render(<Header {...defaultProps} />)
      const plusIcon = document.querySelector('.lg\\:hidden')
      expect(plusIcon).toBeInTheDocument()
    })

    it('hides user details on mobile screens', () => {
      render(<Header {...defaultProps} />)
      const userDetails = screen.getByText('Test User').parentElement
      expect(userDetails).toHaveClass('hidden', 'md:block')
    })
  })

  describe('Different Time Ranges', () => {
    it('displays different time range options', () => {
      const { rerender } = render(<Header {...defaultProps} />)
      
      expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
      
      rerender(<Header {...defaultProps} timeRange="Last 7 days" />)
      expect(screen.getByText('Last 7 days')).toBeInTheDocument()
      
      rerender(<Header {...defaultProps} timeRange="Last 30 days" />)
      expect(screen.getByText('Last 30 days')).toBeInTheDocument()
    })
  })
})