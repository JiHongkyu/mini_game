const ul = document.querySelector('.image-list');
const hint = document.querySelector('.hint');
const arrList = Array(16);
const success_bar = document.querySelector('.main p');
let drag = null;
let drop = null;
let success = false;
let cnt = 0;


//퍼즐이 다 맞춰졌는지 확인
function update() {
    for(let i = 0; i < arrList.length; i++) {
        if(arrList[i].dataset.index !== String(i)) {
            success = false;
            break;
        } else {
            success = true;
        }
    }

    if(success === true) {
        success_bar.classList.add('active');
    }
}


//퍼즐 섞기
function suffle() {
    arrList.forEach((_, i) => {
        const random = Math.floor(Math.random() * arrList.length);
        [ arrList[i], arrList[random] ] = [ arrList[random], arrList[i] ];
    })
}

//퍼즐조각 만들기
function getLi() {
    arrList.fill().forEach((_, i) => {
        const li = document.createElement('li');
        li.classList.add(`number${i}`);
        li.setAttribute('data-index', i);
        li.setAttribute('draggable', 'true');
        arrList[i] = li;
    });
}

//게임 시작
function gameStart() {
    getLi();
    suffle();

    arrList.forEach(v => {
        ul.appendChild(v);
    });
}

gameStart();



ul.addEventListener('drag', (e) => {
    e.preventDefault();
    drag = e.target;
});

ul.addEventListener('dragover', (e) => {
    e.preventDefault();
});

ul.addEventListener('drop', (e) => {
    e.preventDefault();
    drop = e.target;
    if(drag.className !== drop.className)  {
        [ drag.className, drop.className ] = [ drop.className, drag.className  ];
        [ drag.dataset.index, drop.dataset.index ] = [ drop.dataset.index, drag.dataset.index ];
    }
});

setInterval(update, 50);