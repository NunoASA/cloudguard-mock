# CloudGuard Mock - SOC Dashboard

A responsive Security Operations Center (SOC) dashboard built with Next.js and React Query. This application simulates a real-world cybersecurity monitoring interface used by security analysts to track incidents, monitor system health, and manage security operations.

## Features

- **Real-time Dashboard**: Security metrics, incident tracking, and system monitoring
- **Responsive Design**: Desktop sidebar navigation, mobile bottom navigation
- **Incident Management**: Comprehensive incident cards with severity indicators
- **Modern Architecture**: React Query for data fetching, TypeScript, Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with modern hooks
- **TypeScript** - Type safety
- **@tanstack/react-query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **Jest & Testing Library** - Testing framework
- **ESLint** - Code linting

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code linting |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── dashboard/         # Dashboard widgets
│   ├── incidents/         # Incident management
│   ├── layout/           # Header, Sidebar components
│   └── ui/               # Reusable UI components
├── hooks/                # React Query hooks
├── lib/                  # Utilities and mock data
└── types/                # TypeScript definitions
```

## Development

The application uses mock data to simulate a real SOC environment with:
- Security metrics and trends
- Incident management with severity levels
- Asset monitoring and response times
- User authentication simulation