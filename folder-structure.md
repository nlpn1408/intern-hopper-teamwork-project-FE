./
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── app/                    # Các route và layout
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Trang chủ
│   │   ├── login/
│   │   │   └── page.tsx        # Trang đăng nhập
│   ├── components/             # Các components UI
│   │   ├── common/             # Components dùng chung
│   │   │   └── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── ui/                 # Components UI có thể tái sử dụng (shadcn/ui)
│   │   │   └── Button.tsx
│   │   │   └── Input.tsx
│   │   └── Navbar.tsx          # Component Navbar
│   ├── features/               # Chứa các tính năng của ứng dụng
│   │   ├── auth/               # Quản lý xác thực
│   │   │   ├── components/
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts  # Gọi API xác thực
│   │   │   └── types.ts
│   │   ├── user/               # Quản lý người dùng
│   │   │   ├── components/
│   │   │   │   └── UserProfile.tsx
│   │   │   ├── services/
│   │   │   │   └── user.service.ts  # Gọi API người dùng
│   │   │   └── types.ts
│   ├── stores/                 # Quản lý trạng thái (Redux, Zustand)
│   │   └── user.store.ts
│   ├── types/                  # Các kiểu dữ liệu
│   │   └── user.ts
│   ├── utils/                  # Các hàm tiện ích
│   │   ├── api.ts              # Gọi API
│   │   └── helpers.ts
├── .env.development
├── .env.production
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
