/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/no-render-return-value: 0 */
/* eslint react/no-find-dom-node: 0 */

import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

let sharedContainer = null;

/**
 * Тестовая обертка.
 *
 * @typedef {Object} TestWrapper
 * @property {React.Component} instance Ссылка на экземпляр React компонента.
 * @property {Node} node Корневой HTML узел компонента.
 * @property {Node} container HTML узел контейнера, в котором отрендерен компонент.
 */

/**
 * Рендерит компонент в настоящий DOM, возвращает тестовую обертку.
 *
 * @param {Object} jsx JSX для рендера.
 * @param {Object} [options] Опции для рендера.
 * @param {String} [options.css] Стили для рендер контейнера.
 * @param {Node} [options.container] Контейнер, в который нарендерить компонент.
 * @returns {TestWrapper}
 */
export function render(jsx, options = {}) {
    let container = options.container;

    if (!container) {
        if (!sharedContainer) {
            sharedContainer = document.createElement('div');
            document.body.appendChild(sharedContainer);
        }
        container = sharedContainer;
    }

    if (options.css) {
        container.setAttribute('style', options.css);
    }

    let instance = ReactDOM.render(jsx, container);

    return {
        instance,
        node: ReactDOM.findDOMNode(instance),
        container
    };
}

/**
 * Очищает содержимое DOM после тестов.
 */
export function cleanUp() {
    if (sharedContainer) {
        sharedContainer = null;
    }

    while (document.body.childNodes.length > 0) {
        document.body.removeChild(document.body.firstChild);
    }
}

/**
 * Симулирует событие на HTML узле.
 *
 * @param {Node} node HTML узел, на котором необходимо сгенерить событие.
 * @param {String} event Тип события.
 * @param {*} [data] Данные для прокисрования в событие.
 */
export function simulate(node, event, data) {
    TestUtils.Simulate[event](node, data);
}
