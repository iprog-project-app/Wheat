## README

### Short Description

Wheat is a mobile application designed to answer the question: "**Wh**ere do we **eat**?" The app helps users search for restaurants and save their favorites in a personalized “restaurant library.” When deciding where to eat, users can input preferences like price and region, and Wheat generates a tailored recommendation, eliminating the hassle of choosing from a long list of options.

---

### What We Have Done  

- **Core Setup**: Built using React Native and TypeScript.
- **Authentication & Storage**: Integrated Firebase for user authentication and data storage (setup complete, integration pending).
- **Search Functionality**: Developed restaurant search powered by the Google Places API, including locations, restaurants, and categories.
- **Restaurant Library**: Laid the groundwork for saving and managing favorite restaurants.
- **Hosting**: Configured Firebase Hosting.

---

### What We Still Plan to Do

- **Search Enhancements**:
  - Limit search results to restaurants and bars.
  - Add filtering options for price, region, and other preferences.
- **User Experience**:
  - Display icons across platforms (currently visible only on iOS and Android).
  - Improve UI design and usability.
- **Social Features**:
  - Enable user accounts with data persistence for likes and notes.
  - Add functionality for connecting with friends.
  - Find shared favorites for group outings.
- **Technical Improvements**:
  - Refactor project structure by merging `/store` and `/Model`.

---

### Project File Structure

- **.expo/**: Configuration files for Expo.
- **.github/**: GitHub workflows and configurations.
- **.vscode/**: Visual Studio Code settings.
- **app/**: Screens for the main application.
- **assets/**: Static assets like fonts and images.
- **components/**: Reusable UI components.
- **Config/**: Configuration files.
- **constants/**: App-wide constants.
- **Model/**: Data models.
- **presenters/**: Presentational logic bridging data and UI.
- **src/**: Source code.
- **store/**: State management files and test model.
- **utilities/**: Helper functions and utilities.
- **views/**: View components.
