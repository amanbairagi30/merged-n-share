
# Merged&Share 
Link : https://mergedandshare.in/

**Merged&Share** is a platform that allows users to fetch their merged pull requests (PRs) from any organisations of github. It lets users showcase and share their open-source contributions globally as proof of work.

## Features

- Fetch merged PRs from any public GitHub repository.
- Display contributions and share them with others.
- User-friendly interface with easy navigation.

## Tech Stack

- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma**
- **Tailwind CSS**
- **NextAuth.js**
- **Zustand** (State management)
- **Shadcn-UI**

## Getting Started

To get the project running locally, follow these steps:

### Prerequisites

- **Node.js** (version 18 or higher)
- **PostgreSQL** (Ensure PostgreSQL is running and you have the connection details)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/amanbairagi30/merged-n-share.git
   cd merged-n-share
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Copy the `.env.example` file and rename it to `.env`.
   - Fill in the required environment variables (e.g., GitHub API token, database connection, etc.).

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

Then, start the server:

```bash
npm start
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
