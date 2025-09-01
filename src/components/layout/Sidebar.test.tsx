import { render, screen, fireEvent } from '@testing-library/react';

import Sidebar from './Sidebar';

const mockProps = {
  activeView: 'dashboard',
  onViewChange: jest.fn(),
}

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Desktop Sidebar', () => {
    it('renders all navigation items', () => {
      render(<Sidebar {...mockProps} />)
      
      expect(screen.getAllByText('Dashboard')).toHaveLength(2)
      expect(screen.getAllByText('Incidents')).toHaveLength(2)
      expect(screen.getAllByText('Threat Intel')).toHaveLength(2)
      expect(screen.getAllByText('Analytics')).toHaveLength(2)
      expect(screen.getAllByText('Asset Monitor')).toHaveLength(2)
      expect(screen.getAllByText('Activity Log')).toHaveLength(2)
      expect(screen.getByText('Team')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('highlights the active view', () => {
      render(<Sidebar {...mockProps} activeView="incidents" />)
      
      const incidentsButtons = screen.getAllByRole('button', { name: /incidents/i })
      expect(incidentsButtons[0]).toHaveClass('bg-cyan-500/20', 'text-cyan-400')
    })

    it('calls onViewChange when navigation item is clicked', () => {
      render(<Sidebar {...mockProps} />)
      
      const incidentsButtons = screen.getAllByRole('button', { name: /incidents/i })
      fireEvent.click(incidentsButtons[0])
      
      expect(mockProps.onViewChange).toHaveBeenCalledWith('incidents')
    })

    it('displays system status as online', () => {
      render(<Sidebar {...mockProps} />)
      
      expect(screen.getByText('System Status')).toBeInTheDocument()
      expect(screen.getByText('Online')).toBeInTheDocument()
    })

    it('shows online indicator with proper styling', () => {
      render(<Sidebar {...mockProps} />)
      
      const onlineIndicator = screen.getByText('Online')
      expect(onlineIndicator).toHaveClass('text-green-400')
    })
  })

  describe('Mobile Bottom Navigation', () => {
    it('renders first 6 navigation items for mobile', () => {
      render(<Sidebar {...mockProps} />)
      
      const mobileNavButtons = screen.getAllByRole('button')
      const mobileSpecificButtons = mobileNavButtons.filter(button => 
        button.className.includes('lg:hidden') || 
        button.closest('nav')?.className.includes('lg:hidden')
      )
      
      expect(mobileSpecificButtons.length).toBeGreaterThan(0)
    })

    it('highlights active view in mobile navigation', () => {
      render(<Sidebar {...mockProps} activeView="analytics" />)
      
      const analyticsButtons = screen.getAllByRole('button', { name: /analytics/i })
      expect(analyticsButtons.length).toBeGreaterThan(0)
      
      const hasActiveButton = analyticsButtons.some(button => 
        button.className.includes('text-cyan-400')
      )
      expect(hasActiveButton).toBe(true)
    })

    it('has proper mobile navigation styling', () => {
      render(<Sidebar {...mockProps} />)
      
      const mobileNav = document.querySelector('nav.lg\\:hidden')
      expect(mobileNav).toHaveClass('fixed', 'bottom-0', 'bg-gray-900/98')
    })
  })

  describe('Navigation Icons', () => {
    it('renders appropriate icons for each navigation item', () => {
      render(<Sidebar {...mockProps} />)
      const svgElements = document.querySelectorAll('svg')
      expect(svgElements.length).toBeGreaterThan(8)
    })
  })

  describe('View State Management', () => {
    const viewItems = [
      'dashboard', 'incidents', 'threats', 'analytics', 
      'assets', 'activity', 'team', 'settings'
    ]

    viewItems.forEach(view => {
      it(`correctly handles ${view} as active view`, () => {
        render(<Sidebar {...mockProps} activeView={view} />)
        
        const viewName = view === 'threats' ? 'threat intel' : 
                        view === 'assets' ? 'asset monitor' : 
                        view === 'activity' ? 'activity log' : view
        
        const viewButtons = screen.getAllByRole('button', { 
          name: new RegExp(viewName.replace(/([A-Z])/g, ' $1').trim(), 'i') 
        })
        expect(viewButtons.length).toBeGreaterThan(0)
        expect(viewButtons[0]).toHaveClass('text-cyan-400')
      })
    })
  })

  describe('Interactive Behavior', () => {
    it('handles rapid clicks without issues', () => {
      render(<Sidebar {...mockProps} />)
      
      const incidentsButton = screen.getAllByRole('button', { name: /incidents/i })[0]
      
      fireEvent.click(incidentsButton)
      fireEvent.click(incidentsButton)
      fireEvent.click(incidentsButton)
      
      expect(mockProps.onViewChange).toHaveBeenCalledTimes(3)
      expect(mockProps.onViewChange).toHaveBeenCalledWith('incidents')
    })

    it('maintains state consistency across different views', () => {
      const { rerender } = render(<Sidebar {...mockProps} />)
      
      rerender(<Sidebar {...mockProps} activeView="threats" />)
      const threatsButton = screen.getAllByRole('button', { name: /threat intel/i })[0]
      expect(threatsButton).toHaveClass('text-cyan-400')
      
      rerender(<Sidebar {...mockProps} activeView="team" />)
      const teamButton = screen.getAllByRole('button', { name: /team/i })[0]
      expect(teamButton).toHaveClass('text-cyan-400')
    })
  })
})