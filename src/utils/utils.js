/*
 * Copyright (c) 15/05/2021 23:35
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import axios from 'axios';

export default class InjectLoader {

    /**
     * Loader injection.
     * @param {HTMLElement} element Element that loader would be injected.
     */
    constructor(element) {

        this.element = element;

        this.root = this.createDivWithClass('loader_injection__root');

        // Injections.
        this.injectCircularLoaderIndeterminate();
        
        // Style
        this.setRootStyle();

        this.element.style.position = 'relative';

        this.element.appendChild(this.root);
    }

    /**
     * dismissing loader method.
     */
    dismiss () {
        this.root.remove();
    }

    /**
     * @param {String} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    /**
     * Inject circular indeterminate loader method.
     */
    injectCircularLoaderIndeterminate() {
        this.root.innerHTML = `<svg version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <circle fill="none" stroke="currentColor" stroke-width="6" stroke-miterlimit="15" stroke-dasharray="14.2472,14.2472" cx="50" cy="50" r="47" >
          <animateTransform 
             attributeName="transform" 
             attributeType="XML" 
             type="rotate"
             dur="5s" 
             from="0 50 50"
             to="360 50 50" 
             repeatCount="indefinite" />
      </circle>
      <circle fill="none" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-dasharray="10,10" cx="50" cy="50" r="39">
          <animateTransform 
             attributeName="transform" 
             attributeType="XML" 
             type="rotate"
             dur="5s" 
             from="0 50 50"
             to="-360 50 50" 
             repeatCount="indefinite" />
      </circle>
      <g fill="currentColor">
      <rect x="30" y="35" width="5" height="30">
        <animateTransform 
           attributeName="transform" 
           dur="1s" 
           type="translate" 
           values="0 5 ; 0 -5; 0 5" 
           repeatCount="indefinite" 
           begin="0.1"/>
      </rect>
      <rect x="40" y="35" width="5" height="30" >
        <animateTransform 
           attributeName="transform" 
           dur="1s" 
           type="translate" 
           values="0 5 ; 0 -5; 0 5" 
           repeatCount="indefinite" 
           begin="0.2"/>
      </rect>
      <rect x="50" y="35" width="5" height="30" >
        <animateTransform 
           attributeName="transform" 
           dur="1s" 
           type="translate" 
           values="0 5 ; 0 -5; 0 5" 
           repeatCount="indefinite" 
           begin="0.3"/>
      </rect>
      <rect x="60" y="35" width="5" height="30" >
        <animateTransform 
           attributeName="transform" 
           dur="1s" 
           type="translate" 
           values="0 5 ; 0 -5; 0 5"  
           repeatCount="indefinite" 
           begin="0.4"/>
      </rect>
      <rect x="70" y="35" width="5" height="30" >
        <animateTransform 
           attributeName="transform" 
           dur="1s" 
           type="translate" 
           values="0 5 ; 0 -5; 0 5" 
           repeatCount="indefinite" 
           begin="0.5"/>
      </rect>
      </g>
    </svg>`;
    }

    /**
     * Root style method.
     */
    setRootStyle() {
        this.root.style.position = 'absolute';
        this.root.style.background = 'rgba(255,255,255,0.53)';
        this.root.style.top = '0';
        this.root.style.left = '0';
        this.root.style.height = '100%';
        this.root.style.width = '100%';
        this.root.style.display = 'flex';
        this.root.style.justifyContent = 'center';
        this.root.style.alignItems = 'center';
        this.root.style.cursor = 'wait';
    }
}

class Notification {
    /**
     * Set notification.
     * @param {{title: string, message: string, icon: string, color: string, duration: number}} param0 
     */
    constructor({ title = '', message = '', icon = '', color = '', duration=3000 }) {
        this.root = document.createElement('div');
        this.root.className = `notification__wrapper ${color}`;
        this.root.innerHTML = `
            <div class="icon"><i class="${icon}"></i></div>
            <div class="content">
                <div class="title">${title}</div>
                <div class="message">${message}</div>
            </div>
        `;
        document.body.appendChild(this.root);
        setTimeout(() => {
            this.root.remove();
        }, duration);
    }
}

const httpClient = {
    post: (url, data, config = {}) => {
        console.log(url);
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return axios.post(url, data, {
            config,
            validateStatus: function (status) {
                return status <= 300; // Reject only if the status code is greater than 300
            }
        });
    },
    get: (url, config = {}) => {
        console.log(url);
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return axios.get(url, {
            config,
            validateStatus: function (status) {
                return status <= 300; // Reject only if the status code is greater than 300
            }
        });
    }
};

/**
 * Class to manage the menu popup.
 */
class FloatMenu {

    /**
     * @param {HTMLElement} element Element that the menu will be associate.
     * @param {array<{title: string, onClick: function, icon: string}>} contents Contents of the menu
     */
    constructor(element, contents) {
        this.element = element;
        this.contents = contents;
        let rect = this.element.getBoundingClientRect();
        let x = rect.x;
        let y = rect.y;

        this.root = this.createDivWithClass('float__menu__wrapper');
        this.menu = this.createDivWithClass('float__menu');
        this.items = this.contents.map(item => this.getMenuItem(item));
        this.items.forEach(item => this.menu.appendChild(item));

        this.root.appendChild(this.menu);
        this.element.parentElement.appendChild(this.root);

        this.menu.style.left = `${x - this.menu.offsetWidth + 24}px`;
        if(y + this.menu.offsetHeight > window.innerHeight)
            y = y - this.menu.offsetHeight + 25;
        this.menu.style.top = `${y}px`;

        this.root.addEventListener('click', () => this.root.remove());
    }

    /**
     * @param {{title: string, onClick: function, icon: string}} item
     * @returns {HTMLElement}
     */
    getMenuItem (item){
        let has_icon = item.icon !== undefined && item.icon !== null;
        let menuItem = this.createDivWithClass(`float__menu-item ${has_icon ? 'between' : 'center'}`);
        menuItem.innerHTML = `${ has_icon ? `<span class="float__menu-item-icon"><i class="${item.icon}"> </i></span>` : ''}
        <span class="float__menu-item-title">${item.title}</span>`;
        menuItem.addEventListener('click', () => item.onClick());
        return menuItem;
    }

    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass (className){
        let div = document.createElement('div');
        div.className = className;
        return div;
    }
}


export {
    httpClient,
    Notification,
    FloatMenu,
};