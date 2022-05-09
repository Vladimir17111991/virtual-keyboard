export const createDom = (element,innerHTML, ...classes) =>{
    const el = document.createElement(element);
    el.innerHTML = innerHTML;
    el.classList.add(...classes);
    return el;
}