class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
      
      
  }

  run(){
    this.bulletSys.run();
    //this.draw();
    this.move();
    this.edges();
    this.interaction();
    this.thrust();
    this.draw();
      
      
    
  }
    
     thrust(){
    noStroke();
    fill(255,185,0);
    ellipse(this.location.x,this.location.y+random(35,55),20,60);
    fill(255,255,0);
    ellipse(this.location.x,this.location.y+random(35,50),15,40);
     }
    
    

  draw(){
//    fill(125);
//    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
//        this.location.x + this.size/2, this.location.y + this.size/2,
//        this.location.x, this.location.y - this.size/2);
      
//      noStroke();
//    fill(255,185,0);
//    ellipse(this.location.x,this.location.y+random(35,55),20,60);
//    fill(255,255,0);
//    ellipse(this.location.x,this.location.y+random(35,50),15,40);
//      
//      fill(125);
//    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
//        this.location.x + this.size/2, this.location.y + this.size/2,
//        this.location.x, this.location.y - this.size/2);
      
      fill(0,255,255);
      arc(this.location.x,this.location.y + 35,50,40,PI,0,CHORD);
      
      fill(255,0,0);
      ellipse(this.location.x,this.location.y,40,90);
      
      fill(0,255,255);
      ellipse(this.location.x,this.location.y+40,10,30);
    
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
          this.applyForce(createVector(-0.1, 0)); // dec x
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0.1, 0)); // inc x
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0, -0.1)); // dec y
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0, 0.1)); // inc y
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }
    

    
    

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
      print("set near earth");
      var gravity = createVector(0,0.05);
      this.applyForce(gravity);
      
      var friction = this.velocity.copy();
      friction.mult(-1/30);
      this.applyForce(friction);
  }
    
    
    
    
}
