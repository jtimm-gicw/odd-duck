# Lab 11: Odd Duck Product Voting App

## Overview
Odd Duck Product Co wants to determine which product from their R&D department to invest in next.  
This lab focuses on creating a **voting web app** that displays **three products side-by-side**, allows employees to vote for their favorite, and collects voting data for analysis.  

The app will:

- Randomly display **three unique products** at a time.
- Track **how many times each product is shown** and **how many votes it receives**.
- Restrict results until **25 voting rounds** are completed.
- Provide a **results report** showing votes, views, and percentages.
- Feature a **retro-themed UI** with custom fonts and colors.

---

## Learning Objectives

By completing this lab, students will:

1. Understand **constructor functions** and how to model objects in JavaScript.
2. Generate **randomized content** while avoiding duplicates.
3. Use **event listeners** to capture user interactions.
4. Track user input with JavaScript and store it in **LocalStorage**.
5. Display dynamic **results after a set number of rounds**.
6. Style a web app with **CSS** while maintaining responsive design and retro aesthetics.
7. Apply accessibility best practices and check performance using **Chrome Lighthouse**.

---

## User Stories & Feature Tasks

### User Story 1
**As a user**, I want to display three unique products by chance so that viewers can pick a favorite.

**Feature Tasks:**

- Create a **constructor function** for each product with:
  - `name` (product name)
  - `path` (image file path)
  - `views` (number of times displayed)
  - `votes` (number of times clicked)
- Write a **randomization algorithm** that displays three products side-by-side without duplicates.
- Increment the `views` property for displayed products.
- Attach an **event listener** to capture clicks on the images.
- After a click, **generate three new products** for the next round.

---

### User Story 2
**As a user**, I want to track the selections made by viewers so that I can determine which products are most popular.

**Feature Tasks:**

- Update the `votes` property when a product is clicked.
- Keep a **running total** of all votes.
- Store and retrieve data in **LocalStorage** to persist results across sessions.

---

### User Story 3
**As a user**, I want to control the number of rounds a user is presented with so that I can manage the session duration.

**Feature Tasks:**

- Use a variable (`rounds`) to define the number of voting rounds (default: 25).
- Stop voting after the set number of rounds.
- Hide voting images and reveal a **View Results** button when rounds are complete.

---

### User Story 4
**As a user**, I want to view a report of results after voting concludes so that I can evaluate product popularity.

**Feature Tasks:**

- Create a **results section** that shows:
  - Product name
  - Number of votes
  - Number of times seen
  - Percentage of clicks per view
- Remove the event listener after voting ends.
- Optionally add a **Reset** button to start a new session.
- Style results using a **retro theme** with bold, colored, and italicized text.

---

## File Structure

/lab-11-odd-duck
│
├─ index.html # Main HTML structure with product images and buttons
├─ styles/
│ ├─ reset.css # CSS reset
│ └─ style.css # Retro-themed styling for layout and results
├─ img/ # Product images
├─ app.js # Main JavaScript for logic and event handling
└─ README.md # This documentation file


---

## Getting Started

1. Clone or download the lab folder.
2. Open `index.html` in a browser.
3. **Vote for products** by clicking on images. Each click generates three new products.
4. Complete **25 rounds** to unlock the **View Results** button.
5. Click **View Results** to display votes, views, and percentages for each product.
6. Optionally, click **Reset** to start over.

---

## Styling Notes (Retro Theme)

- **Font:** Georgia or Montserrat for body; Fredoka One for headers
- **Colors:** Bright retro palette (neon pink, aquamarine, yellow)
- **Buttons:** Bold, large, with hover effect
- **Results:** Styled cards with bold product names, vote counts, and italicized percentages
- **Layout:** Three products side-by-side, responsive for smaller screens

---

## JavaScript Notes

- `Product` constructor tracks `name`, `path`, `views`, and `votes`.
- `displayImages()` ensures **unique random selection** of three products.
- `onClick()` handles **click events** and increments votes.
- `saveToLocalStorage()` and `loadFromLocalStorage()` persist data.
- Results calculations include **percentages of times clicked per views**.

---

## Accessibility & Performance

- Use **semantic HTML** (header, main, section, buttons).
- All images have **alt attributes** matching the product name.
- Run **Chrome Lighthouse** and aim for a score above 80.
- Check **contrast and font sizes** for readability.

---

## Author

**Instructor:** Jason Timm  
**Lab:** 201-Class 11 – Odd Duck Product Voting App  
**Theme:** Retro / 1980s aesthetic
