# AstroPair ✨

Find your people, written in the stars. An astrology-based compatibility matching app built with Next.js.

## Features

- 🌟 **Astrological Profile Creation** - Calculate Sun, Moon, and Rising signs from birth data
- 💫 **Compatibility Matching** - Advanced compatibility scoring based on astrological signs
- 🔐 **Secure Authentication** - Custom JWT-based authentication system
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT implementation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use Neon for serverless)

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd astropair
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL and JWT secret:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment on Vercel

### Environment Variables

Set these environment variables in your Vercel dashboard:

- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `NEXTAUTH_URL` - Your deployed app URL (e.g., `https://your-app.vercel.app`)

### Deploy Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy! Vercel will automatically:
   - Install dependencies
   - Generate Prisma client
   - Build the Next.js app

### Database Setup

For production, you'll need a PostgreSQL database. Recommended options:

- **Neon** (Serverless PostgreSQL) - Free tier available
- **Supabase** - PostgreSQL with additional features
- **Railway** - Simple PostgreSQL hosting
- **PlanetScale** - MySQL alternative

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard page
│   ├── login/          # Login page
│   └── register/       # Registration page
├── contexts/           # React contexts
├── lib/               # Utility functions
│   ├── auth.ts        # Authentication utilities
│   ├── astrology.ts   # Astrological calculations
│   └── prisma.ts      # Database client
└── middleware.ts      # Next.js middleware

prisma/
└── schema.prisma      # Database schema
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
