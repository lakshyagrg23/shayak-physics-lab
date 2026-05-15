# Physics Lab - Interactive STEM Learning Simulation

A modern, interactive physics laboratory for rural students (grades 6–12) to learn electricity concepts through hands-on experimentation.

## 🎯 Vision

"Duolingo meets a futuristic physics lab" — An immersive, gamified, and educational experience that makes learning electricity concepts engaging and accessible.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/              # Images, icons, and static files
├── components/
│   ├── layout/          # Layout components (Header, Sidebar, etc)
│   ├── mission/         # Mission-specific components
│   ├── workspace/       # Workspace area components
│   └── ui/              # Reusable UI components
├── pages/               # Page components (routes)
├── hooks/               # Custom React hooks (future)
├── utils/               # Utility functions and helpers (future)
├── data/                # Static data and constants (future)
├── styles/              # Global styles and Tailwind config
├── App.jsx              # Main app component
└── main.jsx             # React entry point
```

## 🛣️ Routes

- `/` — Home page with mission introduction
- `/physics-lab` — Interactive physics lab interface

## 🎨 Design System

### Colors
- **Background**: Dark blue/black (`#0a0e27`)
- **Primary Accent**: Electric blue (`#00d4ff`)
- **Success Accent**: Neon green (`#39ff14`)
- **Glass Effect**: `rgba(255, 255, 255, 0.1)` with backdrop blur

### Components
- **Glass Panels**: Glassmorphism with subtle glow
- **Buttons**: Electric blue with hover glow effects
- **Text**: Glow effects for headings
- **Responsive**: Adapts seamlessly from mobile to desktop

## 🧩 Key Components

### Layout Components
- **MissionHeader** — Sticky top bar with mission statement
- **ComponentTray** — Left sidebar with available circuit components
- **WorkspaceArea** — Central lab table for circuit building
- **StatusBar** — Bottom footer with mission status, XP, and objectives

### Pages
- **HomePage** — Landing page with mission intro and launch button
- **PhysicsLabPage** — Main interactive lab interface

## 🔮 Upcoming Features

The foundation is ready for:

- ✅ Drag-and-drop component placement
- ✅ Wire connection logic
- ✅ Circuit validation
- ✅ Bulb glow animations
- ✅ Current flow visualization
- ✅ XP reward system
- ✅ Mission completion tracking

## 🛠️ Tech Stack

- **React** — UI library
- **Vite** — Build tool and dev server
- **React Router DOM** — Client-side routing
- **TailwindCSS** — Utility-first CSS framework
- **Zustand** — State management (prepared, not yet implemented)

## 📱 Responsive Design

The layout is fully responsive:
- **Desktop**: Sidebar + workspace + status bar
- **Tablet**: Adapted spacing and sidebar width
- **Mobile**: Horizontal component scroll, full-width workspace

## 🎓 Educational Features

- **Modern Interface**: Engaging, contemporary design
- **Immersive Experience**: Physics lab aesthetic
- **Gamified Learning**: XP system and mission-based progression
- **Mobile-Friendly**: Learn anywhere
- **Lightweight**: Optimized for rural bandwidth

## 📝 License

Educational project for rural STEM learning

---

**Ready to restore electricity to the village water pump!** 🔋⚡
