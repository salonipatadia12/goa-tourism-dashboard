# System 1: Intelligence Agent Setup Guide

This guide explains how to set up **System 1** — the intelligence agent that fetches REAL data.

## What is System 1?

The Goa Tourism Dashboard has TWO systems:

- **System 1 (Backend)**: The intelligence agent that fetches, analyzes, and stores data
- **System 2 (Frontend)**: The dashboard UI that displays what System 1 produces

**You must set up System 1 FIRST** before the dashboard can show real insights.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SYSTEM 1: INTELLIGENCE AGENT              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Amadeus API → Fetches flight prices from:               │
│     • 6 source markets (Moscow, London, Tel Aviv, etc.)     │
│     • To Goa (GOI, GOX) + 5 competitors (Bangkok, etc.)     │
│     • Result: 42 routes checked daily                       │
│                                                               │
│  2. Price Monitor Agent → Analyzes the data:                │
│     • Compares Goa vs competitor pricing                     │
│     • Generates intelligence insights                        │
│     • Flags critical pricing gaps                            │
│                                                               │
│  3. Supabase → Stores everything:                            │
│     • flight_prices table (raw API data)                     │
│     • agent_analyses table (intelligence insights)           │
│     • agent_runs table (execution logs)                      │
│     • arrival_stats table (government data)                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New project"
3. Enter project details (name: `goa-tourism-intelligence`)
4. Choose a region (closest to India: Singapore or Mumbai)
5. Set a database password (save this!)
6. Wait for project to be created (~2 minutes)

### 1.2 Run the Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run"
6. You should see: "Success. No rows returned"

This creates all the tables: `flight_prices`, `agent_analyses`, `arrival_stats`, etc.

### 1.3 Seed the Database with Government Data

1. Still in SQL Editor, create another new query
2. Copy the contents of `supabase/seed.sql`
3. Paste and run
4. You should see: "Success. X rows affected"

This populates `arrival_stats` with verified 2017-2025 data.

### 1.4 Get Your Supabase API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`
   - **service_role key**: `eyJhbGc...` (click "Reveal" first)

---

## Step 2: Set Up Amadeus API

### 2.1 Create Free Amadeus Account

