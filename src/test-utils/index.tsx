import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const testQueryClient = createTestQueryClient()

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock data for tests
export const mockUser = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'SOC Analyst',
  created_at: '2023-01-01T00:00:00Z',
}

export const mockMetrics = {
  cgScore: 85,
  cgTrend: 'up' as const,
  incidentsBySevertiy: { low: 10, medium: 5, high: 2 },
  automationRate: 78,
  monitoredAssets: 1500,
  mttr: 42,
  mttrTrend: -8,
  totalInvestigated: 180,
  totalEscalated: 25,
  truePositives: 155,
}

export const mockIncident = {
  id: 'test-incident-1',
  title: 'Test Security Incident',
  severity: 'high' as const,
  status: 'investigating' as const,
  created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
  assigned_to: 'Test Analyst',
  description: 'This is a test security incident for testing purposes.',
  source_ip: '192.168.1.100',
  affected_assets: ['TEST-WS-001', 'TEST-SRV-001'],
  response_time: 15,
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }