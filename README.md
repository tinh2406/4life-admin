# 🏠 4LIFE Admin Portal — Marketplace Operations Cockpit

<p align="center">
  <img src="src/assets/images/logo-white.png" alt="4LIFE Admin Logo" width="220" />
</p>

<p align="center">
  <strong>Hệ thống Bảng điều khiển Quản trị & Điều phối Vận hành Nền tảng Đặt phòng Homestay 4LIFE</strong><br>
  <em>Đồ án Tốt nghiệp / Chuyên ngành PBL6 (Project Based Learning)</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/MUI-v5-007FFF?logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/SignalR-8.0-512BD4?logo=dotnet&logoColor=white" alt="SignalR" />
  <img src="https://img.shields.io/badge/MSW-Mocking_Ready-FF6A00?logo=mockserviceworker&logoColor=white" alt="MSW" />
  <img src="https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white" alt="Docker" />
</p>

---

## 📌 Giới thiệu Tổng quan (Overview)

**4LIFE Admin Portal** là hệ thống quản trị trung tâm (Back-office Operations Desk) dành cho ban quản trị và kiểm duyệt viên của nền tảng thương mại điện tử du lịch & homestay **4LIFE**. 

Ứng dụng cung cấp bảng điều khiển hiệu suất cao, tối ưu cho quy trình vận hành desktop-first:
- **Kiểm soát & Đảm bảo An toàn (Trust & Safety)**: Xét duyệt hồ sơ định danh chủ phòng (Host KYC) với giao diện đối soát CCCD/CMND 2 mặt trực quan.
- **Quản trị Danh mục Hệ thống (Master Data Taxonomy)**: Quản lý tập trung tiện ích phòng (Amenities) và địa điểm du lịch (Locations).
- **Giám sát & Phân quyền Người dùng**: Quản lý tài khoản, trạng thái hoạt động, khóa/mở tài khoản và phân quyền quản trị viên / kiểm duyệt viên.
- **Phân tích Số liệu Kinh doanh**: Theo dõi chỉ số tăng trưởng đơn đặt phòng, doanh số bán phòng và biến động tăng trưởng người dùng qua biểu đồ tương tác thời gian thực.
- **Hỗ trợ Độc lập Tuyệt đối (Zero-Backend Dependency)**: Tích hợp sẵn Mock Service Worker (MSW) cùng bộ dữ liệu giả lập chuẩn chỉnh, cho phép chạy thử nghiệm và demo đầy đủ tính năng ngay trên trình duyệt mà không bắt buộc có server backend.

---

## ✨ Tính năng Nổi bật (Key Features)

### 1. 📊 Báo cáo & Thống kê Tăng trưởng (Analytics Dashboard)
- **Doanh số (Sales Growth)**: Theo dõi doanh thu theo chu kỳ (Ngày / Tuần / Tháng / Năm), hỗ trợ lọc theo trạng thái thanh toán.
- **Đơn đặt phòng (Booking Growth)**: Giám sát lưu lượng booking trên toàn hệ thống 4LIFE.
- **Tăng trưởng người dùng (User Growth)**: Đo lường tốc độ thu hút khách hàng mới và đối tác kinh doanh.
- Trực quan hóa dữ liệu sống động với **Chart.js** & **react-chartjs-2**.

### 2. 🪪 Kiểm duyệt Định danh Đối tác (Host KYC Moderation Queue)
- Danh sách hàng đợi các đối tác đăng ký trở thành Host/Moderator (`/requests`).
- Giao diện chi tiết đối chiếu thông tin pháp lý: Hình ảnh chụp giấy tờ tùy thân mặt trước & mặt sau.
- Phê duyệt (**Approve**) hoặc từ chối (**Reject**) tức thì chỉ với một thao tác.

### 3. 👥 Quản lý Người dùng & Phân quyền (User Directory)
- Danh sách người dùng hệ thống (`/users`) kèm bộ lọc nâng cao (vai trò: *Admin, Moderator, Host, User*; trạng thái: *Hoạt động, Bị khóa*).
- Trang hồ sơ chi tiết (`/users/:id`), kiểm tra lịch sử hoạt động và điều chỉnh trạng thái tài khoản an toàn.

### 4. 🛏️ Quản trị Danh mục Tiện ích (Amenities Catalog)
- Quản lý bộ sưu tập tiện nghi homestay (`/amenities`) kèm icon trực quan.
- Tải lên icon tiện ích mới (hỗ trợ preview và upload ảnh).
- Tối ưu hiệu năng danh sách lớn với cơ chế **Infinite Scroll** (cuộn vô tận).

### 5. 📍 Quản trị Danh mục Địa điểm (Locations)
- Danh sách và cấu hình các khu vực, tỉnh/thành phố du lịch trọng điểm phục vụ tìm kiếm trên trang người dùng (`/locations`).

### 6. 🔔 Thông báo Thời gian thực (Realtime Notifications)
- Kết nối **SignalR Hub** (`@microsoft/signalr`) qua WebSockets với cơ chế tự động kết nối lại (`auto-reconnect`).
- Nhận cảnh báo tức thời khi phát sinh hồ sơ đăng ký Host mới hoặc biến động vận hành khẩn cấp.

