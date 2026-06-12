# StudyHub

> Nền tảng kết nối gia sư và phụ huynh — Spring Boot 4 + React 18 + MySQL 8

---

## 📋 Yêu cầu hệ thống

| Tool | Phiên bản tối thiểu |
|---|---|
| Java (JDK) | 21 |
| Node.js | 20+ |
| npm | 10+ |
| MySQL | 8.0+ |
| Git | Bất kỳ |

---

## ⚡ Chạy local trong 5 phút

### Bước 1: Clone repo

```bash
git clone <repo-url>
cd exe201_studyhub_project
```

### Bước 2: Chuẩn bị Database

```sql
-- Chạy trong MySQL CLI hoặc Workbench
CREATE DATABASE studyhub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Bước 3: Cấu hình Backend

```bash
cd studyhub-backend/src/main/resources

# Copy template
copy application-example.properties application.properties

# Mở application.properties và điền:
# - spring.datasource.username=root (hoặc user của bạn)
# - spring.datasource.password=your_password
# - cloudinary.cloud_name, cloudinary.api_key, cloudinary.api_secret
#   (Tạo miễn phí tại: https://cloudinary.com)
```

> **Lưu ý:** Lần đầu chạy, giữ `spring.jpa.hibernate.ddl-auto=create` để tự tạo bảng.  
> Từ lần sau, đổi thành `update` để không mất dữ liệu.

### Bước 4: Chạy Backend

```bash
cd studyhub-backend

# Windows
./mvnw.cmd spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080**

### Bước 5: Cấu hình Frontend

```bash
cd studyhub-frontend

# Copy template env
copy .env.example .env.local
# Hoặc tạo file .env.local với nội dung:
# VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Bước 6: Chạy Frontend

```bash
cd studyhub-frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

---

## 🏗️ Cấu trúc project

```
exe201_studyhub_project/
├── studyhub-backend/          # Spring Boot 4 + MySQL
│   ├── src/main/java/...
│   │   ├── controller/        # REST API endpoints
│   │   ├── service/           # Business logic
│   │   ├── entity/            # JPA entities
│   │   ├── repository/        # Spring Data JPA repos
│   │   ├── dto/               # Data Transfer Objects
│   │   └── security/          # JWT + Spring Security
│   └── src/main/resources/
│       ├── application.properties        # Config thật (gitignored)
│       └── application-example.properties # Template (committed)
│
└── studyhub-frontend/         # React 18 + Vite + TypeScript
    ├── src/
    │   ├── context/           # AuthContext — global state
    │   ├── pages/
    │   │   ├── AdminPortal/   # Admin dashboard
    │   │   ├── Parent/        # Phụ huynh pages
    │   │   ├── TutorPortal/   # Gia sư pages
    │   │   └── Shared/        # ClassWorkspace, Messages
    │   ├── components/        # Shared components
    │   ├── utils/api.ts       # apiFetch() — auth header wrapper
    │   └── types/             # TypeScript types
    ├── .env.example           # Template biến môi trường
    └── .env.local             # Config thật (gitignored)
```

---

## 🔑 API Endpoints chính

### Auth
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/api/v1/auth/login` | Đăng nhập |
| POST | `/api/v1/auth/register` | Đăng ký |

### Users
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/users/{id}` | Lấy thông tin user |
| PUT | `/api/v1/users/{id}` | Cập nhật thông tin |
| POST | `/api/v1/users/{id}/change-password` | Đổi mật khẩu |

### Tutors
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/tutors` | Danh sách gia sư (có filter) |
| GET | `/api/v1/tutors/{id}` | Chi tiết gia sư |
| POST | `/api/v1/tutors/{id}/ekyc` | Nộp hồ sơ eKYC |

### Job Postings (Bài đăng tuyển gia sư)
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/posts` | Tất cả bài đăng RECRUITING |
| POST | `/api/v1/posts?userId={id}` | Tạo bài đăng mới |
| GET | `/api/v1/posts/parent/{userId}` | Bài đăng của phụ huynh |
| POST | `/api/v1/posts/{postId}/apply/{tutorId}` | Gia sư ứng tuyển |

### Class Sessions
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/class-sessions/tutor/{tutorId}` | Lớp của gia sư |
| GET | `/api/v1/class-sessions/parent/{userId}` | Lớp của phụ huynh |
| POST | `/api/v1/class-sessions/accept-applicant/{id}` | Phụ huynh chọn gia sư |

### Admin
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/admin/ekyc/pending` | Hồ sơ chờ duyệt |
| PUT | `/api/admin/ekyc/{id}/approve` | Duyệt hồ sơ |
| GET | `/api/admin/reports/revenue` | Báo cáo doanh thu |
| GET | `/api/admin/users` | Danh sách user |

---

## 👤 Dữ liệu mẫu & Tài khoản test

> **Tự động sinh dữ liệu:** Hệ thống được tích hợp sẵn `DataInitializer`. Khi bạn chạy Backend lần đầu tiên (database `users` trống), Spring Boot sẽ tự động seed toàn bộ dữ liệu mẫu bao gồm: môn học, tài khoản test, hồ sơ gia sư (đã eKYC), bài đăng tìm gia sư và đánh giá (testimonials).

**Tài khoản Test có sẵn:**
- **Admin:** `admin@studyhub.vn` / `Admin@123`
- **Phụ huynh 1:** `nguyenthimai@gmail.com` / `Parent@123`
- **Phụ huynh 2:** `tranthihuong@gmail.com` / `Parent@123`
- **Gia sư 1 (Đã duyệt):** `tutorminh@gmail.com` / `Tutor@123`
- **Gia sư 2 (Đã duyệt):** `tutorlinhchi@gmail.com` / `Tutor@123`
- **Gia sư 3 (Chờ duyệt):** `tutorhung@gmail.com` / `Tutor@123`

**Roles:**
- `ADMIN` — Quản trị viên hệ thống
- `TUTOR` — Gia sư  
- `PARENT` — Phụ huynh

---

## 🛠️ Development Tips

### Frontend
```bash
# Kiểm tra TypeScript errors
npm run build

# Lint code
npm run lint
```

### Backend
```bash
# Build JAR
./mvnw package -DskipTests

# Chạy với profile cụ thể
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### Thêm fetch request mới (Frontend)
```typescript
// ✅ ĐÚNG — Dùng apiFetch (tự động gắn Authorization header)
import { apiFetch } from '../../utils/api';
const res = await apiFetch('/some-endpoint');

// ❌ SAI — Dùng fetch trực tiếp sẽ không có auth header
const res = await fetch('http://localhost:8080/api/v1/some-endpoint');
```

---

## 🚀 Deployment (Coming Soon)

- **Frontend:** Vercel (auto-deploy từ GitHub `main` branch)
- **Backend:** Railway (Docker container)
- **Database:** Railway MySQL (persistent storage)

Xem file `deployment-plan.md` để biết chi tiết.

---

## 📝 Contributing

1. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
2. Commit thường xuyên với message rõ ràng
3. Tạo Pull Request vào `main`

---

## ⚠️ Lưu ý quan trọng

- **KHÔNG** commit `application.properties` có credentials thật
- **KHÔNG** commit `.env.local` 
- Dùng `application-example.properties` và `.env.example` làm template
- `spring.jpa.hibernate.ddl-auto=create` chỉ dùng lần đầu setup DB
