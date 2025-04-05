// project.js - AAAAA I DONT KNOW :(
// Author: Torrey Spear
// Date: 4-5-25

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
}

// let's get this party started - uncomment me
main(){
const fillers = {
  band: ["$size $animal", "$size $color $animal", "$size $color $object", "$animal in a $object", "$opinion $color $animal", "My $animal is a $occupation", "My $occupation is a $animal", "The $opinion Flying $animal", "$opinion $occupation"],
  size: ["Massive", "Tiny", "Small", "Petite", "Giant", "Ginourmous", "Enourmous", "Itty Bitty", "Fun-Sized", "Gargantuan"],
  color: ["Red", "Orange", "Maroon", "Fuchsia", "Salmon", "Pale Yellow", "Khaki", "Burnt Sienna", "Artichoke Green", "Indigo", "Amethyst"],
  animal: ["Salmon", "Bear", "Ocelot", "Dog", "Trout", "Lizard", "Tiger", "Fish", "Bald Eagle", "Arachnid", "Armadillo" ],
  object: ["Tennis Ball", "Lemon", "Bag of Rubber Bands", "Knife", "Magnet", "Mazda Miata", "Cup", "Battery"],
  opinion: ["Amazing", "Phenomenal", "Fantastic", "Shitty", "Fantastic", "Incredibly Inconvinient", "Practical", "Wild"],
  occupation: ["King", "Queen", "Mechanic", "Bus Driver", "Chef", "Carpenter", "Data Analyst", "College Professor", "Secretary"],
  
  genre1: ["Atmospheric", "Dutch", "English", "Russian", "Queer", "Christian", "Contemporary", "Death Core", "Canadian", "Ambient"],
  genre2: ["Indie", "Country", "Orchestra", "Shoegaze", "Jazz", "Doom Metal", "Pop Punk", "Revival", "New Wave", "Psychedelic Rock"],
  style: ["Harajuku", "Grunge", "Goth", "Preppy", "Fairy-core", "Gorp-core", "Scene", "80's Heart throb", "Communist-Chic", "Cyberpunk"],
  
};

const template = ` Thanks for selecting this band generator yo!

The muses have sent me your rad new band name! behold: $band.

so, whaddya think? pretty cool huh.

I think the genre that speaks to this name the most is $genre1 $genre2.

Finally, I can see it now, yall struttin' your stuff, rocking that $style style!

Cant wait to see y'all live. And I better get back stage tickets yo!
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);
}

/* global clicker */
$("#clicker").click(generate);

generate();

}
