let timeOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background('#caf0f8');
  
  // 設定水草顏色 (深海綠，帶透明度)
  fill(46, 139, 87, 200);

  let startX = width / 2; // 水草根部 X 座標
  let startY = height;    // 水草根部 Y 座標
  let plantHeight = 600;  // 水草高度 (增加高度)
  let segments = 30;      // 分段數
  let baseWidth = 60;     // 根部寬度 (加粗)

  beginShape();
  
  // 繪製左側 (從底部往上)
  for (let i = 0; i <= segments; i++) {
    let t = i / segments; // 0 到 1 的比例
    let y = startY - (t * plantHeight);
    
    // 使用 noise 產生擺動值
    let noiseVal = noise(i * 0.1, timeOffset);
    // 使用 map 將 noise (0~1) 映射到擺動範圍 (-40 ~ 40)
    let xOffset = map(noiseVal, 0, 1, -80, 80); // 增加搖晃距離 (-80 ~ 80)
    
    // 計算最終 X 座標：根部 (t=0) 不動，越往上擺動幅度越大
    let finalX = startX + (xOffset * t); 
    
    // 寬度隨高度遞減
    let currentWidth = (1 - t) * baseWidth;
    
let grasses = [];
let timeOffset = 0;
// 指定的顏色色票
let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initGrass();
}

function draw() {
  background('#caf0f8');
  
  // 繪製所有的小草
  for (let g of grasses) {
    g.display();
  }

  // 更新時間變數，產生動畫效果
  timeOffset += 0.01;
}

// 初始化水草
function initGrass() {
  grasses = [];
  for (let i = 0; i < 50; i++) {
    // 均衡產生在視窗的寬度內 (利用 map 將 0-49 映射到 0-width)
    // 加上 random(-10, 10) 讓位置稍微自然一點，不要太死板的等距排列
    let x = map(i, 0, 50, 0, width) + random(-10, 10);
    // 隨機選取顏色
    let col = random(colors);
    grasses.push(new Grass(x, col));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 視窗大小改變時，重新計算分佈
  initGrass();
}

// 定義小草類別
class Grass {
  constructor(x, colHex) {
    this.x = x;
    // 設定顏色並加上透明度
    this.color = color(colHex);
    this.color.setAlpha(200); 
    
    // 隨機高度與寬度
    this.plantHeight = random(400, 700); 
    this.baseWidth = random(20, 50);
    
    // 每個草有獨立的雜訊偏移，讓它們擺動時不會完全同步
    this.noiseShift = random(1000);
    this.segments = 30;
  }

  display() {
    fill(this.color);
    beginShape();
    
    // 繪製左側 (從底部往上)
    for (let i = 0; i <= this.segments; i++) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      // 使用 noise 產生擺動值 (加入 this.noiseShift 錯開波形)
      let noiseVal = noise(i * 0.1, timeOffset + this.noiseShift);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      
      // 根部不動 (t=0 時 xOffset * t = 0)
      let finalX = this.x + (xOffset * t); 
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX - currentWidth / 2, y);
    }

    // 繪製右側 (從頂部往下，確保圖形閉合)
    for (let i = this.segments; i >= 0; i--) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      let noiseVal = noise(i * 0.1, timeOffset + this.noiseShift);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      let finalX = this.x + (xOffset * t);
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX + currentWidth / 2, y);
    }
    
    endShape(CLOSE);
  }
}
let grasses = [];
let timeOffset = 0;
// 指定的顏色色票
let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initGrass();
}

function draw() {
  background('#caf0f8');
  
  // 繪製所有的小草
  for (let g of grasses) {
    g.display();
  }

  // 更新時間變數，產生動畫效果
  timeOffset += 0.01;
}

