document.addEventListener('DOMContentLoaded', function () {
  console.log('Script is running!');

  // Variables
  const screenWidth = window.screen.width;
  const hamburger = document.querySelector('.hamburger');
  const videoWrapper = document.getElementById('video');
  const elementsToShake = document.querySelectorAll('.move');
  const overlay = document.querySelector('.overlay');
  const menuNav = document.querySelector('.menu-nav');
  const boxLeftImage = document.querySelector('.box-left__image');
  const boxLeftQuote = document.querySelector('.box-left__quote');
  const boxLefSocial = document.querySelector('.box-left__social');
  const mainMenuLinks = document.querySelectorAll('.main-menu li');
  const arrMainMenuLinks = [].slice.call(mainMenuLinks);
  let delay = 100;
  
  // OnClick Menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    
    if(overlay.classList.contains('show')){
      menuNav.classList.remove('slide-up');
      menuNav.classList.add('slide-down');
      setTimeout(() => menuNav.classList.remove('slide-down'), 1350);
      
      boxLeftImage.classList.remove('slide-left-to-right');
      boxLeftImage.classList.add('slide-right-to-left');
      setTimeout(() => boxLeftImage.classList.remove('slide-right-to-left'), 1350);

      boxLeftQuote.classList.remove('color-transition');
      boxLefSocial.classList.remove('bg-transition');

      arrMainMenuLinks.slice().reverse().forEach(el => {
        setTimeout(() => el.classList.remove('fade-in'), delay);
        delay += 250;
      });

      setTimeout(() => overlay.classList.remove('show'), 2000);
    } else {
      overlay.classList.add('show');
      setTimeout(() => menuNav.classList.add('slide-up'), 100);
      setTimeout(() => boxLeftImage.classList.add('slide-left-to-right'), 100);
      boxLeftQuote.classList.add('color-transition');
      boxLefSocial.classList.add('bg-transition');

      arrMainMenuLinks.forEach(el => {
          setTimeout(() => el.classList.add('fade-in'), delay);
          delay += 500;
      });
    }
    delay = 100;
  });

  // Load Video
  const loadVideo = () => {
    const video = document.createElement('video');
    const source = document.createElement('source');

    source.src ='images/home-video.mp4';
    source.type ='video/mp4';

    video.className = 'home-video';
    video.controls = false;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.poster = 'images/home-video-cover.png';

    video.appendChild(source);
    videoWrapper.appendChild(video);
  }

  // Animation Hover
  const moveElements = () => {
    const toMove = 8;
    
    elementsToShake.forEach(el => {
      el.addEventListener('mousemove', e => {
        const xMove = e.clientX - el.offsetLeft;
        const yMove = e.clientY - el.offsetTop;
    
        const MoveToX = xMove - el.clientWidth / 2;
        const MoveToY = yMove - el.clientHeight / 2;
    
        el.style.transform = `translate(${MoveToX/toMove}px, ${MoveToY/toMove}px)`;
      });
    
      el.addEventListener('mouseout', () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'all 0.15s ease';
      });
    }); 
  }

  // Load video only on screens larger than 1024px
  if(screenWidth >= 1024) {
    loadVideo();
    moveElements();
  }

});