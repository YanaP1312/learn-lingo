# 🧑‍🏫   [Language Teachers Booking App](learn-lingo-pied.vercel.app)

A desktop-focused web application that connects users with online language teachers. The platform enables users to register, browse a catalog of language teachers, filter based on criteria, add favorites, and book trial lessons.

<img width="1920" height="1066" alt="ЛернЛинго" src="https://github.com/user-attachments/assets/8be9e2c0-f9b1-4b5a-96d2-a01930a67404" />
<img width="1920" height="983" alt="ЛернЛинг2" src="https://github.com/user-attachments/assets/d6675e14-8444-4697-aff4-2cff7a107f44" />
<img width="1920" height="984" alt="Лерн Линг 3" src="https://github.com/user-attachments/assets/396e61c6-9b40-4f47-8dee-35ea98ace544" />

## 📌 About the Project

This project was created as a demo platform for a company offering online language learning services. The application consists of three main pages:

1. **Home Page** – showcases company benefits and includes a call-to-action button leading to the Teachers page.
2. **Teachers Page** – displays a list of teachers that users can filter by language, student level, and hourly rate.
3. **Favorites Page** – a private page for authenticated users to view teachers they’ve added to their favorites.

## ✨ Features

- 🔐 User authentication (registration, login, logout) via Firebase Auth
- 🔎 Filter teachers by language, student level, and price per hour
- 💾 Persist user’s favorite teachers in Firebase
- ❤️ “Like” button changes state and persists on page reload
- 🧾 Expandable teacher cards with detailed info and reviews
- 📅 Booking modal with validated form for trial lessons
- 💬 Toast notifications for feedback and errors
- 🎨 Theme switching – users can select from 5 available UI themes via the navigation menu
- 📱 Desktop-oriented UI based on Figma layout
- 🔄 "Load more" pagination to fetch teachers incrementally

## 🔧 Technologies Used

- **React** + **TypeScript** – for UI development
- **Redux Toolkit** – global state management
- **React Router v6** – routing and protected routes
- **Firebase (Auth & Realtime DB)** – backend and user/session data
- **React Hook Form + Yup** – form handling and validation
- **React Toastify** – user notifications
- **CSS Modules** – scoped styles

## 🗃 Firebase Requirements

- Enable Email/Password authentication
- Create a `teachers` collection in Realtime Database with fields like:
  - `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`

## 🚀 Getting Started

```bash
git clone https://github.com/YanaP1312/learn-lingo.git
cd learn-lingo
npm install
npm run dev

```

📷 UI Example

https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0