// 初始化水草
function initGrass() {
  grasses = [];
  for (let i = 0; i < 50; i++) {
    // 均衡產生在視窗的寬度內 (利用 map 將 0-49 映射到 0-width)
    // 加上 random(-10, 10) 讓位置稍微自然一點，不要太死板的等距排列
    let x = map(i, 0, 50, 0, width) + random(-10, 10);
    // 隨機選取顏色
    let col = random(colors);
    grasses.push(new Grass(x, col));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 視窗大小改變時，重新計算分佈
  initGrass();
}

// 定義小草類別
class Grass {
  constructor(x, colHex) {
    this.x = x;
    // 設定顏色並加上透明度
    this.color = color(colHex);
    this.color.setAlpha(200); 
    
    // 隨機高度與寬度
    this.plantHeight = random(400, 700); 
    this.baseWidth = random(20, 50);
    
    // 每個草有獨立的雜訊偏移，讓它們擺動時不會完全同步
    this.noiseShift = random(1000);
    this.segments = 30;
  }

  display() {
    fill(this.color);
    beginShape();
    
    // 繪製左側 (從底部往上)
    for (let i = 0; i <= this.segments; i++) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      // 使用 noise 產生擺動值 (加入 this.noiseShift 錯開波形)
      let noiseVal = noise(i * 0.1, timeOffset + this.noiseShift);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      
      // 根部不動 (t=0 時 xOffset * t = 0)
      let finalX = this.x + (xOffset * t); 
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX - currentWidth / 2, y);
    }

    // 繪製右側 (從頂部往下，確保圖形閉合)
    for (let i = this.segments; i >= 0; i--) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      let noiseVal = noise(i * 0.1, timeOffset + this.noiseShift);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      let finalX = this.x + (xOffset * t);
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX + currentWidth / 2, y);
    }
    
    endShape(CLOSE);
  }
}
let grasses = [];
let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initGrass();
}

function draw() {
  background('#caf0f8');
  
  // 繪製所有的小草
  for (let g of grasses) {
    g.display();
  }
}

// 初始化水草
function initGrass() {
  grasses = [];
  for (let i = 0; i < 50; i++) {
    // 均衡產生在視窗的寬度內 (利用 map 將 0-49 映射到 0-width)
    // 加上 random(-20, 20) 增加一些隨機交錯感
    let x = map(i, 0, 50, 0, width) + random(-20, 20);
    // 隨機選取顏色
    let col = random(colors);
    grasses.push(new Grass(x, col));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 視窗大小改變時，重新計算分佈
  initGrass();
}

// 定義小草類別
class Grass {
  constructor(x, colHex) {
    this.x = x;
    // 設定顏色並加上透明度
    this.color = color(colHex);
    this.color.setAlpha(200); 
    
    // 1. 線條寬度要在 30 到 60 間
    this.baseWidth = random(30, 60);
    
    // 2. 水草高度不能超過視窗高度的 2/3 (這裡設定在 1/3 ~ 2/3 之間)
    this.plantHeight = random(height / 3, height * 2 / 3);
    
    this.segments = 30;
    
    // 3. 搖晃的速度與方向每根也要不一樣
    // timeOffset 決定起始的擺動位置(方向/相位)
    this.timeOffset = random(1000); 
    // swaySpeed 決定擺動的快慢
    this.swaySpeed = random(0.005, 0.02); 
  }

  display() {
    fill(this.color);
    beginShape();
    
    // 繪製左側 (從底部往上)
    for (let i = 0; i <= this.segments; i++) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      // 使用 noise 產生擺動值 (使用自己的 timeOffset)
      let noiseVal = noise(i * 0.1, this.timeOffset);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      
      // 根部不動 (t=0 時 xOffset * t = 0)
      let finalX = this.x + (xOffset * t); 
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX - currentWidth / 2, y);
    }

    // 繪製右側 (從頂部往下，確保圖形閉合)
    for (let i = this.segments; i >= 0; i--) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      let noiseVal = noise(i * 0.1, this.timeOffset);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      let finalX = this.x + (xOffset * t);
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX + currentWidth / 2, y);
    }
    
    endShape(CLOSE);

    // 更新這根水草的時間，產生獨立的動畫效果
    this.timeOffset += this.swaySpeed;
  }
}
let grasses = [];
let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // 設定畫布樣式，讓它浮在 iframe 上方但允許點擊穿透
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 畫布層級在上
  canvas.style('pointer-events', 'none'); // 關鍵：讓滑鼠事件穿透畫布，使 iframe 可被操作

  // 建立 iframe 顯示網頁
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.style('position', 'fixed');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // iframe 層級在下

  noStroke();
  initGrass();
}

