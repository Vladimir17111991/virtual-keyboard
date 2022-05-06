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
const pressButton = (event, button, code) => {
    event.preventDefault();
    textArea.focus();
    let text = '';
    let cursor = textArea.selectionStart;
    switch (code) {
        case 'Backspace': {
            text = '-1';
            break;
        }
        case 'Tab': {
            text = '    ';
            break;
        }
        case 'Enter': {
            text = '\n';
            break;
        }
        case 'CapsLock': {
            keyboard.changeCapsLock(event);
            textArea.classList.remove('active')
            break;
        }
        case 'ShiftLeft': {
            keyboard.updateKeyboard(event);
            break;
        }
        case 'ShiftRight': {
            keyboard.updateKeyboard(event);
            break;
        }
        case 'ArrowRight': {
            textArea.setSelectionRange(cursor + 1, cursor + 1);
            break;
        }
        case 'ArrowLeft': {
            if (cursor > 0) {
                textArea.setSelectionRange(cursor - 1, cursor - 1);
            }
            break;
        }
        case 'ArrowUp': {
            const textBeforeCursor = textArea.value.substring(0, cursor).split('\n');
            if (textBeforeCursor.length >= 0) {
                cursor = 0;
            }
            textArea.setSelectionRange(cursor, cursor);
            break;
        }
        case 'ArrowDown': {
            cursor = textArea.selectionEnd;
            const textAfterCursor = textArea.value.substring(textArea.selectionEnd).split('\n');
            if (textAfterCursor.length >= 0) {
                cursor += 500;
            }
            textArea.setSelectionRange(cursor, cursor);
            break;
        }
        default: text = '-1'; break;
    }

    if ((code === 'AltLeft' && (event.shiftKey || keyboard.pressShift)) || (code === 'AltRight' && (event.shiftKey || keyboard.pressShift)) || (code === 'ShiftLeft' && event.altKey) || (code === 'ShiftRight' && event.altKey)) {
        keyboard.languageChange(event);
        keyboard.removeShift(event);
    }


    if (!button.dataset.shiftKey) {
        text = button.textContent;
        keyboard.removeShift(event);
        keyboard.updateKeyboard(event);
    }

    if (!(code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight')) {
        button.classList.add('active');
        setTimeout(() => { button.classList.remove('active'); }, 300);
    }
    if (text) {
        let textBeforeCursor = textArea.value.substring(0, cursor);
        const textAfterCursor = textArea.value.substring(textArea.selectionEnd);
        if (text === '-1') {
            text = '';
            if (cursor === textArea.selectionEnd) {
                textBeforeCursor = textBeforeCursor.slice(0, -1);
                cursor -= (cursor > 0) ? 2 : 1;
            } else cursor -= 1;
        }
        textArea.value = textBeforeCursor + text + textAfterCursor;
        textArea.setSelectionRange(cursor + 1, cursor + 1);
        if (text === '    ') textArea.setSelectionRange(cursor + 4, cursor + 4);
    }
};