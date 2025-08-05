# Quick Setup Guide

## ✅ Dependencies Installed Successfully!

Your Bajaj Pulse app is ready to run. Follow these steps:

## 1. Configure Environment Variables

Copy `.env.example` to `.env` and update with your credentials:
```bash
copy .env.example .env
```

## 2. Setup Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run the schema from `supabase-schema.sql`
3. Get your project URL and anon key from Settings > API
4. Update your `.env` file with these credentials

## 3. Start the Development Server

```bash
npm start
```

This will open Expo DevTools in your browser. You can then:
- Press `a` to open Android emulator
- Press `i` to open iOS simulator  
- Scan QR code with Expo Go app on your phone

## 4. Test the App

The app will start with the onboarding screen. You can:
- Navigate through the welcome slides
- Test authentication (phone OTP will be simulated)
- Explore the owner and mechanic dashboards
- Test the mechanic finder and service logging

## 5. Admin Dashboard (Optional)

To run the admin dashboard:
```bash
cd admin-dashboard
npm install
npm start
```

## 🎯 Ready for Hackathon!

Your Bajaj Pulse app now includes:
- ✅ Complete mobile app with all screens
- ✅ Database schema and backend services  
- ✅ AI-powered features (image analysis, health scoring)
- ✅ Admin dashboard for analytics
- ✅ Deployment guides and documentation

## Next Steps:
1. Customize the UI/branding
2. Add your Supabase credentials
3. Test all features
4. Deploy using the deployment guide

Good luck with the Bajaj HackRx Hackathon! 🚀