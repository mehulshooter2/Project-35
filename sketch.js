// variable in part1
var dog,happyDog,dogImg,happyDogImg,database,foodS,foodStock;

// variable in part2 
var addFood,feedDog,fedTime,lastFed,foodObj,input,InputSave;

// variable in part3
var bedroomImg,gardenImg,washroomImg,sadDogImg,changeState,readState;

function preload(){
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happydog.png");
  bedroomImg =loadImage("virtual pet images/Bed Room.png");
  gardenImg =loadImage("virtual pet images/Garden.png");
  washroomImg =loadImage("virtual pet images/Wash Room.png");
  sadDogImg =loadImage("virtual pet images/Lazy.png");
}

function setup() {
  createCanvas(displayWidth/2+300,displayHeight/2+150);
  dog = createSprite(850,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  //reading value of food
  database = firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  foodObj = new Food();
  addFood = createButton("ADD FOOD");
  feedDog = createButton("FEED THE DOG");
  title = createElement("h2")
  InputSave = createButton("OK");
  input = createInput("write name of your dog here");

  // properties of buttons and inputs
  addFood.position(1000,70);
  addFood.mousePressed(funAddFood);
  title.html("YOUR VIRUAL PET APP")
  title.position(displayWidth/2-100,40);
  feedDog.position(1100,70);
  feedDog.mousePressed(funFeedDog);
  input.position(1000,100);
  InputSave.position(1000,130);
  
}


function draw() {  
background(46,139,87);
  foodObj.display();
  drawSprites();

  // reading last fed
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val()
  });
  
  //adding text
  textSize(20);    
  fill("wite");
  if(lastFed>=12){
    text("LAST FEED : "+ lastFed%12 +" AM",350,80);
  } else if(lastFed===0){
    text("LAST FEED : 12 AM",350,80)
  } else{
    text("LAST FEED : "+ lastFed +" AM",350,80);
  }

  if(foodS === 0){
    foodS = 20
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food : x
  })
}

function funFeedDog(){
  dog.addImage(happyDogImg);
  dog.x= 800;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function funAddFood(){
  dog.addImage(dogImg);
  dog.x =850;
  foodS++;
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
   Food : foodS 
  })
}
