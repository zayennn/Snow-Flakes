/**
  * "Full Page View" highly recommended
	* 
  * Scroll to zoom out 
	* and see the full globe, or   
	* hit regenerate for a 
	* new aurora and snow sphere pattern!
	*/
const sketch = (p) => {
  p.snowSphere = null;

  p.setup = () => {
    p.pixelDensity(1);
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.frameRate(60);
		p.noFill();
    
    p.cam = p.createCamera();
    p.cam.setPosition(0, 0, p.height / 2);
    
    p.snowSphere = new SnowSphere(p);
    p.rotationFunction = p.random(['rotateX', 'rotateY', 'rotateZ']);
    p.rotationAmount = p.random([-0.005, 0.005]);
    
    const auroraGradient = p.generateAuroraBackground();
    document.documentElement.style.setProperty('--gradient-bg', auroraGradient);
    document.documentElement.style.setProperty('--gradient-blend-mode', 'screen, normal, screen, screen, screen, screen');
		
		p.createRegenerateButton();
  };

  p.draw = () => {
    p.clear();
    p[p.rotationFunction](p.frameCount * p.rotationAmount);
    
    if (p.mouseIsPressed && p.mouseButton === p.CENTER) {
      const zoomSpeed = 2;
      const deltaY = p.mouseY - p.pmouseY;
      p.cam.setPosition(0, 0, p.cam.eyeZ + deltaY * zoomSpeed);
    }
    
    p.snowSphere.show();
  };
  
  p.mouseWheel = (event) => {
    const zoomSpeed = 0.5;
    const newZ = p.cam.eyeZ + event.delta * zoomSpeed;
    p.cam.setPosition(0, 0, newZ);
    return false;
  };

  p.generateAuroraBackground = () => {
    const rgba = (r, g, b, a) => `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
    const gradients = [];

    gradients.push(
      `linear-gradient(180deg, ` +
      `rgba(0, 0, 0, 1) 0%, ` +
      `rgba(${p.random(5, 12)}, ${p.random(3, 10)}, ${p.random(22, 35)}, 1) ${p.random(8, 15)}%, ` +
      `rgba(${p.random(12, 22)}, ${p.random(15, 28)}, ${p.random(55, 75)}, 1) ${p.random(25, 35)}%, ` +
      `rgba(${p.random(18, 28)}, ${p.random(25, 38)}, ${p.random(75, 95)}, 1) ${p.random(40, 50)}%, ` +
      `rgba(${p.random(15, 25)}, ${p.random(32, 48)}, ${p.random(85, 105)}, 1) ${p.random(50, 60)}%, ` +
      `rgba(${p.random(10, 20)}, ${p.random(48, 68)}, ${p.random(95, 115)}, 1) ${p.random(65, 75)}%, ` +
      `rgba(${p.random(3, 10)}, ${p.random(70, 100)}, ${p.random(105, 130)}, 1) ${p.random(85, 92)}%, ` +
      `rgba(0, ${p.random(95, 125)}, ${p.random(115, 145)}, 1) 100%)`
    );

    const auroraColors = [
      { 
        name: 'green', 
        primary: { r: 0, g: 255, b: 100 }, 
        secondary: { r: 50, g: 200, b: 150 },
        bright: { r: 150, g: 255, b: 200 }
      },
      { 
        name: 'blue-green', 
        primary: { r: 0, g: 255, b: 180 }, 
        secondary: { r: 0, g: 180, b: 255 },
        bright: { r: 100, g: 255, b: 255 }
      },
      { 
        name: 'purple-pink', 
        primary: { r: 180, g: 0, b: 255 }, 
        secondary: { r: 255, g: 0, b: 150 },
        bright: { r: 255, g: 100, b: 255 }
      },
      { 
        name: 'teal-purple', 
        primary: { r: 0, g: 255, b: 200 }, 
        secondary: { r: 150, g: 50, b: 255 },
        bright: { r: 200, g: 150, b: 255 }
      }
    ];
    
    p.shuffle(auroraColors);
    const aurora1 = auroraColors[0];
    const aurora2 = auroraColors[1];
    const aurora3 = auroraColors[2];

    const mainAngle = 75 + p.random(30); 
    const mainPos = 25 + p.random(30); 
    const mainWidth = 8 + p.random(8);
    const glowExtend = 12 + p.random(10);
    gradients.push(
      `linear-gradient(${mainAngle}deg, ` +
      `rgba(0,0,0,0) 0%, ` +
      `rgba(0,0,0,0) ${mainPos - glowExtend}%, ` +
      `${rgba(aurora1.primary.r, aurora1.primary.g, aurora1.primary.b, 0.06)} ${mainPos - glowExtend/2}%, ` +
      `${rgba(aurora1.primary.r, aurora1.primary.g, aurora1.primary.b, 0.25)} ${mainPos}%, ` +
      `${rgba(aurora1.bright.r, aurora1.bright.g, aurora1.bright.b, 0.5)} ${mainPos + mainWidth/2}%, ` +
      `${rgba(aurora1.primary.r, aurora1.primary.g, aurora1.primary.b, 0.25)} ${mainPos + mainWidth}%, ` +
      `${rgba(aurora1.primary.r, aurora1.primary.g, aurora1.primary.b, 0.06)} ${mainPos + mainWidth + glowExtend/2}%, ` +
      `rgba(0,0,0,0) ${mainPos + mainWidth + glowExtend}%, ` +
      `rgba(0,0,0,0) 100%)`
    );

    const secAngle = 80 + p.random(25);
    const secPos = 40 + p.random(25);
    const secWidth = 6 + p.random(6);
    const secGlowExtend = 10 + p.random(8);
    gradients.push(
      `linear-gradient(${secAngle}deg, ` +
      `rgba(0,0,0,0) 0%, ` +
      `rgba(0,0,0,0) ${secPos - secGlowExtend}%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.05)} ${secPos - secGlowExtend/2}%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.2)} ${secPos}%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.4)} ${secPos + secWidth/2}%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.2)} ${secPos + secWidth}%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.05)} ${secPos + secWidth + secGlowExtend/2}%, ` +
      `rgba(0,0,0,0) ${secPos + secWidth + secGlowExtend}%, ` +
      `rgba(0,0,0,0) 100%)`
    );

    const thirdAngle = 70 + p.random(40);
    const thirdPos = 15 + p.random(20);
    const thirdWidth = 5 + p.random(5);
    const thirdGlowExtend = 9 + p.random(7);
    gradients.push(
      `linear-gradient(${thirdAngle}deg, ` +
      `rgba(0,0,0,0) 0%, ` +
      `rgba(0,0,0,0) ${thirdPos - thirdGlowExtend}%, ` +
      `${rgba(aurora3.primary.r, aurora3.primary.g, aurora3.primary.b, 0.04)} ${thirdPos - thirdGlowExtend/2}%, ` +
      `${rgba(aurora3.primary.r, aurora3.primary.g, aurora3.primary.b, 0.18)} ${thirdPos}%, ` +
      `${rgba(aurora3.bright.r, aurora3.bright.g, aurora3.bright.b, 0.35)} ${thirdPos + thirdWidth/2}%, ` +
      `${rgba(aurora3.primary.r, aurora3.primary.g, aurora3.primary.b, 0.18)} ${thirdPos + thirdWidth}%, ` +
      `${rgba(aurora3.primary.r, aurora3.primary.g, aurora3.primary.b, 0.04)} ${thirdPos + thirdWidth + thirdGlowExtend/2}%, ` +
      `rgba(0,0,0,0) ${thirdPos + thirdWidth + thirdGlowExtend}%, ` +
      `rgba(0,0,0,0) 100%)`
    );

    const numCurtains = 4 + Math.floor(p.random(5));
    for (let i = 0; i < numCurtains; i++) {
      const curtainX = (i / numCurtains) * 100 + p.random(-15, 15);
      const curtainWidth = 8 + p.random(15); 
      const curtainHeight = 150 + p.random(200);
      const curtainY = 20 + p.random(30);
      
      const auroraChoice = [aurora1, aurora2, aurora3][i % 3];
      const useColor = i % 2 === 0 ? auroraChoice.primary : auroraChoice.secondary;
      const intensity = 0.15 + p.random(0.25);
      
      gradients.push(
        `radial-gradient(${curtainWidth}% ${curtainHeight}% at ${curtainX}% ${curtainY}%, ` +
        `${rgba(useColor.r, useColor.g, useColor.b, intensity)} 0%, ` +
        `${rgba(useColor.r, useColor.g, useColor.b, intensity * 0.5)} 20%, ` +
        `rgba(0,0,0,0) 50%)`
      );
    }

    const glowX = 30 + p.random(40);
    const glowY = 30 + p.random(20);
    gradients.push(
      `radial-gradient(80% 120% at ${glowX}% ${glowY}%, ` +
      `${rgba(aurora1.primary.r, aurora1.primary.g, aurora1.primary.b, 0.15)} 0%, ` +
      `${rgba(aurora2.secondary.r, aurora2.secondary.g, aurora2.secondary.b, 0.08)} 40%, ` +
      `rgba(0,0,0,0) 70%)`
    );

    return gradients.join(', ');
  };
	
	p.createRegenerateButton = () => {
		const button = document.createElement('button');
		button.textContent = 'REGENERATE';
		button.className = 'button';
		button.style.cssText = `
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 1000;
		`;

		button.addEventListener('click', () => {
			const auroraGradient = p.generateAuroraBackground();
			document.documentElement.style.setProperty('--gradient-bg', auroraGradient);

			p.rotationFunction = p.random(['rotateX', 'rotateY', 'rotateZ']);
			p.rotationAmount = p.random([-0.005, 0.005]);

			p.snowSphere = new SnowSphere(p);
		});

		document.body.appendChild(button);
	};

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};


new p5(sketch);

class SnowSphere {
  constructor(p, options = {}) {
    this.p = p;
    
    this.defaultSize = p.height >= p.width ? p.height : p.width;
    this.density = options.density || 1200;
    this.radius = options.radius || this.defaultSize / 2;
    this.revealDuration = options.revealDuration || 5000; 
    
    this.pos = [];
    this.size = [];
    this.rot = [];
    
    this.startTime = p.millis();
    this.visibleCount = 0;
    
    this.init();
  }
  
  init() {
    const p = this.p;
    let sizeset = 0;
    
    for (let i = 0; i < this.density; i++) {
      const theta = p.random(p.TWO_PI);
      const phi = Math.acos(2 * p.random() - 1); 
      const r = Math.pow(p.random(), 1/3) * this.radius; 
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      this.pos.push(p.createVector(x, y, z));
      
      sizeset = p.lerp(sizeset, 5, 0.1);
      this.size.push(7 - sizeset);
      
      this.rot.push(p.random(-p.PI, p.PI));
    }
  }
  
  show() {
    const p = this.p;
    
    const elapsed = p.millis() - this.startTime;
    const progress = p.constrain(elapsed / this.revealDuration, 0, 1);
    this.visibleCount = Math.floor(progress * this.density);
    
    p.stroke(200, 150);
    p.strokeWeight(2);
    p.beginShape(p.LINES);
    
    for (let i = 0; i < this.visibleCount; i++) {
      const px = this.pos[i].x;
      const py = this.pos[i].y;
      const pz = this.pos[i].z;
      const rot = this.rot[i];
      const size = this.size[i];
      // const flip = p.map(rot, -p.TWO_PI, p.TWO_PI, -size * 4, size * 4);
			const flip = p.map(rot, -p.PI, p.PI, -size * 4, size * 4);
      
      const c = Math.cos(rot);
      const s = Math.sin(rot);
      
      let lx1 = -size - flip, ly1 = 0;
      let lx2 = size + flip, ly2 = 0;
      p.vertex(px + lx1 * c - ly1 * s, py + lx1 * s + ly1 * c, pz);
      p.vertex(px + lx2 * c - ly2 * s, py + lx2 * s + ly2 * c, pz);
      
      lx1 = 0; ly1 = size + flip;
      lx2 = 0; ly2 = -size - flip;
      p.vertex(px + lx1 * c - ly1 * s, py + lx1 * s + ly1 * c, pz);
      p.vertex(px + lx2 * c - ly2 * s, py + lx2 * s + ly2 * c, pz);
      
      lx1 = size; ly1 = size;
      lx2 = -size; ly2 = -size;
      p.vertex(px + lx1 * c - ly1 * s, py + lx1 * s + ly1 * c, pz);
      p.vertex(px + lx2 * c - ly2 * s, py + lx2 * s + ly2 * c, pz);
      
      lx1 = size; ly1 = -size;
      lx2 = -size; ly2 = size;
      p.vertex(px + lx1 * c - ly1 * s, py + lx1 * s + ly1 * c, pz);
      p.vertex(px + lx2 * c - ly2 * s, py + lx2 * s + ly2 * c, pz);
    }
    
    p.endShape();
  }
}