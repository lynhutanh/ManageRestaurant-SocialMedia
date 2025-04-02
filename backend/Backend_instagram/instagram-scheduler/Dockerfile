# Sử dụng Node.js phiên bản 18 làm image cơ bản
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 3000
EXPOSE 5000

# Chạy server khi container khởi động
CMD ["node", "server.js"]
