function Light (centerX, centerY, lightRadius, brightness, colorRed, colorGreen, colorBlue) {
  this.x = centerX;
  this.y = centerY;
  this.oX = this.x;
  this.oY = this.y;
  this.r = lightRadius;
  this.oR = this.r;
  this.b = brightness;
  this.cR = colorRed;
  this.cG = colorGreen;
  this.cB = colorBlue;
  this.oCR = this.cR;
  this.oCG = this.cG;
  this.oCB = this.cB;
  
  this.lightUp = function() {
    for (let ray = 0; ray < this.b; ray++) {
      this.x = this.oX;
      this.y = this.oY;
      this.r = this.oR;
      this.cR = this.oCR;
      this.cG = this.oCG;
      this.cB = this.oCB;
      
      let angDif = 360/this.b;
      let angle = radians(ray*angDif);
      
      for (let rLen = 0; rLen < this.r; rLen++) {
        let rX = this.x+sin(angle)*rLen;
        let rY = this.y-cos(angle)*rLen;
        let quadrant = 0;
        
        if ((rX > this.x) && (rY < this.y)) {
          quadrant = 1;
        }
        if ((rX > this.x) && (rY > this.y)) {
          quadrant = 2;
        }
        if ((rX < this.x) && (rY > this.y)) {
          quadrant = 3;
        }
        if ((rX < this.x) && (rY < this.y)) {
          quadrant = 4;
        }
        
        for (let o = 0; o < oBlocks.length; o++) {
          let Xmin = (-oBlocks[o].sizeX/2)+oBlocks[o].x;
          let Xmax = (oBlocks[o].sizeX/2)+oBlocks[o].x;
          let Ymin = (-oBlocks[o].sizeY/2)+oBlocks[o].y;
          let Ymax = (oBlocks[o].sizeY/2)+oBlocks[o].y;
          
          if (((rY >= Ymin) && (rY <= Ymax)) && ((rX >= Xmin) && (rX <= Xmax))) {            
            this.r -= rLen+(oBlocks[o].cA);
            rLen = 0;
            this.x = rX;
            this.y = rY;
            this.cR = (oBlocks[o].cR+this.cR)/2;
            this.cG = (oBlocks[o].cG+this.cG)/2;
            this.cB = (oBlocks[o].cB+this.cB)/2;
            stroke(this.cR, this.cG, this.cB, (63*(this.r-rLen)/this.r));
            line(rX, rY, rX, rY);
            
            if (quadrant == 1) {
              if (ceil(rY) == ceil(Ymax)) {  
                angle += PI-2*angle;
              }
              if (floor(rX) == floor(Xmin)) {  
                angle -= 2*angle;
              }
            }
          
            if (quadrant == 2) {
              if (floor(rY) == floor(Ymin)) {  
                angle -= PI+2*angle;
              }
              if (floor(rX) == floor(Xmin)) {  
                angle -= 2*angle;
              }
            }
          
            if (quadrant == 3) {
                if (floor(rY) == floor(Ymin)) {  
                  angle -= PI+2*angle;
                }
                if (ceil(rX) == ceil(Xmax)) {  
                  angle -= 2*angle;
                }
              }
          
            if (quadrant == 4) {
              if (ceil(rY) == ceil(Ymax)) {  
                angle += PI-2*angle;
              }
              if (ceil(rX) == ceil(Xmax)) {  
                angle -= 2*angle;
              }
            }
          }
        }
        
        for (let t = 0; t < tBlocks.length; t++) {
          let Xmin = (-tBlocks[t].sizeX/2)+tBlocks[t].x;
          let Xmax = (tBlocks[t].sizeX/2)+tBlocks[t].x;
          let Ymin = (-tBlocks[t].sizeY/2)+tBlocks[t].y;
          let Ymax = (tBlocks[t].sizeY/2)+tBlocks[t].y;
          
          if (((rY >= Ymin) && (rY <= Ymax)) && ((rX >= Xmin) && (rX <= Xmax))) {
            this.r -= 1;
            rLen = 0;
            this.x = rX;
            this.y = rY;
            this.cR = (tBlocks[t].cR+this.cR)/2;
            this.cG = (tBlocks[t].cG+this.cG)/2;
            this.cB = (tBlocks[t].cB+this.cB)/2;
            stroke(this.cR, this.cG, this.cB, tBlocks[t].t/10);
            line(rX, rY, rX, rY);
          }
        }
      }
    }
  }
}

function OBlock (centerX, centerY, blockSizeX, blockSizeY, colorRed, colorGreen, colorBlue, colorAbsorb) {
  this.x = centerX;
  this.y = centerY;
  this.sizeX = blockSizeX;
  this.sizeY = blockSizeY;
  this.cR = colorRed;
  this.cG = colorGreen;
  this.cB = colorBlue;
  this.cA = colorAbsorb;
  
  this.drawBlock = function() {
    fill(this.cR/2, this.cG/2, this.cB/2);
    stroke(this.cR/2, this.cG/2, this.cB/2);
    rect(this.x, this.y, this.sizeX, this.sizeY);
  }
}

function TBlock (centerX, centerY, blockSizeX, blockSizeY, colorRed, colorGreen, colorBlue, colorAbsorb, transparency) {
  this.x = centerX;
  this.y = centerY;
  this.sizeX = blockSizeX;
  this.sizeY = blockSizeY;
  this.cR = colorRed;
  this.cG = colorGreen;
  this.cB = colorBlue;
  this.cA = colorAbsorb;
  this.t = transparency;
  
  this.drawBlock = function() {
    fill(this.cR/2, this.cG/2, this.cB/2, this.t);
    stroke(this.cR/2, this.cG/2, this.cB/2, this.t);
    rect(this.x, this.y, this.sizeX, this.sizeY);
  }
}

let oBlocks = [];
let tBlocks = [];
let light = new Light(500, 500, 2000, 21600, 255, 255, 255);

let ray = 0;

function setup() {
  createCanvas(500, 500);
  background(0);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeWeight(1);
  
  oBlocks.push(new OBlock(350, 100, 100, 50, 0, 0, 255, 100));
  oBlocks.push(new OBlock(300, 200, 100, 100, 0, 255, 0, 100));
  oBlocks.push(new OBlock(200, 250, 50, 100, 255, 0, 0, 100));
  oBlocks.push(new OBlock(500, 5, 1000, 10, 0, 0, 0, 100));
  oBlocks.push(new OBlock(5, 500, 10, 1000, 0, 0, 0, 100));
  oBlocks.push(new OBlock(500, 995, 1000, 10, 0, 0, 0, 100));
  oBlocks.push(new OBlock(995, 500, 10, 1000, 0, 0, 0, 100));
  
  tBlocks.push(new TBlock(700, 700, 100, 100, 255, 255, 255, 100, 10));
  
  light.lightUp();
  console.log("Rendering time: " + round(millis()/1000) + " seconds");
}