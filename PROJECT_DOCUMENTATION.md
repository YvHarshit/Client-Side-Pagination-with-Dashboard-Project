# Employee Dashboard Project - Complete Documentation

## 1. Project Overview

This is a **full-stack Employee Management and Dashboard System** built with React, TypeScript, Node.js, and MongoDB. The application provides role-based access for **Admins** (manage employees, view analytics, approve leaves) and **Employees** (view profile, apply leaves, track attendance).

### Key Purposes:

- Manage employee records and profiles
- Track attendance and generate reports
- Handle leave requests and approvals
- Provide company-wide analytics and insights
- Enable employees to manage their own information

---

## 2. Tech Stack

### Frontend

- **React** (v19.2.6) - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** (v7.18.0) - Routing
- **React Hook Form** (v7.78.0) - Form state management
- **Zod** (v4.4.3) - Schema validation
- **Tailwind CSS** (v4.3.0) - Styling
- **Material-UI** (v9.0.1) - UI components & icons
- **Axios** (v1.18.1) - HTTP client
- **Recharts** (v3.9.2) - Data visualization
- **React Toastify** (v11.1.0) - Toast notifications
- **Firebase** (v12.15.0) - Authentication & real-time database
- **SweetAlert2** (v11.26.25) - Alert modals

### Backend

- **Node.js** with **Express** (v5.2.1) - Server framework
- **TypeScript** - Type safety
- **MongoDB** with **Mongoose** (v9.6.3) - Database & ODM
- **Firebase Admin SDK** (v14.1.0) - Firebase server operations
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **CORS** - Cross-origin requests
- **Cookie Parser** - Cookie management

---

## 3. Architecture

### Project Structure

