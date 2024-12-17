'use strict';
// 1.
// Global Variables- used across the DOM
const productName = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];
// This array has an index of 18, 19 elements inside

// State object holds the holds the current state of the application (all existing Products)
const state = {
  allProducts: [], // the array holds all the products in the array
};

// 2.
// Constructor function
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.total = 0;
  this.views = 0;
}

// Regular Functions
function createAlbum() {
  for (let i = 0; i < productName.length; i++) {
    let product = new Product(productName[i], 'img/' + productName[i] + '.jpg');
    state.allProducts.push(product);
  }
}

const productRank = {
  totalClicks: 0,
  rounds: 25,
  left: null,
  mid: null,
  right: null,

  leftElement: document.getElementById('img1'),
  midElement: document.getElementById('img2'),
  rightElement: document.getElementById('img3'),
  imgElement: document.getElementById('productImages'),
  resultElement: document.getElementById('result'),
  resultsButton: document.getElementById('showResults'),
  resetButton: document.getElementById('reset'),

  getRandomIndex: function () {
    return Math.floor(Math.random() * productName.length);
  },

  displayImages: function () {
    let indices = new Set();
    while (indices.size < 3) {
      indices.add(this.getRandomIndex());
    }
    const [leftIdx, midIdx, rightIdx] = [...indices];

    productRank.left = state.allProducts[leftIdx];
    productRank.mid = state.allProducts[midIdx];
    productRank.right = state.allProducts[rightIdx];

    productRank.left.views += 1;
    productRank.mid.views += 1;
    productRank.right.views += 1;

    productRank.leftElement.src = productRank.left.path;
    productRank.leftElement.id = productRank.left.name;

    productRank.midElement.src = productRank.mid.path;
    productRank.midElement.id = productRank.mid.name;

    productRank.rightElement.src = productRank.right.path;
    productRank.rightElement.id = productRank.right.name;
  },

  allyClicks: function (elId) {
    for (const i in state.allProducts) {
      if (state.allProducts[i].name === elId) {
        state.allProducts[i].total += 1;
        this.totalClicks += 1;
        console.log(state.allProducts[i].name + ' has ' + state.allProducts[i].total + ' votes');
      }
    }
  },

  displayResults: function () {
    const ulEl = document.createElement('ul');
    for (const i in state.allProducts) {
      const liElOne = document.createElement('li');
      const str = state.allProducts[i].name + ' has ' + state.allProducts[i].total + ' votes.';
      liElOne.textContent = str;
      ulEl.appendChild(liElOne);
    }
    const liElTwo = document.createElement('li');
    liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;
    ulEl.appendChild(liElTwo);
    this.resultElement.appendChild(ulEl);
  },

  showButton: function () {
    this.resultsButton.hidden = false;
    this.resultsButton.addEventListener('click', () => {
      this.resetButton.hidden = false;
      this.resultsButton.hidden = true;
      this.displayResults();

      this.resetButton.addEventListener('click', function () {
        location.reload();
      });
    });
  },

  onClick: function (event) {
    if (event.target.id === productRank.left.name || event.target.id === productRank.mid.name || event.target.id === productRank.right.name) {
      productRank.allyClicks(event.target.id);

      if (productRank.totalClicks % productRank.rounds === 0) {
        productRank.imgElement.removeEventListener('click', productRank.onClick);
        productRank.showButton();
      } else {
        productRank.displayImages();
      }
    } else {
      alert('Click on the picture');
    }
  }
};

// Initialize the app
createAlbum();
productRank.imgElement.addEventListener('click', productRank.onClick.bind(productRank));
productRank.displayImages();
