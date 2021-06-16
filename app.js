const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// находим необходимые дом узлы
const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  divLightbox: document.querySelector('.js-lightbox'),
  imgLightbox: document.querySelector('.lightbox__image'),
  btnClose: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay'),
};

const createGalleryFn = createGallery(galleryItems);
refs.overlay.addEventListener('click', onBackdropClick);
refs.galleryEl.addEventListener('click', onDocumentClick);
refs.galleryEl.insertAdjacentHTML('afterbegin', createGalleryFn);


// создаем разметку для галлерии
function createGallery(galleryItems) {
  return galleryItems.map(({ preview, description }) => {
    return `<li class="gallery__item"><img class="gallery__image" src="${preview}" alt="${description}"></li>`
  }).join('');
};

// Открытие модального окна по клику на элементе галереи.
function onDocumentClick(event) {
  if (event.target.tagName !== 'IMG') return false;

  const imgSrc = event.target.getAttribute('src');

  const preview = galleryItems.map(item => {
    if (imgSrc === item.preview) {
      refs.imgLightbox.setAttribute('src', item.original)
    }
  });

  modalOpen();
};

function modalOpen() {
  refs.divLightbox.classList.add('is-open');
  document.addEventListener('keydown', onKeyPress);
};


// закрытие модального окна 
function modalClose() {
  refs.divLightbox.classList.remove('is-open');
  refs.imgLightbox.setAttribute('src', '');
};

// по клику на кнопку button[data-action="close-lightbox"].
refs.btnClose.addEventListener('click', (event) => {
  modalClose();
});

// закрытие модального окна по клику на div.lightbox__overlay.
function onBackdropClick(event) {
  modalClose();
};

// закрытие модального окна по нажатию клавиши ESC и пролистывание изображений галереи.
function onKeyPress(event) {
  if (event.code === 'Escape') {
    modalClose();
  }

  if (event.code === 'ArrowRight') {
    showNext();
  };

  if (event.code === 'ArrowLeft') {
    showPrevious();
  };
};

function showNext() {
  let nextIndex = getCurrentIndex() + 1;

  if (nextIndex === galleryItems.length) {
    nextIndex = 0;
  };

  const nextImgSrc = galleryItems[nextIndex].original;
  refs.imgLightbox.setAttribute('src', nextImgSrc);
};


function showPrevious() {
  let previousIndex = getCurrentIndex() - 1;

  if (previousIndex < 0) {
    previousIndex = galleryItems.length - 1;
  };

  const previousImgSrc = galleryItems[previousIndex].original;
  refs.imgLightbox.setAttribute('src', previousImgSrc);
};

function getCurrentIndex() {
  const lightboxImgSrc = refs.imgLightbox.getAttribute('src');
  const lightboxIndex = galleryItems.findIndex(item => {
    return item.original === lightboxImgSrc;
  });
  return lightboxIndex;
};





