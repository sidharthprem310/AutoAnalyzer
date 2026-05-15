# AutoAnalyzer Web App 🚗💻

AutoAnalyzer is an AI-powered vehicle service bill analysis platform. It leverages Google's Gemini Vision API to instantly scan uploaded mechanic bills, extract line items, categorize repairs, and flag overcharges or unnecessary services.

## Features ✨
- **AI Bill Scanning**: Upload an image of your service bill and get an itemized breakdown.
- **Fair Price Estimation**: Automatically compares billed amounts against standard market rates.
- **History Tracking**: Securely saves past bills to MongoDB for future reference and trend analysis.
- **Responsive Design**: Modern, dark-themed UI built with Next.js, Tailwind CSS, and Framer Motion.
- **Export to PDF**: Download the detailed analysis report as a PDF.

## Tech Stack 🛠️
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend API**: Next.js Route Handlers
- **Database**: MongoDB Atlas
- **AI Integration**: Google Gemini 1.5 Pro API
- **Authentication**: JWT-based secure login (mock RTO authentication)

## Getting Started 🚀

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Cluster URI
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AutoAnalyzer.git
   cd AutoAnalyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment 🌐
This project is optimized for deployment on Vercel or Netlify. Ensure you add `MONGODB_URI` and `GEMINI_API_KEY` to your hosting provider's environment variables before deploying.