```
Client-Side-Pagination-with-Dashboard-Project/
├── backend/
│   ├── config/
│   │   ├── firebaseAdmin.ts        # Firebase Admin Configuration
│   │   └── auth-project-2209-firebase-adminsdk-fbsvc-d69ea442c8.json
│   ├── controllers/
│   │   ├── user.controller.ts      # User CRUD operations
│   │   ├── auth.controller.ts      # Authentication logic
│   │   ├── leave.controller.ts     # Leave management
│   │   └── attendance.controller.ts # Attendance tracking
│   ├── models/
│   │   ├── user.model.ts           # User schema
│   │   ├── auth.model.ts           # Authentication schema
│   │   ├── leave.model.ts          # Leave requests schema
│   │   ├── attendace.model.ts      # Attendance records schema
│   │   ├── counter.model.ts        # ID counter for auto-incrementing
│   │   └── auth.counter.ts
│   ├── routes/
│   │   ├── user.routes.ts          # User endpoints
│   │   └── auth.routes.ts          # Auth endpoints
│   ├── middleware/
│   │   ├── checkAuth.ts            # Auth verification
│   │   ├── userAuth.ts             # Employee auth verification
│   │   ├── loggers.ts              # Logging middleware
│   │   └── zodValidation.ts        # Request validation
│   ├── utils/
│   │   ├── authUserIdAllocator.ts  # Allocate user IDs
│   │   ├── idAllocator.ts          # Auto-increment IDs
│   │   ├── nodemailer.ts           # Email configuration
│   │   └── enums.ts                # Enumeration definitions
│   ├── validators/
│   │   └── zodSchema.ts            # Zod validation schemas
│   ├── seed/
│   │   ├── sampleData.json         # Sample employee data
│   │   └── seedUsers.ts            # Database seeding script
│   ├── types/
│   │   ├── express.d.ts            # Express type extensions
│   │   └── typeDefine.ts           # Type definitions
│   ├── server.ts                   # Main server file
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx                 # Main app component & routing
    │   ├── main.tsx                # Entry point
    │   ├── firebase.ts             # Firebase configuration
    │   ├── index.css               # Global styles
    │   ├── components/
    │   │   ├── forms/
    │   │   │   └── ZodUserForm.tsx # Employee form with Zod validation
    │   │   └── users/
    │   │       ├── UserCard.tsx    # Employee card display
    │   │       ├── Pagination.tsx  # Pagination controls
    │   │       ├── SearchBar.tsx   # Search functionality
    │   │       └── FilterBar.tsx   # Filter by department
    │   ├── context/
    │   │   └── AppContext.tsx      # Global state management
    │   ├── pages/
    │   │   ├── Dashboard.tsx       # Admin dashboard
    │   │   ├── AdminDasboardChart.tsx # Admin analytics charts
    │   │   ├── AdminLeave.tsx      # Admin leave approval
    │   │   ├── EmpDashboard.tsx    # Employee profile page
    │   │   ├── EmpLogin.tsx        # Employee login
    │   │   ├── EmpPasswodChange.tsx # Password change on first login
    │   │   ├── EmpAttendance.tsx   # Employee attendance status
    │   │   ├── AttendanceCalendar.tsx # Attendance calendar view
    │   │   ├── Login.tsx           # Admin login
    │   │   ├── AuthenticateEmail.tsx # Email OTP verification
    │   │   ├── ApplyLeave.tsx      # Apply leave form
    │   │   ├── MyLeaves.tsx        # Employee's leave history
    │   │   ├── CompanyAnalytics.tsx # Company-wide analytics
    │   │   ├── MainEmpDas.tsx      # Employee dashboard main
    │   │   └── ProfileField.tsx    # Profile field component
    │   ├── services/
    │   │   ├── userService.ts      # User API calls
    │   │   ├── authUserService.ts  # Auth API calls
    │   │   ├── empService.ts       # Employee API calls
    │   │   ├── leaveServices.ts    # Leave API calls
    │   │   ├── attendanceServices.ts # Attendance API calls
    │   │   └── analyticsService.ts # Analytics API calls
    │   ├── types/
    │   │   ├── user.types.ts       # TypeScript interfaces
    │   │   └── vite-env.d.ts       # Vite environment types
    │   ├── utils/
    │   │   ├── constants.ts        # App constants
    │   │   ├── filterByDomain.ts   # Filter by email domain
    │   │   ├── filterEmp.ts        # Filter and analyze employees
    │   │   ├── sortUsers.ts        # Sort employees
    │   │   └── zodValidation.ts    # Zod schemas for validation
    │   └── assests/                # Images and assets
    ├── public/                     # Static files
    ├── index.html                  # HTML template
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── README.md
```

---

## 4. Core Features

### 4.1 Authentication & Access Control

#### Admin Login (`/login`)

- **Email & Password Authentication**: Admins can log in with credentials
- **Google OAuth Integration**: Sign in with Google account
- **Sign-Up**: New admin can create accounts (optional)
- **OTP Verification** (`/auth-account`): Email verification for new admins
- **Session Management**: Credentials stored in secure cookies

#### Employee Login (`/emp-login`)

- **Email & Password Authentication**: Employees log in with credentials
- **First-Time Login Password Change** (`/emp-change-password`): Mandatory password update on first login
- **Persistent Session**: Employee login state maintained across sessions

#### Authentication Flow:

1. User logs in with credentials
2. Backend verifies password and generates JWT token
3. Token stored in HTTP-only cookie for security
4. Frontend checks authentication on app load via `/auth/getme` endpoint
5. Invalid/expired token redirects to login

---

## 5. Admin Features & Pages

### 5.1 Dashboard (`/` or `/dashboard`)

**Purpose**: Central hub for admin to manage all employees

**Key UI Components**:

- **Search Bar**: Real-time search employees by name, email, department
- **Filter Bar**: Filter employees by department/domain
- **Pagination**: Client-side pagination (6 employees per page)
- **Employee Cards**: Display employee information with actions
- **Add Employee Form**: Modal to add new employees
- **Edit/Delete**: Inline editing and deletion of employee records

**Functionality**:

