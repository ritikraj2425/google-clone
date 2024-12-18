# Google Clone Project

This is a simple Google clone project built with **Next.js**, featuring core functionalities like search suggestions, real-time search results, a mock Google Lens, and a voice page. The project utilizes the **TVMaze API** for search suggestions and the **DuckDuckGo API** for real-time search results.

---

## Features
- **Main Page**:
  - Search bar with suggestions powered by the TVMaze API.
  - Upload an image to navigate to the Google Lens mock page.
- **Search Results Page**:
  - Displays real-time search results using the DuckDuckGo API.
- **Google Lens Page**:
  - Shows mock data for the uploaded image.
- **Voice Page**:
  - A simple page with a microphone icon (for display only).

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Next.js**
- **npm**

---

### Installation & Running the Project
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/ritikraj2425/google-clone
   cd <your-repo-folder>
2. Run commands
   npm install
   npm run dev
3. Open your browser and go to:
    http://localhost:3000


## Usage
**Search Suggestions:**
**Type a query in the search bar on the main page.**
**Suggestions will appear based on the TVMaze API.**
**Search Results:**
**Press Enter or click the search button to navigate to the search results page.**
**Results are fetched in real-time using the DuckDuckGo API.**
**Google Lens:**
**Upload an image on the main page.**
**Navigate to the Lens page to view mock data for the uploaded image.**
**Voice Page:**
**Click on the microphone icon to visit the voice page (currently for display only).**

# Project Structure
.
├── public/                # Static files like images and icons
├── src/app/               # Next.js pages (Main, Results, Lens, Voice)
├── components/            # components (e.g., Navbar,Footer)
├── styles/                # CSS or SCSS files for styling
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

## APIs Used
**TVMaze API:**
Used for providing search suggestions on the main page.
# DuckDuckGo API:
Fetches real-time search results for the search results page.

## Future Improvements
Implement actual functionality for Google Lens.
Add support for voice search on the voice page.
Enhance the UI/UX for a more realistic Google-like experience.
