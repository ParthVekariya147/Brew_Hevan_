# ☕ Brew Haven - Café Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

> A comprehensive full-stack café/restaurant management platform built with the MERN stack, featuring customer ordering, table booking, and powerful administrative tools.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Brew Haven** is a modern, full-featured café management system designed for small to medium-sized food establishments. The platform consists of three integrated applications:

1. **Customer Web App** - Browse menu, place orders, book tables
2. **Admin Dashboard** - Comprehensive business management tools
3. **RESTful API Backend** - Secure, scalable server architecture

Built with industry-standard technologies and following MVC architectural patterns, Brew Haven offers a complete solution for digital café operations.

---

## ✨ Features

### 🛍️ Customer Features
- 👤 **User Authentication** - Secure registration and login with JWT
- 🔐 **OTP Verification** - Email-based account verification
- 🔑 **Password Recovery** - Forgot password with OTP reset
- 📋 **Menu Browsing** - Browse categorized food & beverage menu
- 🛒 **Order Placement** - Add items to cart and place orders
- 📅 **Table Booking** - Reserve tables with date/time selection
- 📧 **Newsletter Subscription** - Stay updated with latest offers
- 💬 **Contact Form** - Direct communication channel
- 🖼️ **Photo Gallery** - View café ambiance and dishes

### 🔧 Admin Features
- 📊 **Dashboard Analytics** - Real-time business metrics and charts
- 📦 **Order Management** - View, update, and track customer orders
- 📝 **Menu Management** - CRUD operations for menu items (11 categories)
- 📦 **Inventory Tracking** - Monitor stock levels and costs
- 👥 **Staff Management** - Manage employees (Manager, Barista, Chef, Waiter)
- 📅 **Booking Management** - Handle table reservations
- 🖼️ **Image Upload** - Manage gallery images
- 📧 **Contact Submissions** - Review customer inquiries
- 📈 **Reports Generation** - Business analytics and insights

### 🔒 Security Features
- 🔐 JWT-based authentication
- 🔒 Bcrypt password hashing (12 rounds)
- 🛡️ Protected API routes
- 👥 Role-based access control (User/Admin)
- 📧 OTP-based email verification
- 🚫 CORS protection

---

## 🛠️ Tech Stack

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) **Node.js** - Runtime environment
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) **Express.js 4.19** - Web framework
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB Atlas** - Cloud database
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat) **Mongoose 8.4** - ODM library
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Dotenv** - Environment management

### Frontend (Customer App)
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React 18.2** - UI library
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite 5.4** - Build tool
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) **React Router v6** - Client-side routing
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap 5.3** - UI framework
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Admin Panel
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React 18.2** - UI library
- **Create React App** - Build setup
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **React Bootstrap** - UI components
- **Context API** - State management

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌────────────────────┐       ┌───────────────────────┐     │
│  │   Brew Haven       │       │   Admin Panel         │     │
│  │  (Customer App)    │       │  (Admin Dashboard)    │     │
│  │  React + Vite      │       │  React (CRA)          │     │
│  │  Port: 5000        │       │  Port: 3000           │     │
│  └──────────┬─────────┘       └──────────┬────────────┘     │
└─────────────┼────────────────────────────┼──────────────────┘
              │                            │
              │         HTTP REST API      │
              └────────────┬───────────────┘
                           │
              ┌────────────▼─────────────┐
              │    Application Layer     │
              │   Express.js Server      │
              │   MVC Architecture       │
              │   Port: 4000             │
              └────────────┬─────────────┘
                           │
              ┌────────────▼─────────────┐
              │     Data Layer           │
              │   MongoDB Atlas          │
              │   13 Collections         │
              │   (brew_haven DB)        │
              └──────────────────────────┘
```

### MVC Pattern
- **Models** - Mongoose schemas (13 models)
- **Views** - React components
- **Controllers** - Business logic handlers (9 controllers)
- **Routes** - API endpoint definitions (6 routers)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for email services)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ParthVekariya147/Brew_Haven_.git
cd Brew_Haven_
```

#### 2. Install Dependencies

**Option A: Install All at Once**
```bash
npm run install-all
```

**Option B: Install Individually**
```bash
# Backend
cd Backend
npm install

# Frontend (Customer App)
cd ../Brew_Haven
npm install

# Admin Panel
cd ../admin-panel
npm install
```

#### 3. Configure Environment Variables

Create `.env` file in `Backend/` directory:

```env
PORT=4000
DATABASE=mongodb+srv://your-username:your-password@cluster.mongodb.net/brew_haven
SECRET_KEY=your-strong-secret-key-min-32-characters
JWT_SECRET=your-jwt-secret-key
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**📝 Note**: 
- Use [App Passwords](https://support.google.com/accounts/answer/185833) for Gmail
- Generate strong secrets: `openssl rand -base64 32`

#### 4. Run the Application

**Option A: Run All Services**
```bash
npm run both
```

**Option B: Run Individually**
```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Customer App
cd Brew_Haven
npm run dev

# Terminal 3 - Admin Panel
cd admin-panel
npm start
```

#### 5. Access Applications
- **Customer App**: http://localhost:5000
- **Admin Panel**: http://localhost:3000
- **Backend API**: http://localhost:4000

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000
```

### Menu Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/getmenu` | Get all menu items | ❌ |
| POST | `/menu` | Create menu item | ✅ Admin |
| PUT | `/menu/:id` | Update menu item | ✅ Admin |
| DELETE | `/menu/:id` | Delete menu item | ✅ Admin |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create order | ❌ |
| GET | `/orders` | Get all orders | ✅ Admin |
| PUT | `/orders/:id` | Update order status | ✅ Admin |

