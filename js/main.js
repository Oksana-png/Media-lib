'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const test = document.querySelector('.like');

// ReactDOM.render(e(LikeButton), test);

document.addEventListener('DOMContentLoaded', () => {

  const widthScroll = window.innerWidth - document.body.clientWidth;

  // Виды карточек 
  const viewShowButtons = document.querySelectorAll('.view__show');
  const changeView = (i) => {
    const articlesCards = document.querySelector('.articles__cards')
    const articlesContainer = document.querySelector('.articles-container');
    const classView = [, 'small-cards', 'list-large', 'list-small'];
    viewShowButtons.forEach((item, index) => {
      item.classList.remove('view__show--active');
      if (index === i) {
        item.classList.add('view__show--active');
      }
    });

    articlesContainer.classList = 'container articles-container';
    articlesContainer.classList.add(classView[i]);

    articlesCards.classList.add('articles__none');
    document.body.style.overflow = 'scroll';
    setTimeout(() => {
      articlesCards.classList.remove('articles__none');
      document.body.style.overflow = 'auto';
    }, 100);

  };

  viewShowButtons.forEach((viewShowButton, i) => {
    viewShowButton.addEventListener('click', () => {
      changeView(i);
    });
  });


  // Функции у карточек
  const cardInteracktive = () => {
    const cards = document.querySelectorAll('.card');

    const openMenu = (card) => {
      const menuAll = document.querySelectorAll('.menu-list');
      const menu = card.querySelector('.menu-list');
      if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        return;
      }
      
      menuAll.forEach((elem) => elem.style.display = 'none');
      menu.style.display = 'flex';
    }

    const downloadFails = (card) => {
      console.log(card);
      const downloadModal = document.querySelector('.popup.popup-download');
      downloadModal.style.visibility = 'visible';
      document.body.style.cssText = `
        padding-right: ${widthScroll}px;
        overflow: hidden;
      `;
    }
    const favorites = (card, btn) => {
      
      if (btn.classList.contains('card__button-favorites--active')) { 
        btn.classList.remove('card__button-favorites--active'); 
      } else {
        btn.classList.add('card__button-favorites--active');
      }
    }

    cards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.card__button-dots') || target.closest('.card__dots')) {
          openMenu(card);
        } else if (target.closest('.card__button-download')) {
          downloadFails(card);
        } else if (target.closest('.card__button-favorites')) {
          favorites(card, target.closest('.card__button-favorites'));
        } else if (!target.closest('.card__button-dots')) {
          const menuAll = document.querySelectorAll('.menu-list');
          menuAll.forEach((elem) => elem.style.display = 'none');
        }
      });
    });

    window.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('popup-download') || target.closest('.popup-download__close')) {
        const downloadModal = document.querySelector('.popup-download');
        downloadModal.style.visibility = 'hidden';
        document.body.style.cssText = `
          padding-right: 0;
          overflow: auto;
        `;
      }
    });
  }

  cardInteracktive();


  const filtersInit = () => {
    const articlesFilter = document.querySelector('.articles__filter');
    const filterButtons = articlesFilter.querySelectorAll('.filters__item');
    const classFilters = ['.select-author', '', '', '.select-edition'];
    const allArrow = articlesFilter.querySelectorAll('.filters__arrow');
    
    const openSelect = (btn) => {
      filterButtons.forEach((item, i) => {
        if (i === 1 || i === 2) {
          return;
        }
        const select = articlesFilter.querySelector(classFilters[i]);
        
        if (item === btn) {
          if (select.style.display === 'block') {
            select.style.display = 'none';
            allArrow[i + 1].style.transform = 'rotate(0deg)';
            return;
          } else {
            select.style.display = 'block';
            allArrow[i + 1].style.transform = 'rotate(180deg)';
            return;
          }
        }
        (articlesFilter.querySelector(classFilters[i])).style.display = 'none';
        allArrow[i + 1].style.transform = 'rotate(0deg)';

      })
    }

    articlesFilter.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.filters__item')) {
        openSelect(target.closest('.filters__item'));
      } else if (!target.closest('.filters__item') && !target.closest('.select-author') && !target.closest('.select-edition')) {
        filterButtons.forEach((item, i) => {
          if (i === 1 || i === 2) {
            return;
          }
          (articlesFilter.querySelector(classFilters[i])).style.display = 'none';
          allArrow[i + 1].style.transform = 'rotate(0deg)';
        })
      }
    });
  }

  filtersInit();

  const addingMetherial = () => {
    const avatar = document.querySelector('.author__photo');
    const iconAdding = document.querySelector('.add-matherial');
    const addingModal = document.querySelector('.add');

    const openAddingModal = () => {
      iconAdding.style.display = 'none';
      addingModal.style.visibility = 'visible';
      document.body.style.cssText = `
        padding-right: ${widthScroll}px;
        overflow: hidden;
      `;
    }

    const closeAddingModal = () => {
      iconAdding.style.display = 'flex';
      addingModal.style.visibility = 'hidden';
      document.body.style.cssText = `
        padding-right: 0;
        overflow: auto;
      `;
    }

    avatar.addEventListener('click', openAddingModal);
    iconAdding.addEventListener('click', openAddingModal);
    addingModal.querySelector('.add__close').addEventListener('click', closeAddingModal);

  }

  addingMetherial();

  const search = () => {
    const searchHeader = document.querySelector('.search-form');
    const searchModal = document.querySelector('.popup-search');
    const closeSearchModal = document.querySelector('.search__close');

    searchHeader.addEventListener('click', () => {
      searchModal.style.visibility = 'visible';
      document.body.style.cssText = `
        padding-right: ${widthScroll}px;
        overflow: hidden;
      `;
    });

    closeSearchModal.addEventListener('click', () => {
      searchModal.style.visibility = 'hidden';
      document.body.style.cssText = `
        padding-right: 0;
        overflow: auto;
      `;
    });
  }

  search();

});