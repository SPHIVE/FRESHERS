# Product Requirements Document (PRD)

## IICT FRESHER PARTY 2026 & STUDENT HELP HUB

**Version:** 1.0  
**Platform:** Responsive Web Application  
**Primary Users:** IICT Students  
**Administration:** Authorized Admin(s)

---

# 1. Product Vision

Build a premium, modern and secure student platform combining:

1. **Fresher Party 2026**
2. **Transparent Contribution & Expense Management**
3. **Premium Contributor Recognition**
4. **Student Help Hub**
5. **IICT Student & Senior Directory**
6. **Faculty & College Information**
7. **Student Leadership/Position Directory**

The platform should provide complete financial transparency for Fresher Party 2026 while also helping IICT students identify seniors, juniors, batchmates, faculty members and important student representatives.

The experience should feel like a **premium 3D interactive website**, not a traditional college management portal.

---

# 2. Core Design Philosophy

The website should have a:

- Premium cinematic appearance
- Modern 3D interface
- Dark / deep navy environment
- Metallic gold highlights
- Glassmorphism UI
- Smooth animations
- Interactive 3D elements
- Premium typography
- Responsive mobile experience
- Fast loading despite 3D effects

The website should create a strong first impression while keeping financial and informational sections easy to understand.

---

# 3. Main Website Architecture

The platform will operate using **one unified student account system**.

A student registers only once.

The same account will be used for:

- Student Help Hub
- Batch Directory
- Fresher Party
- Contribution system
- Contributor Wall
- Future student features

Main architecture:

**Landing Experience**

↓

**Register / Login**

↓

**Student Account**

↓

Two primary experiences:

### A. Fresher Party 2026

### B. Student Help Hub

---

# 4. User Roles

## 4.1 Visitor

A person who has not registered/logged in.

Visitor should only have access to limited landing/login/register pages.

Sensitive student information must never be publicly available.

---

## 4.2 Registered Student — Pending Approval

Student has completed registration but has not yet been approved by an admin.

They should see:

**Registration Received**

and an appropriate pending approval message.

Student directory and protected Help Hub information should remain inaccessible.

---

## 4.3 Approved Student

An admin-approved IICT student.

Can access:

- Student Help Hub
- College Information
- Faculty Information
- Batch Directory
- Student Positions
- Other approved student resources

Contributor visibility depends on Fresher Party settings.

---

## 4.4 Verified Contributor

An approved student whose Fresher Party contribution has been verified.

Receives all normal student permissions plus access to contributor-specific Fresher Party information.

Their approved public contributor profile appears on the Contributor Wall.

---

## 4.5 Admin

Admin has complete management privileges.

Admin can:

- Approve/reject registrations
- Manage students
- Manage batches
- Upload/update student photos
- Verify contributions
- Add expenses
- Upload receipts
- Manage college information
- Manage faculty
- Manage student positions
- Configure Contributor Wall visibility
- Manage Freshers settings
- View private registration information
- Review audit logs

---

# 5. Student Registration

Registration should collect:

### Required Information

- Full Name
- Roll Number
- Batch
- Profile Picture
- Email Address
- Phone Number
- Password

Available batches initially:

- **2023–2027**
- **2024–2028**
- **2025–2029**
- **2026–2030**

Future batches must be addable through Admin Panel without code changes.

---

# 6. Registration Security

Student passwords must NEVER be stored as plain text.

Authentication provider should securely manage passwords.

Neither administrators nor other students should ever be able to see another student's password.

Email and phone number must remain private.

Roll number must also remain private from other students.

---

# 7. Registration Approval Workflow

Student submits registration.

↓

Account/profile enters:

**Pending Approval**

↓

Admin receives notification.

↓

Admin reviews:

- Name
- Roll Number
- Batch
- Profile Photo
- Email
- Phone Number

↓

Admin chooses:

**Approve**

or

**Reject**

↓

Approved student receives access to Student Help Hub.

This prevents random outsiders from accessing the IICT student directory.

---

# 8. Admin Registration Notification

Whenever a new student registers, the administrator should receive an email notification.

Example information:

**New Student Registration**

Name: Student Name  
Batch: 2026–2030  
Roll Number: XXXXX  
Registration Time: XX:XX

Admin should then be able to review the registration from the Admin Dashboard.

Passwords must NEVER be included in these emails.

---

# 9. Automatic Batch Directory

