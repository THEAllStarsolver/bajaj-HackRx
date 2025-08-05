# Bajaj Pulse - Digital Maintenance & Service Platform

A comprehensive mobile-first app for Bajaj two-wheeler maintenance, service tracking, and mechanic assistance built for the Bajaj HackRx Hackathon.

## 🎯 Overview

Bajaj Pulse empowers bike owners and mechanics to manage service, maintenance, health prediction, and geo-based mechanic discovery without requiring embedded hardware or OBD sensors.

## 🚀 Features

### For Vehicle Owners
- **Health Monitoring**: AI-powered vehicle health scoring and predictive maintenance
- **Service Tracking**: Complete service history with image uploads
- **Mechanic Discovery**: Find verified mechanics nearby with ratings and reviews
- **Smart Reminders**: KM-based and time-based service notifications
- **Rewards System**: Earn points for timely maintenance and reviews

### For Mechanics
- **Job Management**: Log service jobs with voice notes and image analysis
- **AI Diagnostics**: Image-based part detection and damage assessment
- **Booking System**: Manage customer appointments and service history
- **Profile Management**: Skills, certifications, and rating system

### For Administrators
- **Analytics Dashboard**: User distribution, vehicle health reports
- **Network Management**: Mechanic verification and performance tracking
- **Feedback System**: Customer satisfaction and service quality monitoring

## 🛠 Tech Stack

### Mobile App
- **React Native** with Expo
- **Supabase** for backend and authentication
- **React Navigation** for routing
- **React Native Paper** for UI components
- **React Native Maps** for location services
- **Expo Notifications** for push notifications

### Backend Services
- **Supabase Database** (PostgreSQL)
- **Supabase Storage** for images
- **Supabase Auth** with Google OAuth and Phone OTP
- **AI Services** for image analysis and voice-to-text

### Admin Dashboard
- **React** with Tailwind CSS
- **Recharts** for analytics visualization
- **Heroicons** for UI icons

## 📱 App Structure

```
src/
├── screens/
│   ├── OnboardingScreen.js      # Welcome slides
│   ├── AuthScreen.js            # Login/Register
│   ├── OwnerDashboardScreen.js  # Owner home
│   ├── MechanicDashboardScreen.js # Mechanic home
│   ├── MechanicFinderScreen.js  # Find mechanics
│   ├── AddServiceRecordScreen.js # Service logging
│   └── LogNewJobScreen.js       # Mechanic job entry
├── services/
│   ├── supabase.js             # Database client
│   ├── aiService.js            # AI/ML functions
│   └── notificationService.js   # Push notifications
├── navigation/
│   └── AppNavigator.js         # Route management
└── utils/
    └── theme.js                # UI theme
```

## 🗄 Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- phone (VARCHAR, Unique)
- name (VARCHAR)
- role (owner/mechanic)
- created_at (TIMESTAMP)
```

### Vehicles Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- model (VARCHAR)
- plate_number (VARCHAR)
- current_km (INTEGER)
- health_score (INTEGER)
- last_service_km (INTEGER)
```

### Mechanics Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- skills (TEXT[])
- experience (INTEGER)
- rating (DECIMAL)
- latitude/longitude (DECIMAL)
- is_certified (BOOLEAN)
```

### Service Records Table
```sql
- id (UUID, Primary Key)
- vehicle_id (UUID, Foreign Key)
- mechanic_id (UUID, Foreign Key)
- service_type (VARCHAR)
- parts_changed (TEXT[])
- images (TEXT[])
- cost (DECIMAL)
- service_date (DATE)
```

## 🤖 AI Features

### Image Analysis
- Part identification using computer vision
- Damage assessment and severity scoring
- Maintenance recommendations
- Cost estimation

### Predictive Maintenance
- Health score calculation based on:
  - KM since last service
  - Service history patterns
  - Part replacement frequency
  - Usage patterns

### Voice Processing
- Speech-to-text for mechanic notes
- Automatic transcription and summarization
- Multi-language support

## 🔔 Notification System

- **Service Reminders**: Based on KM and time intervals
- **Health Alerts**: When vehicle score drops below threshold
- **Booking Confirmations**: Mechanic appointment confirmations
- **Reward Notifications**: Points earned for activities

## 🏆 Rewards System

Users earn points for:
- Timely service completion (50 points)
- Adding service records (25 points)
- Mechanic reviews (15 points)
- Referrals (100 points)

Points can be redeemed for:
- Service discounts
- Bajaj merchandise
- Premium features

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- Supabase account
- Google Maps API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BajajPulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**
- Create a new Supabase project
- Run the SQL schema from `supabase-schema.sql`
- Update `src/services/supabase.js` with your credentials

4. **Configure environment**
```bash
# Create .env file
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

5. **Start the app**
```bash
npm start
```

### Admin Dashboard Setup

1. **Navigate to admin dashboard**
```bash
cd admin-dashboard
npm install
```

2. **Start the dashboard**
```bash
npm start
```

## 📊 Key Metrics

- **User Engagement**: Service completion rate, app usage frequency
- **Mechanic Network**: Coverage area, response time, ratings
- **Vehicle Health**: Average health scores, maintenance compliance
- **Business Impact**: Service bookings, revenue per user

## 🔒 Security Features

- **Authentication**: Multi-factor with phone OTP and Google OAuth
- **Data Privacy**: Encrypted storage, GDPR compliance
- **API Security**: Row-level security in Supabase
- **Image Security**: Secure upload and storage

## 🌟 Future Enhancements

- **IoT Integration**: OBD sensor connectivity
- **AR Features**: Augmented reality for part identification
- **Blockchain**: Service history immutability
- **ML Improvements**: Advanced predictive algorithms
- **Multi-language**: Regional language support

## 📞 Support

For technical support or questions:
- Email: support@bajajpulse.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for Bajaj HackRx Hackathon