# Student Frontend - College Placement Portal

This directory contains the student-facing frontend components for the College Placement Portal.

## Components

### Core Components

- **Student.jsx** - Main student component that handles routing and navigation
- **StudentLayout.jsx** - Layout component with sidebar navigation and header
- **StudentDashboard.jsx** - Dashboard with overview cards, recent applications, and quick actions
- **StudentProfile.jsx** - Profile management with editable fields, skills, projects, and achievements
- **JobListings.jsx** - Job browsing with search, filters, and application functionality
- **Applications.jsx** - Application tracking with status updates and interview management

### Features

#### Dashboard
- Statistics overview (applied jobs, interviews, offers, profile views)
- Recent applications with status indicators
- Upcoming events and interviews
- Quick action buttons for common tasks

#### Profile Management
- Personal information editing
- Skills management (add/remove)
- Project portfolio
- Achievements tracking
- Resume upload functionality

#### Job Listings
- Search and filter jobs by location, salary, company
- Detailed job descriptions with requirements
- Application tracking
- Skills matching display

#### Applications Tracking
- Status-based filtering (Applied, Interview, Offer, Rejected)
- Application timeline and notes
- Interview scheduling details
- Offer management (accept/decline)

#### Navigation
- Responsive sidebar navigation
- Mobile-friendly design
- Notification badges
- User profile dropdown

## Design System

- **Framework**: React with Tailwind CSS
- **Colors**: Blue primary theme with gray accents
- **Components**: Consistent card-based layout
- **Icons**: Emoji-based icons for simplicity
- **Responsive**: Mobile-first design approach

## Usage

The student frontend is integrated into the main App.jsx component. Users can access it by selecting "Student" from the role selection screen.

## Future Enhancements

- Interview scheduling system
- Notification management
- Learning resources section
- Settings and preferences
- Real-time updates
- File upload functionality
- Advanced search filters