### 7. ⚙️ Cài đặt Hệ thống & Tùy biến Môi trường (System Settings)
- Bảng điều khiển cấu hình: thông tin nền tảng, thiết lập phiên làm việc, cảnh báo SLA, và tích hợp thanh toán/SSO.

---

## 🌐 3 Chế độ Môi trường Vận hành (Server Modes)

Hệ thống được thiết kế linh hoạt với cơ chế chuyển đổi môi trường thông minh ngay tại màn hình Đăng nhập hoặc cấu hình:

| Chế độ | Nhãn hiển thị | Mô tả | Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Live API** | `LIVE API` | Kết nối trực tiếp tới REST API & SignalR Hub backend trên Cloud/Staging. | Chạy thực tế khi kết nối đồng bộ cùng Backend |
| **Mock MSW** | `IN-MEMORY MOCK` | Giả lập toàn bộ API bằng Mock Service Worker ngay trên trình duyệt với dữ liệu có sẵn. | **Khuyên dùng cho việc demo, báo cáo, chấm đồ án** |
| **Clean Sandbox** | `CLEAN SANDBOX` | Trình duyệt đóng vai trò server API trắng, lưu trữ toàn bộ dữ liệu vào `LocalStorage`. | Kiểm thử luồng khởi tạo dữ liệu mới từ đầu |

> **Mẹo**: Tại màn hình đăng nhập, bạn có thể chọn chế độ **Mock Data (MSW)** và nhấn nút **"⚡ Tự động điền"** để đăng nhập ngay vào hệ thống mà không cần bật backend!

---

## 🛠️ Công nghệ Sử dụng (Tech Stack)

