# Laser Holography Virtual Lab

A web-based interactive simulation and educational resource for understanding the principles of laser holography. This project allows users to visualize a holography setup, manipulate the wavelength, and observe real-time changes in the interference pattern, all within a modern, responsive web interface.

## Features
- **3D Visualization** of a basic holography setup (laser, beam splitter, mirrors, object, and screen)
- **Interactive Simulation**: Adjust the wavelength and see how the interference pattern changes
- **Educational Content**: In-depth introduction, methodology, and principles of holography
- **Responsive Design**: Works on desktop and mobile browsers
- **No installation required**: Runs entirely in the browser

## Getting Started

### 1. Download or Clone the Repository
```
git clone <repository-url>
```
Or download the ZIP and extract it to your local machine.

### 2. Project Structure
```
project-folder/
├── index.html           # Main educational website
├── simulation.html      # Interactive simulation page
├── simulation.js        # p5.js simulation code
├── style.css            # Stylesheet
├── Aaargh.ttf           # Custom font (required)
└── README.md            # This file
```

### 3. Running Locally
1. Make sure all files (including `Aaargh.ttf`) are in the same directory.
2. Open `index.html` in your web browser.
3. Navigate to the simulation via the "Launch Simulation" button or menu.

> **Note:** For full functionality, use a modern browser (Chrome, Firefox, Edge, Safari). No server is required, but if you have issues with local fonts, you can use a simple local server (e.g., Python's `http.server`).

#### Optional: Run with a Local Server
If you have issues with the font or simulation not loading, try running a local server:

**Python 3:**
```
python -m http.server
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

## What Does It Do?
- **Educational Website:** Learn about the history, principles, and methodology of holography.
- **Simulation:** Experiment with a virtual holography setup. Adjust the wavelength slider and observe how the interference pattern on the screen changes in real time, mimicking real-world holography.
- **Results Interpretation:** Understand the relationship between wavelength and fringe spacing, and how holography encodes 3D information.

## Credits
- **Project by:** LG 6
  - Atharva Sachin Sanpurkar (Reg. No: 241U1R1040)
  - D.U Prasidha Chandra (Reg. No: 241U1R1052)
- **Guided by:** Dr. M.C Ajay Kumar sir
- **Department of Physics, Aurora Deemed to be University**

## License
This project is for educational purposes. Please credit the authors if you use or adapt this work. 