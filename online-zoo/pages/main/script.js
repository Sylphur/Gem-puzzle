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

// ----------------------- popup ----------------------

const mediaQuery968 = window.matchMedia('(max-width: 968px)');
const CARD = document.querySelectorAll('.testimonials__item');
const POPUP = document.querySelector('.popup');
const POPUPBTN = document.querySelector('.popup__mobile');
const openPopup = (e) => {
  if (e.matches) {
    DARK.classList.add('dark__toggle');
    //document.documentElement.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    POPUP.classList.add('popup__toggle');
    BURGERBUTTON.classList.add('menu__rotated');
  }
}
const closePopup = () => {
  DARK.classList.remove('dark__toggle');
  document.body.style.overflow = '';
  POPUP.classList.remove('popup__toggle');
  BURGERBUTTON.classList.remove('menu__rotated');
}

for (let key of CARD) {
  key.addEventListener('click', () => { 
    openPopup(mediaQuery968);
  })
}
POPUPBTN.addEventListener('click', () => {
  closePopup();
});
// dark - union of popup and burger
DARK.addEventListener('click', () => {
  closeMenu();
  closePopup();
})

// popup fill

const cardsTest = document.querySelector('.testimonials__content');
let nameCardPopap = document.querySelector('.popup__username'),
    profCardPopap = document.querySelector('.popup__userlocation'),
    storyCardPopap = document.querySelector('.popup__descr');
cardsTest.addEventListener('click', (e) => {
    let newPopap = e.target.parentElement;
    let imgCardPopap = document.querySelector('.popup__img');
    let newName = newPopap.querySelector('.testimonials__user-name').innerHTML;
    let newImg = newPopap.querySelector('.testimonials__user-img').cloneNode();
    let newStory = newPopap.querySelector('.testimonials__content-text').innerHTML;
    let newProf = newPopap.querySelector('.testimonials__user-local').innerHTML;
    imgCardPopap.replaceChild(newImg, imgCardPopap.childNodes[1]);
    nameCardPopap.innerHTML = newName;
    profCardPopap.innerHTML = newProf;
    storyCardPopap.innerHTML = newStory;
    console.log(imgCardPopap.childNodes[1]);
})

// ------------------------------ pets carousel ----------------------------------

const cardsTotal = [
  pandas = {
      name: "giant Pandas",
      textCard: "Native to Southwest China",
      iconeFood: "../../assets/icons/banana-bamboo_icon.svg",
      imgCardPets: "../../assets/images/pets/1.jpg",
  },

  eagles = {
      name: "Eagles",
      textCard: "Native to South America",
      iconeFood: "../../assets/icons/meet-fish_icon.svg",
      imgCardPets: "../../assets/images/pets/2.jpg",
  },

  gorillas = {
      name: "Gorillas",
      textCard: "Native to Congo",
      iconeFood: "../../assets/icons/banana-bamboo_icon.svg",
      imgCardPets: "../../assets/images/pets/3.jpg",
  },

  sloth = {
      name: "Two-toed Sloth",
      textCard: "Mesoamerica, South America",
      iconeFood: "../../assets/icons/banana-bamboo_icon.svg",
      imgCardPets: "../../assets/images/pets/4.png",
  },

  cheetahs = {
      name: "cheetahs",
      textCard: "Native to Africa",
      iconeFood: "../../assets/icons/meet-fish_icon.svg",
      imgCardPets: "../../assets/images/pets/5.jpg",
  },

  penguins = {
      name: "Penguins",
      textCard: "Native to Antarctica",
      iconeFood: "../../assets/icons/meet-fish_icon.svg",
      imgCardPets: "../../assets/images/pets/6.jpg",
  },
];

