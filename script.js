// ===== IMAGE CONFIGURATION =====
// Replace these with your image URLs
const IMG1 = 'image1.jpeg';
const IMG2 = 'image2.jpeg';
const IMG3 = 'image3.jpeg';
const IMG4 = 'image4.jpeg';
const IMG5 = 'image5.jpeg';
const IMG6 = 'image6.jpeg';

const IMAGES = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6];

// ===== MESSAGE CONFIGURATION =====
const MSG = 'Happy birthday Mama, your presence in my life is a privilege and a blessing I\'ll forever be grateful to God for, every pet name, every hug, every shout, every display of anger issues and every laughter only makes our friendship more memorable than it ever was, ngl, your presence around my life alone makes my day brighter and makes my life better, thank you so much, I pray God blesses you and gives you money so you can buy me a Gulfstream G750, Oluwatobi loves you.';

const RECIPIENT_NAME = 'Chika'; // Change this to the birthday person's name

// ===== CLOCK FUNCTIONALITY =====
function tick() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clockTime').textContent = hours + ':' + minutes;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
  document.getElementById('clockDate').textContent = dateStr;
}

tick();
setInterval(tick, 1000);

// ===== STARFIELD ANIMATION =====
const starsElement = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.setProperty('--d', (2 + Math.random() * 3) + 's');
  star.style.setProperty('--delay', (-Math.random() * 5) + 's');
  starsElement.appendChild(star);
}

// ===== FLOATING HEARTS =====
const heartsContainer = document.getElementById('heartsContainer');
for (let j = 0; j < 20; j++) {
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.innerHTML = '&#10084;';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.setProperty('--size', (1 + Math.random() * 1.5) + 'rem');
  heart.style.setProperty('--dur', (6 + Math.random() * 6) + 's');
  heart.style.setProperty('--delay', (-Math.random() * 8) + 's');
  heartsContainer.appendChild(heart);
}

// ===== UNLOCK BUTTON =====
document.getElementById('unlockBtn').addEventListener('click', function () {
  document.getElementById('lockScreen').classList.add('hide');
  const birthdayPage = document.getElementById('birthdayPage');
  birthdayPage.classList.add('show');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      birthdayPage.classList.add('visible');
    });
  });
  
  // Set recipient name
  document.getElementById('recipientName').textContent = RECIPIENT_NAME;
});

// ===== CONFETTI ANIMATION =====
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let pieces = [];
let running = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function boom(count) {
  const colors = ['#ff6b9d', '#c44dff', '#ffb347', '#ff9de2', '#a8ff78', '#fff176'];
  for (let k = 0; k < count; k++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 7,
      alpha: 1
    });
  }
  if (!running) {
    running = true;
    drawConfetti();
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter(p => p.alpha > 0.01);

  pieces.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.06;
    p.rot += p.rv;

    if (p.y > canvas.height) {
      p.alpha -= 0.06;
    }

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  if (pieces.length) {
    requestAnimationFrame(drawConfetti);
  } else {
    running = false;
  }
}

// ===== SLIDESHOW SETUP =====
const slidesWrap = document.getElementById('slidesWrap');
const dotsElement = document.getElementById('dots');

IMAGES.forEach((src, i) => {
  // Create slide
  const slide = document.createElement('div');
  slide.className = 'slide' + (i === 0 ? ' active' : '');

  const slideBg = document.createElement('div');
  slideBg.className = 'slide-bg';
  slideBg.style.backgroundImage = 'url(' + src + ')';

  const slideImg = document.createElement('div');
  slideImg.className = 'slide-img';

  const img = document.createElement('img');
  img.src = src;
  img.alt = '';

  slideImg.appendChild(img);
  slide.appendChild(slideBg);
  slide.appendChild(slideImg);
  slidesWrap.appendChild(slide);

  // Create dot
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dotsElement.appendChild(dot);
});

// ===== SLIDESHOW CONTROL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let timer;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  const img = slides[currentSlide].querySelector('img');
  img.style.animation = 'none';
  void img.offsetWidth; // Trigger reflow
  img.style.animation = 'kenBurns 4.5s ease-out forwards';
}

function nextSlide() {
  if (currentSlide < IMAGES.length - 1) {
    goToSlide(currentSlide + 1);
  } else {
    clearInterval(timer);
    endSlideshow();
  }
}

// ===== AUDIO CONTROL =====
const bgMusic = document.getElementById('bgMusic');
let muted = false;

document.getElementById('muteBtn').addEventListener('click', function () {
  muted = !muted;
  bgMusic.muted = muted;
  this.innerHTML = muted ? '&#128263;' : '&#128266;'; // 🔇 or 🔊
});

// ===== SURPRISE BUTTON =====
document.getElementById('surpriseBtn').addEventListener('click', function () {
  boom(200); // Trigger confetti

  setTimeout(function () {
    const slideshow = document.getElementById('slideshow');
    slideshow.classList.add('show');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        slideshow.classList.add('visible');
      });
    });

    document.getElementById('muteBtn').classList.add('show');
    bgMusic.volume = 0.5;
    bgMusic.play().catch(function (err) {
      console.log('Audio autoplay prevented:', err);
    });

    timer = setInterval(nextSlide, 3500); // Change image every 3.5 seconds
  }, 800);
});

// ===== LOVE LETTER =====
function endSlideshow() {
  const slideshow = document.getElementById('slideshow');
  const loveLetter = document.getElementById('loveLetter');

  slideshow.classList.remove('visible');

  setTimeout(function () {
    slideshow.classList.remove('show');
    loveLetter.classList.add('show');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        loveLetter.classList.add('visible');
        setTimeout(typeMessage, 600);
      });
    });
  }, 900);
}

function typeMessage() {
  const element = document.getElementById('typedText');
  element.innerHTML = '<span class="cursor"></span>';

  let index = 0;

  function type() {
    if (index < MSG.length) {
      const cursor = element.querySelector('.cursor');
      element.insertBefore(document.createTextNode(MSG[index]), cursor);
      index++;
      setTimeout(type, 30 + Math.random() * 20);
    } else {
      setTimeout(function () {
        document.getElementById('letterFooter').style.display = 'block';
      }, 500);
    }
  }

  type();
}
