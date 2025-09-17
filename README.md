<p align="center">
  <img src="https://tse2.mm.bing.net/th/id/OIP.BrWDIMO4_5nouY26XZecMwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" width="200" />
</p>

<p align="center">
  <img src="https://via.placeholder.com/300x200?text=React+Home+Page" width="300" style="margin: 10px;" />
  <img src="https://via.placeholder.com/300x200?text=React+Product+Detail" width="300" style="margin: 10px;" />
  <img src="https://via.placeholder.com/300x200?text=React+Cart+Page" width="300" style="margin: 10px;" />
  <img src="https://via.placeholder.com/300x200?text=React+Checkout+Page" width="300" style="margin: 10px;" />
</p>

# 🍏 Apple Store E-Commerce


# 🍏 Apple Store E-Commerce

Website thương mại điện tử mô phỏng Apple Store, cho phép khách hàng duyệt sản phẩm, thêm giỏ hàng, đặt hàng và thanh toán.  
Admin có thể quản lý sản phẩm, người dùng và đơn hàng.

---

## ✨ Tính năng nổi bật

### 👤 Người dùng (Customer)
- Đăng ký / đăng nhập / đăng xuất
- Xem danh sách sản phẩm, chi tiết sản phẩm
- Thêm / xóa sản phẩm vào giỏ hàng
- Đặt hàng và thanh toán (COD, MoMo)
- Xem lịch sử đơn hàng
- Thông báo toast trực quan (React Toastify)

### 🛠️ Admin
- Đăng nhập quản trị
- Thêm / sửa / xóa sản phẩm
- Quản lý đơn hàng
- Quản lý người dùng

---

## 🛠️ Công nghệ sử dụng

### **Frontend**
- ⚛️ ReactJS (Vite)
- 🎨 TailwindCSS
- 🔥 Zustand (quản lý state giỏ hàng, auth, order)
- 🚦 React Router
- 📡 Axios
- 🎉 React Toastify
- ✨ AOS (scroll animation)

### **Backend**
- 🐱 NestJS
- 🍃 MongoDB + Mongoose
- ☁️ Cloudinary (upload ảnh)
- 🔑 JWT Authentication
- 🚀 RESTful API

---

## 📦 Cài đặt & chạy dự án
git clone https://github.com/quangBig/Apple_Store_Ecomerce.git
cd Apple_Store_Ecomerce
2. Backend (NestJS + MongoDB)
bash
cd be-apple-store
npm install
npm run start:dev
🔑 Tạo file .env trong be-apple-store/:
env
MONGODB_URI=mongodb://localhost:27017/apple_store
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
👉 API chạy ở http://localhost:3000

3. Frontend (React + Vite)
bash
cd fe-apple-store
npm install
npm run dev
👉 Website chạy ở http://localhost:5173
📂 Cấu trúc dự án
Backend
be-apple-store/
├─ src/
│  ├─ modules/
│  │  ├─ auth/          # Xác thực người dùng
│  │  ├─ users/         # Quản lý người dùng
│  │  ├─ products/      # Quản lý sản phẩm
│  │  ├─ orders/        # Quản lý đơn hàng
│  │  └─ cart/          # Giỏ hàng
│  ├─ main.ts
│  └─ app.module.ts
├─ .env
└─ package.json
Frontend
fe-apple-store/
├─ src/
│  ├─ assets/           # Hình ảnh tĩnh
│  ├─ components/       # Header, Footer, ProductCard,...
│  ├─ pages/            # Home, ProductDetail, Cart, Checkout, Admin
│  ├─ stores/           # Zustand store (cart, auth, order)
│  ├─ lib/              # axios instance
│  └─ App.jsx
├─ .env
└─ package.json
🎥 Giao diện demo (React UI)
Trang chủ
Chi tiết sản phẩm
Giỏ hàng & Thanh toán
Admin Dashboard
⚡ Các bước sử dụng
Chạy backend + frontend song song.
Tạo tài khoản hoặc đăng nhập bằng tài khoản sẵn có.
Chọn sản phẩm → Thêm vào giỏ hàng.
Tiến hành đặt hàng (COD hoặc MoMo).
Kiểm tra đơn hàng trong trang cá nhân.
Admin đăng nhập để quản lý sản phẩm & đơn hàng.
