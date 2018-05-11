class Light {
  float x, y, r, b, oX, oY, oR, cR, cG, cB, oCR, oCG, oCB;
  int rLen = 0;
  Light (float centerX, float centerY, float lightRadius, float brightness, float colorRed, float colorGreen, float colorBlue) {
    x = centerX;
    y = centerY;
    oX = x;
    oY = y;
    r = lightRadius;
    oR = r;
    b = brightness;
    cR = colorRed;
    cG = colorGreen;
    cB = colorBlue;
    oCR = cR;
    oCG = cG;
    oCB = cB;
  }
  
  void lightUp() {
    for (int ray = 0; ray < b; ray++) {
      x = oX;
      y = oY;
      r = oR;
      cR = oCR;
      cG = oCG;
      cB = oCB;
      
      float angDif = 360/b;
      float angle = radians(ray*angDif);
      
      for (int rLen = 0; rLen < r; rLen++) {
        float rX = x+sin(angle)*rLen;
        float rY = y-cos(angle)*rLen;
        int quadrant = 0;
        
        if ((rX > x) && (rY < y)) {
          quadrant = 1;
        }
        if ((rX > x) && (rY > y)) {
          quadrant = 2;
        }
        if ((rX < x) && (rY > y)) {
          quadrant = 3;
        }
        if ((rX < x) && (rY < y)) {
          quadrant = 4;
        }
        
        for (int o = 0; o < oBlocks.length; o++) {
          float Xmin = (-oBlocks[o].sizeX/2)+oBlocks[o].x;
          float Xmax = (oBlocks[o].sizeX/2)+oBlocks[o].x;
          float Ymin = (-oBlocks[o].sizeY/2)+oBlocks[o].y;
          float Ymax = (oBlocks[o].sizeY/2)+oBlocks[o].y;
          
          if (((rY >= Ymin) && (rY <= Ymax)) && ((rX >= Xmin) && (rX <= Xmax))) {            
            r -= rLen+(oBlocks[o].cA);
            rLen = 0;
            x = rX;
            y = rY;
            cR = (oBlocks[o].cR+cR)/2;
            cG = (oBlocks[o].cG+cG)/2;
            cB = (oBlocks[o].cB+cB)/2;
            stroke(cR, cG, cB, (63*(r-rLen)/r));
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
        
        for (int t = 0; t < tBlocks.length; t++) {
          float Xmin = (-tBlocks[t].sizeX/2)+tBlocks[t].x;
          float Xmax = (tBlocks[t].sizeX/2)+tBlocks[t].x;
          float Ymin = (-tBlocks[t].sizeY/2)+tBlocks[t].y;
          float Ymax = (tBlocks[t].sizeY/2)+tBlocks[t].y;
          
          if (((rY >= Ymin) && (rY <= Ymax)) && ((rX >= Xmin) && (rX <= Xmax))) {
            r -= 1;
            rLen = 0;
            x = rX;
            y = rY;
            cR = (tBlocks[t].cR+cR)/2;
            cG = (tBlocks[t].cG+cG)/2;
            cB = (tBlocks[t].cB+cB)/2;
            stroke(cR, cG, cB, tBlocks[t].t/10);
            line(rX, rY, rX, rY);
          }
        }
      }
    }
  }
}

class OBlock {
  float x, y, sizeX, sizeY, cR, cG, cB, cA;
  OBlock (float centerX, float centerY, float blockSizeX, float blockSizeY, float colorRed, float colorGreen, float colorBlue, float colorAbsorb) {
    x = centerX;
    y = centerY;
    sizeX = blockSizeX;
    sizeY = blockSizeY;
    cR = colorRed;
    cG = colorGreen;
    cB = colorBlue;
    cA = colorAbsorb;
  }
  
  void drawBlock() {
    fill(cR/2, cG/2, cB/2);
    stroke(cR/2, cG/2, cB/2);
    rect(x, y, sizeX, sizeY);
  }
}

class TBlock {
  float x, y, sizeX, sizeY, cR, cG, cB, cA, t;
  TBlock (float centerX, float centerY, float blockSizeX, float blockSizeY, float colorRed, float colorGreen, float colorBlue, float colorAbsorb, float transparency) {
    x = centerX;
    y = centerY;
    sizeX = blockSizeX;
    sizeY = blockSizeY;
    cR = colorRed;
    cG = colorGreen;
    cB = colorBlue;
    cA = colorAbsorb;
    t = transparency;
  }
  
  void drawBlock() {
    fill(cR/2, cG/2, cB/2, t);
    stroke(cR/2, cG/2, cB/2, t);
    rect(x, y, sizeX, sizeY);
  }
}

OBlock[] oBlocks = new OBlock[7];
TBlock[] tBlocks = new TBlock[1];
Light light = new Light(500, 500, 2000, 21600, 255, 255, 255);

int ray = 0;

void setup() {
  size(1000, 1000);
  background(0);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeWeight(1);
  
  oBlocks[0] = new OBlock(350, 100, 100, 50, 0, 0, 255, 100);
  oBlocks[1] = new OBlock(300, 200, 100, 100, 0, 255, 0, 100);
  oBlocks[2] = new OBlock(200, 250, 50, 100, 255, 0, 0, 100);
  oBlocks[3] = new OBlock(500, 5, 1000, 10, 0, 0, 0, 100);
  oBlocks[4] = new OBlock(5, 500, 10, 1000, 0, 0, 0, 100);
  oBlocks[5] = new OBlock(500, 995, 1000, 10, 0, 0, 0, 100);
  oBlocks[6] = new OBlock(995, 500, 10, 1000, 0, 0, 0, 100);
  
  tBlocks[0] = new TBlock(700, 700, 100, 100, 255, 255, 255, 100, 10);
  
  light.lightUp();
  println("Rendering time: " + round(millis()/1000) + " seconds");
}

void draw() {
}