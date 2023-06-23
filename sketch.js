var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;

//new code

var x;
var y;






//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
    
  /*var locA = createVector(50,50);
  var sizeA = 10;
  var locB = createVector(100,100);
  var sizeB = 20;
  var r = isInside(locA,sizeA,locB,sizeB);
  print(r);*/
    
    
    //new code
    
    x = 300;
    y = 500;
    
    
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
    
  fill(255);
  textSize(35);
  text("Score: " + score , 1000,60);

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
    
//    noStroke();
//    fill(255,185,0);
//    ellipse(x,y+random(35,55),20,60);
//    fill(255,255,0);
//    ellipse(x,y+random(35,50),15,40);
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length;i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidDiam = asteroids.diams[i];
        if(isInside(asteroidLoc,asteroidDiam,spaceship.location, spaceship.size)){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length;i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidDiam = asteroids.diams[i];
        if(isInside(asteroidLoc,asteroidDiam,earthLoc, earthSize.y)){
            gameOver();
        }
    }

    

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,earthLoc, earthSize.y)){
            gameOver();
        }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,atmosphereLoc, atmosphereSize.y)){
            spaceship.setNearEarth();
        }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bullets = spaceship.bulletSys.bullets;
    for(var i=0;i<bullets.length;i++){
        for(var j=0; j<asteroids.locations.length;j++){
        var asteroidLoc = asteroids.locations[j];
        var asteroidDiam = asteroids.diams[j];
        if(isInside(asteroidLoc,asteroidDiam,bullets[i],spaceship.bulletSys.diam)){
            asteroids.destroy(j);
            
            spaceship.bulletSys.bullets.splice(j, 1)
            score += 1;
        }
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x , locA.y, locB.x, locB.y);
    var maxDist = sizeA/2 + sizeB/2;
    if(maxDist<d){
        return false;
    }else{
        return true;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