let PETS = document.querySelectorAll('.pets__item');
let newCardsArr = [];
const mix = () => {
    let cloneCardsArr = Array.from(cardsTotal);
    for (let i = cloneCardsArr.length; i > 0; i--) {
        let rand = Math.floor(Math.random() * i);
        let randCard = cloneCardsArr.splice(rand, 1);
        newCardsArr.push(randCard[0]);
    }
}
const rewrite = (dir) => {
  newCardsArr = [];
  mix();
  for(let i = 0; i < PETS.length; i++) {
    PETS[i].querySelector('.pets__img').src = newCardsArr[i].imgCardPets;
    PETS[i].querySelector('.pets__title').innerHTML = newCardsArr[i].name;
    PETS[i].querySelector('.pets__subtitle').innerHTML = newCardsArr[i].textCard;
    PETS[i].querySelector('.pets__icon-img').src = newCardsArr[i].iconeFood;

    if (dir === 'left') {
      PETS[i].classList.remove('scroll-right');
      PETS[i].classList.add('scroll-left');
      BUTTLEFT.style.pointerEvents = 'none';
      BUTTRIGHT.style.pointerEvents = 'none';
      BUTTLEFT.classList.add('btn-disabled');
      BUTTRIGHT.classList.add('btn-disabled');
      setTimeout(() => {
        BUTTLEFT.style.pointerEvents = '';
        BUTTRIGHT.style.pointerEvents = '';
        BUTTLEFT.classList.remove('btn-disabled');
        BUTTRIGHT.classList.remove('btn-disabled');
        PETS[i].classList.remove('scroll-left');
      }, 201)
    }
    else if (dir === 'right') {
      PETS[i].classList.remove('scroll-left');
      PETS[i].classList.add('scroll-right');
      BUTTLEFT.style.pointerEvents = 'none';
      BUTTRIGHT.style.pointerEvents = 'none';
      BUTTLEFT.classList.add('btn-disabled');
      BUTTRIGHT.classList.add('btn-disabled');
      setTimeout(() => {
        BUTTLEFT.style.pointerEvents = '';
        BUTTRIGHT.style.pointerEvents = '';
        PETS[i].classList.remove('scroll-right');
        BUTTLEFT.classList.remove('btn-disabled');
        BUTTRIGHT.classList.remove('btn-disabled');
      }, 201)
    }
    
  }
}
const BUTTLEFT = document.querySelector('.pets__arrow-img-two');
const BUTTRIGHT = document.querySelector('.pets__arrow-img-one');
BUTTLEFT.addEventListener('click', () => {
  rewrite('left');
})
BUTTRIGHT.addEventListener('click', () => {
  rewrite('right');
})

// ------------------- testimonials carousel -----------------------------

const testmonialGuys = [
  user1 = {
      name: "Michael John",
      photo: "../../assets/icons/user_icon.svg",
      local: "Local Austria",
      date: "Today",
      text: "Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas.",
  },
  user2 = {
    name: "Oskar Samborsky",
    photo: "../../assets/images/user1.jpg",
    local: "Local Austria",
    date: "Today",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  user3 = {
    name: "Fredericka Michelin",
    photo: "../../assets/images/user2.jpg",
    local: "Local Austria",
    date: "Yesterday",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met.",
  },
  user4 = {
    name: "Mila Riksha",
    photo: "../../assets/images/user3.jpg",
    local: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  user5 = {
    name: "Michael John",
    photo: "../../assets/icons/user_icon.svg",
    local: "Local Austria",
    date: "Tomorrow",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
},
  user6 = {
    name: "Fredericka Michelin",
    photo: "../../assets/images/user2.jpg",
    local: "London",
    date: "Tomorrow",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met.",
  },
  user7 = {
    name: "Mila Riksha",
    photo: "../../assets/images/user3.jpg",
    local: "New York",
    date: "Today",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  user8 = {
    name: "Oskar Samborsky",
    photo: "../../assets/images/user1.jpg",
    local: "Local Austria",
    date: "Today",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met.",
  },
  user9 = {
    name: "Mila Riksha",
    photo: "../../assets/images/user3.jpg",
    local: "Moskow",
    date: "Yesterday",
    text: "Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas.",
  },
  user10 = {
    name: "Michael John",
    photo: "../../assets/icons/user_icon.svg",
    local: "Local Austria",
    date: "Tomorrow",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met.",
},
  user11 = {
    name: "Fredericka Michelin",
    photo: "../../assets/images/user2.jpg",
    local: "Pogreb",
    date: "Yesterday",
    text: "Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas.",
  }
];

const TESTIM = document.querySelector('.testimonials__content');
const TESITEMS = document.querySelectorAll('.testimonials__item');

const write = (shift) => {
  for (let i = 0; i < TESITEMS.length; i++) {
    TESITEMS[i].querySelector('.testimonials__user-img').src = testmonialGuys[+shift + i].photo;
    TESITEMS[i].querySelector('.testimonials__user-name').innerHTML = testmonialGuys[+shift + i].name;
    TESITEMS[i].querySelector('.testimonials__user-local').innerHTML = testmonialGuys[+shift + i].local;
    TESITEMS[i].querySelector('.testimonials__user-date').innerHTML = testmonialGuys[+shift + i].date;
    let texts = TESITEMS[i].querySelectorAll('.testimonials__content-text');
    texts[0].innerHTML = testmonialGuys[+shift + i].text;
    texts[1].innerHTML = testmonialGuys[+shift + i].text;
    TESTIM.classList.add('fade');
    setTimeout(() => {
      TESTIM.classList.remove('fade');
    }, 201)
  }
}
let range = document.querySelector("input[type='range']");
range.addEventListener('input', () => {
  write(range.value);
});

alert('Дико извиняюсь за задержку и спасибо что подождали. \n Известные ошибки: карусель pets с разрешением 1000px иногда начинает сходить с ума и слегка менять позиционку кнопок. Лечится парой перезагрузок страницы, от чего это зависит не представляю. \n Если есть какие-то ошибки пишите, пожалуйста, в ревью или в дискорд Sylphur(Pururu)#3428');