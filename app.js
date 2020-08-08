// var DinoDataJson = fetch("dino.json");

var DinoDataJson={
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
};

const Animal= function (Obj) {
    this.height = Obj.height;

    this.weight = Obj.weight;
    this.diet=Obj.diet;
    this.img='images/'+Obj.species.toLowerCase()+'.png';
    this.species=Obj.species;
    this.fact = Obj.fact;
    this.when=Obj.when,
    this.where=Obj.where;

    
  };
  
  

const Dino = function({...Obj} = {}) {

    Animal.call(this, Obj);
    Object.assign(this, Obj);

}
Dino.prototype =  Animal;

Dino.prototype.constructor = Dino;
Dino.prototype.getRandomFact= function(animal) {
    var facts = [];
    if (this.diet!= animal.diet) {
        facts.push(`Your diet is different than that of ${this.species}`);
    } else {
        facts.push(`Your diet is the same diet as the ${this.species}`);
    }
    if (this.weight>= animal.weight) {
        facts.push(`You are not heavier than ${this.species}`);
    } else {
        facts.push(`You are heavier than ${this.species}`);
    }
    if (this.height>= animal.height) {
        facts.push(`You are not taller than ${this.species}`);
    } else {
        facts.push(`You are taller than ${this.species}`);
    }
  
    if (this.when== animal.when) {
        facts.push(`The ${this.species} lived in the same place as you`);
    }
    return facts[Math.floor(Math.random()*facts.length)];
};
const Human = function(name) {
    Animal.call(this);
    this.name = name;
}
Human.prototype = Object.assign(Object.create(Animal.prototype), {
    getName: function() {
        return this.name;
    },
    getImg: function() {
        return 'images/human.png';
    },
    getHeight: function() {
        return `${this.feet || 0} feet, ${this.inches || 0} inches`;
    },
    getRandomFact: function() {
        return `Ey, its you!`;
    }
});
Human.prototype.constructor = Human;

const Pigeon = function ({...Obj} = {}) {
    Dino.call(this,Obj);
    Object.assign(this, Obj);

}
Pigeon.prototype = Object.assign(Object.create(Dino.prototype), {
    getRandomFact: function() {
        return this.getFact();
    }
});
Pigeon.prototype =  Animal;

Pigeon.prototype.constructor = Pigeon;


    // Create Dino Constructor
    
      const dinos =  DinoDataJson['Dinos'].map(dino => (dino.species=="Pigeon")? new Pigeon(dino):  new Dino(dino));


    // Create Human Object

    // Use IIFE to get human data from form
    function CompareMe()
    {
        data = (function() {
            return {
                name: document.querySelector('#name').value,
                heightFeet: parseInt(document.querySelector('#feet').value),
                heightInches: parseInt(document.querySelector('#inches').value),
                weight: parseInt(document.querySelector('#weight').value),
                diet: document.querySelector('#diet').value
            }
        })();
        appendTiles();

    }
  
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
