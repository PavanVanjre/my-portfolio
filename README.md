# My Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features dark/light theme, smooth animations, and responsive design.

## Features

- 🎨 **Modern UI/UX** - Beautiful design with smooth animations
- 🌙 **Dark/Light Theme** - Toggle between themes
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast Performance** - Built with Vite for optimal performance
- 🎯 **Interactive Elements** - Custom cursor, floating elements, and more
- 📧 **Contact Form** - Integrated with EmailJS for seamless communication

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion + Three.js
- **Email Service**: EmailJS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your EmailJS credentials in the `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONTACT_EMAIL=your_email_here
```

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your public key
5. Add these credentials to your `.env` file

### Running the Project

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `VITE_CONTACT_EMAIL` | Your contact email address |

## Project Structure

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Pavan Vanjre Ravindranath - [pavan.vanjre98@gmail.com](mailto:pavan.vanjre98@gmail.com)

Project Link: [https://github.com/yourusername/my-portfolio](https://github.com/yourusername/my-portfolio)