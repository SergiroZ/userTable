"use strict";
window.onload = function () {

    const titleTable = createDomElement('div', 'tbTitle tbStyle', 'Users table.');
    document.body.appendChild(titleTable);

    const table = createDomElement('table', 'tbUser');
    const bt = createDomElement('button', 'bt');
    const btFraming = createDomElement('div', 'btAdd', 'New User');
    const btFilling = createDomElement('div', 'animation1');

    bt.appendChild(btFraming);
    btFraming.appendChild(btFilling);
    document.body.appendChild(bt);

    const modalOverlay = createDomElement('div', 'modal-overlay');
    const modalWrapper = createDomElement('div', 'modal-wrapper');
    const wndModal = createDomElement('div', 'modal');
    const closeModal = createDomElement('button', 'close-modal', 'x');

    modalOverlay.appendChild(modalWrapper);
    modalWrapper.appendChild(wndModal);
    wndModal.appendChild(closeModal);
    document.body.appendChild(modalOverlay);

    //wndModal.appendChild


    //document.body.appendChild(table);

    /************************************************************************************/

    function createDomElement(
        elem,
        className = "",
        text      = "",
        eventType = "",
        eventFun) {
        const newElem = document.createElement(elem);
        if (className !== "") {
            newElem.className = className;
        }

        if (eventType !== "") {
            newElem.addEventListener(eventType, eventFun);
        }

        newElem.innerHTML = text;

        return newElem;
    }

    /*Modal motion*/
    {
        (function () {
            let minBlur               = 2,
                maxBlur               = 200,
                isUpdatingBlur        = false,
                updateBlurStopTimeout = null,
                multiplier            = 0.25
            ;

            $.fn.toggleBlur = function (v) {
                const blurId = $(this).data("blur-id");
                const value = v ? "url(#" + blurId + ")" : "none";
                $(this).css({
                    webkitFilter: value,
                    filter: value
                });
            };
            $.fn.setBlur = function (v) {
                const blur = $(this).data("blur");
                v = Math.round(v);
                if ($(this).data("blur-value") != v) {
                    if (v == 0) {
                        $(this).toggleBlur(false);
                    } else {
                        $(this).toggleBlur(true);

                        blur.firstElementChild.setAttribute("stdDeviation", v + ",0");
                        $(this).data("blur-value", v);
                    }
                }
            };
            $.fn.initBlur = function (_multiplier) {
                if (typeof _multiplier == "undefined") _multiplier = 0.25;
                multiplier = _multiplier;
                var defs = $(".filters defs").get(0);
                var blur = $("#blur").get(0);
                $(this).each(function (i) {
                    var blurClone = blur.cloneNode(true);
                    var blurId = "blur" + i;
                    blurClone.setAttribute("id", blurId);
                    defs.appendChild(blurClone);
                    $(this)
                        .data("blur", blurClone)
                        .data("blur-id", blurId)
                        .data("blur-value", 0)
                        .data("last-pos", $(this).offset())
                    ;
                });
            };

            $.updateBlur = function () {
                $(".js-blur").each(function () {
                    var pos = $(this).offset();
                    var lastPos = $(this).data("last-pos");
                    var v = Math.abs(pos.left - lastPos.left) * multiplier;
                    $(this).data("last-pos", pos);
                    $(this).setBlur(v);
                });
                if (isUpdatingBlur) {
                    requestAnimationFrame($.updateBlur);
                }
            };
            $.startUpdatingBlur = function (stopDelay) {
                if (typeof stopDelay == "undefined") {
                    stopDelay = -1;
                }
                if (updateBlurStopTimeout != null) {
                    clearTimeout(updateBlurStopTimeout);
                    updateBlurStopTimeout = null;
                }
                if (!isUpdatingBlur) {
                    isUpdatingBlur = true;
                    $.updateBlur();
                }
                if (stopDelay > -1) {
                    updateBlurStopTimeout = setTimeout($.stopUpdatingBlur, stopDelay);
                }
            };
            $.stopUpdatingBlur = function () {
                isUpdatingBlur = false;
            }
        })();

        // Modal Window
        $(document).ready(function () {
            let $modal         = $(".modal"),
                $overlay       = $(".modal-overlay"),
                blocked        = false,
                unblockTimeout = null
            ;

            TweenMax.set($modal, {
                autoAlpha: 0
            });

            const isOpen = false;

            function openModal() {
                if (!blocked) {
                    block(400);

                    TweenMax.to($overlay, 0.3, {
                        autoAlpha: 1
                    });

                    TweenMax.fromTo($modal, 0.5, {
                        x: (-$(window).width() - $modal.width()) / 2 - 50,
                        scale: 0.9,
                        autoAlpha: 1
                    }, {
                        delay: 0.1,
                        rotationY: 0,
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        z: 0,
                        ease: Elastic.easeOut,
                        easeParams: [0.4, 0.3],
                        force3D: false
                    });
                    $.startUpdatingBlur(800);
                }
            }

            function closeModal() {
                if (!blocked) {
                    block(400);
                    TweenMax.to($overlay, 0.3, {
                        delay: 0.3,
                        autoAlpha: 0
                    });
                    TweenMax.to($modal, 0.3, {
                        x: ($(window).width() + $modal.width()) / 2 + 100,
                        scale: 0.9,
                        ease: Quad.easeInOut,
                        force3D: false,
                        onComplete: function () {
                            TweenMax.set($modal, {
                                autoAlpha: 0
                            });
                        }
                    });
                    $.startUpdatingBlur(400);
                }
            }

            function block(t) {
                blocked = true;
                if (unblockTimeout != null) {
                    clearTimeout(unblockTimeout);
                    unblockTimeout = null;
                }
                unblockTimeout = setTimeout(unblock, t);
            }

            function unblock() {
                blocked = false;
            }

            let tmp;

            $(bt).click(function () {
                tmp = bt.className;
                bt.className = 'bt-dis';
                bt.disabled = true;
                openModal();
            });

            $(".close-modal,.modal-overlay").click(function () {
                closeModal();
                bt.disabled = false;
                bt.className = tmp;
            });

            $modal.initBlur(0.5);

        })
    }

    /************************************************/


};