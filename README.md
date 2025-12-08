# AI Health Clinical Assistant

An AI-powered clinical decision support system designed to streamline patient intake, automate risk assessment, and generate preliminary treatment plans for clinicians.

## 🚀 Project Specification

### Overview
The AI Health Clinical Assistant is a web application that bridges the gap between patient data collection and clinical decision-making. It uses OpenAI's GPT models to analyze patient intake forms, identify potential risks (drug interactions, contraindications), and suggest evidence-based treatment plans.

### Key Features
- **Smart Patient Intake**: Comprehensive multi-step form collecting personal info, medical history, medications, lifestyle data, and primary complaints.
- **AI Clinical Analysis**:
  - **Risk Assessment**: Automatic calculation of risk levels (Low/Medium/High) and safety scores.
  - **Treatment Planning**: AI-generated suggestions for medications, lifestyle changes, and referrals.
  - **Safety Checks**: Automatic flagging of drug interactions, contraindications, and warnings.
- **Clinician Dashboard**:
  - **Review & Edit**: Interactive interface for clinicians to review, modify, and finalize AI-generated plans.
  - **Approval Workflow**: Formal "Approve" or "Reject" actions with mandatory reasoning for rejections.
  - **PDF Export**: Print-friendly format for generating patient handouts or medical records.
- **Patient Management**: Centralized view of all patient records with status tracking.
- **Audit Logging**: Comprehensive tracking of all actions (edits, approvals, rejections) for compliance and accountability.

### Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Engine**: OpenAI API (GPT-4)
- **Icons**: Lucide React

---

## 🛠️ Developer Setup

Follow these steps to get the project running locally.

### Prerequisites
- Node.js 18+ or Bun
- A Supabase account
- An OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/Eewonn/ai-health-clinical-assistant.git
cd ai-health-clinical-assistant
```

### 2. Install Dependencies
```bash
bun install
# or
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database Setup
1. Go to your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Run the contents of the `supabase_schema.sql` file located in the root of this project.
   - This will create the necessary tables (`patient_intake`, `ai_analysis_results`, `audit_logs`) and security policies.

### 5. Run the Development Server
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/             # Backend API endpoints (analysis, patients, etc.)
│   ├── analysis/        # Analysis result & dashboard pages
│   ├── intake/          # Patient intake form pages
│   ├── patients/        # Patient list view
│   └── ...
├── components/          # Reusable UI components
│   ├── Dashboard.tsx    # Main clinical dashboard component
│   ├── IntakeForm/      # Multi-step intake form components
│   └── ...
├── lib/                 # Utility functions and configurations
│   ├── openai.ts        # OpenAI API integration
│   ├── supabase.ts      # Supabase client setup
│   └── types.ts         # TypeScript interfaces
└── ...
```

## 🔒 Security & Compliance
- **Row Level Security (RLS)**: Enabled on Supabase tables to restrict data access.
- **Audit Trails**: All critical clinical decisions are logged in the `audit_logs` table.
- **Data Validation**: Strict type checking and validation on both frontend and backend.

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