| Hạng mục | Công nghệ | Chi tiết |
| :--- | :--- | :--- |
| **Core** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) | Nền tảng xây dựng UI kiểu tĩnh, an toàn kiểu dữ liệu |
| **Build Tool** | [Vite 5](https://vitejs.dev/) | Bundler siêu tốc với Hot Module Replacement (HMR) |
| **UI Component** | [MUI v5 (Material-UI)](https://mui.com/) | Thư viện giao diện chuẩn Enterprise, Emotion CSS-in-JS |
| **Design System** | Custom 4LIFE Dark Theme | Phong cách Dark Canvas `#060A0B`, điểm nhấn Coral `#ff385c` |
| **Server State** | [React Query v3](https://tanstack.com/query/v3) | Quản lý caching, deduping và đồng bộ dữ liệu server |
| **Client State** | [Redux Toolkit](https://redux-toolkit.js.org/) + Redux Persist | Quản lý token, thông tin phiên đăng nhập người dùng |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) | Xử lý form hiệu năng cao, validate dữ liệu chặt chẽ |
| **Realtime** | [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr) | WebSocket truyền tải thông báo và sự kiện tức thì |
| **Data Viz** | [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Vẽ biểu đồ đường, cột phân tích doanh thu & người dùng |
| **API Client** | [Axios](https://axios-http.com/) | HTTP client với centralized JWT Interceptor |
| **Mocking** | [Mock Service Worker (MSW 2)](https://mswjs.io/) | Giả lập request API cấp network service worker |
| **DevOps** | [Docker](https://www.docker.com/) + [Nginx](https://nginx.org/) | Container hóa sản phẩm đóng gói chạy production |

---

## 📂 Cấu trúc Thư mục (Project Architecture)

Dự án áp dụng kiến trúc **Feature-Based Architecture**, phân tách module rõ ràng theo nguyên tắc độc lập nghiệp vụ:

```text
pbl6-admin/
├── public/                 # Tài nguyên tĩnh & mockServiceWorker.js
├── src/
│   ├── app/                # Root providers (ReduxProvider, App routing)
│   ├── assets/             # Hình ảnh, logo, CSS toàn cục và Theme tokens
│   │   ├── images/         # Logo thương hiệu 4LIFE, hình nền
│   │   └── theme/          # Cấu hình Material UI Palette & Typography
│   ├── components/         # Shared presentational UI (DataTable, Breadcrumbs, Loading...)
│   ├── constants/          # Danh sách routes điều hướng, hằng số hệ thống
│   ├── context/            # Ephemeral scoped contexts (NotifyContext, StatisticsContext...)
│   ├── features/           # Các domain nghiệp vụ khép kín:
│   │   ├── amenities/      # Nghiệp vụ quản lý tiện ích homestay
│   │   ├── auth/           # Quản lý phiên đăng nhập & profile
│   │   ├── dashboard/      # Nghiệp vụ phân tích tăng trưởng kinh doanh
│   │   ├── locations/      # Nghiệp vụ quản lý địa điểm
│   │   ├── request-mod/    # Nghiệp vụ kiểm duyệt hồ sơ Host/Moderator
│   │   └── users/          # Nghiệp vụ quản lý danh sách người dùng
│   ├── layouts/            # Layout bọc ngoài (Dashboard Sidebar, Top Navbar, Basic)
│   ├── mocks/              # Cấu hình MSW (Mock handlers, database mẫu in-memory)
│   ├── pages/              # Màn hình page lazy-loaded tương ứng từng route
│   ├── services/           # Hạ tầng HTTP Axios, SignalR realtime, ServerMode helper
│   ├── store/              # Redux Toolkit store và Auth slice
│   ├── type/               # Kiểu dữ liệu chung DTO, Pagination, Thống kê
│   ├── utils/              # Các hàm bổ trợ xử lý dữ liệu, ngày tháng, chuỗi
│   ├── App.tsx             # Định nghĩa Router và Route Guards
│   └── main.tsx            # Điểm khởi chạy ứng dụng (MSW init, Root rendering)
├── Dockerfile              # Dockerfile đa nền tảng tối ưu Nginx
├── docker-compose.yml      # Cấu hình chạy nhanh ứng dụng qua Docker Compose
├── default.conf            # Cấu hình Nginx Web Server (SPA fallback)
└── package.json            # Scripts và danh sách thư viện phụ thuộc
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy (Getting Started)

### 1. Yêu cầu Môi trường (Prerequisites)
- [Node.js](https://nodejs.org/) `>= 18.x` (khuyến nghị Node 20 LTS)
- Package manager: `npm`, `yarn` hoặc `bun`

### 2. Tải mã nguồn & Cài đặt gói thư viện
```bash
# Clone repository
git clone https://github.com/tinh2406/pbl4_admin_page.git
cd pbl4_admin_page

# Cài đặt dependencies (sử dụng npm hoặc bun)
npm install
# hoặc nếu dùng bun:
# bun install
```

### 3. Cấu hình Biến Môi trường (Environment Variables)
Tạo file `.env` tại thư mục gốc dự án (hoặc sao chép từ `.env.example`):

```bash
cp .env.example .env
```

Nội dung `.env`:
```env
# URL API Backend (khi chạy chế độ Live)
VITE_API_BASE_URL=https://tuna.whitemage.tech/api

# URL SignalR Hub (nhận thông báo thời gian thực)
VITE_SIGNALR_HUB_URL=https://tuna.whitemage.tech/NotificationHub
```

### 4. Khởi chạy Ứng dụng ở Môi trường Phát triển (Development)

#### Cách 1: Chạy chế độ Mock Data (Khuyên dùng khi không có backend)
```bash
npm run dev:mock
```
Ứng dụng sẽ tự động kích hoạt Mock Service Worker với đầy đủ dữ liệu mẫu sẵn có.

#### Cách 2: Chạy chế độ kết nối Backend thật
```bash
npm run dev
```

Truy cập hệ thống tại: `http://localhost:5173`

---

## 🔑 Tài khoản Đăng nhập Mẫu (Demo Credentials)

Khi chạy ở chế độ **Mock Data (MSW)** hoặc **Sandbox**:

| Tài khoản / Email | Mật khẩu | Quyền hạn (Role) | Chú thích |
| :--- | :--- | :--- | :--- |
| `admin@4life.vn` | `Admin@123` | **Super Admin** | Toàn quyền kiểm duyệt, xem báo cáo, quản lý người dùng |

*(Tại giao diện đăng nhập, bạn chỉ cần bấm **"⚡ Tự động điền tài khoản mẫu"** rồi nhấn Đăng nhập).*

---

## 📜 Danh sách Lệnh Scripts (Available Commands)

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run dev` | Khởi động Vite development server với HMR (mặc định Live API) |
| `npm run dev:mock` | Khởi động development server ở chế độ Mock Service Worker |
| `npm run build` | Kiểm tra kiểu dữ liệu (`tsc`) và đóng gói mã nguồn vào thư mục `dist/` |
| `npm run preview` | Xem trước bản build production trên local server |
| `npm run lint` | Chạy ESLint kiểm tra lỗi định dạng và chất lượng mã nguồn |

---

## 🐳 Triển khai với Docker (Deployment)

Hệ thống đã chuẩn bị sẵn file `Dockerfile` và `docker-compose.yml` để dễ dàng đóng gói và triển khai lên máy chủ hoặc cloud:

```bash
# 1. Build mã nguồn ra thư mục dist
npm run build

# 2. Khởi tạo và chạy container Nginx bằng Docker Compose
docker compose up --build -d
```

- Cổng mặc định: `http://localhost:80`
- Cấu hình Nginx trong `default.conf` đã được thiết lập `try_files $uri $uri/ /index.html;` đảm bảo định tuyến React Router SPA không bị lỗi 404 khi tải lại trang.

---

## 👥 Thành viên Phát triển (Contributors)

- **Sinh viên thực hiện**: Dự án Đồ án Chuyên ngành PBL6
- **Khoa**: Công nghệ Thông tin
- **Trường**: Đại học Bách Khoa - Đại học Đà Nẵng (DUT)

---

## 📄 Bản quyền (License)

Dự án được xây dựng phục vụ mục đích học tập và nghiên cứu trong khuôn khổ môn học PBL6. Mọi quyền được bảo lưu bởi nhóm tác giả.
