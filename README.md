# MLD E-Commerce Platform

![MLD E-Commerce Preview](https://raw.githubusercontent.com/lamarana20/mld-ecommerce/main/public/preview.jpg)

> A modern, responsive e-commerce web application built with passion for clean code, user experience, and performance.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast%20Builds-orange?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## Live Demo

[View Live App](https://lamaecommerceapp.netlify.app/)  


---

## Why This Project

I built this project to strengthen my full-stack development skills by connecting a modern React frontend with a Laravel backend. It demonstrates my ability to design scalable APIs, handle authentication securely, and create a smooth, responsive user experience optimized for all devices.

---

## Features

### Frontend

- Fully responsive design with mobile-first approach using Tailwind CSS
- Dark mode support with seamless theme switching
- Product catalog with search and filter functionality
- Real-time cart management with localStorage persistence
- Secure user authentication (login and registration)
- Newsletter subscription system
- Toast notifications for user-friendly feedback

### Technical Stack
- **React 18** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant form handling
- **React Toastify** - Beautiful notifications

- **Context API** - State management

### Key Functionality
- Product browsing and detailed product views
- Add to cart with quantity management
- User profile and order history
- Secure checkout process
- Email notifications
- Admin dashboard (coming soon)

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm 


### Installation

1. Clone the repository
```bash
git clone https://github.com/lamarana20/mld-ecommerce.git
cd mld-ecommerce
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Update the .env file with your API endpoints:
```env
VITE_API_URL=http://localhost:8000/api
```

4. Start development server
```bash
npm run dev
```

The app will be available at http://localhost:5173

5. Build for production
```bash
npm run build
```

6. Preview production build
```bash
npm run preview
```

---

## Project Structure
```
src/
├── assets/          # Images, fonts, and static files
├── components/      # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Newsletter.jsx
│   └── ...
├── pages/          # Page components
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   └── ...
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
└── App.jsx         # Main app component
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Design Features

- Clean and modern UI with professional design
- WCAG compliant accessibility with ARIA labels
- Performance optimized with image optimization and lazy loading
- SEO friendly with meta tags and semantic HTML
- Smooth animations with CSS transitions for better UX

---

## Security

- Input validation and sanitization
- Secure authentication with JWT tokens
- HTTPS enforcement in production
- CORS configuration
- XSS protection

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Roadmap

- Payment gateway integration (Stripe/PayPal)
- Order tracking system
- Product reviews and ratings
- Wishlist functionality
- Advanced product filtering
- Admin dashboard
- Multi-language support
- Progressive Web App (PWA)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Code Quality

This project uses:
- **ESLint** - For code linting
- **Prettier** - For code formatting (recommended)
- **React best practices** - Hooks, functional components

---

## Known Issues

None at the moment. Please report any bugs via GitHub Issues.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Author

**Mamadou Lamarana Diallo**

- GitHub:https://github.com/lamarana20
- LinkedIn:https://linkedin.com/in/yourprofile
- Portfolio: https://lamaranadiallo.com
- Email: mamadoulamakalinko628@gmail.com

---

## Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- Tailwind CSS for the utility-first framework
- All open-source contributors

---

Star this repo if you find it helpful!

Built with care by Mamadou Lamarana Diallo