🚀 Panduan Instalasi & Menjalankan Backend
📦 Instalasi Dependensi

Jalankan perintah berikut untuk menginstal semua package yang dibutuhkan:

npm install ||
npm install ts-node typescript @types/node --save-dev ||
npm install express cors ||
npm install mysql2 ||
npm install --save-dev @types/express @types/cors @types/mysql2 ||

🌱 Seeder Data ke Database MySQL

Untuk melakukan seeding data ke database, gunakan perintah berikut:

npx ts-node src/seed/seedUMKM.ts ||


Pastikan database sudah dibuat sebelum menjalankan perintah ini.

▶️ Menjalankan Backend

Gunakan perintah berikut untuk menjalankan server backend:

npm run dev ||