function draw() {
  // 先清除畫布，確保不會因為疊加導致背景變不透明
  clear();
  
  // 設定半透明背景：#caf0f8 (RGB: 202, 240, 248), Alpha: 51 (約 0.2)
  background(202, 240, 248, 51);
  
  // 繪製所有的小草
  for (let g of grasses) {
    g.display();
  }
}

// 初始化水草
function initGrass() {
  grasses = [];
  for (let i = 0; i < 50; i++) {
    // 均衡產生在視窗的寬度內
    // 加上 random(-20, 20) 增加一些自然隨機感
    let x = map(i, 0, 50, 0, width) + random(-20, 20);
    // 隨機選取顏色
    let col = random(colors);
    grasses.push(new Grass(x, col));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrass(); // 視窗大小改變時重新生成，以適應新寬度
}

// 定義小草類別
class Grass {
  constructor(x, colHex) {
    this.x = x;
    this.color = color(colHex);
    this.color.setAlpha(200); 
    
    // 線條寬度要在 30 到 60 間
    this.baseWidth = random(30, 60);
    
    // 水草高度不能超過視窗高度的 2/3 (設定在 1/3 ~ 2/3 之間)
    this.plantHeight = random(height / 3, height * 2 / 3);
    
    this.segments = 30;
    
    // 搖晃的速度與方向每根也要不一樣
    this.noiseOffset = random(1000); 
    this.swaySpeed = random(0.005, 0.02); 
  }

  display() {
    fill(this.color);
    beginShape();
    
    // 繪製左側 (從底部往上)
    for (let i = 0; i <= this.segments; i++) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      // 使用各自獨立的 noiseOffset 產生擺動值
      let noiseVal = noise(i * 0.1, this.noiseOffset);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      
      // 根部不動 (t=0 時 xOffset * t = 0)
      let finalX = this.x + (xOffset * t); 
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX - currentWidth / 2, y);
    }

    // 繪製右側 (從頂部往下，確保圖形閉合)
    for (let i = this.segments; i >= 0; i--) {
      let t = i / this.segments;
      let y = height - (t * this.plantHeight);
      
      let noiseVal = noise(i * 0.1, this.noiseOffset);
      let xOffset = map(noiseVal, 0, 1, -80, 80);
      let finalX = this.x + (xOffset * t);
      let currentWidth = (1 - t) * this.baseWidth;
      
      curveVertex(finalX + currentWidth / 2, y);
    }
    
    endShape(CLOSE);

    // 更新這根水草的時間，產生獨立的動畫效果
    this.noiseOffset += this.swaySpeed;
  }
}
    curveVertex(finalX - currentWidth / 2, y);
  }

  // 繪製右側 (從頂部往下，確保圖形閉合)
  for (let i = segments; i >= 0; i--) {
    let t = i / segments;
    let y = startY - (t * plantHeight);
    
    let noiseVal = noise(i * 0.1, timeOffset);
    let xOffset = map(noiseVal, 0, 1, -80, 80); // 增加搖晃距離 (-80 ~ 80)
    let finalX = startX + (xOffset * t);
    let currentWidth = (1 - t) * baseWidth;
    
    curveVertex(finalX + currentWidth / 2, y);
  }
  
  endShape(CLOSE);

  // 更新時間變數，產生動畫效果
  timeOffset += 0.01;
}

// 視窗大小改變時調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
