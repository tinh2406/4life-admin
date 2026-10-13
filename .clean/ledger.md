# Cleanup Ledger

**Campaign**: Audit & Refactoring of PBL6 Admin Frontend
**Started**: 2026-10-13   **Last updated**: 2026-10-13
**Status**: in progress / batches 1-6 implemented

## Audit Coverage

- **Inventory**: 147 tracked files (`git ls-files`)
- **Reviewed**: 147   **Sweeps**: 2   **New findings per sweep**: 18, 0

## Baseline vs Current

| Tiêu chí | Trước refactor (Baseline) | Sau refactor (Hiện tại) | Cải thiện |
| :--- | :--- | :--- | :--- |
| **Build Status** | PASS (5.69s) | **PASS (5.46s)** | Ổn định, không đứt gãy |
| **Bundle Architecture** | Monolithic 1 Chunk (1,062 kB) | **Code-split 20 Chunks (Lazy routes)** | Trang login chỉ load ~200 kB |
| **Lint Errors** | **29 errors** | **0 errors** | Giảm 100% lỗi cú pháp/kiểu |
| **Lint Total Problems** | 78 problems | 37 problems | Giảm hơn 52% |
| **Layer Violations** | 2 violations (store->components, domain->infra) | **0 violations (PASS)** | Chuẩn hóa ranh giới |
| **Circular Dependencies** | components <-> context <-> store | **Đã bẻ gãy chu trình** | Tách ReduxProvider ra khỏi store |
| **API File Fragmentation**| 22 file API rời rạc | **Consolidated Feature APIs** | Dễ quản lý, an toàn |

## Completed Batches

- [x] Batch 1: Infrastructure & Network Layer - Axios interceptors (tự động đính kèm JWT token, bắt 401 logout), cấu hình `.env` & `VITE_API_BASE_URL`, thay thế vòng lặp while SignalR bằng `.withAutomaticReconnect()`.
- [x] Batch 2: Architectural Decoupling & Eliminating Circular Dependencies - Chuyển `ReduxProvider` về `src/app/providers/`, chuyển `uploadImage` về `src/services/api/upload.ts`, bẻ gãy phụ thuộc `store -> components`.
- [x] Batch 3: State Management & Immutability - Sửa lỗi mutate trực tiếp trong `FilterContext` và `NotifyContext`, memoize các Provider value để tránh render thừa.
- [x] Batch 4: Feature-Based Modularization (`src/features/*`) - Tạo các feature slice (`amenities`, `locations`, `users`, `request-mod`, `dashboard`, `auth`) gom các API endpoints phân mảnh thành module mạch lạc, hợp nhất kiểu dữ liệu `User`.
- [x] Batch 5: Clean Code, Duplication Removal & Bug Fixes - Viết hook tái sử dụng `useInfiniteScroll`, sửa lỗi nuốt lỗi (error swallowing) ở API tiện ích, sửa lỗi công thức phần trăm ở `CalcStatistics.ts`.
- [x] Batch 6: Performance, Bundle Optimization & Lint Cleanliness - Thiết lập `React.lazy` và `Suspense` cho toàn bộ trang, gỡ bỏ phụ thuộc `@mui/x-data-grid`, đưa số lỗi ESLint từ 29 về **0 errors**.
