/*
 * UI Bot
 * https://github.com/ivopetkov/ui-bot
 * Copyright 2017, Ivo Petkov
 * Free to use under the MIT license.
 */

var UIBot = function (config) {

    if (typeof config === 'undefined') {
        config = {};
    }

    var speed = typeof config.speed === 'undefined' ? 1 : parseFloat(config.speed, 10);
    var startDelay = typeof config.startDelay === 'undefined' ? 1 * speed : parseInt(config.startDelay, 10);
    var slowdown = 1 / speed;

    if (typeof window.UIBotDataStorage === 'undefined') {
        window.UIBotDataStorage = {
            'styleKeys': []
        };
    }

    var styleKeys = window.UIBotDataStorage.styleKeys;
    var styleKey = 'slowdown=' + slowdown + ';';
    var styleID = null;
    for (var i in styleKeys) {
        if (styleKeys[i] === styleKey) {
            styleID = i;
        }
    }
    if (styleID === null) {
        styleID = styleKeys.length;
        styleKeys.push(styleKey);

        var style = '.ui-bot-pointer-' + styleID + '{top:0;left:0;width:22px;height:22px;position:absolute;z-index:999999999;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjUxMiIKICAgaGVpZ2h0PSI1MTIiCiAgIHZpZXdCb3g9IjAgMCA1MTIgNTEyIgogICBmaWxsPSIjMDAwMDAwIgogICBpZD0ic3ZnMjk5NSIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjQgcjk5MzkiCiAgIHNvZGlwb2RpOmRvY25hbWU9InR1dG9yaWFsLWN1cnNvci5zdmciPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTMwMDMiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMzMDAxIiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTMwMyIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NDUiCiAgICAgaWQ9Im5hbWVkdmlldzI5OTkiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjAuNjUxODY0MDYiCiAgICAgaW5rc2NhcGU6Y3g9IjIyMi4zMjIyNCIKICAgICBpbmtzY2FwZTpjeT0iMjc1LjY5ODMxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSI1NSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcyOTk1IiAvPgogIDxwYXRoCiAgICAgZD0iTSAxODYuMTk4LDUxMi41NjZMIDk5Ljk4MywzMzYuMjg4TDAuMDAsNDMyLjQ4NkwwLjAwLDAuMDAgbCAzMzguODc3LDI1OS4zMThMIDIwMy43OSwyODMuMTUxbCA4Ni4yODUsMTc2LjQyMUwgMTg2LjE5OCw1MTIuNTY2eiBNIDEwOS40MzgsMjgyLjc4NWwgOTEuMjA3LDE4Ni40ODZsIDQ2Ljg1OC0yMy45MDVsLTkxLjEzNy0xODYuMzQybCAxMDUuMjExLTE4LjU2M0wgMzIuMDAsNjQuNzgxbDAuMDAsMjkyLjUxIEwgMTA5LjQzOCwyODIuNzg1eiIKICAgICBpZD0icGF0aDI5OTciIC8+CiAgPHBhdGgKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGQ9Ik0gMTA5LjQzOCwyODIuMjE5IDIwMC42NDUsNDY4LjcwNSAyNDcuNTAzLDQ0NC44IDE1Ni4zNjYsMjU4LjQ1OCAyNjEuNTc3LDIzOS44OTUgMzIsNjQuMjE0OTk3IDMyLDM1Ni43MjUgeiIKICAgICBpZD0icGF0aDI5OTctNCIKICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjIgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+Cjwvc3ZnPgo=);background-size:100% 100%;background-position:center center;-webkit-transition:-webkit-transform ' + (1000 * slowdown) + 'ms ease-in-out;transition:-webkit-transform ' + (1000 * slowdown) + 'ms ease-in-out,-moz-transform ' + (1000 * slowdown) + 'ms ease-in-out,-ms-transform ' + (1000 * slowdown) + 'ms ease-in-out,-o-transform ' + (1000 * slowdown) + 'ms ease-in-out,transform ' + (1000 * slowdown) + 'ms ease-in-out;}';
        style += '.ui-bot-pointer-' + styleID + ':before{content:"";z-index:999999998;position:absolute;top:-11px;left:-11px;border-radius:50%;background-color:#fff;opacity:0;width:22px;height:22px;box-shadow:0 0 0;-webkit-transition:-webkit-transform ' + (1000 * slowdown) + 'ms;transition:-webkit-transform ' + (1000 * slowdown) + 'ms,-moz-transform ' + (1000 * slowdown) + 'ms,-ms-transform ' + (1000 * slowdown) + 'ms,-o-transform ' + (1000 * slowdown) + 'ms,transform ' + (1000 * slowdown) + 'ms;}';
        style += '.ui-bot-pointer-' + styleID + '[data-click]:before{-webkit-animation:ui-bot-pointer-click-' + styleID + ' ' + (500 * slowdown) + 'ms;}';
        style += '@-webkit-keyframes ui-bot-pointer-click-' + styleID + '{from{-webkit-transform:scale(0.1);opacity:0.4;}to{-webkit-transform:scale(3);opacity:0;}}';

        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.setAttribute('id', 'ui-bot-internal-styles-' + styleID);

        var rules = document.createTextNode(style);
        if (styleElement.styleSheet) {// IE
            styleElement.styleSheet.cssText = rules.nodeValue;
        } else {
            styleElement.appendChild(rules);
        }
        var head = document.getElementsByTagName('head')[0];
        if (head) {
            head.appendChild(styleElement);
        }
    } else {
        styleElement = document.getElementById('ui-bot-internal-styles-' + styleID);
    }

    var pointer = null;

    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
    };

    var getElementInformation = function (element) {
        var elementRectangle = element.getBoundingClientRect();
        var bodyRectangle = document.body.getBoundingClientRect();
        return {
            'left': Math.round(elementRectangle.left + Math.abs(bodyRectangle.left)),
            'top': Math.round(elementRectangle.top + Math.abs(bodyRectangle.top)),
            'x': Math.round(elementRectangle.left),
            'y': Math.round(elementRectangle.top),
            'width': Math.round(elementRectangle.width),
            'height': Math.round(elementRectangle.height)
        };
    };

    var getCSSRules = function (pseudo) {
        var result = [];
        var styleSheets = document.styleSheets;
        //console.log(styleSheets);
        var styleSheetsLength = styleSheets.length;
        for (var i = 0; i < styleSheetsLength; i++) {
            var styleSheet = document.styleSheets[i];
            var id = styleSheet.ownerNode.getAttribute('id');
            if (id !== null && id.indexOf('ui-bot-internal-styles-') === 0) {
                continue;
            }
            var rules = styleSheet.cssRules;
            if (rules !== null) {
                var rulesLength = rules.length;
                for (var j = 0; j < rulesLength; j++) {
                    var rule = rules[j];
                    if (typeof rule.selectorText !== 'undefined') {
                        var selector = rule.selectorText;
                        if (selector.indexOf(':' + pseudo) !== -1) {
                            selector.split(',').forEach(function (part) {
                                try {
                                    var selector = part.trim().replace(':' + pseudo, '');
                                    var elements = [];
                                    document.querySelectorAll(selector).forEach(function (element) {
                                        elements.push(element);
                                    });
                                    result.push({'selector': selector, 'cssText': rule.style.cssText, 'elements': elements});
                                } catch (e) {

                                }
                            });
                        }
                    }
                }
            }
        }
        return result;
    };

    var cssTextClassNames = [];
    var getClassNameForCssText = function (cssText) {
        var key = styleID + '-' + cssText;
        for (var i in cssTextClassNames) {
            if (cssTextClassNames[i][0] === key) {
                return cssTextClassNames[i][1];
            }
        }
        var styleSheet = typeof styleElement.styleSheet !== 'undefined' ? styleElement.styleSheet : styleElement.sheet;
        var cssRulesLength = styleSheet.cssRules.length;
        var className = 'uibot-generated-class-' + cssRulesLength;
        styleSheet.insertRule('.' + className + "{" + cssText + "}", cssRulesLength);
        cssTextClassNames.push([key, className]);
        return className;
    };

    var getElementsUnderPointer = function (parentsOnly) {
        if (typeof parentsOnly === 'undefined') {
            parentsOnly = false;
        }
        var position = getElementInformation(pointer);
        var result = [];
        var elements = document.elementsFromPoint(position.x, position.y);
        var elementsLength = elements.length;
        for (var i = 0; i < elementsLength; i++) {
            var element = elements[i];
            if (element !== pointer) {
                result.push(element);
                if (parentsOnly && element === document.body) {
                    break;
                }
            }
        }
        return result;
    };

    var setPointerPosition = function (left, top, next, transitionDuration) {
        if (typeof transitionDuration === 'undefined') {
            transitionDuration = null;
        }
        if (transitionDuration === null) {
            var pointerInformation = getElementInformation(pointer);
            var viewportSize = getViewportSize();
            var maxViewportDistance = Math.max(viewportSize.width, viewportSize.height); // max distance should be travelled in 3 seconds
            var getDistance = function (x1, y1, x2, y2) {
                return Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
            };
            transitionDuration = getDistance(left, top, pointerInformation.left, pointerInformation.top) / maxViewportDistance * 3000 * slowdown + 500 * slowdown;
        }

        var transitionDurationValue = window.getComputedStyle(pointer).transitionDuration.split(',');
        for (var i in transitionDurationValue) {
            transitionDurationValue[i] = transitionDuration + 'ms';
        }
        var pointerStyle = pointer.style;
        pointerStyle.transitionDuration = transitionDurationValue.join(',');
        requestAnimationFrame(function () {
            var transformValue = 'translateX(' + left + 'px) translateY(' + top + 'px)';
            pointerStyle.setProperty('-webkit-transform', transformValue);
            pointerStyle.setProperty('-moz-transform', transformValue);
            pointerStyle.setProperty('-ms-transform', transformValue);
            pointerStyle.setProperty('-o-transform', transformValue);
            pointerStyle.setProperty('transform', transformValue);

            if (typeof next !== 'undefined') {
                setTimeout(next, transitionDuration === 0 ? 0 : transitionDuration + 500 * slowdown);
            }
        });
    };

    var showPointerClick = function (next) {
        pointer.setAttribute('data-click', '1');
        setTimeout(function () {
            pointer.removeAttribute('data-click');
            next();
        }, 1000 * slowdown);
    };

    var getViewportSize = function () {
        if (typeof (window.innerWidth) === 'number') {
            return {'width': window.innerWidth, 'height': window.innerHeight};
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            return {'width': document.documentElement.clientWidth, 'height': document.documentElement.clientHeight};
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            return {'width': document.body.clientWidth, 'height': document.body.clientHeight};
        }
        return {'width': 0, 'height': 0};
    };

    var scrollElement = function (element, x, y, callback) {
        var freezePointer = element === document.body;
        if (freezePointer) {
            var pointerInformation = getElementInformation(pointer);
            pointer.style.setProperty('margin-top', (pointerInformation.y - pointerInformation.top) + 'px');
            pointer.style.setProperty('margin-left', (pointerInformation.x - pointerInformation.left) + 'px');
            pointer.style.position = 'fixed';
        }
        var viewportSize = getViewportSize();
        var maxViewportDistance = Math.max(viewportSize.width, viewportSize.height); // max distance should be travelled in 3 seconds
        var elementInformation = getElementInformation(element);
        var tempElement = document.createElement('div');
        tempElement.style.width = '0';
        tempElement.style.height = '0';
        //tempElement.style.backgroundColor = 'red';
        element.appendChild(tempElement);
        var tempElementInformation = getElementInformation(tempElement);
        var startX = Math.abs(elementInformation.x) + element.scrollLeft;
        var startY = Math.abs(elementInformation.y) + element.scrollTop;
        var distance = Math.max(Math.abs(startX - x), Math.abs(startY - y));
        var animationTime = distance / maxViewportDistance * 3000 * slowdown + 500 * slowdown;
        tempElement.style.transform = 'translateX(' + -(tempElementInformation.x - elementInformation.x + element.scrollLeft - startX) + 'px) translateY(' + -(tempElementInformation.y - elementInformation.y + element.scrollTop - startY) + 'px)';
        requestAnimationFrame(function () {
            tempElement.style.transition = 'all ' + animationTime + 'ms';
            var done = false;
            requestAnimationFrame(function () {
                tempElement.style.transform = 'translateX(' + -(tempElementInformation.x - elementInformation.x + element.scrollLeft - x) + 'px) translateY(' + -(tempElementInformation.y - elementInformation.y + element.scrollTop - y) + 'px)';
                setTimeout(function () {
                    done = true;
                    tempElement.parentNode.removeChild(tempElement);
                    if (freezePointer) {
                        var pointerInformation = getElementInformation(pointer);
                        pointer.style.removeProperty('margin-top');
                        pointer.style.removeProperty('margin-left');
                        pointer.style.position = 'absolute';
                        setPointerPosition(pointerInformation.left, pointerInformation.top, callback, 0);
                    } else {
                        callback();
                    }
                }, animationTime);
                var update = function () {
                    tempElement.scrollIntoView();
                    if (!done) {
                        requestAnimationFrame(update);
                    }
                };
                requestAnimationFrame(update);
            });
        });
    };

    var isElementVisible = function (element) {
        var viewportSize = getViewportSize();
        var elementInformation = getElementInformation(element);
        var result = elementInformation.x >= 0
                && elementInformation.x + elementInformation.width <= viewportSize.width
                && elementInformation.y >= 0
                && elementInformation.y + elementInformation.height <= viewportSize.height;
        return result;
    };

    var scrollElementIntoView = function (element, callback) {

        var checkParent = function (parent) {
            if (parent !== null && typeof parent.tagName !== 'undefined' && parent.tagName.toLowerCase() !== 'html') {
                if (parent.scrollHeight !== parent.clientHeight || parent.tagName.toLowerCase() === 'body') {
                    var viewportSize = getViewportSize();
                    var parentElementInformation = getElementInformation(parent);
                    var elementInformation = getElementInformation(element);
                    var x = elementInformation.x - parentElementInformation.x - (viewportSize.width - elementInformation.width) / 2 + parent.scrollLeft;
                    if (x < 0) {
                        x = 0;
                    }
                    var y = elementInformation.y - parentElementInformation.y - (viewportSize.height - elementInformation.height) / 2 + parent.scrollTop;
                    if (y < 0) {
                        y = 0;
                    }
                    scrollElement(parent, x, y, function () {
                        if (isElementVisible(element)) {
                            callback();
                        } else {
                            checkParent(parent.parentNode);
                        }
                    });
                } else {
                    checkParent(parent.parentNode);
                }
            } else {
                callback();
            }
        };
        if (isElementVisible(element)) {
            callback();
        } else {
            checkParent(element.parentNode);
        }
    };

    var click = function () {
        var position = getElementInformation(pointer);
        pointer.style.display = 'none';
        var element = document.elementFromPoint(position.x, position.y);
        pointer.style.display = 'block';
        if (element !== null) {
            element.dispatchEvent(new MouseEvent('click', {
                view: window,
                target: element,
                bubbles: true,
                cancelable: true,
                clientX: position.x,
                clientY: position.y
            }));
        }
        var activeCSSRules = getCSSRules('active');
        var elementsUnderPointer = getElementsUnderPointer(true);
        elementsUnderPointer.forEach(function (element) {
            var addedClassNames = [];
            for (var i in activeCSSRules) {
                if (activeCSSRules[i].elements.indexOf(element) !== -1) {
                    var className = getClassNameForCssText(activeCSSRules[i].cssText);
                    element.classList.add(className);
                    addedClassNames.push(className);
                }
            }
            if (addedClassNames.length > 0) {
                setTimeout(function () {
                    addedClassNames.forEach(function (className) {
                        element.classList.remove(className);
                    });
                }, 150 * slowdown);
            }
        });
    };

    var done = false;

    var actions = [];
    var nextIndex = 0;
    var started = false;

    var start = function () {
        if (started === true) {
            return;
        }
        started = true;
        setTimeout(function () {

            pointer = document.createElement('div');
            pointer.setAttribute('class', 'ui-bot-pointer-' + styleID);
            document.body.appendChild(pointer);
            var bodyInformation = getElementInformation(document.body);
            setPointerPosition(100 - bodyInformation.x, 100 - bodyInformation.y, null, 0);

            var hoveredElements = [];
            var update = function () {
                var hoverCSSRules = null;
                var elementsUnderPointer = getElementsUnderPointer(true);
                elementsUnderPointer.forEach(function (element) {
                    if (hoveredElements.indexOf(element) === -1) {
                        if (hoverCSSRules === null) {
                            hoverCSSRules = getCSSRules('hover');
                        }
                        hoveredElements.push(element);
                        for (var i in hoverCSSRules) {
                            if (hoverCSSRules[i].elements.indexOf(element) !== -1) {
                                var className = getClassNameForCssText(hoverCSSRules[i].cssText);
                                element.classList.add(className);
                            }
                        }
                        element.dispatchEvent(new Event('mouseover'));
                    }
                });
                hoveredElements.forEach(function (overElement) {
                    if (elementsUnderPointer.indexOf(overElement) === -1) {
                        hoveredElements.splice(hoveredElements.indexOf(overElement), 1);
                        overElement.classList.forEach(function (className) {
                            if (className.indexOf('uibot-generated-class-') === 0) {
                                overElement.classList.remove(className);
                            }
                        });
                        overElement.dispatchEvent(new Event('mouseout'));
                    }
                });
                if (!done) {
                    requestAnimationFrame(update);
                }
            };
            update();

            execute(0);
        }, startDelay * 1000);
    };

    var execute = function (index) {
        if (index === nextIndex) {
            if (typeof actions[index] !== 'undefined') {
                nextIndex++;
                var action = actions[index];
                var getCurrentValue = function (value) {
                    if (typeof value === 'function') {
                        return value();
                    }
                    return value;
                }
                var next = function () {
                    setTimeout(function () {
                        execute(nextIndex);
                    }, 300 * slowdown);
                };
                if (action.type === 'moveTo') {
                    var left = getCurrentValue(action.left);
                    var top = getCurrentValue(action.top);
                    setPointerPosition(left, top, next);
                } else if (action.type === 'click') {
                    showPointerClick(next);
                    click();
                } else if (action.type === 'wait') {
                    var seconds = getCurrentValue(action.seconds);
                    setTimeout(next, seconds * 1000 * slowdown);
                } else if (action.type === 'moveToElement') {
                    var element = getCurrentValue(action.element);
                    var elementsUnderPointer = getElementsUnderPointer();
                    if (elementsUnderPointer.indexOf(element) !== -1) {
                        next();
                    } else {
                        scrollElementIntoView(element, function () {
                            var pointerInformation = getElementInformation(pointer);
                            var elementInformation = getElementInformation(element);
                            var left = elementInformation.left;
                            var top = elementInformation.top;
                            var offsetLeft = Math.min(Math.max(elementInformation.width / 5, 17), elementInformation.width / 2);
                            var offsetTop = Math.min(Math.max(elementInformation.height / 5, 17), elementInformation.height / 2);

                            var isLeft = pointerInformation.left <= elementInformation.left;
                            var isRight = pointerInformation.left >= elementInformation.left + elementInformation.width;
                            var isTop = pointerInformation.top < elementInformation.top;

                            if (isLeft || isRight) {
                                left += isLeft ? offsetLeft : elementInformation.width - offsetLeft;
                                if (pointerInformation.top <= elementInformation.top) { // top
                                    top += offsetTop;
                                } else if (pointerInformation.top >= elementInformation.top + elementInformation.height) { // bottom
                                    top += elementInformation.height - offsetTop;
                                } else {
                                    top = Math.min(Math.max(pointerInformation.top, elementInformation.top + offsetTop), elementInformation.top + elementInformation.height - offsetTop);
                                }
                            } else {
                                top += isTop ? offsetTop : elementInformation.height - offsetTop;
                                if (pointerInformation.left <= elementInformation.left) { // top
                                    left += offsetLeft;
                                } else if (pointerInformation.left >= elementInformation.left + elementInformation.width) { // bottom
                                    left += elementInformation.width - offsetLeft;
                                } else {
                                    left = Math.min(Math.max(pointerInformation.left, elementInformation.left + offsetLeft), elementInformation.left + elementInformation.width - offsetLeft);
                                }
                            }
                            setPointerPosition(left, top, next);
                        });
                    }
//            } else if (action.type === 'clickElement') {
//                var element = getCurrentValue(action.element);
//                showPointerClick(next);
//                setTimeout(function () {
//                    element.click();
//                }, 50 * slowdown);
                } else if (action.type === 'focusElement') {
                    var element = getCurrentValue(action.element);
                    element.focus();
                    next();
                } else if (action.type === 'writeInElement') {
                    var element = getCurrentValue(action.element);
                    var text = getCurrentValue(action.text);
                    var writeFunction = typeof action.writeFunction !== 'undefined' ? action.writeFunction : null;
                    var setText = function (text) {
                        if (writeFunction === null) {
                            element.value = text;
                        } else {
                            writeFunction(text);
                        }
                    };
                    var counter = 0;
                    var interval = null;
                    var write = function () {
                        counter++;
                        if (counter >= text.length) {
                            setText(text);
                            clearInterval(interval);
                        } else {
                            setText(text.substring(0, counter));
                        }
                    };
                    setText('');
                    interval = setInterval(write, 300 / text.length * slowdown);
                    setTimeout(function () {
                        next();
                    }, 1000 * slowdown);
                } else if (action.type === 'call') {
                    action.callbackFunction(next);
                }
            } else {
                done = true;
            }
        }
    };

    this.moveTo = function (left, top) {
        actions.push({'type': 'moveTo', 'left': left, 'top': top});
        start();
        return this;
    };

    this.click = function () {
        actions.push({'type': 'click'});
        start();
        return this;
    };

    this.wait = function (seconds) {
        actions.push({'type': 'wait', 'seconds': seconds});
        start();
        return this;
    };

    this.moveToElement = function (element) {
        actions.push({'type': 'moveToElement', 'element': element});
        start();
        return this;
    };

//    this.clickElement = function (element) {
//        actions.push({'type': 'clickElement', 'element': element});
//        start();
//        return this;
//    };

    this.focusElement = function (element) {
        actions.push({'type': 'focusElement', 'element': element});
        start();
        return this;
    };

    this.writeInElement = function (element, text, writeFunction) {
        actions.push({'type': 'writeInElement', 'element': element, 'text': text, 'writeFunction': writeFunction});
        start();
        return this;
    };

    this.moveToElementAndClick = function (element) {
        this.moveToElement(element);
        //this.clickElement(element);
        this.click();
        start();
        return this;
    };

    this.moveToElementAndFocus = function (element) {
        this.moveToElement(element);
        //this.clickElement(element);
        this.click();
        this.focusElement(element); // todo remove because the click should focus
        start();
        return this;
    };

    this.moveToElementAndWrite = function (element, text) {
        this.moveToElement(element);
        //this.clickElement(element);
        this.click();
        this.writeInElement(element, text);
        start();
        return this;
    };

    this.call = function (callbackFunction) {
        actions.push({'type': 'call', 'callbackFunction': callbackFunction});
        start();
        return this;
    };

};
