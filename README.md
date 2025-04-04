# 🎟️ Events Booking

 

Welcome to the **Events Booking** – a modern React-based interface for users to browse events, buy tickets, and for admins to manage users, events, and purchases.

> 🔗 This app is designed to work with the [Events Booking Backend](https://github.com/MaximeNGY/4WEBD).

---

## 🚀 Features

- 🔐 Authentication (Login, Register, JWT-based)
- 🎫 Buy tickets for events
- 📅 Dashboard with upcoming & past tickets
- ⚙️ Admin panel for managing:
  - Events
  - Users
  - Purchase History
- 🧠 Role-based access control
- 🧼 Fully styled with Tailwind CSS

---

## 📦 Tech Stack

- **Frontend**: React (Vite)
- **Routing**: React Router
- **HTTP**: Axios
- **State**: Context API
- **Styling**: Tailwind CSS
- **Auth**: JWT via `localStorage`
---

## 📁 Project Structure

```markdown
client/
├── public/               # Static assets (e.g., index.html)
├── src/
│   ├── components/       # Shared UI components (e.g., Navbar)
│   ├── context/          # Auth context for managing user state
│   ├── pages/            # Page components (Home, Login, Admin, etc.)
│   └── App.jsx           # Main routing and layout
└── package.json          # Project metadata and dependencies
```

---

## 🛠️ Setup (Development)

Make sure you have **Node.js (v18+)** and **npm** installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The app will be running at the default Vite development server URL:
http://localhost:5173