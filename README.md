# Pallet Pass - Indian Art Museum Platform

A modern, responsive web application for an Indian art museum featuring online ticket booking, exhibition showcases, and cultural event management. Built with React, TypeScript, and Supabase.

## 🎨 Features

### User Features
- **Interactive Art Exhibitions**: Browse current and upcoming exhibitions featuring traditional Indian art forms
- **Online Booking System**: Book tickets for museum visits and special events
- **User Authentication**: Secure signup/login with profile management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Cultural Events**: Discover workshops, lectures, and cultural performances

### Art Collections
- **Pattachitra Heritage**: Traditional cloth-based scroll paintings from Odisha
- **Warli Folk Art**: Ancient geometric tribal art from Maharashtra
- **Madhubani Art**: Vibrant folk paintings from Bihar
- **Classical Dance Forms**: Visual representations of Indian classical dance

### Special Events
- **Art After Dark**: Evening events with classical music performances
- **Chitra Divas**: Celebrations of Indian visual arts
- **Udaya Kala**: Dawn art appreciation sessions
- **Interactive Workshops**: Hands-on traditional art experiences

## 🚀 Live Demo

**Deployed Application**: [https://pallet-pass.netlify.app/](https://pallet-pass.netlify.app/)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Notifications**: Sonner
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/432RahulRaj/pallet-pass.git
   cd pallet-pass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**
   
   The project includes migration files in `supabase/migrations/`:
   - `20250323184959_dry_hall.sql` - Creates profiles table and authentication setup
   - `20250323185006_jolly_stream.sql` - Creates bookings table with RLS policies

   Run the migrations in your Supabase project to set up the database schema.

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### Tables

**profiles**
- `id` (uuid, primary key, references auth.users)
- `email` (text)
- `full_name` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**bookings**
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles)
- `event_date` (date)
- `event_time` (text)
- `adult_tickets` (integer)
- `senior_tickets` (integer)
- `student_tickets` (integer)
- `child_tickets` (integer)
- `total_amount` (integer)
- `status` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## 📁 Project Structure

```
src/
├── assets/                 # Image assets (Indian art images)
├── components/            # Reusable React components
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Site footer
├── contexts/             # React context providers
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility libraries
│   └── supabase.ts      # Supabase client configuration
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── ExhibitionsPage.tsx
│   ├── CollectionPage.tsx
│   ├── EventsPage.tsx
│   ├── BookingPage.tsx
│   ├── PaymentPage.tsx
│   ├── ProfilePage.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
└── App.tsx              # Main application component
```

## 🎯 Key Features Implementation

### Authentication Flow
- Email/password authentication via Supabase
- Automatic profile creation on signup
- Protected routes for booking and profile pages
- Row Level Security (RLS) for data protection

### Booking System
- Multi-step booking form with validation
- Real-time price calculation
- Support for different ticket types (Adult, Senior, Student, Child)
- Booking confirmation and email notifications

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Smooth animations and transitions
- Optimized images with proper loading strategies
- Accessibility considerations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

The application follows Apple-level design aesthetics with:
- Clean, sophisticated visual presentation
- Thoughtful animations and micro-interactions
- Consistent spacing using 8px grid system
- Comprehensive color system with proper contrast ratios
- Typography hierarchy using Playfair Display serif font

## 🌐 Deployment

The application is automatically deployed to Netlify. The build configuration is optimized for production with:
- Code splitting for better performance
- Optimized asset loading
- Proper caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛️ About Pallet Pass

Pallet Pass is designed to bridge the gap between traditional Indian art heritage and modern digital experiences. Located at KIIT UNIVERSITY Patia Bhubaneswar Odisha 751024, our virtual museum showcases the rich cultural tapestry of India through carefully curated exhibitions and interactive experiences.

## 📞 Contact

For questions or support, please contact:
- Email: info@palletpass.com
- Location: KIIT UNIVERSITY Patia Bhubaneswar Odisha 751024
- Hours: Daily 10:00 AM - 5:30 PM

---

**Made with ❤️ for preserving and celebrating Indian art heritage**
