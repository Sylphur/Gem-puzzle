const BURGERBUTTON = document.querySelector('.menu__mobile');
const BURGERBUTTON2 = document.querySelector('.burger__mobile');
const BURGER = document.querySelector('.burger');
const DARK = document.querySelector('.dark')


const openMenu = () => {
  DARK.classList.add('dark__toggle');
  BURGER.classList.add('burger__toggle');
  BURGERBUTTON.classList.add('menu__rotated');
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  
}

const closeMenu = () => {
  DARK.classList.remove('dark__toggle');
  BURGER.classList.remove('burger__toggle');
  BURGERBUTTON.classList.remove('menu__rotated');
  document.body.style.overflow = '';
}

BURGERBUTTON.addEventListener('click', () => {
  openMenu();
})
BURGERBUTTON2.addEventListener('click', () => {
  closeMenu();
})
DARK.addEventListener('click', () => {
  closeMenu();
})

// ---------------------- Amount ----------------------------

const wrapElepses = document.querySelectorAll('.form__donation-label'),
bets = document.querySelectorAll('.form__item'),
inputRadio = document.querySelectorAll('.form__donation-input'),
inputDonate = document.querySelector('.form__donation-numb');


for (let i = 0; i<wrapElepses.length; i++) {
    wrapElepses[i].addEventListener('click', () => {
        for (let k = 0; k < bets.length; k++) {
            if (bets[k]) {
                bets[k].classList.remove('active__bet');
            }
        }
        bets[i].classList.add('active__bet');
        inputDonate.value = bets[i].innerHTML.slice(1);
    })
}

inputDonate.addEventListener('input', () => {
    for (let k = 0; k < bets.length; k++) {
        if (bets[k].innerHTML.slice(1) == inputDonate.value) {
            bets[k].classList.add('active__bet');
            inputRadio[k].checked = false;
        } else {
            bets[k].classList.remove('active__bet');
        }
    }
    for (let k = 0; k < bets.length; k++) {
      if (bets[k].innerHTML.slice(1) == inputDonate.value) {
          inputRadio[k].checked = false;
          for (let j = 0; j < inputRadio.length; j++) {
            if (k === j) inputRadio[j].checked = true;
          }
      break;
      } else {
          for (let j = 0; j < inputRadio.length; j++) {
            inputRadio[j].checked = false;
          }
      }
  }
})
