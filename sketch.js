var balloon, balloonPos, BG, database, bIMG, Dog, DogIMG;

function preload(){

  BG = loadImage("cityImage.png")
  bIMG = loadAnimation("HotAirBallon-01.png", "HotAirBallon-02.png", "HotAirBallon-03.png")
  DogIMG = loadAnimation("Dog.png", "happy dog.png")
}

function setup(){
    database = firebase.database();
    createCanvas(1500,500);
    balloon = createSprite(250,250,10,10);
    balloon.shapeColor = "red";
    balloon.addAnimation("changing", bIMG)
    balloon.scale = 0.5;

    Dog = createSprite(750,400,10,10);
    Dog.addAnimation("changing", DogIMG )
    Dog.scale = 0.2
    var pos = database.ref("balloon/position")
    pos.on("value", readPosition, showError)
}

function draw(){
    background(BG);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("balloon/position").set({
    "x": balloonPos.x + x,
    "y": balloonPos.y + y
    })
}

function readPosition(data){
    balloonPos = data.val();
    balloon.x = balloonPos.x;
    balloon.y = balloonPos.y;
}

function showError(){
    console.log("Error Occured")
}
