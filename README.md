## Wheat

### Short Description

Wheat is a mobile application designed to answer the question: "**Wh**ere do we **eat**?" The app helps users search for restaurants and save their favorites in a personalized “restaurant library.” When deciding where to eat, users can input preferences like price and region, and Wheat generates a tailored recommendation, eliminating the hassle of choosing from a long list of options.

---

### What We Have Done  

- **Core Setup**: Built using React Native and TypeScript.
- **Authentication & Storage**: Integrated Firebase for user authentication and data persistence.
- **Search Functionality**: Developed restaurant search powered by the Google Places API, finding restaurants based on locations.
- **Hosting**: Configured Firebase Hosting.
- - **Social Features**:
  - Functionality for connecting with friends.
  - Find shared favourites for group outings.

---

### 3rd party components
React Native relies on third-party libraries for most features like animations, gestures, and UI components. Here is an example of one component we used:
- **[Segment Controll](https://www.npmjs.com/package/@react-native-segmented-control/segmented-control)**:
  - Implemented a segment control for toggling randomising places with friends or alone.

---

### What We Still Plan to Do

- **Search Enhancements**:
  - Add filtering options for price, region and if it's open now.

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
- **model/**: Data models and state management files.
- **presenters/**: Presentational logic bridging data and UI.
- **src/**: Source code.
- **views/**: View components.