- Fetch paginated employee list from backend
- Add new employees with validation (Zod schemas)
- Edit existing employee details
- Delete employees (with SweetAlert confirmation)
- Real-time search filters
- Sort employees alphabetically
- Shows "Seeded Data" badge for pre-loaded employees

**Analytics Cards** (from AdminDasboardChart):

- Total employees count
- Total departments
- Most common email domain
- Average employee age
- Average salary
- Salary range

---

### 5.2 Admin Leave Management (`/admin/leaves`)

**Purpose**: Review and approve/reject employee leave requests

**Key Features**:

- Display all leave requests with employee details
- **Status**: Pending, Approved, Rejected
- **Leave Information**:
  - Leave type (Sick, Casual, Personal, etc.)
  - Reason provided by employee
  - Date range (From Date - To Date)
  - Total days calculated
  - Requested date

**Admin Actions**:

- **Approve Leave**: Accepts leave request and sends notification
- **Reject Leave**: Denies leave request with optional remarks
- **View Admin Remarks**: See previous admin comments

**UI Elements**:

- Leave cards with employee info
- Status badges (color-coded: Yellow=Pending, Green=Approved, Red=Rejected)
- Action buttons for approval/rejection
- Loading states and error handling

---

### 5.3 Company Analytics (`/company/analytics`)

**Purpose**: View comprehensive company-wide insights and metrics

**Dashboard Cards** (Summary Stats):

- **Total Employees**: Complete employee count
- **Total Departments**: Number of unique departments
- **Top Mail Domain**: Most common email provider (e.g., @gmail.com)
- **Average Age**: Average age of all employees
- **Average Salary**: Mean salary across company
- **Salary Range**: Min - Max salary displayed

**Data Visualizations** (using Recharts):

1. **Gender Distribution** (Pie Chart): Male/Female/Other breakdown
2. **Department Distribution** (Bar Chart): Employees per department
3. **Email Domain Distribution** (Pie Chart): Email providers breakdown
4. **Skills Distribution** (Donut Chart): Most common skills with colors
5. **Age Distribution** (Histogram): Age groups analysis
6. **Salary Distribution** (Box plot or histogram): Salary ranges

**Key Metrics Calculated**:

- Employee count by department
- Gender ratio
- Age statistics (average, min, max)
- Salary statistics (average, min, max)
- Most frequently used skills
- Email domain frequency

---

## 6. Employee Features & Pages

### 6.1 Employee Profile (`/profile`)

**Purpose**: View and manage personal information

**Features**:

- Display employee details:
  - Employee ID, Name, Email
  - Phone, Age
  - Department, Gender
  - Experience level, Skills
  - Salary (display only)
- **Edit Mode**: Enable editing of fields
- **Update Profile**: Save changes to backend
- **Validation**: Zod schemas ensure data integrity
- **Cover & Profile Images**: Visual profile display (assets included)

**Edit Fields**:

- Name, Email, Phone
- Age
- Department (dropdown)
- Gender (radio/select)
- Experience (dropdown)
- Salary (read-only)

**UI Elements**:

- Profile cover image banner
- Profile picture circle
- Two-column layout on desktop
- Edit/Save/Cancel buttons
- Form validation error messages

---

### 6.2 Apply Leave (`/emp/apply-leave`)

**Purpose**: Submit leave requests for approval

**Form Fields**:

- **Leave Type** (Select dropdown):
  - Sick Leave
  - Casual Leave
  - Personal Leave
  - Maternity/Paternity Leave
  - etc.
- **Reason** (Textarea): Explanation for leave request
- **From Date** (Date picker): Start date of leave
- **To Date** (Date picker): End date of leave

**Validation**:

- All fields required (Zod schema)
- Date validation: To Date cannot be before From Date
- Character limits on reason
- Date format validation

**Functionality**:

- Submit leave request to backend
- Backend calculates total days
- Shows success/error toast notification
- Form resets after successful submission
- Status automatically set to "Pending"

