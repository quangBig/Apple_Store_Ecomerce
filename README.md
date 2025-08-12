<p align="center">
  <img src="https://tse2.mm.bing.net/th/id/OIP.BrWDIMO4_5nouY26XZecMwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" width="200" style="margin-right: 20px;" />
</p>
# Apple Store E-Commerce

## 🛠️ Công nghệ sử dụng
- **Backend:** NestJS, MongoDB, Cloudinary, JWT Auth
---

## 📦 be-apple-store (Backend)

- NestJS RESTful API cho quản lý sản phẩm và người dùng
- Xác thực, phân quyền (chỉ admin được thêm/sửa/xóa sản phẩm)
- Upload ảnh lên Cloudinary
- Kết nối MongoDB qua Mongoose

### Chạy backend
```bash
cd be-apple-store
npm install
npm run start:dev

