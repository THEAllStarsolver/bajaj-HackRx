# Bajaj Pulse - Deployment Guide

## 🚀 Deployment Options

### Option 1: Expo + Supabase + Vercel (Recommended)

#### Mobile App Deployment
1. **Build for Production**
```bash
expo build:android
expo build:ios
```

2. **Publish to Expo**
```bash
expo publish
```

3. **App Store Deployment**
```bash
# For Google Play Store
expo build:android --type app-bundle

# For Apple App Store
expo build:ios --type archive
```

#### Backend (Supabase)
- Already hosted on Supabase cloud
- Configure production environment variables
- Set up database backups
- Configure edge functions if needed

#### Admin Dashboard (Vercel)
```bash
cd admin-dashboard
npm run build
vercel --prod
```

### Option 2: AWS Deployment

#### Mobile App
1. **Use AWS Amplify for hosting**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

#### Backend Services
1. **RDS for Database**
```bash
# Create PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier bajaj-pulse-db \
  --db-instance-class db.t3.micro \
  --engine postgres
```

2. **S3 for File Storage**
```bash
# Create S3 bucket
aws s3 mb s3://bajaj-pulse-storage
```

3. **Lambda for API**
```bash
# Deploy serverless functions
serverless deploy
```

#### Admin Dashboard
```bash
# Deploy to S3 + CloudFront
aws s3 sync build/ s3://bajaj-pulse-admin
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔧 Environment Configuration

### Production Environment Variables

#### Mobile App (.env.production)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
SENTRY_DSN=your_sentry_dsn_for_error_tracking
```

#### Admin Dashboard (.env.production)
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_production_anon_key
```

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)
```bash
npm install @sentry/react-native
```

```javascript
// App.js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});
```

### Performance Monitoring
```javascript
// Add to App.js
import { Analytics } from 'expo-analytics';

const analytics = new Analytics('YOUR_GOOGLE_ANALYTICS_ID');
```

### Database Monitoring
- Enable Supabase monitoring dashboard
- Set up alerts for high CPU/memory usage
- Configure backup schedules

## 🔒 Security Checklist

### Pre-deployment Security
- [ ] Remove all console.log statements
- [ ] Validate all environment variables
- [ ] Enable Row Level Security (RLS) in Supabase
- [ ] Configure CORS properly
- [ ] Set up API rate limiting
- [ ] Enable SSL/TLS certificates
- [ ] Configure proper authentication flows

### Supabase Security Settings
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mechanics ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

## 📱 App Store Submission

### Google Play Store
1. **Prepare Release**
```bash
expo build:android --type app-bundle
```

2. **Upload to Play Console**
- Create app listing
- Upload AAB file
- Configure store listing
- Set up pricing & distribution

### Apple App Store
1. **Prepare Release**
```bash
expo build:ios --type archive
```

2. **Upload to App Store Connect**
- Use Xcode or Application Loader
- Configure app metadata
- Submit for review

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy Bajaj Pulse

on:
  push:
    branches: [main]

jobs:
  deploy-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: expo publish
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          working-directory: ./admin-dashboard
```

## 📈 Performance Optimization

### Mobile App Optimization
```javascript
// Enable Hermes for Android
// android/app/build.gradle
project.ext.react = [
  enableHermes: true
]

// Optimize bundle size
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';

enableScreens();
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_service_records_vehicle_id ON service_records(vehicle_id);
CREATE INDEX idx_mechanics_location ON mechanics(latitude, longitude);
```

## 🔍 Testing Strategy

### Pre-deployment Testing
```bash
# Run all tests
npm test

# E2E testing with Detox
detox build --configuration ios.sim.release
detox test --configuration ios.sim.release

# Performance testing
npm run test:performance
```

### Load Testing
```bash
# Use Artillery for API load testing
artillery run load-test-config.yml
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Security policies enabled
- [ ] Error tracking configured
- [ ] Performance monitoring setup

### Post-deployment
- [ ] App functionality verified
- [ ] Database connections working
- [ ] Push notifications working
- [ ] File uploads working
- [ ] Authentication flows tested
- [ ] Admin dashboard accessible

### Monitoring Setup
- [ ] Error alerts configured
- [ ] Performance metrics tracking
- [ ] Database monitoring active
- [ ] User analytics enabled

## 🆘 Rollback Plan

### Emergency Rollback
```bash
# Revert to previous Expo publish
expo publish --release-channel production-v1.0.0

# Revert database changes
psql -h your-db-host -d bajaj_pulse -f rollback.sql

# Revert admin dashboard
vercel --prod --force
```

## 📞 Support & Maintenance

### Post-deployment Support
- Monitor error rates and performance
- Set up automated alerts
- Plan regular security updates
- Schedule database maintenance
- Monitor user feedback and reviews

### Maintenance Schedule
- **Daily**: Monitor error logs and performance
- **Weekly**: Review user feedback and analytics
- **Monthly**: Security updates and dependency updates
- **Quarterly**: Performance optimization and feature updates