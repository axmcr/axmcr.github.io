(() => {
  // Layered background: procedural grid + floating squares + blueprint icons with gentle parallax.
  const gridCanvas = document.getElementById("grid-canvas");
  const squareCanvas = document.getElementById("square-canvas");
  if (!gridCanvas || !squareCanvas) return;

  const gridCtx = gridCanvas.getContext("2d");
  const squareCtx = squareCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  let width = 0;
  let height = 0;
  let squares = [];
  let icons = [];
  let scrollOffset = 0;
  let mouseOffset = { x: 0, y: 0 };

  const iconSources = [
    "assets/stars/LOCKPICK.svg",
    "assets/stars/RIFLE.svg",
    "assets/stars/MEDICALTOOLS.svg",
    "assets/stars/SILVERBALLER.svg"
  ];

  const iconImages = iconSources.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const grid = {
    spacing: 23,
    amplitude: 12,
    speed: 0.0004
  };

  const iconSize = {
    min: 64,
    max: 120
  };

  const mouseBoost = {
    iconDrift: 28,
    squareDrift: 20,
    iconForce: 0.14
  };

  const makeSquare = () => {
    const size = 18 + Math.random() * 54;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      speedX: (Math.random() - 0.5) * 0.16,
      speedY: (Math.random() - 0.5) * 0.16,
      opacity: 0.05 + Math.random() * 0.06,
      parallax: 0.4 + Math.random() * 0.9
    };
  };

  const makeIcon = () => {
    const size = iconSize.min + Math.random() * (iconSize.max - iconSize.min);
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      speedX: (Math.random() - 0.5) * 0.07,
      speedY: 0.12 + Math.random() * 0.18,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.002,
      opacity: 0.09 + Math.random() * 0.09,
      img: iconImages[Math.floor(Math.random() * iconImages.length)]
    };
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    [gridCanvas, squareCanvas].forEach((canvas) => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    });

    gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    squareCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(12, Math.floor((width * height) / 52000));
    squares = Array.from({ length: count }, makeSquare);

    const iconCount = Math.max(12, Math.floor((width * height) / 90000));
    icons = Array.from({ length: iconCount }, makeIcon);
  };

  const drawGrid = (time) => {
    gridCtx.clearRect(0, 0, width, height);
    gridCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    gridCtx.lineWidth = 1;

    const offsetY = scrollOffset * 0;
    for (let x = 0; x <= width; x += grid.spacing) {
      gridCtx.beginPath();
      for (let y = 0; y <= height; y += 40) {
        const noise = Math.sin(y * 0.02 + time * grid.speed + x * 0.01);
        const drift = noise * grid.amplitude;
        const posX = x + drift;
        const posY = y + offsetY;
        if (y === 0) {
          gridCtx.moveTo(posX, posY);
        } else {
          gridCtx.lineTo(posX, posY);
        }
      }
      gridCtx.stroke();
    }

    for (let y = 0; y <= height; y += grid.spacing) {
      gridCtx.beginPath();
      for (let x = 0; x <= width; x += 40) {
        const noise = Math.cos(x * 0.02 + time * grid.speed + y * 0.01);
        const drift = noise * grid.amplitude;
        const posX = x;
        const posY = y + drift + offsetY;
        if (x === 0) {
          gridCtx.moveTo(posX, posY);
        } else {
          gridCtx.lineTo(posX, posY);
        }
      }
      gridCtx.stroke();
    }
  };

  const drawSquaresAndIcons = () => {
    squareCtx.clearRect(0, 0, width, height);
    const offsetY = scrollOffset * 0;

    squares.forEach((square) => {
      const driftX = -mouseOffset.x * mouseBoost.squareDrift * square.parallax;
      const driftY = -mouseOffset.y * mouseBoost.squareDrift * square.parallax;
      squareCtx.fillStyle = `rgba(255, 255, 255, ${square.opacity})`;
      squareCtx.fillRect(
        square.x + driftX,
        square.y + offsetY + driftY,
        square.size,
        square.size
      );

      square.x += square.speedX;
      square.y += square.speedY;

      if (square.x > width + square.size) square.x = -square.size;
      if (square.x < -square.size) square.x = width + square.size;
      if (square.y > height + square.size) square.y = -square.size;
      if (square.y < -square.size) square.y = height + square.size;
    });

    icons.forEach((icon) => {
      if (!icon.img || !icon.img.complete) return;
      const driftX = -mouseOffset.x * mouseBoost.iconDrift;
      const driftY = -mouseOffset.y * mouseBoost.iconDrift;
      squareCtx.save();
      squareCtx.translate(icon.x + driftX, icon.y + offsetY + driftY);
      squareCtx.rotate(icon.rotation);
      squareCtx.globalAlpha = icon.opacity;
      squareCtx.drawImage(icon.img, -icon.size / 2, -icon.size / 2, icon.size, icon.size);
      squareCtx.restore();

      icon.x += icon.speedX - mouseOffset.x * mouseBoost.iconForce;
      icon.y += icon.speedY - mouseOffset.y * mouseBoost.iconForce;
      icon.rotation += icon.rotationSpeed;

      if (icon.y - icon.size > height) {
        icon.y = -icon.size;
        icon.x = Math.random() * width;
        icon.opacity = 0.09 + Math.random() * 0.09;
        icon.size = iconSize.min + Math.random() * (iconSize.max - iconSize.min);
        icon.img = iconImages[Math.floor(Math.random() * iconImages.length)];
      }

      if (icon.x > width + icon.size) icon.x = -icon.size;
      if (icon.x < -icon.size) icon.x = width + icon.size;
    });

    squareCtx.globalAlpha = 1;
  };

  const animate = (time) => {
    drawGrid(time);
    drawSquaresAndIcons();
    requestAnimationFrame(animate);
  };

  const onScroll = () => {
    scrollOffset = window.scrollY || 0;
  };

  const onMouseMove = (event) => {
    const x = width ? event.clientX / width : 0.5;
    const y = height ? event.clientY / height : 0.5;
    mouseOffset.x = (x - 0.5) * 2;
    mouseOffset.y = (y - 0.5) * 2;
  };

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", onScroll);
  window.addEventListener("mousemove", onMouseMove);

  resize();
  onScroll();
  requestAnimationFrame(animate);
})();

