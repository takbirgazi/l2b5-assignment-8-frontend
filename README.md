# No-Cash 💸

**No-Cash** is a digital wallet application frontend built with **Next.js, TailwindCSS, Shadcn**. It connects with a backend API to provide users with a secure and seamless virtual money management experience. The platform supports multiple roles — **User, Admin, and Agent** — each with different capabilities.

---

## 🚀 Features

* **Cash In** – Add money to wallet via Agent.
* **Cash Out** – Withdraw money from wallet.
* **Send Money** – Transfer money between users.
* **Receive Money** – Get money from another user.
* **User Dashboard** – Manage balance, transactions, and profile.
* **Admin Panel** – Manage users, agents, and monitor transactions.
* **Agent Panel** – Handle Cash In and Cash Out requests.
* **Authentication & Authorization** – Secure access by roles.
* **Transaction History** – Detailed records for all operations.

---

## 🛠️ Tech Stack

* **Next.js** – Frontend library
* **TailwindCSS** – Styling and responsive design
* **Shadcn** – Styling and responsive design

---

## 📂 Project Structure

```
l2b5-assignment-8-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   ├── agent/
│   │   │   └── user/
│   │   ├── about/
│   │   ├── features/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   ├── service/
│   └── zod/
├── public/
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation & Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/takbirgazi/l2b5-assignment-8-frontend
   ```
2. Navigate into the project folder:

   ```bash
   cd l2b5-assignment-8-frontend
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Create a `.env` file in the root folder and add your backend API URL:

   ```env
   NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1
   ```
5. Run the development server:

   ```bash
   npm run dev
   ```

---

## 📖 Usage

### 👤 User

* Register/Login to your account.
* Cash In via Agent.
* Send and Receive money.
* View transaction history.

### 🧑‍💼 Agent

* Approve/Decline **Cash In** requests.
* Handle **Cash Out** transactions.

### 👨‍💻 Admin

* Manage Users and Agents.
* Monitor all transactions.
* Handle system-wide settings.