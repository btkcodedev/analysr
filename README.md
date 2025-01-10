# Analysr - Review Analytics Platform 📊
<style> @import url('https://fonts.googleapis.com/css2?family=Apple+Garamond:wght@400;700&display=swap'); body { font-family: 'Apple Garamond', sans-serif; } </style>

<div align="center">
  <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80" width="800" alt="Analysr Banner" />

  <p align="center">
    <strong>Transform your business with Analysr</strong>
  </p>
</div>

## 1️⃣ One Liner
This is my submission for <code>Airbyte-Motherduck Hackathon - December 2024 - January 2025</code>

For all you speedy folks out there, here’s the scoop:

- **1.0.0**  
  With your customer reviews in motherduck, along with your chosen business stack and areas of interest, Analysr is ready to dish out some insightful analytics. And just to sweeten the deal, Groq has stepped in to help you navigate all your growth phases—because who doesn’t want a sidekick in business?

Your analytics lineup features Aspect Analysis, a Word Sentiment Heatmap (for those feelings), Advanced Text Analysis, Groq Business Analytics, Keyphrase Analysis, and a handy Competitor Comparison.

## Walkthrough

1) To obtain customer review insights, sync your data to Motherduck with the schema: <code>{ "review_text": "string", "stars": "number" }</code> (More schemas will be supported soon). We recommend using Airbyte due to its extensive list of sources and seamless data movement.
2) Visit the Analysr website at (growwithanalysr.web.app) and click on the "Get Started Now" button.
3) Select your business stack and substack; Groq and queries will use this information to fetch insights.
4) Input your Motherduck token and wait for the connection to be established (the time required will depend on your network bandwidth).
5) Select the database and table where your customer reviews or any related reviews exist, and set the data limit.
6) Input your Groq token (recommended) to obtain AI-based insights.
7) Optionally provide your Airbyte bearer token (from the cloud.airbyte.com settings page) and connection ID (from the connections tab URL) to trigger a sync for updating your Motherduck table.
8) Finally, input your area of interest for insights, such as customer satisfaction, and click "Continue to Dashboard."
9) Wait a few seconds until all queries are executed and visualized.
10) Voilà! Your dashboard will be ready, featuring all the capabilities of Analysr to support your next big step!


## ✨ Features

- **Aspect Analysis:** Gain insights into different aspects of customer feedback.
- **Word Sentiment Heatmap:** Visualize sentiment trends in your reviews.
- **Advanced Text Analysis:** Delve deeper into the nuances of customer language.
- **Groq Business Analytics:** Access data-driven insights to inform your growth strategy.
- **Keyphrase Analysis:** Identify and analyze key phrases that matter to your customers.
- **Competitor Comparison:** Benchmark your performance against competitors.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Analytics**: MotherDuck (DuckDB), GROQ AI
- **Data Integration**: Airbyte
- **Visualization**: Recharts
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Hosting**: Firebase (Production), Vercel (Experiment)
- **CI/CD**: GitHub Actions for automated deployment


## Future roadmap

- **Microservice for generating queries**: Currently all queries for analytics are highly coupled with code, seperation of concerns to microservice
  - [*] Create mock express server and deployed as supabase functions
  - [] Separate DuckDB queries for as an api call
  - [] Enhance microservice with GPT Wrapper
  - [] Enhance business insights from groq: Currently it hallucinates as the mixtral model is not powerful (Requires funding) 

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/btkcodedev/airbyte-motherduck-hackathon.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🔒 Security

- Secure token management
- Row-level security
- Data encryption
- Secure API endpoints

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

For questions and support, please open an issue or contact at btk.codedev@gmail.com

---

<div align="center">
  <strong>Built with ❤️ for growing businesses by bktcodedev</strong>
</div>
