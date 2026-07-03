# Trần Quang Nhật — Marketing Portfolio V2

Phiên bản website này được tạo từ file nội dung Portfolio đã cập nhật.

## Nội dung đã đưa vào website

- Thông tin cá nhân, headline và định hướng nghề nghiệp
- Các chỉ số nổi bật: 3+ năm, tăng trưởng 2,3×, Top 4, ngân sách US$50K+
- Kinh nghiệm tại Epicure Vina
- Thông tin cơ bản tại Maybe Group và Saint L'Beau
- Case study Christmas Challenge with Breville
- Các dự án SMEG, Lavazza và E-commerce ở trạng thái đang hoàn thiện
- Kỹ năng theo từng nhóm
- Email và GitHub Profile
- Giao diện song ngữ Việt–Anh
- Chế độ sáng–tối
- Responsive trên điện thoại

## Cấu trúc thư mục

```text
tran-quang-nhat-portfolio-v2/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── images/
    │   ├── profile-sample.svg
    │   ├── breville-christmas-sample.svg
    │   ├── ecommerce-sample.svg
    │   ├── smeg-sample.svg
    │   ├── lavazza-sample.svg
    │   ├── social-preview.png
    │   └── favicon.png
    └── documents/
```

## Cách cập nhật lên GitHub Pages

1. Giải nén file ZIP.
2. Vào repository `tranquangnhat-mkt.github.io`.
3. Chọn **Add file → Upload files**.
4. Kéo `index.html`, `README.md` và toàn bộ thư mục `assets` vào.
5. Commit với nội dung: `Update portfolio website from content form`.
6. Chờ tab **Actions** xuất hiện dấu tích xanh.
7. Mở `https://tranquangnhat-mkt.github.io` và nhấn `Ctrl + F5`.

## Cách thay hình ảnh mẫu

Giữ nguyên tên file hoặc sửa đường dẫn trong `index.html`.

- Ảnh cá nhân: `assets/images/profile-sample.svg`
- Christmas Challenge: `assets/images/breville-christmas-sample.svg`
- E-commerce: `assets/images/ecommerce-sample.svg`
- SMEG: `assets/images/smeg-sample.svg`
- Lavazza: `assets/images/lavazza-sample.svg`

Bạn có thể thay file `.svg` bằng ảnh `.jpg` hoặc `.webp`, nhưng cần sửa phần mở rộng trong `index.html`.

## Cách gắn CV

1. Đặt file CV vào:

```text
assets/documents/Tran-Quang-Nhat-Marketing-CV.pdf
```

2. Trong `index.html`, tìm nút có `id="cvButton"` và thay bằng:

```html
<a class="button button-secondary"
   href="assets/documents/Tran-Quang-Nhat-Marketing-CV.pdf"
   target="_blank"
   rel="noopener">
  Tải CV
</a>
```

## Nội dung cần kiểm tra trước khi công khai
GitHub Pages republish: 2026-07-03
- LinkedIn hiện vẫn là dữ liệu mẫu nên chưa hiển thị.
- Số điện thoại trong file Excel chưa đủ rõ ràng nên không được đưa lên website.
- Hình ảnh dự án hiện là hình minh họa.
- Case study của SMEG, Lavazza và E-commerce mới chỉ có phần tóm tắt.
Deployment refresh: 2026-07-03