1. Go to [https://developers.amadeus.com/self-service](https://developers.amadeus.com/self-service)
2. Click "Register"
3. Fill in details (use your email)
4. Verify email
5. Log in to the developer portal

### 2.2 Create an App

1. Click "My Self-Service Workspace"
2. Click "Create new app"
3. App name: `Goa Tourism Intelligence`
4. Click "Create"

### 2.3 Get Your API Keys

1. You'll see your app listed
2. Copy:
   - **API Key** (this is your `AMADEUS_CLIENT_ID`)
   - **API Secret** (this is your `AMADEUS_CLIENT_SECRET`)

### 2.4 Understand the Free Tier

- **2,000 flight searches per month** (free)
- Our agent checks 42 routes once per day = 1,260 requests/month
- You're safely within the free tier

### 2.5 Test vs Production Environment

- **Test environment**: Returns fake data (good for development)
- **Production environment**: Returns REAL data (use in production)
- Set `AMADEUS_ENV=test` for now, change to `production` when ready

---

## Step 3: Configure Environment Variables

### 3.1 Create `.env.local`

```bash
cp .env.local.example .env.local
```

### 3.2 Fill in the values

Open `.env.local` and add your keys:

```env
# Supabase (from Step 1.4)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Amadeus (from Step 2.3)
AMADEUS_CLIENT_ID=YourClientID
AMADEUS_CLIENT_SECRET=YourClientSecret
AMADEUS_ENV=test
```

### 3.3 Verify Configuration

The API route will check if these are set and return helpful errors if not.

---

## Step 4: Run the Price Monitor Agent

### 4.1 Start the Development Server

```bash
npm install  # if you haven't already
npm run dev
```

Your app should start at [http://localhost:3000](http://localhost:3000)

### 4.2 Trigger the Agent Manually

Open a new terminal and run:

```bash
curl http://localhost:3000/api/agent/price-monitor
```

**Expected output:**

```json
{
  "success": true,
  "agentRunId": "xxx-xxx-xxx",
  "status": "completed",
  "summary": {
    "routes_checked": 42,
    "successful_routes": 42,
    "failed_routes": 0,
    "records_inserted": 126,
    "analyses_generated": 3
  },
  "message": "Price monitor completed: 42/42 routes successful..."
}
```

### 4.3 Check the Database

Go to Supabase dashboard → **Table Editor**:

1. Open `flight_prices` table → you should see ~126 rows of flight data
2. Open `agent_analyses` table → you should see price comparison insights
3. Open `agent_runs` table → you should see 1 completed run

**This means System 1 is working!**

---

## Step 5: Set Up Daily Automation (Vercel Cron)

### 5.1 Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to deploy.

### 5.2 Add Environment Variables to Vercel

1. Go to Vercel dashboard → your project
2. Go to **Settings** → **Environment Variables**
3. Add all the variables from your `.env.local`
4. Make sure to add them for **Production**, **Preview**, and **Development**

### 5.3 Verify Cron Job is Registered

The `vercel.json` file already configures the cron:

```json
{
  "crons": [
    {
      "path": "/api/agent/price-monitor",
      "schedule": "0 6 * * *"
    }
  ]
}
```

This runs daily at **6:00 AM UTC** (11:30 AM IST).

After deploying, go to **Settings** → **Cron Jobs** in Vercel to confirm it's active.

---

## Step 6: Monitor Agent Performance

### 6.1 Check Agent Run Logs

Query Supabase to see all agent runs:

```sql
SELECT
  started_at,
  status,
  routes_checked,
  records_inserted,
  analyses_generated,
  error_message
FROM agent_runs
ORDER BY started_at DESC
LIMIT 10;
```

### 6.2 View Latest Price Comparisons

```sql
SELECT * FROM v_latest_analyses
WHERE analysis_type = 'price_comparison'
ORDER BY created_at DESC;
```

### 6.3 View Latest Flight Prices

```sql
SELECT
  origin_city,
  destination_name,
  price_inr,
  airline,
  direct_flight,
  fetched_at
FROM v_latest_flight_prices
ORDER BY origin_city, destination_name;
```

---

## Troubleshooting

### Error: "Amadeus API not configured"

**Cause**: Missing `AMADEUS_CLIENT_ID` or `AMADEUS_CLIENT_SECRET`

**Fix**:
1. Check your `.env.local` file
2. Make sure the keys are correct (no extra spaces)
3. Restart the dev server (`npm run dev`)

### Error: "Supabase not configured"

**Cause**: Missing Supabase environment variables

**Fix**:
1. Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. Verify the URL format: `https://xxxxx.supabase.co`
3. Restart dev server

### Error: "Failed to create agent run log"

**Cause**: Database tables don't exist or RLS policies are blocking

**Fix**:
1. Go to Supabase SQL Editor
2. Re-run the migration: `supabase/migrations/001_initial_schema.sql`
3. Check if tables exist: `SELECT * FROM agent_runs LIMIT 1;`

### Error: Amadeus API returns "Invalid IATA code"

**Cause**: Some airports might not be in Amadeus test data

**Fix**:
1. This is expected for test environment (fake data)
2. Switch to production: `AMADEUS_ENV=production` (after testing)
3. Or check if the IATA code is correct in `src/lib/amadeus/client.ts`

### All Routes Fail

**Cause**: Rate limiting or API credentials issue

**Fix**:
1. Check Amadeus dashboard: [https://developers.amadeus.com/self-service](https://developers.amadeus.com/self-service)
2. Go to "My Self-Service Workspace" → view usage stats
3. Verify you haven't exceeded 2,000 requests/month
4. Check API credentials are correct

---

## What's Next?

Now that System 1 is running:

1. **Wire the dashboard to read from Supabase** (Step 5 from original instructions)
2. Add real-time status indicators showing:
   - Last agent run timestamp
   - Amadeus API connection status
   - Number of records in database
3. Update hardcoded alerts with real `agent_analyses` data
4. Add Google Trends integration (next agent)
5. Build the forecasting model (Phase 3)

---

## Quick Reference

| What | Where |
|------|-------|
| **Database Schema** | `supabase/migrations/001_initial_schema.sql` |
| **Seed Data** | `supabase/seed.sql` |
| **Amadeus Client** | `src/lib/amadeus/client.ts` |
| **Price Monitor Agent** | `src/app/api/agent/price-monitor/route.ts` |
| **Supabase Client** | `src/lib/supabase/server.ts` |
| **Cron Config** | `vercel.json` |
| **Environment Variables** | `.env.local` (local) or Vercel dashboard (production) |

---

## Support

- **Amadeus Docs**: [https://developers.amadeus.com/self-service/apis-docs](https://developers.amadeus.com/self-service/apis-docs)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Vercel Cron Docs**: [https://vercel.com/docs/cron-jobs](https://vercel.com/docs/cron-jobs)

---

**System 1 is now operational. The agent will fetch real data daily and populate your intelligence dashboard.**
