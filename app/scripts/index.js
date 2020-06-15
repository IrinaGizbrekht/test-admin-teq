import '../styles/main.scss';
import Checked from './checked';
import Modal from './modal';

if (process.env.NODE_ENV !== 'production') {
  require('../index.pug');
}

const modal = new Modal();
modal.init();

const checked = new Checked();
checked.init();
