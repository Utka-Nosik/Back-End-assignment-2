# 🌈 Elmore Weather Channel (Backend API Assignment)

A creative weather application inspired by "The Amazing World of Gumball". This project demonstrates backend API integration, server-side data processing, and a responsive UI.

![Screenshot of the App](./Back%20end%20assign%202%20screen.png)

## 🚀 Objective
The goal was to build a server-side application that fetches data from multiple APIs, aggregates it, and serves it to the client. The frontend does not communicate with the weather providers directly; all logic is handled by the Node.js backend to ensure architecture cleanliness and security.

---

## 🛠 Setup Instructions

### Prerequisites
- Node.js installed
- NPM (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   ```

2. Navigate to the project directory:
   ```bash
   cd project-folder
   ```

3. Install dependencies (Express, Axios, etc.):
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Open your browser and go to:
   http://localhost:3000/weather.html

## 📡 API Usage Details

The application uses a custom Backend API (`/weather`) that acts as a gateway to external services.

### Internal Endpoint
**GET** `/weather?city={cityName}`

*   **Description:** Fetches weather and detailed country facts for the specified city.
*   **Example:** `http://localhost:3000/weather?city=London`

**Response Format (JSON):**
```json
{
  "weather": {
    "temperature": 15.5,
    "description": "broken clouds",
    "feels_like": 14.2,
    "wind_speed": 3.6,
    "country_code": "GB",
    "rain_volume": 0
  },
  "country_facts": {
    "currency": "British pound",
    "currency_symbol": "£",
    "population": 67215293,
    "flag": "https://flagcdn.com/w320/gb.png",
    "capital": "London",
    "region": "Europe"
  }
}
```

### External APIs Integrated (Server-Side)
- **OpenWeatherMap API:** Used to retrieve real-time weather data (Temperature, Wind, Icon, Coordinates).
- **REST Countries API:** Used as the *Extra API*. It takes the `country_code` from the weather data (e.g., "KZ") and fetches the country's population, currency, flag, and language.
- **Open-Meteo Geocoding API:** Used on the frontend for the Autocomplete feature (helps users find city names).

## 🎨 Key Design Decisions

### 1. Backend Architecture (Server-Side Fetching)
Instead of fetching weather data directly from the browser, the frontend calls my own server.
*   **Why?** This hides the API Keys from the user (Security) and allows me to process/combine data from multiple sources (Weather + Country Info) into a single, clean JSON response.

### 2. UI/UX Design ("The Amazing World of Gumball")
*   **Style:** Mixed media aesthetic. I used a realistic photo background combined with "hand-drawn" UI elements to mimic the cartoon's unique visual style.
*   **Responsiveness:** The layout adapts to mobile screens.
*   **Autocomplete:** To improve user experience, I added a dropdown suggestion list so users don't have to guess city spellings.
*   **Interactive Elements:** A "Gumball" character sticker follows the user while scrolling using `position: fixed` and CSS animations.

### 3. Error Handling
The backend includes `try-catch` blocks. If the Country API fails, the Weather API will still return data, ensuring the app doesn't crash completely.