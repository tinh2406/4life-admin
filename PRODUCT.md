# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Platform administrators and moderators managing the 4LIFE accommodation marketplace. Their day-to-day role involves reviewing and verifying host applications (KYC with front/back national identity card verification), maintaining taxonomy and master data (amenities and geographic locations), supervising user accounts, and monitoring high-level business performance (booking volumes, user growth, revenue/sales trends).

## Product Purpose

4LIFE Admin is the centralized operational back-office for the 4LIFE homestay and accommodation booking ecosystem. It exists to ensure trust and safety across the platform through host vetting, ensure accurate and complete property metadata (amenities and locations), and provide operational visibility into platform marketplace transactions and activity. Success means frictionless moderation decisions, clean catalog maintenance, and rapid access to business health metrics.

## Positioning

A purpose-built operational cockpit for 4LIFE marketplace operations, prioritizing high-throughput moderation workflows (KYC identity verification with immediate image inspection and decision buttons), realtime event awareness via SignalR, and responsive data-dense management tables.

## Operating Context

- Desktop-first administrative workflow (with responsive support for tablets and mobile monitors).
- Moderators operate in high-focus review loops: reviewing submitted applicant identity documents alongside user profile data to approve or deny moderation/hosting privileges.
- Real-time updates delivered through SignalR for incoming verification requests and platform notifications.
- Interacts with 4LIFE core backend services over authenticated REST APIs with JWT tokens.

## Capabilities and Constraints

- **Capabilities**:
  - Host/moderator KYC approval queue (`/requests`) with identity document inspection (front & back ID cards), profile details, and one-click approve/reject actions.
  - User directory and account detail view (`/users`, `/users/:id`).
  - Amenity catalog management with icon upload and infinite scroll (`/amenities`).
  - Location and geographical taxonomy management (`/locations`).
  - Business analytics dashboard (`/`) displaying booking metrics, revenue/sales reports, user acquisition charts, and date-range filters.
  - Realtime notifications for incoming requests via `@microsoft/signalr`.
- **Technical Constraints**:
  - React 18 + Vite + TypeScript 5.
  - UI styled with MUI v5 (`@mui/material`), `@emotion/react`, `@emotion/styled`.
  - State management split: React Query for server cache, Redux Toolkit for auth state.
  - Strictly client-side authentication and session handling with JWT interceptors.

## Brand Commitments

- Product Name: **4LIFE** (Admin Portal)
- Brand Colors: Coral / vibrant pink primary accent (`#ff385c`, reflecting marketplace identity), paired with clean slate/neutral grays and soft background hues (`#f0f2f5`).
- Assets: 4LIFE brand logos located in `src/assets/images/logo.png`, `logo-mini.png`, and `logo-white.png`.

## Evidence on Hand

- Fully functional frontend codebase with routes defined in `src/App.tsx` and `src/constants/routes.tsx`.
- Implemented API integrations and schemas in `src/features/` and `src/pages/`.
- Concrete UI components, theme configurations in `src/assets/theme/`, and asset files in `src/assets/images/`.

## Product Principles

1. **Clarity in Decision-Making**: Verification and moderation workflows must prioritize unobstructed visual evidence (such as ID cards) with clear action states to prevent approval errors.
2. **Operational Efficiency**: Data density, keyboard-friendly navigation, and infinite scroll or pagination must enable administrators to scan and process items with minimal friction.
3. **Data Integrity & Immutability**: Critical moderation actions (accept/reject) and catalog changes must reflect instantly with clear feedback and reliable synchronization with backend systems.
4. **Focused Aesthetic Hierarchy**: Maintain an enterprise-grade administrative feel—clean, modern, unobtrusive UI that highlights actionable content and telemetry data rather than competing with it.

## Accessibility & Inclusion

- High-contrast visual cues for status badges (pending, approved, rejected).
- Legible typography hierarchy for document verification and data tables.
- Accessible form controls and modal dialogs using MUI accessibility primitives.