**Styling**:

- Dark green theme matching company branding
- Responsive form layout
- Clear section headers
- Submit button with hover effects

---

### 6.3 My Leave Requests (`/emp/my-leaves`)

**Purpose**: View personal leave request history and status

**Summary Cards**:

- **Total Requests**: Count of all leave applications
- **Pending**: Awaiting approval
- **Approved**: Accepted by admin
- **Rejected**: Declined by admin

**Leave History Table**:

- Leave Type (displays type with color coding)
- Reason (text of request)
- From Date
- To Date
- Requested On (creation date)
- Status (Pending/Approved/Rejected with badges)
- Admin Remark (if applicable)

**Table Features**:

- Sortable columns
- Responsive scrolling on mobile
- No data message when empty
- Loading state while fetching
- Color-coded status badges

---

### 6.4 Employee Dashboard (`/emp-dashboard`)

**Purpose**: Main employee portal with navigation options

**Key Sections**:

- Navigation menu to all employee features:
  - View Profile
  - Apply Leave
  - My Leaves
  - Attendance
  - Attendance Calendar
- Quick stats or notifications
- Breadcrumb navigation

**UI Elements**:

- Welcome message
- Menu cards or sidebar navigation
- Profile summary
- Recent activities or pending actions

---

### 6.5 Attendance Management

#### Attendance Status (`/emp/attendance`)

**Purpose**: View current and recent attendance status

**Display Information**:

- Today's attendance status (Present/Absent/Late/On Leave)
- Clock-in/Clock-out times
- Last 7 days attendance summary
- Total working hours today

**Features**:

- Real-time attendance status
- Visual indicators (green=present, red=absent, yellow=late)
- Time duration display
- Attendance streak counter (consecutive present days)

#### Attendance Calendar (`/emp/calender`)

**Purpose**: Visual calendar view of attendance history

**Calendar Features**:

- Monthly calendar view
- Navigation between months (Previous/Next buttons)
- Color-coded date cells:
  - **Green**: Present
  - **Red**: Absent
  - **Yellow**: Late
  - **Blue**: On Leave
  - **Gray**: No data
- Click on date to view details
- Legend showing status meanings

**Functionality**:

- Fetch attendance history from backend
- Generate calendar grid
- Map attendance data to dates
- Display clock-in/clock-out times on hover
- Navigate to any month/year

**UI Elements**:

- Month/Year header
- Day of week labels (Sun-Sat)
- Date cells in grid
- Navigation arrows
- Legend/Key
- Clock-in/clock-out time display

---

## 7. UI Components

### 7.1 Pagination Component

**Location**: `src/components/users/Pagination.tsx`

**Features**:

- Previous/Next buttons with arrow icons
- Current page display in center
- Disabled state when at first/last page
- Color-coded styling (lime green theme)
- Keyboard accessibility

**Props**:

- Manages through AppContext (currPage, totalPages)

---

### 7.2 User Card Component

**Location**: `src/components/users/UserCard.tsx`

**Displays**:

- Employee ID
- Name
- Email
- Phone
- Department badge
- Seeded data indicator (animated pulse)

**Actions**:

- Edit button (pencil icon) - opens edit form
- Delete button (trash icon) - SweetAlert confirmation
- Edit/Delete buttons only for manually added employees
- Highlighted state for selected employees

---

### 7.3 Search Bar Component

**Location**: `src/components/users/SearchBar.tsx`

**Features**:

- Real-time search as user types
- Search filters by: Name, Email, Department
- Clear button to reset search
- Debounced search (optional)
- Placeholder text

---

### 7.4 Filter Bar Component

**Location**: `src/components/users/FilterBar.tsx`

**Features**:

- Filter by department/domain
- Dropdown or button selection
- "All" option to show all employees
- Visual feedback for selected filter
- Real-time filtering

---

### 7.5 Form Components

#### Zod User Form

