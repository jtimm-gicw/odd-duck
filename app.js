'use strict';
// 1.
// Global Variables- used across the DOM
const productName = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];
// This array has an index of 18, 19 elements inside

// State object holds the holds the current state of the application (all existing Products)
const state = {
  allProducts: [], // the array holds all the products in the array
}; // What it does: This is an object used to store all the product information. Initially, the allProducts array is empty, but it will later hold all the products.

// 2.
// Constructor function
function Product(name, path) {
  this.name = name; // Product name
  this.path = path; // Path to the product's image
  this.total = 0; // How many times this product has been clicked
  this.views = 0; // How many times this product has been displayed
} //What it does: It creates a product object with its name, image path, and initial stats for clicks and views.

// Regular Functions
function createAlbum() {
  for (let i = 0; i < productName.length; i++) {
    let product = new Product(productName[i], 'img/' + productName[i] + '.jpg');
    state.allProducts.push(product);
  }
} // What it does: It creates a Product for every name in productName, assigns an image path ('img/' + productName[i] + '.jpg'), and adds it to the state.allProducts array.
// Key info: The state.allProducts array now holds all product objects.

const productRank = {
  totalClicks: 0,
  rounds: 25,
  left: null,
  mid: null,
  right: null,
// This object handles the main logic of the app, including showing images, counting clicks, and displaying results.
  leftElement: document.getElementById('img1'),
  midElement: document.getElementById('img2'),
  rightElement: document.getElementById('img3'),
  imgElement: document.getElementById('productImages'),
  resultElement: document.getElementById('results'),
  resultsButton: document.getElementById('showResults'),
  resetButton: document.getElementById('reset'),
/* totalClicks: Tracks how many times users have clicked on images.
rounds: Sets the maximum number of rounds (25 in this case).
left, mid, right: These represent the three currently displayed products.
leftElement, midElement, rightElement: HTML elements for the displayed images.
imgElement, resultElement, resultsButton, resetButton: HTML elements for managing interactions and results.*/
  getRandomIndex: function () {
    return Math.floor(Math.random() * productName.length);
  },
// What it does: Returns a random index from productName. This helps select random products to display.

/* What it does:
Randomly selects three different products.
Updates the images and their stats (views).
// Links the displayed images to their respective product names.*/
  displayImages: function () { 
    let indices = new Set(); //Set is used to ensure unique numbers (no duplicates).
    while (indices.size < 3) { // while loop goes until the set has 3 elements
      indices.add(this.getRandomIndex()); // The getRandomIndex method is called repeatedly to generate random numbers.
    } //This ensures that three different products are chosen each time
    const [leftIdx, midIdx, rightIdx] = [...indices];
/* The three unique numbers in the Set are converted to an array.
These numbers represent positions (indices) in the state.allProducts list.
leftIdx, midIdx, and rightIdx store these indices.*/
    productRank.left = state.allProducts[leftIdx];
    productRank.mid = state.allProducts[midIdx];
    productRank.right = state.allProducts[rightIdx];
/* The three products corresponding to the random indices are retrieved from state.allProducts.
These products are assigned to productRank.left, productRank.mid, and productRank.right.
Now, these variables hold the specific product objects that will be displayed.*/
    productRank.left.views += 1;
    productRank.mid.views += 1;
    productRank.right.views += 1;
// Each product's views property is increased by 1 to track how many times it has been displayed.
// Why: This allows the app to later show stats about how often each product was viewed.
    productRank.leftElement.src = productRank.left.path;
    productRank.leftElement.id = productRank.left.name;

    productRank.midElement.src = productRank.mid.path;
    productRank.midElement.id = productRank.mid.name;

    productRank.rightElement.src = productRank.right.path;
    productRank.rightElement.id = productRank.right.name;
  },
/* The image source (src) for the left, middle, and right HTML elements is updated to the file path of the selected product (e.g., 'img/boots.jpg').
The id for each image is set to the product’s name (e.g., 'boots').
Why: This ensures that the images for the selected products are displayed on the page, and their names are used for click tracking later.*/


/*onClick Function: The onClick function calls allyClicks when an image is clicked, passing the image's ID (elId).
state.allProducts: This function relies on the state.allProducts array, which holds all the product objects created earlier.*/

  allyClicks: function (elId) { 
    for (const i in state.allProducts) { // The for...in loop is designed to iterate over keys or property names in an object or array. In the case of an array like state.allProducts, the keys are the indices (0, 1, 2, etc.) of the array.
      // What it does: The for...in loop goes through all the products in the state.allProducts array.
      // Why: This is necessary to find the product whose name matches the clicked image's ID.
      if (state.allProducts[i].name === elId) {
        // What it does: This checks if the name of the current product in the loop matches the elId (the ID of the clicked image).
        // Why: This ensures only the clicked product is updated.
        state.allProducts[i].total += 1;
        // What it does: It increases the total property of the matching product by 1.
        // Why: This keeps track of how many times each product has been clicked.

        this.totalClicks += 1;
        // What it does: It increases the app’s overall click count (this.totalClicks) by 1.
        // Why: This is used to track how many times users have interacted with the app.
        console.log(state.allProducts[i].name + ' has ' + state.allProducts[i].total + ' votes');
      } // What it does: This checks if the name of the current product in the loop matches the elId (the ID of the clicked image).
      // Why: This ensures only the clicked product is updated.
    }
  },
// What it does: Increases the click count for the product that matches the clicked image (elId) and updates totalClicks. This function processes clicks on the displayed product images.

  displayResults: function () { /* What it does:
    -Creates a list of all products with their click counts.
    -Displays the total number of user clicks.*/
    const ulEl = document.createElement('ul'); //creates an ul list eelment
    for (const i in state.allProducts) {
      const liElOne = document.createElement('li'); // creates a li element
      const str = state.allProducts[i].name + ' has ' + state.allProducts[i].total + ' votes.';
      liElOne.textContent = str;
      ulEl.appendChild(liElOne);

    } /* document.createElement('li'):

    Creates an empty <li> (list item) in memory.
    state.allProducts[i].name:
    
    Gets the product name (like "boots").
    state.allProducts[i].total:
    
    Gets the number of times this product was clicked.
    str:
    
    Combines the product name and votes into a string, like:
    "boots has 5 votes."
    liElOne.textContent = str:
    
    Adds the string to the list item so it becomes visible text.
    ulEl.appendChild(liElOne):
    
    Adds the finished list item (<li>) to the unordered list (<ul>).*/
    const liElTwo = document.createElement('li');
    liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;
    ulEl.appendChild(liElTwo);

    myChart.data.datasets[0].data= state.allProducts.map(product => product.total);
    myChart.update();

    this.resultElement.appendChild(ulEl);
  }
  
  ,
/* document.createElement('li'):

Creates another <li> (list item) for the total clicks.
productRank.totalClicks:

Gets the total number of clicks across all products.
liElTwo.textContent:

Sets the text of the list item to show something like:
"Total User Clicks: 25"
ulEl.appendChild(liElTwo):

Adds this total clicks list item to the unordered list.*/
  showButton: function () { /* What it does:
    -Shows the results button.
    -When clicked, shows the reset button and displays results.*/
    this.resultsButton.hidden = false;
    /* What it does: Makes the "Show Results" button visible by setting its hidden property to false.
    Why: To let the user click this button to see the results.*/
    this.resultsButton.addEventListener('click', () => {
      //Adds an event listener to the "Show Results" button so that when the button is clicked, the following actions happen:
      this.resetButton.hidden = false;
      // Makes the "Reset" button visible by setting its hidden property to false.
      this.resultsButton.hidden = true;
      // Hides the "Show Results" button after it is clicked.
      this.displayResults();
      // Calls the displayResults function, which generates and displays a list of all products with their vote counts and the total clicks.
      this.resetButton.addEventListener('click', function () {
        location.reload();
        /* Adds an event listener to the "Reset" button. When clicked:
        The location.reload() command refreshes the entire webpage.
        This resets the game to its initial state so the user can play again.*/
      });
    });
  },

  onClick: function (event) { /* What it does:
    -Checks if the user clicked on one of the three displayed images.
    -Updates clicks and either ends the game (if rounds are done) or shows new images.*/
    if (event.target.id === productRank.left.name || event.target.id === productRank.mid.name || event.target.id === productRank.right.name) {
      /* What it does: Checks if the user clicked on one of the three images currently displayed.
      How: It compares the id of the clicked element (event.target.id) with the name of the left, middle, or right product.
      Why: To ensure that only clicks on the correct images are counted.*/
      productRank.allyClicks(event.target.id);
      // Calls the allyClicks function to update the total clicks for the product that was clicked.
      if (productRank.totalClicks % productRank.rounds === 0) {
        //Checks if the total number of clicks has reached the end of the game (the number of rounds).
        productRank.imgElement.removeEventListener('click', productRank.onClick);
        productRank.showButton(); //Removes the event listener so users can’t click the images anymore.
      } else {
        productRank.displayImages(); // Calls the displayImages function to show a new set of three random images.
      }
    } else {
      alert('Click on the picture');
    }
  }
};

const chart= document.getElementById('myChart').getContext('2d');
const myChart= new Chart(chart,  {
  type: 'bar',
  data: {
    labels: productName,
    datasets: [{
      label: 'total clicks',
      data: new Array(productName.length).fill(0),
      backgroundColor: 'rgba(75,192, 12, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
  }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
// Initialize the app
createAlbum();
productRank.imgElement.addEventListener('click', productRank.onClick.bind(productRank));
productRank.displayImages();
/* What it does:
- Creates all product objects and stores them in state.allProducts.
- Sets up a click listener on the image area.
- Displays the first set of images.

Summary of Flow:
- Setup: Products are created using the createAlbum function.
- Display: Random products are shown on the page using displayImages.
- Clicks: User clicks on an image, and onClick tracks the interaction.
- Results: After 25 clicks, results are shown using displayResults.
- Reset: A reset button refreshes the page.
*/