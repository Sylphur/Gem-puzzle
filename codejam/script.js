createRoot();
const app = document.querySelector('#root');
let $empty = null;

const data = {
    audio: new Audio('assets/click_try_3.mp3'),
    onVolume: true,
    initedTimer: false,
    savedMoves: 0,
    currentSize: 4,
    $topButtons: createTopButtons(),
    $sizes: createSizes(),
    $box: createPuzzleBox(),
    $infoLine: createInfoGame(),
    $bottomLine: createBottomLine(),
    $winPopup: createWinPopup(),
}

init();

function init() {
    data.$sizes.addEventListener('click', selectSize);
    data.$topButtons.addEventListener('click', function (e) {
      const $mute = e.target.closest('.puzzle__mute-button');
      const $start = e.target.closest('.puzzle__start-button');

      if (!$mute && !$start) return;

      e.preventDefault();

      if ($mute) {
          toggleMute($mute);
      }

      if ($start) {
          startGame();
      }
  });
  data.$topButtons.querySelector('.puzzle__start-button').addEventListener('click', startGame);
  data.$winPopup.querySelector('button').addEventListener('click', startGame);
  data.$sizes.childNodes[1].dispatchEvent(new Event('click', {bubbles: true}));
}
function startGame(e) {
  resetValues();
  renderMatrix();
  data.$winPopup.classList.remove('opened');
}
function selectSize(e) {
  const $target = e.target.closest('.puzzle__sizes-item');
  if (!$target) return;

  e.preventDefault();

  const chooseNum = $target.dataset['index'];

  data.$sizes.childNodes.forEach(i => i.classList.remove('active'));
  $target.classList.add('active');

  data.currentSize = +chooseNum;
  data.$bottomLine.querySelector('.puzzle__choose-size span').innerText = `${chooseNum}x${chooseNum}`;
  renderMatrix();
}
function renderMatrix() {
    data.$box.innerHTML = '';
    resetValues();
    const counts = data.currentSize ** 2;

    const $items = (new Array(counts)).fill(1).map((_, k) => {
      const $i = document.createElement('div');

      $i.classList.add('puzzle__box-item');
      $i.draggable = true;
      $i.dataset.index = '' + (k + 1);
      $i.innerHTML = `<span>${k + 1}</span>`;

      $i.originalX = k % data.currentSize + 1;
      $i.originalY = Math.floor(k / data.currentSize) + 1;

      if (k === counts - 1) {
          $i.classList.add('empty');
          $empty = $i;
      }

      return $i;
  });

  const $shuffledItems = shuffle($items);

  $shuffledItems.forEach((i, k) => {
      data.$box.append(i);

      i.style.width = (100 / data.currentSize) + '%';
      i.style.height = (100 / data.currentSize) + '%';

      i.addEventListener('click', e => {
          e.preventDefault();

          const isMoved = isMoveOnClick(i);

          if (isMoved) {
              getMoveItem(i);
          }
      });

      setStartPosition(i, k);
  });

  data.$items = $shuffledItems;

  setDrag();

}
function toggleMute(node) {
  if (data.onVolume) {
      node.classList.add('mute');
  } else {
      node.classList.remove('mute');
  }

  data.onVolume = !data.onVolume;
}
// Create Elements
function createRoot() {
  const $root = document.createElement('div');
  $root.classList.add('puzzle');
  $root.id = "root";
  document.body.append($root);
}
function createSizes() {
    const sizesValue = [3, 4, 5, 6, 7, 8];
    let $parent = document.createElement('div');
    $parent.classList.add('puzzle__sizes-list');

    sizesValue.forEach((i) => {
        const $item = document.createElement('button');
        $item.classList.add('puzzle__sizes-item');
        $item.dataset.index = '' + i;
        $item.innerText = `${i}x${i}`;
        $parent.append($item);
    });

    app.append($parent);

    return $parent;
}

function createTopButtons() {
    const $top = document.createElement('div');
    $top.classList.add('puzzle__top-buttons');

    const $start = document.createElement('button');
    const $mute = document.createElement('button');
    $start.classList.add('puzzle__start-button');
    $start.innerText = 'Shuffle and start';
    $mute.classList.add('puzzle__mute-button');

    $top.append($start);
    $top.append($mute);

    app.append($top);

    return $top;
}

function createPuzzleBox() {
    const $box = document.createElement('div');
    $box.classList.add('puzzle__box');
    app.append($box);

    return $box;
}

function createInfoGame() {
    const $box = document.createElement('div');
    $box.classList.add('puzzle__info-box');

    $box.innerHTML = `<div class="puzzle__info-time">Time: <span>00:00</span></div><div class="puzzle__info-moves">Moves: <span>0</span></div>`

    app.append($box);

    return $box;
}

