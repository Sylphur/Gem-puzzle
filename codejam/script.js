const $root = document.createElement('div');
$root.classList.add('puzzle');
$root.id = "root";
document.body.append($root);

const app = document.querySelector('#root');
let $empty = null;


const data = {
    $topButtons: createTopButtons(),
    $sizes: createSizes(),
    $box: createPuzzleBox(),
    $infoLine: createInfoGame(),
    $bottomLine: createBottomLine(),
    $winPopup: createWinPopup(),
}

init();

function init() {
    renderMatrix();
}

function renderMatrix() {

    data.$box.innerHTML = '';
    const counts = 9;

    const $items = (new Array(counts)).fill(1).map((_, k) => {
        const $i = document.createElement('div');

        $i.classList.add('puzzle__box-item');
        $i.dataset.index = '' + (k + 1);
        $i.innerHTML = `<span>${k + 1}</span>`;
        if (k === counts - 1) {
            $i.classList.add('empty');
            $empty = $i;
        }

        return $i;
    });

    $items.forEach((i, k) => {
        data.$box.append(i);

        i.style.width = (100 / 3) + '%';
        i.style.height = (100 / 3) + '%';
        setStartPosition(i, k);
    });
}

function setStartPosition(node, index) {
  const val = 100 / 3;
  node.currentX = (index % 3) + 1;
  node.currentY = Math.floor(index / 3) + 1;
  node.style.left = (node.currentX - 1) * val + '%';
  node.style.top = (node.currentY - 1) * val + '%';
}

// Create Elements

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