When a student registers, their selected batch should automatically associate their profile with that batch.

However, the profile becomes visible in the Batch Directory only after admin approval.

Example:

### Batch 2025–2029

Student A  
Student B  
Student C

### Batch 2026–2030

Student D  
Student E  
Student F

No manual database linking should be required.

---

# 10. Student Profile Visibility

Student-facing profiles should show only:

- Profile Photo
- Full Name
- Batch
- Official Student Position, if applicable

Private information must NOT be visible to other students.

### PRIVATE INFORMATION

- Roll Number
- Phone Number
- Email Address
- Transaction Reference
- Authentication information
- Password

---

# 11. Profile Photo Management

Students upload a profile photo during registration.

Admin should be able to:

- Approve the photo
- Replace the photo
- Update the photo
- Remove inappropriate photos

Admin-uploaded photos should be supported for existing batch members.

This allows administrators to build batch directories even for students who have not yet uploaded a suitable photo.

---

# 12. Student Help Hub

Student Help Hub is a protected area.

Only authenticated and approved students should have access.

It should contain:

### College Information

Important IICT-related information provided by the administrator.

### Faculty Information

Faculty profiles containing appropriate information such as:

- Photo
- Name
- Designation
- Department/Area
- Other approved academic information

### All Batches

Dedicated directories for:

- 2023–2027
- 2024–2028
- 2025–2029
- 2026–2030

### Know Your Seniors

Students should be able to visually identify seniors through:

- Profile Photo
- Name
- Batch
- Official position, where applicable

### Student Positions

A dedicated directory for important IICT student responsibilities.

Examples:

- General Secretary
- Training & Placement Representative (TPR)
- Sports Secretary
- Cultural Secretary
- Class Representatives
- Other positions added by Admin

The positions system must be dynamic so additional positions can be created later.

---

# 13. Fresher Party 2026 Experience

The Fresher Party module should have a significantly more cinematic visual experience.

The opening screen should prominently feature:

# FRESHER PARTY
# 2026

The hero experience may include:

- Real-time 3D text
- Metallic materials
- Dynamic lighting
- Floating particles
- Camera movement
- Depth effects
- Mouse interaction
- Smooth transitions
- Subtle fog/environment effects
- Cinematic scroll animation

The experience must remain optimized for mobile devices.

---

# 14. Fresher Contribution System

An approved student should be able to submit contribution information.

Contribution fields:

- Contribution Amount
- Payment Mode
- Payment Date
- Transaction Reference ID — Optional

The student submits the contribution.

↓

Status:

**Verification Pending**

↓

Admin verifies payment.

↓

Status:

**Verified Contributor**

Only verified payments should affect financial totals.

---

# 15. Multiple Contributions

Students may contribute more than once.

Example:

First Contribution — ₹500  
Additional Contribution — ₹200

**Total Contribution — ₹700**

Individual transactions must remain separately recorded in the backend.

Previous transactions should not be overwritten.

---

# 16. Contributor Wall

The Contributor Wall is one of the major visual features of the website.

Each verified contributor receives a premium profile card.

Example:

**[PROFILE PHOTO]**

### STUDENT NAME

Batch 2025–2029

**CONTRIBUTED ₹500**

✓ VERIFIED CONTRIBUTOR

Contributor cards should support:

- 3D hover/tilt
- Premium typography
- Glass effects
- Subtle gold lighting
- Smooth animations
- Responsive layout

All contributors should receive equal visual respect regardless of contribution amount.

---

# 17. Contributor Privacy

Contributor Wall may show:

- Profile Photo
- Name
- Batch
- Verified Contribution Amount

It must NOT show:

- Roll Number
- Phone Number
- Email
- Transaction Reference ID
- Private account information

---

# 18. Contributor Wall Visibility System

Admin should control who can view contributors.

Admin Panel:

**Contributor Wall Visibility**

Three modes:

### MODE 1 — Hidden

Contributor Wall is unavailable to normal students.

### MODE 2 — Contributors Only

Only verified contributors can see the Contributor Wall.

### MODE 3 — All Approved Students

All approved/logged-in students can see contributors, including students who did not contribute.

This mode can be enabled when Fresher Party approaches.

---

# 19. Contributor Visibility Permission Matrix

| User | Hidden | Contributors Only | All Students |
|---|---|---|---|
| Public Visitor | ❌ | ❌ | ❌ |
| Pending Student | ❌ | ❌ | ❌ |
| Approved Non-Contributor | ❌ | ❌ | ✅ |
| Verified Contributor | ❌ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ |

