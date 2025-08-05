-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE,
  phone VARCHAR UNIQUE,
  name VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('owner', 'mechanic')) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  model VARCHAR NOT NULL,
  year INTEGER,
  plate_number VARCHAR,
  current_km INTEGER DEFAULT 0,
  last_service_km INTEGER DEFAULT 0,
  health_score INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mechanics table
CREATE TABLE mechanics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skills TEXT[],
  experience INTEGER,
  rating DECIMAL(2,1) DEFAULT 0,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_certified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Service records table
CREATE TABLE service_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id),
  mechanic_id UUID REFERENCES mechanics(id),
  service_type VARCHAR NOT NULL,
  parts_changed TEXT[],
  km_at_service INTEGER,
  images TEXT[],
  cost DECIMAL(10,2),
  service_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rewards table
CREATE TABLE rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  points INTEGER DEFAULT 0,
  earned_for VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);