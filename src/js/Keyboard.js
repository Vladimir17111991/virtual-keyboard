import { elements } from './elements';
import { createDom } from "./createDOM";

export default class Keyboard {
    constructor() {
        this.lang = 'en';
        this.caps = 'offSet';
        this.pressShift = false;
        this.shiftKey = false;
    }

    createKeyboard() {
        const keyboard = createDom('div', '', 'main__keyboard');
        const container = createDom('div', '', 'keyboard-container');

        for (let i = 0; i < elements.length; i++) {
            const line = createDom('div', '', 'keyboard-line');
            elements[i].forEach((e) => {
                const keyLang = (e.key.ru && e.key.en) ? e.key[this.lang] : e.key;
                const key = createDom('div', keyLang, 'keyboard-key');
                //add current code for digital on dom 
                key.dataset.code = e.code;

                //check if the key has properties in Russian and English
                if (e.key.ru && e.key.en) {
                    key.dataset.en = e.key.en;
                    key.dataset.ru = e.key.ru;
                }
                //check if the key has a property to change by shift
                if (e.shiftKey) {
                    key.dataset.ruShift = e.pressShift.ru;
                    key.dataset.enShift = e.pressShift.en;
                } else {
                    key.dataset.shiftKey = false;
                }
                // add all classes for each element from elements.js
                if (e.class) key.classList.add(e.class);

                line.append(key);
            });
            container.append(line);
        }
        keyboard.append(container);
        return keyboard;
    }
    language(event) {
        this.lang = (this.lang === 'en') ? 'ru' : 'en';
    }
    capsLockPress(e) {
        const btn = e.target;
        if (this.caps === 'onSet') {
            this.caps = 'offSet';
            btn.classList.remove('active');
            // console.log(btn)
        } else {
            this.caps = 'onSet';
            btn.classList.add('active');
        }
        caseKeyboard(e)
    }
    caseKeyboard(ev){
        const { lang } = this;
        document.querySelectorAll('.keyboard-key').forEach((e) => {
            if (e.dataset[lang]) {
              if (this.caps === 'onSet' && !(ev.shiftKey || this.pressShift)) {
                e.innerHTML = e.dataset[lang].toUpperCase();
              } else e.innerHTML = e.dataset[lang];
            }
          });
    }
}