### Table Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/book-table` | Book a table | ✅ User |
| GET | `/bookings` | Get user bookings | ✅ User |
| GET | `/admin/bookings` | Get all bookings | ✅ Admin |
| PUT | `/admin/bookings/:id` | Update booking | ✅ Admin |
| DELETE | `/admin/bookings/:id` | Cancel booking | ✅ Admin |

### Other Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/subscribe` | Newsletter subscription | ❌ |
| POST | `/contact` | Submit contact form | ❌ |
| POST | `/upload-images` | Upload gallery images | ✅ Admin |
| GET | `/photos` | Get gallery photos | ❌ |

---

## 📁 Project Structure

```
brew-haven/
├── Backend/                     # Express.js API server
│   ├── controller/             # Business logic (9 controllers)
│   ├── model/                  # Mongoose schemas (13 models)
│   ├── router/                 # Route definitions (6 routers)
│   ├── middleware/             # Auth & access control
│   ├── Utility/                # Helper functions (mailer)
│   ├── db/                     # Database configuration
│   ├── uploads/                # File storage
│   ├── app.js                  # Express app setup
│   ├── .env                    # Environment variables
│   └── package.json
│
├── Brew_Haven/                 # Customer web application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── container/          # Page containers
│   │   ├── api/                # API integration layer
│   │   ├── confige/            # Axios configuration
│   │   ├── constants/          # Static data
│   │   ├── App.jsx             # Main app with routing
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── admin-panel/                # Admin dashboard
│   ├── src/
│   │   ├── components/         # Dashboard components
│   │   ├── contexts/           # AuthContext
│   │   ├── api/                # Admin API calls
│   │   ├── App.js              # Main app with protected routes
│   │   └── index.js            # Entry point
│   └── package.json
│
├── package.json                # Root scripts (concurrently)
└── README.md
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=4000                       # Express server port

# Database
DATABASE=mongodb+srv://...      # MongoDB Atlas connection string

# Authentication
SECRET_KEY=xxx                  # JWT signing secret
JWT_SECRET=xxx                  # Alternative JWT secret

# Email Service (Gmail)
EMAIL=xxx@gmail.com            # Sender email
EMAIL_PASSWORD=xxx             # App-specific password

# Optional
TWILIO_ACCOUNT_SID=xxx         # Twilio account (SMS)
TWILIO_AUTH_TOKEN=xxx          # Twilio token
NODE_ENV=development           # Environment mode
```

---

## 📸 Screenshots

### Customer Application

#### Landing Page
*[Screenshot: Modern hero section with café branding]*

#### Menu Browsing
*[Screenshot: Categorized menu items with images and prices]*

#### Order Placement
*[Screenshot: Shopping cart and checkout flow]*

#### Table Booking
*[Screenshot: Date/time picker for reservations]*

### Admin Dashboard

#### Analytics Dashboard
*[Screenshot: Charts showing revenue, orders, popular items]*

#### Order Management
*[Screenshot: Order list with status updates]*

#### Menu Management
*[Screenshot: CRUD interface for menu items]*

#### Inventory Tracking
*[Screenshot: Stock levels and cost tracking]*

---

## 🔧 Development

### Development Commands

```bash
# Run backend with auto-restart
cd Backend
npm start

# Run frontend with HMR
cd Brew_Haven
npm run dev

# Build frontend for production
cd Brew_Haven
npm run build

# Run admin panel
cd admin-panel
npm start
```

### Database Models

#### User Schema
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  timestamps: true
}
```

#### Menu Schema
```javascript
{
  title: String,
  tag: String,
  price: Number,
  category: Enum[wines, cocktails, Hotcoffee, Coldcoffee, pizzas, burgers, sandwiches, frenchFries, Chinese, Cakes, IceCreams],
  status: String,
  timestamps: true
}
```

#### Order Schema
```javascript
{
  customer: String,
  phone: String,
  items: [{
    title: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  total: Number,
  status: Enum[Pending, In Progress, Completed],
  timestamps: true
}
```

---

## 🧪 Testing

*Testing suite coming soon*
- [ ] Unit tests (Jest)
- [ ] Integration tests (Supertest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Cypress)

---

## 📝 To-Do / Roadmap

### Short-term
- [ ] Add comprehensive error handling
- [ ] Implement input sanitization
- [ ] Add API rate limiting
- [ ] Implement testing suite
- [ ] Add pagination to order/booking lists
- [ ] Improve error messages

### Mid-term
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Real-time order tracking (WebSockets)
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

### Long-term
- [ ] Loyalty rewards system
- [ ] Advanced analytics dashboard
- [ ] Multi-location support
- [ ] Kitchen display system (KDS)
- [ ] QR code table ordering

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write descriptive commit messages
- Update documentation as needed
- Add tests for new features

---

## 🐛 Known Issues

- Email OTP may go to spam folder (use App Passwords)
- Image upload size not limited (implement validation)
- No pagination on large datasets
- CORS configured for localhost only

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Parth Vekariya**

- GitHub: [@ParthVekariya147](https://github.com/ParthVekariya147)
- Email: parthvekariya147@gmail.com

---

## 🙏 Acknowledgments

- MongoDB for cloud database hosting
- Bootstrap for UI components
- React community for excellent documentation
- Express.js team for robust framework
- All contributors and supporters

---

## 📞 Support

For support, email parthvekariya147@gmail.com or create an issue in the repository.

---

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐️!

---

**Made with ☕ and ❤️ for the café community**
