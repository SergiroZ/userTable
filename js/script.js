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
    const modalHeader = createDomElement('div', 'modal-h2');

    modalOverlay.appendChild(modalWrapper);
    modalWrapper.appendChild(wndModal);


    const entryFields = createDomElement('div', 'entry-modal');
    modalHeader.innerText = 'Entry fields:';
    wndModal.appendChild(modalHeader);
    wndModal.appendChild(entryFields);

    const formForm = createDomElement('form', 'entry-modal');
    entryFields.appendChild(formForm);
    const fieldsetForm = createDomElement('fieldset');
    formForm.appendChild(fieldsetForm);
    const legendForm = createDomElement('legend', '', ' Personal data ');
    fieldsetForm.appendChild(legendForm);

    const input_p__FirstName = createDomElement('p');
    fieldsetForm.appendChild(input_p__FirstName);
    const label_FirstName = createDomElement('label', 'field-inform', 'First Name: ');
    input_p__FirstName.appendChild(label_FirstName);
    const input__FirstName = createDomElement('input', 'input-style');
    input_p__FirstName.appendChild(input__FirstName);
    input__FirstName.name = 'FirstName';
    input__FirstName.type = 'text';

    const input_p__LastName = createDomElement('p');
    fieldsetForm.appendChild(input_p__LastName);
    const label_LastName = createDomElement('label', 'field-inform', 'Last Name: ');
    input_p__LastName.appendChild(label_LastName);
    const input__LastName = createDomElement('input', 'input-style');
    input_p__LastName.appendChild(input__LastName);
    input__LastName.name = 'LastName';
    input__LastName.type = 'text';

    const input_p__phone = createDomElement('p');
    fieldsetForm.appendChild(input_p__phone);
    const label_phone = createDomElement('label', 'field-inform', 'Phone: ');
    input_p__phone.appendChild(label_phone);
    const input__phone = createDomElement('input', 'input-style');
    input_p__phone.appendChild(input__phone);
    input__phone.name = 'phone';
    input__phone.type = 'text';

    const input_p__email = createDomElement('p');
    fieldsetForm.appendChild(input_p__email);
    const label_email = createDomElement('label', 'field-inform', 'E-mail: ');
    input_p__email.appendChild(label_email);
    const input__email = createDomElement('input', 'input-style');
    input_p__email.appendChild(input__email);
    input__email.name = 'email';
    input__email.type = 'text';

    const input_p__salary = createDomElement('p');
    fieldsetForm.appendChild(input_p__salary);
    const label_salary = createDomElement('label', 'field-inform', 'Salary: ');
    input_p__salary.appendChild(label_salary);
    const input__salary = createDomElement('input', 'input-style');
    input_p__salary.appendChild(input__salary);
    input__salary.name = 'salary';
    input__salary.type = 'float';


    wndModal.appendChild(closeModal);


    document.body.appendChild(modalOverlay);

    // !!!! TO DO
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
                if ($(this).data("blur-value") !== v) {
                    if (v === 0) {
                        $(this).toggleBlur(false);
                    } else {
                        $(this).toggleBlur(true);

                        blur.firstElementChild.setAttribute("stdDeviation", v + ",0");
                        $(this).data("blur-value", v);
                    }
                }
            };
            $.fn.initBlur = function (_multiplier) {
                if (typeof _multiplier === "undefined") _multiplier = 0.25;
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
                if (typeof stopDelay === "undefined") {
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

            let tmpClassName;
            $(bt).click(function () {
                tmpClassName = bt.className;
                bt.className = 'bt-dis';
                bt.disabled = true;
                openModal();
            });

            $(".close-modal").click(function () {
                closeModal();
                bt.disabled = false;
                bt.className = tmpClassName;
            });

            $modal.initBlur(0.5);

        })
    }

    /************************************************/


    /*    // Показать полупрозрачный DIV, затеняющий всю страницу
        // (а форма будет не в нем, а рядом с ним, чтобы не полупрозрачная)
        function showCover() {
            var coverDiv = document.createElement('div');
            coverDiv.className = 'cover-div';
            wndModal.appendChild(coverDiv);
        }

        function hideCover() {
            document.body.removeChild(document.getElementsByClassName('cover-div'));
        }*/


    function showPrompt(text, callback) {
        //showCover();
        var form = document.getElementsByClassName('.prompt-form');
        var container = document.getElementsByClassName('.prompt-form-container');
        document.getElementsByClassName('.prompt-message').innerHTML = text;
        form.elements.text.value = '';

        function complete(value) {
            //hideCover();
            container.style.display = 'none';
            document.onkeydown = null;
            callback(value);
        }

        form.onsubmit = function () {
            var value = form.elements.text.value;
            if (value === '') return false; // игнорировать пустой submit

            complete(value);
            return false;
        };

        form.elements.cancel.onclick = function () {
            complete(null);
        };

        document.onkeydown = function (e) {
            if (e.keyCode === 27) { // escape
                complete(null);
            }
        };

        var lastElem = form.elements[form.elements.length - 1];
        var firstElem = form.elements[0];

        lastElem.onkeydown = function (e) {
            if (e.keyCode === 9 && !e.shiftKey) {
                firstElem.focus();
                return false;
            }
        };

        firstElem.onkeydown = function (e) {
            if (e.keyCode === 9 && e.shiftKey) {
                lastElem.focus();
                return false;
            }
        };


        container.style.display = 'block';
        form.elements.text.focus();
    }

};