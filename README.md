
# 🎰 Lottery Spin Interaction – React + Tailwind

A fully animated, futuristic **lottery spin application** built with **React.js** and **Tailwind CSS**.

This project includes spinning number cylinders, hologram visuals, glowing borders, and dynamic prize detection animations.

---

## 🚀 Features

### 🎡 Spin Animation

* Full lottery-style number rotation
* Rapid spinning → gradual slowdown → final stop
* Smooth transition into winning numbers

### 🏆 Winning Result

* After the spin completes, a **Winner Banner** appears
* Randomized: **1ST PRIZE**, **2ND PRIZE**, **3RD PRIZE**

### ✨ Animated Prize Text

* “First Prize” flashes **white ↔ red** using custom CSS keyframes
* Matches the exact Figma design glow

### 🌌 Space & Hologram UI

* Neon-themed futuristic UI
* 3D hologram tilt effect using **perspective + rotateX**
* Glowing frames & reflective gradients
* 100% manually coded — **no UI kits**

### 🔘 Custom Spin Button

* Perfectly recreated from the Figma
* Inner glow
* Pulse animation
* Disabled during spin

---

## 🛠️ Tech Stack

* **React.js** – Component logic & state
* **Tailwind CSS** – Styling
* **CSS Keyframes** – Spin, glow, twinkle animations
* **JavaScript** – Spin logic, number generation

---

## 📦 Project Structure

```
src/
 ├── assets/
 │    └── image/
 │         ├── Bottom_Image.png
 │         ├── hologram-image.png
 │         ├── Congratulation_image.png
 │         └── (other assets)
 │
 ├── components/
 │    ├── LotterySpinner.jsx
 │    └── ui/
 │         └── SpinButton.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

## ▶️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173/
```

---

## 🧪 Testing Instructions

To verify correct behavior:

1. Click **Spin**
2. Numbers begin spinning rapidly
3. Speed reduces gradually
4. Numbers settle on final winning combination
5. “Prize” text appears with color-flash animation
6. Spin button stays disabled during the spin
7. After result shows, spin again

---

## 👨‍💻 Developer

**Anandhu R S**
Frontend Developer – React.js

---

## 📄 License

This project is created for evaluation/testing purposes.
Not intended for commercial distribution.

---

