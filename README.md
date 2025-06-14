# Events On Charles - Event Space Rental Website

A modern, comprehensive event space rental website built with Next.js 15, TypeScript, and Tailwind CSS. This website showcases a premier event venue in Providence, Rhode Island with cutting-edge features and ultra-modern design.

## 🌟 Features

### Core Functionality
- **Interactive Chat Box** - AI-powered FAQ responses for instant customer support
- **360° Virtual Tour** - Immersive Matterport integration for virtual venue exploration
- **Availability Calendar** - Real-time booking calendar with date selection
- **Event Gallery** - Showcase of past events with photo/video filtering
- **Inventory Showcase** - Complete venue equipment and furniture catalog
- **Contact Forms** - Multiple contact options with form validation
- **Owner Information** - Professional team profiles and company story
- **Rental Contracts** - Digital contract viewing and agreement system

### Modern UI/UX Features
- **Particle Animation System** - Interactive floating particles with mouse responsiveness
- **Glass Morphism Effects** - Frosted glass navigation and modern transparency effects
- **3D Card Morphing** - Cards with hover rotations and depth transformations
- **Magnetic Button Effects** - Buttons that respond to mouse proximity
- **Ripple Click Animations** - Satisfying click feedback on all interactive elements
- **Advanced Gradient Animations** - Dynamic color transitions and glow effects
- **Floating Action Buttons** - Quick access to call, email, WhatsApp, and quotes
- **Scroll Progress Indicator** - Visual progress bar for page navigation
- **Smooth Scroll-to-Top** - Elegant return-to-top functionality

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/BTheCoderr/Event-space.git
cd eventoncharles

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.15
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion + Custom CSS animations
- **Calendar**: React Calendar
- **Development**: ESLint, Turbopack

## 📁 Project Structure

```
eventoncharles/
├── src/
│   └── app/
│       ├── components/          # React components
│       │   ├── AvailabilityCalendar.tsx
│       │   ├── ChatBox.tsx
│       │   ├── ContactForm.tsx
│       │   ├── EventGallery.tsx
│       │   ├── InventoryShowcase.tsx
│       │   ├── OwnerInfo.tsx
│       │   ├── ParticleBackground.tsx
│       │   ├── RentalContract.tsx
│       │   ├── ScrollIndicator.tsx
│       │   ├── ScrollToTop.tsx
│       │   └── VirtualTour.tsx
│       ├── globals.css          # Global styles and animations
│       ├── layout.tsx          # Root layout
│       └── page.tsx            # Homepage
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.ts
└── netlify.toml               # Deployment configuration
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Gold/Yellow (#d4af37, #ffd700)
- **Secondary**: Black (#000000, #1a1a1a)
- **Accent**: White with transparency effects
- **Gradients**: Dynamic gold-to-black transitions

### Animation System
- **Particle Background**: 50 interactive floating particles
- **Hover Effects**: 3D transformations and magnetic interactions
- **Loading States**: Skeleton loaders and smooth transitions
- **Page Transitions**: Smooth scroll and section animations

## 🌐 Deployment

The website is configured for deployment on Netlify with optimized build settings:

```toml
[build]
  command = "npm run build"
  publish = "out"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## 📱 Mobile Responsive

Fully responsive design with:
- Mobile-first approach
- Touch-friendly interactions
- Optimized performance on all devices
- Progressive Web App capabilities

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any environment-specific configurations:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Matterport Integration
The virtual tour uses Matterport's embed system. Update the tour URL in `VirtualTour.tsx`:

```typescript
src="https://discover.matterport.com/space/YOUR_SPACE_ID"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Events On Charles** - Creating magical moments in Providence, Rhode Island since 2009.
