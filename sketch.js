class Boid{
  constructor(){
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
  }
  
  edges(){
    if (this.position.x > width){
      this.positon.x = 0;
    }else if (this.position.x < 0){
      this.position.x = width;
    }
    if (this.position.y > height){
      this.positon.x = 0;
    }else if (this.position.x < 0){
      this.position.y = height;
    }
  }
  
  align(boids){
    let perceptionRadius = 25;
    let steering = createVector();
    let total = 0;
    
    
    
    for (let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if(other != this && d < perceptionRadius){
        steering.add(other.velocity);
        
        total++;
      }
    }
    if(total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  separation (boids){
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;
    for(let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius){
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d*d);
        steering.add(diff);
        total++;
      }
    }
    
    if(total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  cohesion(boids){
    let perceptionRadius = 50;
    let steering = createVector;
    let total = 0;
    for (let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius){
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d*d);
        steering.add(diff);
      }
    }
    if(total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  flock(boids){
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    
    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());
    
    this.acceleratin.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }
  
  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleratin.mult(0);
  }
  
  show(){
    strokeWeight(7);
    stroke('gold');
    point(this.position.x, this,position.y);
  }
}

const flock = [];//array berisi banyaknya kendaraan
let alignSlider, cohesionSlider, separationSlider;
let population;

function setup(){
  createCanvas(670, 470);
  //createSlider (min, max, Present Value, Distance)
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  
  population = 200;
  for (let i=0; i<population; i++){
   flock.push(new Boid()); 
  }
}

function draw (){
  background('grey');
  line (0, 420, 670, 420);
  text("Alignment :", 10, 450);
  text("Cohesion :", 140, 450);
  text("Separation :", 270, 450);
  text("Tugas MK MA2213 VISUALISASI DALAM SAINS", 400, 20);
  text("Simulasi Flocking", 400, 40);
  text("Nama : Visna Mutiara Rahma", 400, 70);
  text("NIM : 121160046 ", 400, 85);
  text("Prodi : Matematika ", 400, 100);
  
  for (let boid of flock){
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}