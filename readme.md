# Carbon Analytics Dashboard

Welcome to the **Carbon Analytics Dashboard**, a powerful tool designed to help individuals and businesses measure and manage their carbon emissions related to electricity usage. This project combines **MotherDuck** for analytics, **React Vite** for the frontend, and the **Carbon Interface API** for fetching carbon emission data. The dashboard is built on a **freemium model**, offering basic features for free and advanced analytics for premium users.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Freemium Model](#freemium-model)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

---

## Project Overview

The **Carbon Analytics Dashboard** provides users with a comprehensive view of their carbon emissions based on electricity consumption. The dashboard includes interactive visualizations, detailed analytics, and actionable insights to help users reduce their carbon footprint. The project is built using modern technologies to ensure scalability, performance, and ease of use.

---

## Features

### Free Tier
- **Basic Carbon Footprint Calculation**: Estimate carbon emissions based on electricity usage.
- **Interactive Globe Visualization**: Visualize carbon emissions data on a 3D globe.
- **Historical Data Trends**: View past carbon emission trends over time.
- **User-Friendly Interface**: Intuitive and responsive design for seamless navigation.

### Premium Tier
- **Advanced Analytics**: Detailed breakdown of carbon emissions by source and region.
- **Custom Reports**: Generate and download personalized carbon emission reports.
- **Carbon Offset Recommendations**: Get tailored suggestions for reducing your carbon footprint.
- **API Access**: Integrate carbon analytics into your own applications.

---

## Technologies Used

- **MotherDuck**: For advanced analytics and data processing. [MotherDuck Website](https://motherduck.com/)
- **React Vite**: For building a fast and responsive frontend. [Vite Documentation](https://vitejs.dev/)
- **Carbon Interface API**: For fetching carbon emission data. [Carbon Interface API Documentation](https://docs.carboninterface.com/)
- **React Globe**: For interactive 3D globe visualizations. [React Globe GitHub](https://github.com/chrisrzhou/react-globe)
- **Chart.js**: For creating dynamic and interactive charts. [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- A Carbon Interface API key (sign up [here](https://www.carboninterface.com/))

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/carbon-analytics-dashboard.git
   cd carbon-analytics-dashboard
Install Dependencies:
```bash
npm install
```

Set Up Environment Variables:
Create a .env file in the root directory and add your Carbon Interface API key:
```bash
echo "VITE_CARBON_INTERFACE_API_KEY=your_api_key_here" > .env
```

Run the Development Server:
```bash
npm run dev
```


## Usage

1. **Sign Up/Log In**: Create an account or log in to access the dashboard.

2. **Input Electricity Data**: Enter your electricity usage details (e.g., kWh, location).

3. **View Analytics**: Explore your carbon emissions data through interactive charts and the 3D globe.

4. **Upgrade to Premium**: Unlock advanced features by subscribing to the premium tier.

## Freemium Model

The **Carbon Analytics Dashboard** operates on a freemium model:
- **Free Tier**: Access basic features at no cost.
- **Premium Tier**: Subscribe to unlock advanced analytics, custom reports, and carbon offset recommendations. Pricing starts at $9.99/month.

---

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **MotherDuck**: For providing powerful analytics capabilities.
- **Carbon Interface**: For their comprehensive carbon emission data API.
- **React Vite**: For enabling a fast and modern frontend development experience.
- **Open Source Community**: For the libraries and tools that made this project possible.

---

For any questions or feedback, please reach out to us at **btk.codedev@gmail.com**. Thank you for using the Carbon Analytics Dashboard! 🌍
