export default class Check {
  constructor () {
    // default value
    this._config = {
      // Чекбокс переключающий все чекбоксы
      allCheckboxButton: '#checkbox-head',
      // Чекбокс в строке таблицы
      checkboxButton: '#checkbox-',
      // Строка таблицы
      tableRow: '.js-table-row',
      // Дата атрибут (data-index) содержащицй индекс чекбокса
      index: 'index',
      className: {
        checked: '_checked'
      }
    };

    // context binding
    this.onAllCheckboxButton = this.onAllCheckboxButton.bind(this);
    this.onCheckboxButton = this.onCheckboxButton.bind(this);
  }

  init (config) {
    this._config = { ...this._config, ...config };

    this.tableRow = document.querySelectorAll(this._config.tableRow);
    this.allCheckboxButton = document.querySelector(this._config.allCheckboxButton);
    this.checkboxButtons = [];

    this.tableRow.forEach((item, index) => {
      this.checkboxButtons.push(item.querySelector(this._config.checkboxButton + index));
    });

    this.addEvents();
  }

  addEvents () {
    this.allCheckboxButton.addEventListener('click', this.onAllCheckboxButton);
    this.checkboxButtons.forEach((item) => {
      item.addEventListener('click', this.onCheckboxButton);
    });
  }

  onAllCheckboxButton (event) {
    const isChecked = event.target.checked;

    this.checkboxButtons.forEach((item, index) => {
      this.toggle(item, index, isChecked);
    });
  }

  onCheckboxButton (event) {
    const isChecked = event.target.checked;
    const indexElement = event.target.dataset[this._config.index];
    this.toggle(event.target, indexElement, isChecked);
  }

  toggle (elem, index, isChecked) {
    elem.checked = isChecked; // set attr checked = true || false

    if (isChecked) {
      this.tableRow[index].classList.add(this._config.className.checked);
    } else {
      this.tableRow[index].classList.remove(this._config.className.checked);
    }
  }
}
