


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(x, y, color) {
  const particle = {
    x,
    y,
    size: randomInRange(1, 3),
    color,
    alpha: 1,
    velocity: {
      x: randomInRange(-3, 3),
      y: randomInRange(-9, -6),
    },
    gravity: 0.2,
  };
  return particle;
}

function drawFireworks() {
  // Set the maximum screen width for desktop devices (e.g., 768 pixels)
  const desktopScreenWidth = 768;

  // Check if the screen width is greater than the maximum desktop screen width
  if (window.innerWidth >= desktopScreenWidth) {
    // Get the canvas element and set its height to match the viewport height
    const canvas = document.getElementById('fireworksCanvas');
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      const availableWidth = window.innerWidth * dpr;
      const availableHeight = window.innerHeight * dpr;

      const minDimension = Math.min(availableWidth, availableHeight);
      const maxDimension = Math.max(availableWidth, availableHeight);

      // Ensure the canvas fits within the screen boundaries
      canvas.width = minDimension;
      canvas.height = minDimension;
      canvas.style.width = maxDimension + 'px';
      canvas.style.height = maxDimension + 'px';
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

    const numParticles = 50;
    const color = colors[Math.floor(randomInRange(0, colors.length))];

    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle(x, y, color));
    }
  }

  resizeCanvas(); // Initial canvas sizing
  window.addEventListener('resize', resizeCanvas); // Resize canvas on window resize

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) {
      const randomX = randomInRange(0, canvas.width);
      const randomY = randomInRange(0, canvas.height * 0.5);
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
        const distanceFromCenter = Math.sqrt((particle.x - canvas.width / 2) ** 2 + (particle.y - canvas.height / 2) ** 2);
        particle.alpha = distanceFromCenter / (canvas.width / 2) * 0.7;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(update);
  }

  update();
}
}
window.onload = drawFireworks;