Admin retains access regardless of mode.

---

# 20. Freshers Financial Dashboard

Verified/authorized users should be able to view a clear financial overview according to permissions.

Primary metrics:

### TOTAL COLLECTED

₹XX,XXX

### TOTAL EXPENSES

₹XX,XXX

### REMAINING BALANCE

₹XX,XXX

### VERIFIED CONTRIBUTORS

XX

All numbers must be automatically calculated from verified financial records.

---

# 21. Financial Calculation Rules

### Total Collection

Sum of all verified contributions.

### Total Expenses

Sum of all approved/non-void expenses.

### Remaining Balance

**Total Verified Contributions − Total Valid Expenses**

Balance must never be manually entered as the authoritative value.

---

# 22. Expense Transparency

Each expense can contain:

- Expense Title
- Category
- Amount
- Date
- Description
- Vendor, if applicable
- Receipt/Bill
- Added By
- Created Time

Example:

Decoration — ₹4,500

Food — ₹8,000

Sound — ₹3,500

Photography — ₹4,000

Students with appropriate Freshers access should be able to understand where contributed money was spent.

---

# 23. Expense Proof

Admin should be able to upload:

- Receipt images
- Bills
- Appropriate proof documents

Authorized students can select:

**View Receipt**

to inspect available proof.

Sensitive payment information on uploaded receipts should be redacted where necessary.

---

# 24. Financial Ledger

Maintain a chronological ledger.

Example:

| Date | Description | Credit | Debit | Balance |
|---|---|---:|---:|---:|
| Aug 25 | Contribution | ₹500 | — | ₹500 |
| Aug 25 | Contribution | ₹500 | — | ₹1,000 |
| Aug 26 | Decoration | — | ₹300 | ₹700 |

The ledger should derive from actual financial transactions.

---

# 25. Financial Audit Trail

Important financial records should not silently disappear.

Maintain audit information including:

- Who created a transaction
- When it was created
- Who modified it
- Previous value
- New value
- Modification time
- Reason where applicable

Instead of permanently deleting important financial transactions, support:

**Void / Cancel Transaction**

while preserving historical records.

---

# 26. Admin Dashboard

Admin Dashboard should provide:

### Overview

- Registered Students
- Pending Approvals
- Approved Students
- Verified Contributors
- Total Collection
- Total Expenses
- Current Balance

### Student Management

- Search students
- Approve
- Reject
- Edit profile
- Change batch
- Update photo
- Assign position
- Disable account

### Contribution Management

- Pending contributions
- Verify contribution
- Reject/flag submission
- View private transaction reference
- Add offline/cash contribution

### Expense Management

- Add expense
- Upload receipt
- Edit expense
- Void expense
- View expense history

### Content Management

- College information
- Faculty
- Batch directories
- Student positions
- Help Hub resources

### Fresher Settings

- Contributor visibility
- Event information
- Freshers status
- Financial visibility settings

---

# 27. Search

Student Help Hub should provide fast search.

Students should be able to search by:

- Student Name
- Batch
- Student Position
- Faculty Name

Private fields such as roll numbers, emails and phone numbers must not become searchable by ordinary students.

---

# 28. Suggested Technology Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### 3D

- Three.js
- React Three Fiber
- Drei

### Animation

- Motion / Framer Motion
- GSAP
- ScrollTrigger

### Optional 3D Asset Creation

- Blender
- Spline
- Optimized licensed 3D assets where appropriate

### Backend

- Supabase

### Database

- PostgreSQL

### Authentication

- Supabase Auth

### Storage

- Supabase Storage

Used for:

- Student photos
- Faculty photos
- Receipts
- Website media

### Deployment

- Vercel

---

# 29. High-Level Database Structure

Core entities should include:

### profiles

- id
- full_name
- roll_number
- batch_id
- phone
- profile_photo
- approval_status
- created_at

### batches

- id
- batch_name
- start_year
- end_year
- active

### contributions

- id
- student_id
- amount
- payment_mode
- transaction_reference
- payment_date
- verification_status
- verified_by
- verified_at

### expenses

- id
- title
- category
- amount
- expense_date
- description
- vendor
- receipt_url
- status
- created_by
- created_at

### faculty

- id
- name
- photo
- designation
- department
- description

### student_positions

