// var DinoDataJson = fetch("dino.json");
var mainform=document.querySelector("#dino-compare");
var gridBody=document.querySelector("#grid");

function generateArrayTiles(animals,yo)
{
    let tiles=[];
   ordererGrid=   animals.slice(0,4).concat(yo).concat(animals.slice(4, 8));
   ordererGrid.forEach(element => {
       tiles.push(generateHTMLTile(element,yo));

    });
    tiles.forEach(tile => {
        gridBody.appendChild(tile);

    });


}
function generateHTMLTile(animal,yo)
{
    const gridItem = document.createElement("div");
    const head = document.createElement("h2");
    const upperdiv=document.createElement("div");

    const image = document.createElement("img");
    const fact = document.createElement("b");
    const tooltip=document.createElement("span");
    gridItem.classList.add("grid-item");
    upperdiv.classList.add("upperdiv");
    tooltip.classList.add("tooltip");


    //Human Tile
    if(animal.species=='human')
    {

   
      head.innerText = animal.name;
  
      image.alt = "human";
      tooltip.innerHTML="<p><strong>Weight:"+animal.weight+"lbs</strong></p><p><strong>Height:"+animal.getHeight()+"</strong></p>";
      fact.innerText = animal.getFact();


    }
      else{
        head.innerText = animal.species;
        image.alt = animal.species;
        tooltip.innerHTML="<p><strong>Where:"+animal.where+"</strong></p><p><strong>When:"+animal.when+"</strong></p>";
        fact.innerText = animal.getFact(yo);

       
      }
    
      image.src = animal.getImg();
      
  //Dino Tile
     
  
    gridItem.appendChild(head);
    gridItem.appendChild(upperdiv);

    upperdiv.appendChild(image);
    upperdiv.appendChild(tooltip);

    fact.innerText && gridItem.appendChild(fact);
  
    return gridItem;
  
}
  
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
    this.species=Obj.species;
    this.fact = Obj.fact;
    this.when=Obj.when,
    this.where=Obj.where;

    
  };
  Animal.prototype = {
    getName: function() {
        return this.species;
    },
    getImg: function() {
        return `images/${this.getName().toLowerCase()}.png`;
    },
  }
  
 


    // Create Dino Constructor
    
const Dino = function({...Obj} = {}) {

    Animal.call(this, Obj);
    Object.assign(this, Obj);

}
Dino.prototype =  Animal;

Dino.prototype.constructor = Dino;
  
    
  
Dino.prototype = Object.assign(Object.create(Animal.prototype), {
    getName: function() {
        return this.species;
    },
    getFact: function(animal) {
        var ResultFact = "Interesting...";
        var randomNumber= Math.floor((Math.random() * 5) + 1);
        switch(randomNumber) {
                case 1:
                this.compareDiet(animal)
                break;
                case 2:
                    this.compareWeight(animal);
              
                break;
                case 3:
                    this.compareHeight(animal);
                
                break;
                case 4:
                    if (this.when== animal.when) {
                        this.fact=(`The ${this.species} lived in the near to you`);
                    }
                    break;
                    case 5:
                // Default fact
                       
                    break;
                }
                return this.fact;
            },
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    // Compare diet
    compareDiet:function(animal){
        if (this.diet === animal.diet){
            this.fact = (`Your diet is the same diet as the ${this.species}`);
        } else {
            this.fact = (`The ${this.species} was a ${this.diet}`);
        }
    },
    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
// compare weight

    compareWeight:function(animal){
        if (this.weight>= animal.weight) {
            this.fact =(`The ${this.species} was ${Math.floor(this.weight/animal.weight)}  times heavier than you` );
        } else {
            this.fact =(`Incredible! You are heavier than ${this.species}`);
        }
     },
     
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
//compare height
     compareHeight : function(animal){
        if (this.height>= animal.height) {
            this.fact =(`The ${this.species} was ${Math.floor(this.height/animal.height)} times taller than you`);
        } else {
            this.fact =(`What?! You are taller than ${this.species}!`);
        }
     }   
});
  
const Pigeon = function ({...Obj} = {}) {
    Animal.call(this,Obj);
    Object.assign(this, Obj);

}

Pigeon.prototype =  Animal;

Pigeon.prototype.constructor = Pigeon;
Pigeon.prototype = Object.assign(Object.create(Animal.prototype), {
   
    getFact: function(animal) {
        return this.fact;
    }
    
});

const dinos =  DinoDataJson['Dinos'].map(dino => (dino.species=="Pigeon")? new Pigeon(dino):  new Dino(dino));


    // Create Human Object
    const Human = function(Obj) {
        this.name = Obj.name;

        Animal.call(this,Obj);
        Object.assign(this, Obj);

    }
    Human.prototype.constructor = Human;

    Human.prototype = Object.assign(Object.create(Animal.prototype), {
        getName: function() {
            return this.name;
        },
        getImg: function() {
            return 'images/human.png';
        },
        getHeight: function() {
            return `${this.height || 0} feets`;
        },
        getFact: function() {
            return `Ey, its you!`;
        }
    });

    // Use IIFE to get human data from form

    function CompareMe()
    {
        
       if(mainform.reportValidity())
       {

     

        dataHuman = (function() {
            return {
                name: document.querySelector('#name').value,
                height: parseInt(document.querySelector('#feet').value) + (parseInt(document.querySelector('#inches').value)/12),
                weight: parseInt(document.querySelector('#weight').value),
                diet: document.querySelector('#diet').value,
                species:"human"
            };
        })();
        var Human_maped= new Human(dataHuman);
        dinos.push(Human_maped);
        // Object.assign(dinos, Human_maped);

        // Generate Tiles for each Dino in Array
        generateArrayTiles(dinos,Human_maped);

                // Add tiles to DOM

      
        // Hide form from screen
        mainform.style.display="none";
        document.getElementById("grid").style.display = "flex";
    }

    }
  
 


  

  


// On button click, prepare and display infographic
