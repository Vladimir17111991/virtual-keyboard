import { createDom } from "./js/createDOM";
import Keyboard from './js/Keyboard';
import './styles/style.css';
// import './styles/style.scss';
const keyboard = new Keyboard();
const section = createDom('section', '', 'main', 'container');
const textArea = createDom('textarea', '', 'main__textarea');
const { body } = document;
body.append(section);
window.onload = () => {
    section.append(textArea);
    section.append(keyboard.createKeyboard());
}  