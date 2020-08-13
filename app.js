let mainform = document.querySelector("#dino-compare");
let gridBody = document.querySelector("#grid");

/**
    * @description Generation of the array and the tilesets
    * @param {array} animals - All the animals, including the human and the pigeon
    * @param {object} myData - Isolated data of the human
    
    */
function generateArrayTiles(animals, myData) {
  ordererGrid = animals.slice(0, 4).concat(myData).concat(animals.slice(4, 8));
  ordererGrid.forEach((element) => {
    gridBody.appendChild(generateHTMLTile(element, myData));
  });
}
/**
    * @description Generation of the html DOM
    * @param {array} animals - All the animals, including the human and the pigeon
    * @param {object} myData - Isolated data of the human
    
    */
function generateHTMLTile(animal, myData) {
  const gridItem = document.createElement("div");
  const head = document.createElement("h2");
  const upperdiv = document.createElement("div");
  const image = document.createElement("img");
  const fact = document.createElement("b");
  const tooltip = document.createElement("span");
  gridItem.classList.add("grid-item");
  upperdiv.classList.add("upperdiv");
  tooltip.classList.add("tooltip");

  //Human Tile
  if (animal.species == "human") {
    head.innerText = animal.name;

    image.alt = "human";
    tooltip.innerHTML =
      "<p><strong>Weight:" +
      animal.weight +
      " lbs</strong></p><p><strong>Height:" +
      animal.getHeight() +
      "</strong></p>";
  } else {
    head.innerText = animal.species;
    image.alt = animal.species;
    tooltip.innerHTML =
      "<p><strong>Where:" +
      animal.where +
      "</strong></p><p><strong>When:" +
      animal.when +
      "</strong></p>";
    fact.innerText = animal.getFact(myData);
  }
  //Dino Tile
  image.src = animal.getImg();

  gridItem.appendChild(head);
  gridItem.appendChild(upperdiv);
  upperdiv.appendChild(image);
  upperdiv.appendChild(tooltip);
  fact.innerText && gridItem.appendChild(fact);

  return gridItem;
}
/**
 * @description Animal constructor
 * @constructor
 * @param {Obj} Obj - Object with the info of the animal
 */
const Animal = function (Obj) {
  this.height = Obj.height;
  this.weight = Obj.weight;
  this.diet = Obj.diet;
  this.species = Obj.species;
  this.fact = Obj.fact;
  (this.when = Obj.when), (this.where = Obj.where);
};

Animal.prototype = {
  getName: function () {
    return this.species;
  },
  getImg: function () {
    return `images/${this.getName().toLowerCase()}.png`;
  },
};

// Create Dino Constructor
/**
 * @description Dino constructor
 * @constructor
 * @param {Obj} Obj - Object with the info of the animal
 */
const Dino = function ({ ...Obj } = {}) {
  Animal.call(this, Obj);
  Object.assign(this, Obj);
};

Dino.prototype = Animal;
Dino.prototype.constructor = Dino;
Dino.prototype = Object.assign(Object.create(Animal.prototype), {
  getName: function () {
    return this.species;
  },

  getFact: function (animal) {
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    switch (randomNumber) {
      case 1:
        this.compareDiet(animal);
        break;
      case 2:
        this.compareWeight(animal);
        break;
      case 3:
        this.compareHeight(animal);
        break;
      case 4:
        // Default fact
        break;
    }
    return this.fact;
  },
  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // Compare diet
  compareDiet: function (animal) {
    if (this.diet === animal.diet) {
      this.fact = `Your diet is the same diet as the ${this.species}`;
    } else {
      this.fact = `The ${this.species} was a ${this.diet}`;
    }
  },
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // compare weight
  compareWeight: function (animal) {
    if (this.weight >= animal.weight) {
      this.fact = `The ${this.species} was ${Math.floor(
        this.weight / animal.weight
      )}  times heavier than you`;
    } else {
      this.fact = `Incredible! You are heavier than ${this.species}`;
    }
  },
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  //compare height
  compareHeight: function (animal) {
    if (this.height >= animal.height) {
      this.fact = `The ${this.species} was ${Math.floor(
        this.height / animal.height
      )} times taller than you`;
    } else {
      this.fact = `What?! You are taller than ${this.species}!`;
    }
  },
});
/**
 * @description Pigeon constructor
 * @constructor
 * @param {Obj} Obj - Object with the info of the animal
 */
const Pigeon = function ({ ...Obj } = {}) {
  Animal.call(this, Obj);
  Object.assign(this, Obj);
};

Pigeon.prototype = Animal;
Pigeon.prototype.constructor = Pigeon;
Pigeon.prototype = Object.assign(Object.create(Animal.prototype), {
  getFact: function (animal) {
    return this.fact;
  },
});

async function getMyDinos() {
  // Dinos to the array
  return fetch("./dino.json")
    .then((response) => response.json())
    .then(function (response) {
      return response.Dinos.map((dino) =>
        dino.species == "Pigeon" ? new Pigeon(dino) : new Dino(dino)
      );
    });
}
/**
 * @description Human constructor
 * @constructor
 * @param {Obj} Obj - Object with the info of the animal
 */
// Create Human Object
const Human = function (Obj) {
  this.name = Obj.name;
  Animal.call(this, Obj);
  Object.assign(this, Obj);
};

Human.prototype.constructor = Human;
Human.prototype = Object.assign(Object.create(Animal.prototype), {
  getName: function () {
    return this.name;
  },
  getImg: function () {
    return "images/human.png";
  },
  getHeight: function () {
    return `${this.height || 0} feets`;
  },
});

/**
 * @description On button click, prepare and display infographic. This is the pseudo-post starts all the main-core program
 */
function CompareMe() {
  let dinos = [];
  // Not a typical post form, but i need to check validations
  if (mainform.reportValidity()) {
    getMyDinos().then(function (response) {
      dinos = response;
      // Use IIFE to get human data from form
      dataHuman = (function () {
        return {
          name: document.querySelector("#name").value,
          height:
            parseInt(document.querySelector("#feet").value) +
            parseInt(document.querySelector("#inches").value) / 12,
          weight: parseInt(document.querySelector("#weight").value),
          diet: document.querySelector("#diet").value,
          species: "human",
        };
      })();

      var Human_maped = new Human(dataHuman);
      // Generate Tiles for each Dino in Array
      // Add tiles to DOM
      generateArrayTiles(dinos, Human_maped);
      // Hide form from screen
      mainform.style.display = "none";
      document.getElementById("grid").style.display = "flex";
    });
  }
}
