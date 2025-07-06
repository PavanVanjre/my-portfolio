# My Portfolio

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://pavan-vanjre.vercel.app/) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Live Demo

👉 **Check out the deployed site here:** [https://pavan-vanjre.vercel.app/](https://pavan-vanjre.vercel.app/)

---

A modern, interactive, and blazing-fast portfolio website built with **React**, **TypeScript**, and **Vite**. Showcases your work, skills, and experience with beautiful animations, a custom theme, and a fully responsive design.

---

## ✨ Features

- 🎨 **Modern UI/UX** — Clean, elegant design with smooth transitions
- 🌗 **Dark/Light Theme** — Instantly toggle between light and dark modes
- 📱 **Fully Responsive** — Looks great on mobile, tablet, and desktop
- ⚡ **Lightning Fast** — Powered by Vite for instant load times
- 🖱️ **Interactive Elements** — Custom cursor, floating shapes, animated backgrounds
- 📝 **Dynamic Content** — Easily update your projects, skills, and more
- 📧 **Contact Form** — Integrated with EmailJS for direct communication
- 🛡️ **Accessible** — ARIA labels and keyboard navigation support

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion, Three.js
- **Email Service:** EmailJS
- **Icons:** Lucide React

---

## 📦  Packages & Versions

| Package            | Version    |
|--------------------|-----------|
| react              | ^18.3.1    |
| react-dom          | ^18.3.1    |
| typescript         | ^5.5.3     |
| vite               | ^5.4.1     |
| tailwindcss        | ^3.4.11    |
| framer-motion      | ^12.16.0   |
| @emailjs/browser   | ^4.4.1     |
| lucide-react       | ^0.522.0   |
| three              | ^0.177.0   |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd my-portfolio
npm install
```

### Environment Variables

Copy the example file and add your EmailJS credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONTACT_EMAIL=your_email_here
```

#### EmailJS Setup
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your public key
5. Add these credentials to your `.env` file

### Running the Project

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### Building for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── assets/             # Static assets
```

---

## 🙏 Credits

- **[LovableAI](https://lovable.ai/)** — AI-powered development assistance
- **[Cursor AI](https://cursor.sh/)** — AI-enhanced code editor

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

Pavan Vanjre Ravindranath — [pavan.vanjre98@gmail.com](mailto:pavan.vanjre98@gmail.com)
