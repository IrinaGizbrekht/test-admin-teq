export default class Modal {
  constructor () {
    // default value
    this._config = {
      openButton: '.js-section-button',
      modal: '.js-modal',
      closeButton: '.js-modal-close',
      className: {
        show: '_show',
        overlay: 'overlay'
      }
    };

    // context binding
    this.toggle = this.toggle.bind(this);
    this.show = this.show.bind(this);
    this.onClickModal = this.onClickModal.bind(this);
    this.onEscape = this.onEscape.bind(this);
  }

  init (config) {
    this._config = { ...this._config, ...config };

    this.openButton = document.querySelector(this._config.openButton);
    this.modal = document.querySelector(this._config.modal);
    this.closeButton = document.querySelector(this._config.closeButton);
    this.isVisible = false;

    this.openButton.addEventListener('click', this.toggle);
  }

  toggle () {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
    this.isVisible = !this.isVisible;
  }

  addEvents () {
    window.addEventListener('keyup', this.onEscape);
    this.modal.addEventListener('click', this.onClickModal);
    this.closeButton.addEventListener('click', this.onClickModal);
  }

  removeEvent () {
    window.removeEventListener('keyup', this.onEscape);
    this.modal.removeEventListener('click', this.onClickModal);
    this.closeButton.removeEventListener('click', this.onClickModal);
  }

  onClickModal (event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target === this.modal ||
        event.currentTarget === this.closeButton) {
      this.toggle();
    }
  }

  show () {
    this.posTop = window.pageYOffset;
    this.modal.classList.add(this._config.className.show);
    this.addEvents();
    this.addOverlay();
  }

  hide () {
    this.modal.classList.remove(this._config.className.show);
    this.removeOverlay();
    this.removeEvent();
  }

  addOverlay () {
    document.documentElement.classList.add(this._config.className.overlay);
    document.body.style.top = -this.posTop + 'px';
  }

  removeOverlay () {
    document.documentElement.classList.remove(this._config.className.overlay);
    document.body.removeAttribute('style');
    window.scrollBy(0, this.posTop);
  }

  onEscape (event) {
    let isEscape = false;
    if ('key' in event) {
      isEscape = (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27);
    }
    if (isEscape) this.hide();
  }
}
