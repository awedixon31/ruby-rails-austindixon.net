// Confetti Effect by Gabriel Gambetta
// https://www.gabrielgambetta.com/confetti.html
// Modified to work with requestAnimationFrame

// Confetti particle class
class ConfettiParticle {
	constructor() {
		var colors = ["#fde132", "#009bde", "#ff6b00"];
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height - canvas.height;
		this.r = randomFromTo(11, 33);
		this.d = (Math.random() * canvas.width) + 15;
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.tilt = Math.floor(Math.random() * 33) - 11;
		this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
		this.tiltAngle = 0;

		this.draw = function () {
			ctx.beginPath();
			ctx.lineWidth = this.r / 2;
			ctx.strokeStyle = this.color;
			ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
			ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
			return ctx.stroke();
		};
	}
}
  
  // Initialize and push the particles into an array
  var confettiParticles = { max: 100 };
  var particles = [];
  for (var i = 0; i < confettiParticles.max; i++) {
	particles.push(new ConfettiParticle());
  }
  
  // Update the particles
  function updateParticles() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	ctx.clearRect(0, 0, width, height);
	for (var i = 0; i < particles.length; i++) {
	  var p = particles[i];
	  p.tiltAngle += p.tiltAngleIncremental;
	  p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
	  p.tilt = Math.sin(p.tiltAngle - (i / 3)) * 15;
  
	  if (p.y > height) {
		p.x = Math.random() * width;
		p.y = -30;
		p.tilt = Math.floor(Math.random() * 10) - 20;
	  }
  
	  p.draw();
	}
  
	requestAnimationFrame(updateParticles);
  }
  
  // Start the update loop
  requestAnimationFrame(updateParticles);
  