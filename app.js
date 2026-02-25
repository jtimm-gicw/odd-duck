'use strict';

/* =====================================
   PRODUCT IMAGE NAMES
   ===================================== */

const productNames = [
  'boots','bathroom','breakfast','bubblegum','chair',
  'dog-duck','tauntaun','scissors','water-can','wine-glass',
  'bag','banana','cthulhu','dragon','pen','pet-sweep',
  'shark','sweep','unicorn'
];

/* =====================================
   APPLICATION STATE
   ===================================== */

const state = {
  allProducts: []
};


/* =====================================
   PRODUCT CONSTRUCTOR
   Creates a product object and stores:
   - name
   - image path
   - votes
   - views
   ===================================== */

function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;

  state.allProducts.push(this);
}


/* =====================================
   CREATE ALL PRODUCTS
   ===================================== */

function createProducts() {
  for (let name of productNames) {
    new Product(name);
  }
}


/* =====================================
   MAIN APP OBJECT
   ===================================== */

const app = {

  totalClicks: 0,
  maxRounds: 25,
  previousIndices: [],

  imageSection: document.getElementById('productImages'),
  img1: document.getElementById('img1'),
  img2: document.getElementById('img2'),
  img3: document.getElementById('img3'),
  resultsDiv: document.getElementById('results'),
  resultsButton: document.getElementById('showResults'),
  resetButton: document.getElementById('reset'),


  /* =====================================
     GET RANDOM INDEX
     ===================================== */
  getRandomIndex() {
    return Math.floor(Math.random() * state.allProducts.length);
  },


  /* =====================================
     DISPLAY 3 UNIQUE IMAGES
     - No duplicates in same round
     - No duplicates from previous round
     ===================================== */
  displayImages() {

    let indices = [];

    while (indices.length < 3) {

      let randomIndex = this.getRandomIndex();

      if (
        !indices.includes(randomIndex) &&
        !this.previousIndices.includes(randomIndex)
      ) {
        indices.push(randomIndex);
      }
    }

    this.previousIndices = indices;

    const [p1, p2, p3] = indices.map(i => state.allProducts[i]);

    // Increment views
    p1.views++;
    p2.views++;
    p3.views++;

    // Update DOM
    this.img1.src = p1.path;
    this.img1.alt = p1.name;
    this.img1.dataset.name = p1.name;

    this.img2.src = p2.path;
    this.img2.alt = p2.name;
    this.img2.dataset.name = p2.name;

    this.img3.src = p3.path;
    this.img3.alt = p3.name;
    this.img3.dataset.name = p3.name;
  },


  /* =====================================
     HANDLE IMAGE CLICK
     - Adds vote
     - Stops at 25 rounds
     ===================================== */
  handleClick(event) {

    const clickedName = event.target.dataset.name;

    // If user clicks outside an image, ignore
    if (!clickedName) return;

    const clickedProduct = state.allProducts.find(
      product => product.name === clickedName
    );

    clickedProduct.votes++;
    this.totalClicks++;

    if (this.totalClicks >= this.maxRounds) {

      // Stop image clicking
      this.imageSection.removeEventListener('click', this.boundClick);

      // Show results button
      this.resultsButton.hidden = false;

    } else {
      this.displayImages();
    }
  },


  /* =====================================
     DISPLAY RESULTS
     - Shows votes
     - Shows views
     - Shows percentage clicked
     ===================================== */
  displayResults() {

    this.resultsDiv.innerHTML = '';

    const ul = document.createElement('ul');

    for (let product of state.allProducts) {

      const li = document.createElement('li');

      const percentage =
        product.views === 0
          ? 0
          : ((product.votes / product.views) * 100).toFixed(1);

      li.innerHTML = `
        <span class="product-name">${product.name}</span> had 
        <span class="vote-count">${product.votes}</span> votes, 
        was seen <span class="view-count">${product.views}</span> times, 
        and had a <span class="percentage">${percentage}%</span> click rate.
      `;

      ul.appendChild(li);
    }

    this.resultsDiv.appendChild(ul);

    this.resultsButton.hidden = true;
    this.resetButton.hidden = false;
  }
};


/* =====================================
   EVENT LISTENERS
   ===================================== */

// Bind once so we can remove later
app.boundClick = app.handleClick.bind(app);

app.imageSection.addEventListener('click', app.boundClick);

app.resultsButton.addEventListener('click', () => app.displayResults());

app.resetButton.addEventListener('click', () => location.reload());


/* =====================================
   INITIALIZE APP
   ===================================== */

createProducts();
app.displayImages();