function createBottomLine() {
    const $box = document.createElement('div');
    $box.classList.add('puzzle__bottom-line');

    $box.innerHTML = `<div class="puzzle__choose-size">Size: <span>4x4</span></div><button class="puzzle__top">Top Results</button>`

    app.append($box);

    return $box;
}

function createWinPopup() {
    const $box = document.createElement('div');
    $box.classList.add('puzzle__win-popup');

    $box.innerHTML = `<div class="puzzle__win-box">Hooray! You solved the puzzle in <span class="_time"></span> and <span class="_move"></span> moves!<button>Play again!</button></div>`
    app.append($box);

    return $box;
}

function createTopPopup() {
    const $box = document.createElement('div');
    $box.classList.add('puzzle_top-popup');

    app.append($box);

    return $box;
}





function shuffle(array) { //ломать генерацию тут. TODO: чит-кнопка для быстрой провери попапа
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

function setStartPosition(node, index) {
  const val = 100 / data.currentSize;
  node.currentX = (index % data.currentSize) + 1;
  node.currentY = Math.floor(index / data.currentSize) + 1;
  node.style.left = (node.currentX - 1) * val + '%';
  node.style.top = (node.currentY - 1) * val + '%';
}

function isMoveOnClick(node) {
  if (node.currentX === $empty.currentX && Math.abs(node.currentY - $empty.currentY) === 1) return true;
  if (node.currentY === $empty.currentY && Math.abs(node.currentX - $empty.currentX) === 1) return true;

  return false;
}

function getMoveItem(node, transition) {
  if (transition !== false) {
      node.classList.add('transition');
  }

  const tempX = node.currentX;
  const tempY = node.currentY;
  const tempStyle = node.getAttribute('style');

  node.currentX = $empty.currentX;
  node.currentY = $empty.currentY;

  $empty.currentX = tempX;
  $empty.currentY = tempY;

  node.setAttribute('style', $empty.getAttribute('style'));
  $empty.setAttribute('style', tempStyle);

  if (data.onVolume) {
    playSound();
  }

  node.classList.remove('not_transition');

  addMoves();

  setTimeout(() => {
      node.classList.remove('transition');
  }, 400);

  if ($empty.currentY === $empty.originalY && $empty.currentX === $empty.originalX) {
      if (checkWinGame()) {
          showWinPopup();
      }
  }
}

function addMoves() {
  if (!data.initedTimer) {
      data.timer = setInterval(setTimer, 1000);
      data.initedTimer = true;
  }

  data.savedMoves = +data.savedMoves + 1;
  window.localStorage.setItem('gem_moves', data.savedMoves);
  data.$infoLine.querySelector('.puzzle__info-moves span').innerText = data.savedMoves
;}

function setDrag() {
  let currentItem = null;
  data.$items.forEach((i) => {

      i.addEventListener('dragstart', e => {
          if (!isMoveOnClick(i)) {
              e.preventDefault();
              return;
          }
          setTimeout(() => {
              i.classList.add('hide');
          }, 0);

          currentItem = i;
      });

      i.addEventListener('dragend', e => {
          i.classList.remove('hide');

          currentItem = null;
      });
  });

  $empty.addEventListener('dragenter', e => {
      $empty.classList.add('_enter')
  })

  $empty.addEventListener('dragleave', e => {
      $empty.classList.remove('_enter')
  })

  $empty.addEventListener('dragover', e => {
      e.preventDefault();
  })

  $empty.addEventListener('drop', e => {
      getMoveItem(currentItem, false);
      $empty.classList.remove('_enter')
  })
}

function playSound() {
  data.audio.pause();
  data.audio.currentTime = 0;
  data.audio.play();
}

function setTimer() {
  data.timerData.seconds += 1;

  if (data.timerData.seconds === 60) {
      data.timerData.seconds = 0;
      data.timerData.minutes += 1;
  }

  const res = `${data.timerData.minutes < 10 ? 0 : ''}${data.timerData.minutes}:${data.timerData.seconds < 10 ? 0 : ''}${data.timerData.seconds}`;
  data.$infoLine.querySelector('.puzzle__info-time span').innerText = res;
}

function resetValues() {
  data.savedMoves = 0;
  data.initedTimer = false;
  data.$infoLine.querySelector('.puzzle__info-moves span').innerText = 0;
  data.$infoLine.querySelector('.puzzle__info-time span').innerText = '00:00';
  data.timerData = {
    minutes: 0,
    seconds: 0
}
  clearInterval(data.timer);
}

function checkWinGame() {
  return data.$items.every(i => i.currentY === i.originalY && i.currentX === i.originalX);
}
function showWinPopup() {
  data.$winPopup.querySelector('._move').innerText = data.savedMoves;
  data.$winPopup.querySelector('._time').innerText = `${data.timerData.minutes < 10 ? 0 : ''}${data.timerData.minutes}:${data.timerData.seconds < 10 ? 0 : ''}${data.timerData.seconds}`;
  clearInterval(data.timer);
  data.$winPopup.classList.add('opened')
}