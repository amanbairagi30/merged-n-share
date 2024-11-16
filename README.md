# Merged&Share

[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-configured-blue)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-pink)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)

Link: https://mergedandshare.in/

Merged&Share is a platform that allows users to fetch their merged pull requests (PRs) from any public GitHub organization. It lets users showcase and share their open-source contributions globally as proof of work.

## Features

- Fetch merged PRs from public GitHub repositories.
- Display and share contributions.
- User-friendly interface.

## Tech Stack

- Next.js 14+
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- NextAuth.js
- Zustand (State Management)
- Shadcn-UI


## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (running with correct connection details)
- npm (or yarn)


## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amanbairagi30/merged-n-share.git
   cd merged-n-share
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env`
   - Fill in the required environment variables. See **Environment Variables** section below.

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

## Available Scripts

Currently, the `package.json` does not define any custom scripts.  The following standard npm scripts are available:

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.


## Environment Variables

Create a `.env` file based on `.env.example` and populate the following variables:

- `DATABASE_URL`:  Your PostgreSQL connection string.  Example: `postgresql://user:password@host:port/database`
- `NEXTAUTH_SECRET`: A secret used to encrypt session data. Generate a random string.
- `GITHUB_ID`: Your GitHub application's Client ID.
- `GITHUB_SECRET`: Your GitHub application's Client Secret.
-  Add any other environment variables required by your application here.  Clearly document their purpose.


## Development Guide

After completing the installation and setup, run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment Instructions

This project is Docker configured.  While the specific Docker commands are not included in the project yet, you will likely need to build a Docker image and then run it.  Add detailed Docker instructions here once finalized.  Example:

```bash
# Build the Docker image
docker build -t merged-and-share .

# Run the Docker container
docker run -p 3000:3000 merged-and-share
```

Further deployment details (e.g., for specific cloud providers) should be added here as needed.


## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.  Please ensure your code follows the existing style and include tests for any new features.


## License

This project is licensed under the MIT License.
