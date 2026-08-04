# Portfolio V22 — Six Case Studies

Gói này cập nhật sáu dự án còn lại trong portfolio:

1. Xây dựng website & tối ưu SEO cho EPICURE
2. Tổ chức sự kiện & quảng bá thương hiệu offline
3. Quản lý bán hàng đa kênh thương mại điện tử
4. Xây dựng và quản trị các kênh Digital cho SMEG Vietnam
5. Breville Christmas Challenge
6. Xây dựng nội dung kết hợp Affiliate Marketing

## Cách triển khai lên GitHub

1. Giải nén file ZIP.
2. Mở thư mục `patch`.
3. Upload toàn bộ nội dung bên trong `patch` vào thư mục gốc của repository.
4. Chấp nhận thay thế các file trùng tên.
5. Không xóa các file hoặc thư mục khác trong repository.

Patch chỉ thay `index.html`, sáu trang dự án và bổ sung asset/CSS/JS tương ứng. Trang `projects/ong-chu-plant-based.html` không nằm trong gói và không bị thay đổi.

## Tailwind source

CSS đã được biên dịch sẵn tại `assets/css/case-studies-v22.css`. Khi cần build lại:

```bash
npx tailwindcss@3.4.17 -i ./src/case-studies-v22.css -o ./assets/css/case-studies-v22.css --minify
```

Tạo lại sáu trang từ manifest:

```bash
node scripts/generate-v22-pages.mjs
```

Kiểm tra toàn bộ tài nguyên nội bộ và mức độ sử dụng asset:

```bash
node scripts/validate-v22.mjs
```

## Ghi chú triển khai

- Font Montserrat được lưu cục bộ; website không phụ thuộc Google Fonts.
- Ngôn ngữ mặc định là tiếng Việt; nút `VI | EN` đổi toàn bộ nội dung trang.
- Carousel tự chạy liên tục, centered/peek, giữ tỷ lệ ảnh và hỗ trợ kéo/vuốt.
- Logo nền trắng đã được chuyển thành PNG có nền trong suốt; logo có nền màu thương hiệu được giữ nguyên.
- Hai asset trắng `Migration Process` và `Platform Transition` được thay bằng layout HTML responsive.
- Ba video Affiliate hiện có được giữ trong `saint-lbeau/` và phát trực tiếp trên trang.
