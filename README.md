# Gigsurance - Realtime AI Driven Parametric Insurance Platform for India's Gig Economy

**Presented by Team BlueTeeth**

<p align="center">
  <img src="https://github.com/Madan94/gigsurance/blob/main/assets/GigSurance.png" alt="Gigsurance Banner" width="100%" />
</p>

---

# Breaking down Gigsurance in Four Steps

**1. Who is our user really?**  
**2. How does our AI actually work**  
**3. How does it get built?**  
**4. Gigsurance - Our Final Delivery**  

# 1️⃣ Who is our user really? - Tip of the ICE

<p align="center">
  <img src="https://github.com/Madan94/gigsurance/blob/main/assets/GigSurance%20(1).png" alt="Gigsurance Banner" width="100%" />
</p>

# ⚠️ The Actual Problem

**One line Statement - No financial safety net for loss of working time for India's Gig Workers**

**One Stop Destination - GigSurance - AI Powered Dynamic & Parametric based Insurance Platform**

**Type of Platform - Web App**

**So, What type of Gig Workers are you targeting?**

# 🧑 Revealing our Target User Persona

<p align="center">
  <img src="https://github.com/Madan94/gigsurance/blob/main/assets/GigSurance%20(2).png" alt="Gigsurance Banner" width="100%" />
</p>

