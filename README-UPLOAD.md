# SMEG Vietnam Digital Case Study — Upload Guide

## Phạm vi gói cập nhật

Gói này chỉ cập nhật trang dự án SMEG và các tài nguyên trực tiếp phục vụ trang đó. Không thay thế `index.html` hoặc các trang dự án khác.

```text
patch/
├── projects/
│   └── smeg-digital-brand-system.html
├── assets/
│   ├── css/
│   │   ├── case-studies-v22.css
│   │   └── smeg-case-study.css
│   ├── js/
│   │   ├── case-studies-v22.js
│   │   └── smeg-case-study.js
│   ├── fonts/montserrat/
│   └── images/projects/smeg-digital-brand-system-v22/
├── src/
│   └── smeg-case-study.css
└── tailwind.config.js
```

## Cách upload lên GitHub

1. Giải nén ZIP.
2. Mở repository `tranquangnhat-mkt.github.io`.
3. Upload toàn bộ nội dung **bên trong** thư mục `patch` vào thư mục gốc của repository.
4. Chấp nhận thay thế các file trùng tên.
5. Commit với nội dung: `Update SMEG Vietnam digital case study layout`.
6. Chờ GitHub Actions hoàn tất, sau đó mở lại trang dự án và nhấn `Ctrl + F5`.

Tổng số file trong gói dưới giới hạn 100 file của giao diện upload GitHub.

## Lưu ý đường dẫn

Giữ nguyên cây thư mục. Trang HTML đang gọi ảnh tại:

```text
assets/images/projects/smeg-digital-brand-system-v22/
```

Không đưa thư mục `smeg-digital-brand-system-v22` ra ngoài thư mục `assets/images/projects/`.

## Tailwind CSS

- Mã nguồn Tailwind: `src/smeg-case-study.css`.
- CSS đã biên dịch để dùng trực tiếp trên GitHub Pages: `assets/css/smeg-case-study.css`.
- Không cần cài npm hoặc chạy build nếu chỉ upload gói này.

Nếu cần biên dịch lại sau khi chỉnh sửa Tailwind:

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i ./src/smeg-case-study.css -o ./assets/css/smeg-case-study.css --minify
```

## Kiểm tra sau khi deploy

- Header trong suốt khi ở Hero và chuyển nền khi cuộn.
- Hero desktop/mobile dùng đúng ảnh tương ứng.
- Chuyển ngôn ngữ `VI | EN` hoạt động.
- Carousel audit, Metricool, content system, global-to-local và analytics tự chạy, có nút điều hướng và hỗ trợ vuốt.
- Click ảnh mở lightbox.
- Trang không xuất hiện thanh cuộn ngang trên điện thoại.
