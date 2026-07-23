# Trần Quang Nhật — Marketing Portfolio V2

Phiên bản website này được tạo từ file nội dung Portfolio đã cập nhật.

## Nội dung đã đưa vào website

- Thông tin cá nhân, headline và định hướng nghề nghiệp
- Các chỉ số nổi bật: 3+ năm, tăng trưởng 2,3×, Top 4, ngân sách US$50K+
- Kinh nghiệm tại Epicure Vina
- Thông tin cơ bản tại Maybe Group và Saint L'Beau
- 6 case study hoàn chỉnh: Breville Christmas Challenge, SMEG Digital Brand System,
  E-commerce Growth & Marketplace Operations, B2B Event Marketing & Trade Show Activation
  EPICURE Website Replatforming và Ông Chú Plant-Based
- Kỹ năng theo từng nhóm
- Email và GitHub Profile
- Giao diện song ngữ Việt–Anh
- Chế độ sáng–tối
- Responsive trên điện thoại

## Cấu trúc thư mục

```text
tranquangnhat-mkt.github.io/
├── index.html
├── README.md
├── projects/
│   ├── breville-christmas-challenge.html
│   ├── smeg-digital-brand-system.html
│   ├── ecommerce-growth-marketplace-operations.html
│   ├── b2b-event-marketing-trade-show-activation.html
│   ├── epicure-website-replatforming.html
│   └── ong-chu-plant-based.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── images/projects/
    │   ├── breville-christmas-challenge/
    │   ├── smeg-digital-brand-system/
    │   ├── ecommerce-growth/
    │   ├── b2b-event-activation/
    │   ├── epicure-website-replatforming/
    │   └── ong-chu-plant-based/
    ├── videos/projects/
    │   └── ong-chu-plant-based/
    └── documents/
```

## Cách cập nhật lên GitHub Pages

1. Giải nén file ZIP.
2. Vào repository `tranquangnhat-mkt.github.io`.
3. Chọn **Add file → Upload files**.
4. Kéo toàn bộ nội dung đã giải nén, bao gồm `index.html`, thư mục `assets`,
   thư mục `projects` và workflow trong `.github`, vào repository.
5. Commit với nội dung: `Add Vinamit product films to Ong Chu Plant-Based case study`.
6. Chờ tab **Actions** xuất hiện dấu tích xanh.
7. Mở `https://tranquangnhat-mkt.github.io` và nhấn `Ctrl + F5`.

## Hình ảnh dự án

Hình ảnh của từng case study được lưu trong thư mục riêng tại `assets/images/projects/`.
Khi thay ảnh, nên giữ nguyên tên file để không phải sửa đường dẫn trong HTML.

Hai video sản phẩm của case study Ông Chú Plant-Based đã được tối ưu cho web và lưu tại
`assets/videos/projects/ong-chu-plant-based/`. Không thay thế bằng file 4K gốc vì dung lượng
lớn hơn giới hạn tải lên qua giao diện web GitHub.

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
- Kiểm tra lại các URL bên ngoài nếu nền tảng social thay đổi hoặc gỡ bài viết.
- Các chỉ số không có dữ liệu lưu trữ được trình bày theo phạm vi đã xác minh,
  không bổ sung số liệu suy đoán.
Deployment refresh: 2026-07-03