**1. Our Focused Persona - Metro Cities based Gig Delivery Workers**  
**2. Total no of active Gig Workers in Metro Cities - 25 Lakhs**  
**3. Source link** : [https://www.outlookbusiness.com/news/pay-education-demographics-what-the-numbers-say-about-indias-1-crore-gig-workers]

# Our Focused Metro Cities for Gig Workers

| City        | Estimated Gig Workers | Key Risk Factors              |
|------------|---------------------|------------------------------|
| Bangalore   | 4–6 lakh+           | Rain, traffic, high demand   |
| Delhi NCR   | 5–7 lakh+           | Pollution, traffic, curfews  |
| Mumbai      | 3–5 lakh+           | Heavy rain, congestion       |
| Chennai     | 3–4 lakh+           | Flooding, cyclones           |
| Hyderabad   | 2–3 lakh+           | Supply disruptions           |
| Pune        | 1.5–2.5 lakh+       | Traffic, demand spikes       |
| Kolkata     | 1–2 lakh+           | Weather + infra disruptions  |

# Our Focused Working Models

| S.no | Type of Model | Platforms | Working Time | Peak hours |
|--------|-------------|----------|---------|---------|
| 1. | Food Delivery | Zomato, Swiggy | 10-12 hrs/day | Lunch + Dinner Time |
| 2. | Quick Commerce | Zepto, Blinkit, Swiggy Instamart | 9-10 hrs/day | Continuous & Seasoned Demands |
| 3. | E-Commerce | Amazon, Flipkart | 8-10 hrs/day | Scheduled Activities |

# Disruptions Covering under Gigsurance

## Coverage Types

### ✅ Covered Events
- Extreme weather (heavy rain, cyclones, storms)
- Flooding (delivery zone shutdowns)
- Severe pollution (AQI thresholds)
- Curfews and lockdowns
- Local area strikes
- Market crashes
- Platform/server outages

### ⚠️ Not Covered
- Health or life issues
- Accidents
- Vehicle repairs
- Holidays
- Driver out of service (without disruption)
- Location outside registered zone

---

# Move 1 - How We Onboard our Gig Workers 

**Phase 1 - The Onboarding of GigSurance Partners - Gig Workers** 

# 💡 GigSurance Mantra - 60 Sec Onboarding

### ❌ Not Following Traditional Insurance Model

```
Incident Occurs → User Files Claim → Documents Verified → Survey Done → Payment After Weeks
```
# 🛠️ How Gigsurance will work?

**Deliverable** - We designed onboarding as a **high-speed, intelligence-driven flow** that converts a gig worker into an insured user in under **60 seconds**.

## Our Ultra Fast Onboarding Engine - Dedicated Web App

### Onboarding Flow Diagram

```mermaid
graph TD
    Start([Worker Opens App]) --> Phone[Phone Number Entry]
    Phone --> OTP[OTP Verification]
    OTP --> Persona[Select Work Type<br/>Food/Quick/E-commerce]
    Persona --> Location[Location Capture<br/>GPS + Zone Selection]
    Location --> Pattern[Work Pattern Input<br/>Hours/Day, Days/Week]
    Pattern --> Risk[AI Risk Calculation<br/>Location + Persona + History]
    Risk --> Plans[Plan Recommendation<br/>Basic/Standard/Premium]
    Plans --> Activate[One-Tap Activation]
    Activate --> Dashboard[Main Dashboard]
    Dashboard --> Protected([Protected!])
    
    style Start fill:#e3f2fd
    style Protected fill:#c8e6c9
    style Activate fill:#fff9c4
```
----------------------------------------------------------------


# 2️⃣ How does our AI actually work? - The Backbone under the ICE

**Phase 2 - The Arrival of GigSurance Agents - Gigents**

**1. Gigsurance** transforms insurance through **parametric automation** - when a qualifying event occurs, payouts trigger automatically. No claims. No paperwork. Just instant protection.

**2. The Innovation:** Four autonomous AI agents work 24/7 to detect disruptions, validate events, calculate fair payouts, and execute instant transfers - all without human intervention.

# Let's See How our Agent Works

```mermaid
graph LR
    A[Disaster Event] --> B[Agent 1: Monitor]
    B --> C[Agent 2: Classify Zone]
    C --> D[Agent 3: Calculate Payout]
    D --> E[Agent 4: Instant Transfer]
    E --> F[Worker Notified]
    
    style A fill:#ff6b6b
    style E fill:#51cf66
    style F fill:#51cf66
```

---

### Autonomous Agent System

**Four AI agents work continuously to detect, validate, and execute payouts:**

- **Agent 1: Disaster Monitor** - Continuously polls weather, news, disaster APIs
- **Agent 2: Zone Classifier** - Maps disruptions to specific delivery zones using NLP
- **Agent 3: Fund Allocator** - Calculates individual payouts based on income baseline
- **Agent 4: Payout Executor** - Instantly transfers funds via UPI

## Agent System Architecture

```mermaid
graph TB
    subgraph "External Data Sources"
        W[Weather API]
        N[News API]
        D[Disaster API]
        A[AQI API]
        T[Traffic API]
    end
    
    subgraph "Agent Workflow"
        A1[Agent 1: Disaster Monitor<br/>Polls APIs every 5-15 min<br/>Calculates confidence score]
        A2[Agent 2: Zone Classifier<br/>NLP processing<br/>Maps to delivery zones<br/>Estimates severity]
        A3[Agent 3: Fund Allocator<br/>Queries active policies<br/>Calculates payouts<br/>Fraud validation]
        A4[Agent 4: Payout Executor<br/>UPI transfers<br/>Notifications<br/>Audit logging]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        VDB[(Pinecone Vector DB)]
    end
    
    W --> A1
    N --> A1
    D --> A1
    A --> A1
    T --> A1
    
    A1 -->|Threshold Exceeded| A2
    A2 --> A3
    A3 --> A4
    
    A2 --> VDB
    A3 --> DB
    A4 --> DB
    
    style A1 fill:#4dabf7
    style A2 fill:#4dabf7
    style A3 fill:#4dabf7
    style A4 fill:#4dabf7
```

### Real-Time Fraud Detection

**Multi-layered security system:**

- GPS spoofing detection through movement pattern analysis
- Behavioral verification (active hours, delivery routes, speed consistency)
- Multi-device triangulation prevention
- Trust score system (0-100) updated in real-time

### Dynamic Pricing Model

**Premium adjusts based on:**

- **Location Risk Score** - Historical disruption frequency in zone
- **Persona Type** - Food delivery vs Quick commerce vs E-commerce
- **Work Pattern** - Hours per day, days per week
- **Real-Time Conditions** - Current weather trends, seasonal patterns

### Predictive Intelligence

AI analyzes historical data to suggest optimal premium plans before disruptions occur, helping workers make informed decisions.

---

# 3️⃣ How Does it GigSurance get build? - The Architecture

**Phase 3 - The Brick by Brick Solid Architecture of GigSurance**

## GigSurance Deliverables

> **Primary Focus: Core Platform + 60-Second Onboarding + Autonomous Payout System**

**What We're Building in Phase 1:**

The foundation of Gigsurance - a fully functional parametric insurance platform that demonstrates the core value proposition: instant, automated protection for gig workers.

### Web Application for Gig Workers

**Gig Worker Onboarding in 60 Seconds**

**The fastest insurance activation in the market:**

- Phone verification with OTP
- Persona selection (Food Delivery / Quick Commerce / E-commerce)
- Location capture (GPS + manual zone selection)
- Work pattern input (hours/day, days/week)
- AI-powered plan recommendation (Basic / Standard / Premium)
- One-tap insurance activation

**Main Dashboard Features:**
- Live insurance status and coverage details
- Real-time location tracking
- Trust score display
- Payment history
- Weekly renewal management
- AI chatbot for support

### Admin Dashboard (Next.js) - Dedicated Web Application

**Event Monitoring & Management**

Complete control center for disruption management:

- Real-time disruption event feed
- Zone visualization with affected workers
- Manual event triggering capabilities
- Payout approval queue
- Worker management and verification
- Analytics and reporting

### Backend System (FastAPI)

**Core Infrastructure:**
- RESTful API for mobile and admin dashboards
- Agent orchestration system
- Risk calculation engine
- Dynamic pricing algorithm
- Fraud detection pipeline
- Payment integration (Razorpay)

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Mobile** | Web App (Angular JS) |
| **Admin Dashboard** | Next.js 14 (TypeScript) |
| **Backend** | FastAPI (Python) |
| **AI/ML** | LangChain + OpenAI |
| **Database** | PostgreSQL + Pinecone (Vector DB) |
| **APIs** | Weather, News, Disaster, AQI, Traffic |
| **Payments** | Razorpay (UPI) |
| **Notifications** | SMS/WhatsApp API |

---

## GigSurance - Real Time Scenario

### Scenario 1: Heavy Rainfall
**Event:** Rainfall exceeds 120mm in Chennai  
**Trigger:** Agent 1 detects threshold breach  
**Action:** Agent 2 maps affected zones → Agent 3 calculates payouts → Agent 4 transfers ₹500 to each worker  
**Time:** Complete in under 10 minutes

### Scenario 2: Delivery Zone Shutdown
**Event:** Local strike or curfew closes delivery zones  
**Trigger:** News API + Traffic API detect disruption  
**Action:** Automatic payout based on estimated income loss percentage  
**Time:** Instant after validation buffer

### Scenario 3: Cyclone Warning
**Event:** Wind speed > 80km/h detected  
**Trigger:** Weather API + Disaster API confirmation  
**Action:** Proactive alert sent to workers + automatic coverage activation  
**Time:** Pre-emptive protection before impact

---

## Competitive Advantages

| Traditional Insurance | Gigsurance |
|----------------------|------------|
| Weeks-long processing | **Instant payouts** |
| Manual claims filing | **Fully automated** |
| Document verification | **GPS-based validation** |
| Designed for salaried | **Built for gig workers** |
| Fixed pricing | **Dynamic, location-based** |
| Reactive coverage | **Predictive alerts** |

---

## Innovation Highlights

### 1. Parametric Automation
Unlike traditional insurance, payouts are triggered by **objective data** (rainfall mm, wind speed km/h) rather than subjective claims. This eliminates fraud, speeds up processing, and ensures fairness.

### 2. Zone-Level Precision
We don't just detect city-wide events - our AI maps disruptions to **specific delivery zones**, ensuring only affected workers receive payouts.

### 3. Rolling Weekly Cycles
Each worker has an individualized 7-day cycle starting from their signup time, not a fixed Monday-Sunday schedule. This accommodates part-time workers and flexible schedules.

### 4. Cooldown Period
New users have a 6-hour cooldown before coverage activates, preventing exploitation during active disruptions.

### 5. Location Intelligence
System automatically detects if a worker has been in a different city for 24+ hours and prompts location update, ensuring accurate coverage and pricing.

---

## Getting Started

### For Gig Workers
1. DNavigate to GigSurance Web App
2. Complete 60-second onboarding
3. Select your work type and location
4. Choose your insurance plan
5. Start earning with protection

### For Administrators
1. Access the admin dashboard
2. Monitor real-time events
3. Review payout approvals
4. Manage workers and policies
5. Analyze system performance

---

## Contact & Support

For inquiries or support:
- **Email:** madhanat94@gmail.com
- **Website:** [https://gigsurance.com]
- **Documentation:** [https://docs.google.com/document/d/1wZYr2hCGmYcWqeDmG8LoTaJHI3KMuQWk9TBf-XkuSuc/edit?usp=sharing]

---

## License

[MIT] - [2026] Gigsurance

---

**Submitted at GuideWire DevTrails Univeristy Hackathons by Team BlueTeeth**

**❤️ Built for India's Gig Workers - GigSurance**

**❤️ Taking a Moment to Show gratitude to Guidewire for organising these type of hackathons**