**Location**: `src/components/forms/ZodUserForm.tsx`

**Purpose**: Add/Edit employee with validation

**Fields**:

- Name (required)
- Email (required, unique)
- Phone (required)
- Age (number)
- Department (select)
- Gender (radio/select)
- Experience (select)
- Skills (multi-select or tags)
- Salary (optional)
- Password (for new employees)

**Validation Rules** (Zod schemas):

- Name: Min 2 chars, alphabets only
- Email: Valid format, unique check
- Phone: Valid format
- Department: Must be from enum
- Skills: Min 1 skill required
- Age: Positive number, realistic range

**Features**:

- Error messages display below each field
- Submit/Cancel buttons
- Automatic field mapping
- Form reset after submit
- Loading state during submission

---

## 8. Database Models

### 8.1 User Model (Admin)

```typescript
{
  _id: ObjectId,
  name: string (required),
  email: string (unique, required),
  password: string (hashed, required),
  otp?: number,
  otpExpireAt?: number,
  isAuthenticated: boolean (default: false),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Purpose**: Stores admin user information and authentication data

---

### 8.2 Employee Model

```typescript
{
  Eid: string (auto-generated, e.g., "EMP001"),
  _id: ObjectId,
  name: string,
  email: string (unique),
  phone: string,
  age: number,
  department: enum (DEPT1, DEPT2, DEPT3, ...),
  gender: enum (Male, Female, Other),
  experience: enum (Fresher, 1-2 Years, 3-5 Years, 5+ Years),
  skills: [string] (array of skill tags),
  password: string (hashed),
  isFirstLogin: boolean (default: true),
  userId: string (reference to admin who added),
  addedBy: string ("Admin" for seeded, or admin ID),
  salary: number (default: 20),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Purpose**: Stores employee information

---

### 8.3 Leave Model

```typescript
{
  _id: ObjectId,
  employeeId: string,
  leaveType: string (Sick, Casual, Personal, etc.),
  reason: string,
  fromDate: date,
  toDate: date,
  totalDays: number (calculated),
  status: enum (Pending, Approved, Rejected),
  adminRemark: string (optional),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Purpose**: Tracks leave requests and their status

---

### 8.4 Attendance Model

```typescript
{
  _id: ObjectId,
  employeeId: string,
  date: date,
  clockIn: time (HH:MM format),
  clockOut: time (optional),
  status: enum (Present, Absent, Late, On Leave),
  hoursWorked: number (calculated),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Purpose**: Records daily attendance

---

### 8.5 Counter Model

**Purpose**: Maintains auto-incrementing ID counters

```typescript
{
  _id: string (identifier, e.g., "employeeId", "userId"),
  seq: number (current counter value)
}
```

---

## 9. API Endpoints

### Admin Authentication

- `POST /api/auth/signup` - Admin sign up
- `POST /api/auth/login` - Admin login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/getme` - Get current admin info
- `POST /api/auth/logout` - Admin logout
- `POST /api/auth/send-otp` - Send OTP for email verification

### Employee Management

- `GET /api/users` - Get paginated employees with filters (Pagination: page, limit, search)
- `POST /api/users` - Add new employee
- `PUT /api/users/:eid` - Update employee details
- `DELETE /api/users/:eid` - Delete employee
- `GET /api/emp/details` - Get current employee details
- `POST /api/user/emplogin` - Employee login
- `PUT /api/emp/password` - Change password (first login)

### Leave Management

- `POST /api/auth/leave/create` - Create leave request
- `GET /api/auth/admin/get/leave` - Get all leave requests (Admin)
- `GET /api/auth/leave/my-leaves` - Get employee's leave requests
- `PATCH /api/auth/admin/update/leave/:id` - Approve/Reject leave (Admin)

### Attendance

- `GET /api/attendance/history` - Get attendance history
- `POST /api/attendance/clock-in` - Clock in (if implemented)
- `POST /api/attendance/clock-out` - Clock out (if implemented)

### Analytics

- `GET /api/analytics/all-employees` - Get all employees for analytics

---

## 10. Global State Management (AppContext)

**Location**: `src/context/AppContext.tsx`

**State Variables**:

```typescript
// Authentication
- isLoggedin: boolean - User login status
- userData: UserData | null - Admin info
- setUserData: function
- getUserData: async function

// Employee Info
- empDetails: Employee | null - Current employee details
- setEmpDetails: function
- fetchEmployeeDetails: async function

// Pagination
- currPage: number - Current page (for employees list)
- setCurrPage: function
- totalPages: number
- setTotalPages: function

// Search & Filter
- searchStr: string - Search query
- setSearchStr: function
- selectedDomain: string - Filter by email domain
- setSelectedDomain: function

// Counters
- totalEmp: number - Total employee count
- setTotalEmp: function
- filteredData: number - Count of filtered employees
- setFilteredData: function

// Triggers
- trigger: boolean - Force re-fetch flag
- setTrigger: function

// Configuration
- backendUrl: string - API base URL from env
```

**Usage**:

```typescript
const { isLoggedin, userData, currPage } = useAppContext();
```

---

## 11. Routing Structure

### Public Routes

- `/login` - Admin login
- `/emp-login` - Employee login

### Protected Admin Routes

- `/` - Dashboard (employee management)
- `/auth-account` - Email verification
- `/admin/leaves` - Leave approval
- `/company/analytics` - Company analytics

### Protected Employee Routes

- `/profile` - Employee profile
- `/emp-dashboard` - Employee main dashboard
- `/emp-change-password` - Change password (first login only)
- `/emp/apply-leave` - Apply leave
- `/emp/my-leaves` - Leave history
- `/emp/attendance` - Attendance status
- `/emp/calender` - Attendance calendar

### Route Protection

- Routes check `isLoggedin` status from AppContext
- Unauthorized access redirects to `/login` or `/emp-login`
- First-time employees forced to `/emp-change-password`

---

## 12. Validation Schemas (Zod)

### Employee Schema

- Name: `string().min(2, "Min 2 chars").regex(/^[A-Za-z\s]+$/)`
- Email: `string().email("Invalid email").unique`
- Phone: `string().min(10, "Invalid phone")`
- Age: `number().positive().min(18).max(65)`
- Department: `enum(...departments)`
- Gender: `enum("Male", "Female", "Other")`
- Experience: `enum("Fresher", "1-2 Years", ...)`
- Skills: `array().min(1)`
- Salary: `number().positive()`
- Password: `string().min(8)`

### Leave Schema

- leaveType: `string().enum([...])`
- reason: `string().min(10).max(500)`
- fromDate: `date()`
- toDate: `date()`

---

## 13. Key Features Summary

### For Admins:

✅ Employee CRUD operations
✅ Search & filter employees
✅ Paginated employee list
✅ Leave request approval/rejection
✅ Company-wide analytics & charts
✅ View salary statistics
✅ Department distribution analysis
✅ Skills and demographics overview

### For Employees:

✅ View/edit personal profile
✅ Apply for leaves
✅ Track leave status (Pending/Approved/Rejected)
✅ View attendance calendar
✅ Check attendance status
✅ Change password on first login
✅ View leave history with admin remarks

### Security Features:

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ HTTP-only secure cookies
✅ Role-based access control (Admin vs Employee)
✅ OTP email verification for admins
✅ Input validation with Zod schemas
✅ CORS configured for secure cross-origin requests

---

## 14. UI Styling & Design

### Color Scheme:

- **Primary Dark**: `#0A0F0A`, `#232f20` - Dark green background
- **Accent Green**: `#a8d96c`, `#7a9970` - Lime/green accents
- **Lime Button**: `bg-lime-400`, `bg-lime-500` - Call-to-action
- **Status Colors**:
  - Present: Green
  - Absent: Red
  - Late: Yellow
  - On Leave: Blue
  - Pending: Yellow
  - Approved: Green
  - Rejected: Red

### Typography:

- Font: `font-serif` for headings
- Text Colors: `text-white`, `text-gray-200` on dark backgrounds

### Responsive Design:

- Mobile-first approach
- `grid` and `flex` layouts
- Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Horizontal scroll for tables on mobile

---

## 15. Environment Variables

### Frontend (`.env` or `.env.local`)

```
VITE_BACKEND_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
```

### Backend (`.env`)

```
MONGO_URL=mongodb://localhost:27017/employee-db
PORT=3000
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=xxxxx
```

---

## 16. How to Run the Project

### Backend Setup

```bash
cd backend
npm install
npm run dev          # Start development server on port 3000
npm run seed        # Seed database with sample data
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev          # Start dev server on port 5173
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Database

- MongoDB must be running (local or Atlas connection)
- Sample data available in `backend/seed/sampleData.json`

---

## 17. Key Technical Decisions

1. **Client-Side Pagination**: Implemented for better UX and reduced backend load
2. **Zod Validation**: Both frontend and backend for consistent validation
3. **Global Context**: Centralized state management without Redux
4. **Auto-Incrementing IDs**: Employee IDs generated using counter collection
5. **Firebase OAuth**: Additional authentication option for admins
6. **Recharts**: Lightweight charting library for analytics
7. **Material-UI Icons**: Comprehensive icon set for UI
8. **Tailwind CSS**: Utility-first CSS for rapid styling

---

## 18. Future Enhancement Ideas

- Real-time attendance with biometric/GPS
- Email notifications for leave status
- Advanced employee filtering and export
- Salary slip generation
- Performance reviews system
- Employee directory with photos
- Shift management
- Overtime tracking
- Mobile app using React Native
- Two-factor authentication (2FA)
- Audit logs for admin actions
- Bulk employee import/export
- Custom reports builder

---

## 19. Troubleshooting

### Common Issues:

**Backend Connection Error**

- Ensure backend server is running on port 3000
- Check MongoDB connection
- Verify CORS configuration

**Authentication Issues**

- Clear cookies and session storage
- Check JWT token expiration
- Verify Firebase credentials

**Pagination Not Working**

- Check currPage and totalPages in AppContext
- Verify API returns correct page data
- Check search/filter query strings

**Validation Errors**

- Review Zod schemas in `zodValidation.ts`
- Check form field names match schema
- Ensure data types are correct

---

## 20. File Structure Summary

| File                     | Purpose                                |
| ------------------------ | -------------------------------------- |
| `App.tsx`                | Route definitions & main app structure |
| `AppContext.tsx`         | Global state & authentication          |
| `Dashboard.tsx`          | Admin employee management interface    |
| `CompanyAnalytics.tsx`   | Analytics & data visualization         |
| `EmpDashboard.tsx`       | Employee profile management            |
| `ApplyLeave.tsx`         | Leave request form                     |
| `AdminLeave.tsx`         | Leave approval interface               |
| `AttendanceCalendar.tsx` | Attendance calendar view               |
| `userService.ts`         | Employee API calls                     |
| `leaveServices.ts`       | Leave API calls                        |
| `analyticsService.ts`    | Analytics API calls                    |
| `user.model.ts`          | Admin user schema                      |
| `user.controller.ts`     | Employee CRUD endpoints                |
| `leave.model.ts`         | Leave schema                           |
| `server.ts`              | Express server setup                   |

---

## Conclusion

This is a comprehensive, full-stack **Employee Management Dashboard** with:

- Advanced pagination and filtering
- Real-time search capabilities
- Role-based access control
- Leave management workflow
- Attendance tracking system
- Analytics dashboard with visualizations
- Responsive, modern UI
- Secure authentication

The project demonstrates production-ready practices with TypeScript, validation, error handling, and professional UI design.

---

_Last Updated: 2026_
_Version: 1.0.0_
