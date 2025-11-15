# Hướng dẫn chuyển sang PostgreSQL Neon.tech

## Bước 1: Tạo database trên Neon.tech

1. Truy cập https://console.neon.tech
2. Đăng ký/Đăng nhập tài khoản
3. Tạo project mới
4. Copy **Connection String** từ dashboard

## Bước 2: Cập nhật .env

Tạo file `.env` (nếu chưa có) và thêm:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

Thay thế connection string bằng connection string từ Neon.tech của bạn.

## Bước 3: Chạy migration

```bash
# Generate Prisma Client
npm run db:generate

# Push schema lên database (hoặc dùng migrate)
npm run db:push

# Hoặc tạo migration (khuyến nghị cho production)
npm run db:migrate
```

## Bước 4: Seed dữ liệu

```bash
npm run db:seed
```

## Lưu ý

- **Enums**: PostgreSQL hỗ trợ enums, nên `BookingStatus` và `Role` đã được chuyển từ String sang Enum
- **Connection Pooling**: Neon.tech hỗ trợ connection pooling, có thể thêm `?pgbouncer=true` vào connection string nếu cần
- **SSL**: Neon.tech yêu cầu SSL, nên connection string phải có `?sslmode=require`

## Scripts có sẵn

- `npm run db:push` - Push schema lên database (development)
- `npm run db:migrate` - Tạo migration (production)
- `npm run db:generate` - Generate Prisma Client
- `npm run db:seed` - Seed dữ liệu mẫu
- `npm run db:studio` - Mở Prisma Studio để xem/quản lý database

