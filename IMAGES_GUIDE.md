# Hướng dẫn thay thế ảnh

## Vị trí các ảnh cần thay thế:

### 1. Hero Image (Trang chủ)
- **File**: `src/app/page.tsx`
- **Dòng**: ~96
- **Thay thế**: URL placeholder bằng URL ảnh thật hoặc đặt ảnh tại `/public/hero-nails.jpg` và dùng `/hero-nails.jpg`

### 2. Gallery Images (Trang chủ - Section Gallery)
- **File**: `src/components/gallery.tsx`
- **Dòng**: 5-12
- **Có 6 ảnh**: Nail Art 1-6
- **Thay thế**: URL placeholder bằng URL ảnh thật hoặc đặt ảnh tại `/public/gallery/nail-1.jpg` đến `nail-6.jpg`

### 3. Our Work Images (Trang Tác phẩm)
- **File**: `src/app/our-work/page.tsx`
- **Dòng**: 3-40
- **Có 6 ảnh**: Soft Nude, Classic Red, French Tip, Floral Art, Geometric, Ombre
- **Thay thế**: URL placeholder bằng URL ảnh thật

## Cách thay thế:

### Option 1: Sử dụng ảnh local
1. Đặt ảnh vào thư mục `/public/`
2. Thay URL placeholder bằng đường dẫn `/your-image.jpg`

### Option 2: Sử dụng URL từ CDN/Cloud Storage
1. Upload ảnh lên Cloud Storage (AWS S3, Cloudinary, etc.)
2. Thay URL placeholder bằng URL từ CDN

### Option 3: Sử dụng Unsplash (miễn phí)
1. Tìm ảnh nail art trên Unsplash
2. Copy URL ảnh và thay thế

## Kích thước ảnh đề xuất:
- **Hero**: 800x1000px (tỷ lệ 4:5)
- **Gallery**: 600x600px (vuông)
- **Our Work**: 600x800px (tỷ lệ 3:4)

## Lưu ý:
- Đảm bảo ảnh có chất lượng tốt
- Tối ưu kích thước file để tải nhanh
- Sử dụng format WebP hoặc JPG
- Đã cấu hình Next.js để cho phép load ảnh từ `placehold.co` và `images.unsplash.com`

