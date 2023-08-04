function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(x, y, color) {
  const particle = {
    x,
    y,
    size: randomInRange(2, 8), // Vary the size of the particles
    color,
    alpha: 1,
    velocity: {
      x: randomInRange(-2, 2),
      y: randomInRange(-7, -5),
    },
    gravity: 0.2,
  };
  return particle;
}

function drawFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  const particles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
      const randomX = randomInRange(0, canvas.width);
      const randomY = randomInRange(0, canvas.height);
      createFirework(randomX, randomY);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.velocity.y += particle.gravity;
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.alpha -= 0.01;

      if (particle.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        // Calculate the fading effect based on distance from the center
        const distanceFromCenter = Math.sqrt((particle.x - canvas.width / 2) ** 2 + (particle.y - canvas.height / 2) ** 2);
        particle.alpha = distanceFromCenter / (canvas.width / 2);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(update);
  }

  function createFirework(x, y) {
    const colors = [
      '255, 0, 0',      // Red
      '255, 255, 0',    // Yellow
      '0, 255, 0',      // Green
      '0, 255, 255',    // Cyan
      '0, 0, 255',      // Blue
      '255, 0, 255'     // Magenta
    ];

    const numParticles = 30;
    const color = colors[Math.floor(randomInRange(0, colors.length))];
    
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle(x, y, color));
    }
  }

  update();
}

window.onload = drawFireworks;
