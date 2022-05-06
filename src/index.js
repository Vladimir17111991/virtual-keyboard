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
    // pressButton();

    // for mouse
    const mouse = document.querySelector('.main__keyboard');
    mouse.addEventListener('click', (e) => {
        if (e.target.closest('.keyboard-key')) {
            const btn = e.target.closest('.keyboard-key');
            if (btn.dataset.code === 'ShiftLeft' || btn.dataset.code === 'ShiftRight') {
                keyboard.pressShift = !keyboard.pressShift;
                btn.classList.toggle('active');
            }
            pressButton(e, btn, btn.dataset.code);
        }
    });
    //for keyboard
    document.addEventListener('keydown', (e) => {
        const btn = document.querySelector(`[data-code=${e.code}]`);
        if (btn) {
            btn.classList.toggle('active');
            pressButton(e, btn, e.code);
            if (e.code === 'CapsLock') {
                body.classList.remove('active')
            }
        }
    });
}
const pressButton = (e, btn, code) => {
    e.preventDefault();
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
            keyboard.changeCapsLock(e);
            textArea.classList.remove('active')
            break;
        }
        case 'ShiftLeft': {
            keyboard.updateKeyboard(e);
            break;
        }
        case 'ShiftRight': {
            keyboard.updateKeyboard(e);
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

    if ((code === 'AltLeft' && (e.shiftKey || keyboard.pressShift)) || (code === 'AltRight' && (e.shiftKey || keyboard.pressShift)) || (code === 'ShiftLeft' && e.altKey) || (code === 'ShiftRight' && e.altKey)) {
        keyboard.languageChange(e);
        keyboard.removeShift(e);
    }


    if (!btn.dataset.shiftKey) {
        text = btn.textContent;
        keyboard.removeShift(e);
        keyboard.updateKeyboard(e);
    }

    if (!(code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight')) {
        btn.classList.add('active');
        setTimeout(() => { btn.classList.remove('active'); }, 300);
    }
    if (text) {
        const textBeforeCursor = textArea.value.substring(0, cursor);
        const textAfterCursor = textArea.value.substring(textArea.selectionEnd);
        if (text === '-1') {
            text = '';
            if (cursor === textArea.selectionEnd) {
                textBeforeCursor = textBeforeCursor.slice(0, -1);
                cursor -= (cursor > 0) ? 2 : 1;
            } else cursor--;
        }
        textArea.value = textBeforeCursor + text + textAfterCursor;
        textArea.setSelectionRange(cursor + 1, cursor + 1);
        if (text === '    ') textArea.setSelectionRange(cursor + 4, cursor + 4);
    }
};