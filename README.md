# Analysr - Review Analytics Platform 📊

![image](https://github.com/user-attachments/assets/1b26013b-25e6-4b70-a725-8a42faa91336)

<b>Transform your business with <code>Analysr</code></b>

## 1️⃣ One Liner
This is my submission for <code>Airbyte-Motherduck Hackathon - December 2024 - January 2025</code>

For all you speedy folks out there, here’s the scoop:

- **1.0.0**  
  With your customer reviews in motherduck, along with your chosen business stack and areas of interest, Analysr is ready to dish out some insightful analytics. And just to sweeten the deal, Groq has stepped in to help you navigate all your growth phases—because who doesn’t want a sidekick in business?

Your analytics lineup features Aspect Analysis, a Word Sentiment Heatmap (for those feelings), Advanced Text Analysis, Groq Business Analytics, Keyphrase Analysis, and a handy Competitor Comparison.

## Walkthrough

1) To obtain customer review insights, sync your data to Motherduck with the schema: <code>{ "review_text": "string", "stars": "number" }</code> (More schemas will be supported soon). We recommend using Airbyte due to its extensive list of sources and seamless data movement. ![image](https://github.com/user-attachments/assets/415aece5-6594-4649-8d84-ec2fa1707988)
![image](https://github.com/user-attachments/assets/00bf63f5-952f-491a-9ffd-0241d2e2bfd2)
2) Visit the Analysr website at (growwithanalysr.web.app) and click on the "Get Started Now" button for onboarding.
![image](https://github.com/user-attachments/assets/95da4b69-29bb-4c88-9433-19865bc72093)
3) Select your business stack and substack; Groq and queries will use this information to fetch insights.
![image](https://github.com/user-attachments/assets/160c95bb-bad3-4c27-b5af-7fe651f2313c)
4) Input your Motherduck token and wait for the connection to be established (the time required will depend on your network bandwidth).
![image](https://github.com/user-attachments/assets/18d35b48-37c4-4348-8ea2-8c501a14f00a)
5) Select the database and table where your customer reviews or any related reviews exist, and set the data limit.
![image](https://github.com/user-attachments/assets/e88e07d8-1861-4f12-9dc9-672b45776509)
6) Input your Groq token (recommended) to obtain AI-based insights.
![image](https://github.com/user-attachments/assets/19178890-f24b-4d1c-ad07-f343e06c79c6)
7) Optionally provide your Airbyte bearer token (from the cloud.airbyte.com settings page) and connection ID (from the connections tab URL) to trigger a sync for updating your Motherduck table.
![image](https://github.com/user-attachments/assets/042ee2bf-8ff1-4ba3-b32c-cd720e52fb8e)
![image](https://github.com/user-attachments/assets/9f3ae847-28e2-4a93-b8a5-354b87835962)
8) Finally, input your area of interest for insights, such as customer satisfaction, and click "Continue to Dashboard."![image](https://github.com/user-attachments/assets/3c938fa2-a862-4ba6-b06e-b67bb139e71f)
9) Wait a few seconds until all queries are executed and visualized.
![image](https://github.com/user-attachments/assets/cf22aa51-cdb2-4e3f-99d6-ef93bf8f8c45)
10) Voilà! Your dashboard will be ready, featuring all Analysr's capabilities to support your next big step!
![image](https://github.com/user-attachments/assets/1ae1427d-c315-4e02-ac75-158e3cb14d61)

Need dataset and example method to test?
1. Hugging face dataset URL which I used, https://huggingface.co/datasets/Yelp/yelp_review_full
2. Import it to motherduck via airbyte (Set huggingface as source and motherduck as destination)
3. Get Groq token at, https://console.groq.com/keys
4. Click on continue to dashboard! That's it. Please try yourself, its fun!

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
- **Proxy**: Supabase edge functions
- **CI/CD**: GitHub Actions for automated deployment

## Future roadmap

- **Microservice for generating queries**: Currently all queries for analytics are highly coupled with code, seperation of concerns to microservice
  - [x] Create mock express server and deployed as supabase functions
  - [ ] Separate DuckDB queries for as an api call
  - [ ] Enhance microservice with GPT Wrapper
  - [ ] Enhance business insights from Groq: Currently it hallucinates as the mixtral model is not powerful (Requires funding) 

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

MIT License - feel free to use this project for your purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

For questions and support, please open an issue or contact at btk.codedev@gmail.com

---

<div align="center">
  <strong>Built with ❤️ for growing businesses by bktcodedev</strong>
</div>
