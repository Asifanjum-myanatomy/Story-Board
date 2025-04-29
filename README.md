# Community Storyboard 🌍


## Live Demo

Open `index.html` in your browser to try it out locally.

---

## Features

- **Light / Dark Mode** with preference saved in LocalStorage
- **Text & Image Posts**: toggle mode and share stories (max 300 chars) or upload images
- **Instant File Picker**: Image button invokes device picker even if input is hidden
- **Live Character Counter** for text entries
- **Filters**: View All, Text-only, or Image-only contributions
- **Like & Delete** actions on each post
- **Confetti Animation** on successful post submission
- **LocalStorage** persists contributions across reloads
- **Responsive Design**: grid layout adapts to mobile and desktop

---

## Installation

Clone the repository and open in a browser:

```bash
# Clone this repo
git clone https://github.com/yourusername/community-storyboard.git
cd community-storyboard

# Open index.html in your browser
to open index.html in your browser
```  

No additional dependencies or build steps required.

---

## Usage

1. **Toggle Theme**: Click the 🌙/☀️ button at top right.  
2. **Add Text Post**: Ensure 📝 Text is selected, type your story, then click **Share Your Story 🚀**.  
3. **Add Image Post**: Click 🖼️ Image, choose a file, then **Share Your Story 🚀**.  
4. **Filter Posts**: Click All, Text, or Image to filter.  
5. **Like / Delete**: Use ❤️ to like and 🗑️ to delete a post.  
6. **Clear All**: Remove all contributions with the 🗑️ Clear All button.

---

## File Structure

```
/community-storyboard
├── index.html       # Main markup
├── style.css        # Styling and theme variables
├── script.js        # Application logic (IIFE structure)
└── README.md        # This documentation
```

---

## Tech Stack

- **HTML5** & **CSS3** (Flexbox & Grid, CSS variables)
- **JavaScript (ES6+)**
- **Browser APIs**: LocalStorage & FileReader

---

## Configuration

- **Character Limit**: Edit `MAX_CHAR = 300` in `script.js` if you add a constant.  
- **Confetti Particles**: Adjust loop count in `launchConfetti()` of `script.js`.  
- **Theme Colors**: Modify `:root` & `.dark-theme` in `style.css`.

---

## Contributing

1. Fork the repo.  
2. Create a feature branch `git checkout -b feature-name`.  
3. Commit your changes `git commit -m "Add feature"`.  
4. Push to the branch `git push origin feature-name`.  
5. Open a Pull Request.

Please ensure new code is well-documented and follows existing style.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

