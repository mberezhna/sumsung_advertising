'use strict';

import '../styles/main.scss';
import { gsap } from 'gsap';
import { textsContent, sliderContent } from '../js/slider_content.js';

function isMobileDevice() {
  return window.innerWidth < 768;
}

function isDesktopDevice() {
  return !isMobileDevice();
}

const tl = gsap.timeline();

tl.fromTo(
  '.logo_samsung',
  {
    x: -200,
    y: 20,
  },
  {
    x: 0,
    y: 20,
    duration: 1,
  },
)
  .from(
    '.second_part',
    {
      xPercent: -110,
      duration: 1,
    },
    '<',
  )
  .to('.logo_samsung', {
    y: 0,
    duration: 1,
  })
  .from('.main_description-1line', {
    xPercent: -200,
    duration: 1,
    delay: 0.2,
  })
  .from(
    '.main_description-2line',
    {
      xPercent: -200,
      duration: 1,
      delay: 0.2,
    },
    '<',
  )
  .from(
    '.main_description-3line',
    {
      xPercent: -200,
      duration: 1,
      delay: 0.4,
    },
    '<',
  )
  .to('.left_fon', {
    width: '50%',
    duration: 1,
  })
  .call(() => {
    if (isDesktopDevice()) {
      gsap.to(
        '.slider',
        {
          width: '50%',
          backgroundPosition: '60% 30%',
          right: 0,
          duration: 1,
        },
        '<',
      );
    }
  })
  .to('.second_part', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.button', {
    opacity: 1,
    duration: 0.4,
  })
  .to('.small_massage-slide', {
    opacity: 1,
    duration: 0.4,
  })
  .to(
    '.text_container',
    {
      opacity: 1,
      duration: 0.4,
    },
    '<',
  );

const button = document.querySelector('.button');

button.addEventListener('click', function () {
  window.open('#');

  gsap.to('.button', {
    backgroundColor: '#dcdcdc',
    duration: 0.5,
    onComplete: function () {
      gsap.to('.button', {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        duration: 0.5,
      });
    },
  });
});

const textBlock = document.querySelector('.text-block');
const mainDescription = document.querySelector('.main_description');
const counterElement = document.getElementById('counter');
const textInTextBlock = document.getElementById('text-block-txt');
const slider = document.querySelector('.slider');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const textsArr = textsContent;
const imgArr = sliderContent;
let currentSliderIndex = 0;
let autoSlideInterval;

function updateTxtSlide() {
  gsap.to(textBlock, {
    opacity: 0,
    duration: 0.3,

    onComplete: () => {
      const textContent = textsArr[currentSliderIndex];
      const linkContent = `<a href="https://www.samsung.com/ua/" class="text-block-link">Read More...</a>`;

      textInTextBlock.innerHTML = `${textContent} ${linkContent}`;
      gsap.to(textBlock, { opacity: 1, duration: 0.3 });
    },
  });

  counterElement.textContent = `${currentSliderIndex + 1}/${textsArr.length}`;

  if (currentSliderIndex === 3) {
    gsap.to(mainDescription, {
      yPercent: -20,
      duration: 0.3,
    });
  } else {
    gsap.to(mainDescription, {
      yPercent: 20,
      duration: 0.3,
    });
  }
}

let isSlideVisible = true;

function updateImgSlide() {
  const firstFrame = document.querySelector('.slider.first');
  const secondFrame = document.querySelector('.slider.next');

  const opacityFirstFrame = isSlideVisible ? 0 : 1;
  const opacitySecondFrame = isSlideVisible ? 1 : 0;

  if (getComputedStyle(firstFrame).opacity === '0') {
    slider.style.backgroundImage = `url(${imgArr[currentSliderIndex]})`;
  }

  if (getComputedStyle(secondFrame).opacity === '0') {
    secondFrame.style.backgroundImage = `url(${imgArr[currentSliderIndex]})`;
  }

  gsap.to(firstFrame, {
    opacity: opacityFirstFrame,
    backgroundPositionY: '90%',
    duration: 0.5,
  });

  gsap.to(secondFrame, {
    opacity: opacitySecondFrame,
    backgroundPositionY: '90%',
    duration: 0.5,
  });

  isSlideVisible = !isSlideVisible;
}

function changeSlide(movSide) {
  if (currentSliderIndex + movSide > imgArr.length - 1) {
    currentSliderIndex = 0;
  } else if (currentSliderIndex + movSide < 0) {
    currentSliderIndex = imgArr.length - 1;
  } else {
    currentSliderIndex = currentSliderIndex + movSide;
  }

  updateTxtSlide();
  updateImgSlide();
}

function scaleNavigateButtons(navButton) {
  gsap.to(navButton, {
    scale: 0.8,
    duration: 0.3,
    onComplete: function () {
      gsap.to(navButton, {
        scale: 1,
        duration: 0.3,
      });
    },
  });
}

function startAutoSlider(action) {
  if (action) {
    autoSlideInterval = setInterval(() => {
      changeSlide(1);
    }, 4000);
  } else {
    clearInterval(autoSlideInterval);
  }
}

prevButton.addEventListener('click', () => {
  changeSlide(-1);
  scaleNavigateButtons(prevButton);
  startAutoSlider(false);
});

nextButton.addEventListener('click', () => {
  changeSlide(1);
  scaleNavigateButtons(nextButton);
  startAutoSlider(false);
});

setTimeout(() => startAutoSlider(true), 6000);

// BUTTON ANIMATION

const mainButton = document.querySelector('#shopButton');
let intervalID;

function changeButtonSize() {
  gsap.to(mainButton, {
    scale: 1.1,
    duration: 1,
    onComplete: function () {
      gsap.to(mainButton, {
        scale: 1,
        duration: 1,
      });
    },
  });
}

function startButtonAnimation(action) {
  if (action === true) {
    intervalID = setInterval(changeButtonSize, 2000);
  } else {
    clearInterval(intervalID);
  }
}

startButtonAnimation(true);

mainButton.addEventListener('mouseenter', () => {
  startButtonAnimation(false);
});

mainButton.addEventListener('mouseleave', () => {
  startButtonAnimation(true);
});