- id
- position_name
- description

### student_position_assignments

- student_id
- position_id
- active
- start_date
- end_date

### college_information

- id
- title
- content
- category
- updated_at

### application_settings

Contains configurable values such as:

- Contributor Wall visibility
- Event status
- Fresher Party date
- Feature visibility

### audit_logs

- actor
- action
- entity_type
- entity_id
- previous_value
- new_value
- timestamp

---

# 30. Security Requirements

The application must use database-level authorization.

Important requirements:

- Authentication required for protected information.
- Pending users cannot access protected directories.
- Students can access only permitted information.
- Private student fields must not be returned to ordinary student clients.
- Admin actions require verified admin privileges.
- Uploaded files require appropriate access rules.
- Financial verification must be admin-only.
- Server-side authorization must not rely only on hidden UI buttons.
- Database Row Level Security should be configured appropriately.

---

# 31. Mobile Performance

Because many students will access the platform using smartphones:

- 3D assets must be optimized.
- Large textures must be compressed.
- Models should use optimized geometry.
- Lazy loading should be used.
- Heavy 3D scenes should not load unnecessarily.
- Reduced effects should be available on lower-powered devices.
- Student directory images should use optimized thumbnails.

Visual quality should remain premium without making the website unnecessarily slow.

---

# 32. 3D Design Strategy

Do NOT make every page heavy 3D.

### Heavy 3D

Use for:

- Fresher Party opening
- Hero experience
- Selected Contributor Wall interactions

### Moderate Animation

Use for:

- Batch cards
- Student profiles
- Student positions
- Dashboard transitions

### Clean UI

Use for:

- Expenses
- Ledger
- Admin Dashboard
- Forms
- Settings

This maintains both premium design and usability.

---

# 33. Initial Navigation Concept

### Main Experience

**Home**

**Fresher Party 2026**

**Student Help Hub**

**My Profile**

### Student Help Hub

**College**

**Faculty**

**All Batches**

**Know Your Seniors**

**Student Positions**

**Help / Information**

### Freshers

**Fresher Home**

**Contributors**

**Financial Dashboard**

**Expenses**

**Ledger**

---

# 34. Phase 1 — MVP

Build first:

1. Project foundation
2. Database
3. Authentication
4. Registration
5. Admin approval
6. Email registration notification
7. Student profiles
8. Batch directory
9. Student Help Hub access control
10. Contribution submission
11. Payment verification
12. Contributor Wall
13. Expense management
14. Financial dashboard
15. Receipt upload
16. Contributor visibility modes
17. Basic Admin Dashboard

---

# 35. Phase 2 — Premium Experience

After the MVP works correctly:

- Cinematic 3D Fresher Party intro
- Advanced Contributor Wall
- 3D transitions
- GSAP scroll sequences
- Interactive lighting
- Premium particle systems
- Improved batch directory
- Advanced search
- Improved Student Positions presentation
- Mobile optimization

---

# 36. Phase 3 — Future Expansion

Architecture should allow future features such as:

- Future Freshers events
- Farewell events
- College events
- Student clubs
- Announcements
- Polls
- Event voting
- Student achievements
- Alumni directory
- Placement resources
- Event galleries
- Notifications

These are NOT required for the initial release.

---

# 37. Product Principle

The platform should follow three major principles:

### RECOGNITION

Students who contribute to Fresher Party receive premium recognition.

### TRANSPARENCY

Every verified contribution and legitimate event expense can be accounted for.

### CONNECTION

Students should be able to know their batchmates, seniors, juniors, faculty and student representatives through one secure IICT-focused platform.

---

# 38. Success Criteria

Version 1 will be considered successful when:

- Students can securely register.
- Admin receives registration information.
- Admin can approve/reject accounts.
- Approved students can access Student Help Hub.
- Students automatically appear in their correct batch after approval.
- Private fields remain private.
- Contributions can be submitted and verified.
- Verified contributors appear correctly.
- Contributor visibility can be controlled by Admin.
- Expenses and receipts can be recorded.
- Collection, expenses and balance calculate correctly.
- The system works smoothly on desktop and mobile.
- The Fresher Party experience feels visually premium without compromising usability or security.

---

## Final Product Identity

**IICT FRESHER PARTY 2026**

A premium celebration experience powered by transparent contributions.

+

**STUDENT HELP HUB**

One secure place to know your college, faculty, batches, seniors, juniors and student representatives.