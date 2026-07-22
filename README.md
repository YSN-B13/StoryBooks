<![CDATA[<div align="center">

# 📖 StoryBooks

**A full-stack web application for creating, sharing, and managing personal stories with public and private visibility.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

StoryBooks is a server-rendered web application built with Node.js, Express, and MongoDB. It allows authenticated users to write, edit, and share stories publicly or keep them private. Authentication is handled via Google OAuth 2.0, providing a seamless sign-in experience.

---

## 🚀 Features

- **Google OAuth 2.0 Authentication** — Secure sign-in with your Google account via Passport.js
- **Create, Read, Update, Delete Stories** — Full CRUD functionality for personal stories
- **Public & Private Stories** — Control who sees your stories with built-in visibility settings
- **Story Search** — Find stories by title with case-insensitive search
- **User Dashboard** — A personalized dashboard showing all your stories at a glance
- **Responsive UI** — Clean, styled interface using Handlebars templates and Materialize CSS
- **Session Persistence** — Server sessions stored in MongoDB via `connect-mongo`
- **Custom Handlebars Helpers** — Date formatting, text truncation, HTML stripping, and more

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express 5 |
| **Templating** | Handlebars (express-handlebars) |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | Passport.js, Google OAuth 2.0 |
| **Session Store** | connect-mongo |
| **Styling** | Materialize CSS, custom CSS |
| **Logging** | Morgan |
| **Date Formatting** | Moment.js |
| **Dev Tools** | Nodemon, cross-env |

---

## 📐 Project Architecture

```
Client (Browser)
      │
      ▼
   Express.js ──────► Handlebars Templates (Server-Side Rendering)
      │
      ├── Passport.js (Google OAuth 2.0)
      │
      ├── Routes
      │     ├── /           → Landing page / Login
      │     ├── /auth       → Google OAuth flow
      │     ├── /dashboard  → User dashboard
      │     └── /stories    → Story CRUD + Search
      │
      ├── Middleware
      │     ├── ensureAuth  → Protected routes
      │     └── ensureGuest → Redirects authenticated users
      │
      └── MongoDB (Mongoose)
            ├── Users (Google profile data)
            └── Stories (title, body, status, author)
```

The application follows a traditional MVC-like pattern. Express handles routing and middleware, Handlebars renders server-side views, and Mongoose manages MongoDB interactions. Passport.js intercepts the Google OAuth callback to create or retrieve user sessions.

---

## 📂 Folder Structure

```
StoryBooks/
│
├── app.js                  # Application entry point & Express configuration
├── package.json
├── .env                    # Environment variables (not committed)
├── .gitignore
│
├── config/
│   ├── db.js               # MongoDB connection setup
│   └── passport.js         # Google OAuth strategy configuration
│
├── helpers/
│   └── hbs.js              # Handlebars custom helpers
│
├── middleware/
│   └── auth.js             # ensureAuth & ensureGuest middleware
│
├── models/
│   ├── User.js             # User schema (Google profile)
│   └── Story.js            # Story schema (title, body, status)
│
├── routes/
│   ├── index.js            # Landing page & dashboard routes
│   ├── auth.js             # Google OAuth login/logout routes
│   └── stories.js          # Story CRUD & search routes
│
├── views/
│   ├── login.hbs           # Login/landing page
│   ├── dashboard.hbs       # User dashboard
│   ├── layouts/
│   │   ├── main.hbs        # Default layout
│   │   └── login.hbs       # Login page layout
│   ├── stories/
│   │   ├── add.hbs         # Add story form
│   │   ├── edit.hbs        # Edit story form
│   │   ├── index.hbs       # All public stories
│   │   └── show.hbs        # Single story view
│   ├── partials/
│   │   ├── _header.hbs     # Navigation header
│   │   └── _add_btn.hbs    # Floating add button
│   └── error/
│       ├── 404.hbs         # Not found page
│       └── 500.hbs         # Server error page
│
├── public/
│   └── css/
│       └── style.css       # Custom styles
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [Google Cloud Console](https://console.cloud.google.com/) project with OAuth 2.0 credentials

### Step 1: Clone the repository

```bash
git clone https://github.com/YSN-B13/StoryBooks.git
cd StoryBooks
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following variables (see [Environment Variables](#-environment-variables) for details):

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Step 4: Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Set **Authorized redirect URIs** to: `http://localhost:3000/auth/google/callback`
6. Copy the **Client ID** and **Client Secret** into your `.env` file

### Step 5: Run the application

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | The port the server listens on | No (defaults to `3000`) |
| `MONGO_URI` | MongoDB connection string (local or Atlas) | Yes |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID from Google Cloud Console | Yes |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret from Google Cloud Console | Yes |

> **Note:** Never commit your `.env` file to version control. It is already included in `.gitignore`.

---

## 📖 Usage

### Signing In

Navigate to [http://localhost:3000](http://localhost:3000). You will see the login page. Click **"Sign in with Google"** to authenticate. On first login, your Google profile will be automatically saved to the database.

### Managing Stories

- **Dashboard** — After signing in, you land on your personal dashboard showing all stories you've created
- **Add a Story** — Click the floating **+** button or navigate to `/stories/add` to create a new story
- **View Stories** — Navigate to `/stories` to browse all public stories from every user
- **Edit a Story** — Click the edit icon on any story you own
- **Delete a Story** — Use the delete button on your dashboard or story page
- **Search** — Use the search bar on the stories page to filter by title

### Story Visibility

| Status | Who Can See It |
|---|---|
| `public` | All authenticated users |
| `private` | Only the author |

---

## 🌐 API Routes

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/google` | Initiates Google OAuth login flow |
| `GET` | `/auth/google/callback` | Google OAuth callback (redirects to dashboard) |
| `GET` | `/auth/logout` | Logs out the current user and redirects to home |

### Story Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/stories` | View all public stories | Yes |
| `GET` | `/stories/add` | Show the add story form | Yes |
| `POST` | `/stories` | Create a new story | Yes |
| `GET` | `/stories/:id` | View a single story | Yes |
| `GET` | `/stories/edit/:id` | Show the edit form for a story | Yes |
| `PUT` | `/stories/:id` | Update an existing story | Yes |
| `DELETE` | `/stories/:id` | Delete a story | Yes |
| `GET` | `/stories/user/:userId` | View public stories by a specific user | Yes |
| `GET` | `/stories/search?query=` | Search stories by title | Yes |

### Page Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/` | Landing / login page | No (guest only) |
| `GET` | `/dashboard` | User dashboard with personal stories | Yes |

---

## 📸 Screenshots

> Screenshots will be added soon.

<!-- 
Add screenshots here using the following format:

![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Story Feed](screenshots/story-feed.png)
![Add Story](screenshots/add-story.png)
-->

---

## 🗺 Future Improvements

- [ ] Add user profile page with bio and avatar
- [ ] Implement story categories and tags
- [ ] Add rich text editor for story content
- [ ] Implement pagination for the story feed
- [ ] Add likes and comments on stories
- [ ] Add email notification support
- [ ] Implement story sharing via link
- [ ] Add dark mode theme
- [ ] Write unit and integration tests
- [ ] Deploy to a cloud platform (e.g., Railway, Render, or Vercel)
- [ ] Add rate limiting and security headers

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

Please make sure your code follows the existing style and that the application works correctly before submitting.

---

## 👤 Author

**YSN B13**

- GitHub: [@YSN-B13](https://github.com/YSN-B13)

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **YSN B13**

</div>
]]>