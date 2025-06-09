<div align="center">

# Tuka

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Demo](#) | [Report Bug](#) | [Request Feature](#)

</div>

## 🛠️ Technologies

### Frontend

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Database**: [postgres](https://neon.com/)
- **ORM**: [Prisma](https://www.prisma.io)
- **Authentication**: [Better-auth](https://www.better-auth.com/)
- **Media**: [Cloudinary](https://cloudinary.com/)

## 🚀 Getting Started

### 1. Clone the repository

```
bash
git clone https://github.com/blckfrost/tuka.git
cd tuka
```

### 2. Install Dependencies

```bash
npm install

# or
pnpm install
```

### 3. Set up your environment variables

Create a `.env` file at the root of the project and add the following

```env
DATABASE_URL=your_postgres_connection_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
AUTH_SECRET=your_auth_secret
AUTH_URL=your_better_auth_url
```

### 4. Generate and migrate database

```
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the development server

```
npm run dev

# or
pnpm dev
```

Open https://localhost:3000

## Contributing

Contributions are welcome, I guess.

1. Fork the project
2. Create your feature branch (`git checkout -b feat`)
3. Commit your changes (`git commit -m 'add feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request

## Licence

Distibuted under the MIT Licence
