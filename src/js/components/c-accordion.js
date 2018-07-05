import toDOMNode from "../utils/dom";

export default class Accordion {
    constructor(placeholder) {
        if (typeof placeholder === "undefined" || placeholder === null) {
            console.error("Accordion placeholder does not exist");
            return;
        }

        this._placeholder = placeholder;
        this._defaultHeight = 40;
        this._labelCssClass = "c-accordion__label";
        this._accordionOpenCssClass = "c-accordion__item--open";
        this._init();
    }

    _init() {
        this._createAppendDomElement();
        this._events();
    }

    _createAppendDomElement() {
        this._accordionEl = toDOMNode(accordionTemplate(dummyData));
        this._placeholder.appendChild(this._accordionEl);
    }

    _events() {
        if (this._accordionEl) {
            this._accordionEl.addEventListener("click", (ev) => {
                this._toggleHeight(ev.target);
            });
        } else {
            console.warn("Accordion was not created.");
        }
    }

    _toggleHeight(el) {
        const target = el;
        const targetParent = target.parentElement;
        let elHeight = this._defaultHeight;

        if (target.classList.contains(this._labelCssClass)) {

            if (targetParent.classList.contains(this._accordionOpenCssClass)) {
                targetParent.style.height = `${elHeight}px`;
            } else {
                elHeight = `${target.nextElementSibling.offsetHeight + elHeight}px`;
                targetParent.style.height = elHeight;
            }

            targetParent.classList.toggle(this._accordionOpenCssClass);
        }
    }

}

const accordionTemplate = (data) =>
    `<div class="c-accordion">
        <span class="c-accordion__title">${data.title}</span>
        <ul class="c-accordion__list">
            ${dummyData.list.map((el) => accordionItemTemplate(el)).join("")}
        </ul>
    </div>`;

const accordionItemTemplate = (obj) => 
    `<li class="c-accordion__item">
    <span class="c-accordion__label">
        <img src="img/chevron-right.png" srcset="img/chevron-right@2x.png 2x, img/chevron-right@3x.png 3x" class="c-accordion__chevron c-accordion__chevron--right" alt="" longdesc="arrow icon for accordion" />
        <span class="c-accordion__item-title">${obj.itemTitle}</span>
    </span>
    <p class="c-accordion__copy">${obj.copy}</p>
    </li>`;

const dummyData = {
    title: "title",
    list: [
    {
        copy: "Snackwave post-ironic gastropub poutine. Artisan pinterest mixtape aesthetic godard, vaporware kickstarter edison bulb mumblecore +1 irony cloud bread adaptogen. Microdosing flannel PBR&B 8-bit brunch adaptogen. Bushwick adaptogen polaroid organic ennui.",
        itemTitle: "label"
    },
    {
        title: "title",
        copy: "Snackwave post-ironic gastropub poutine. Artisan pinterest mixtape aesthetic godard, vaporware kickstarter edison bulb mumblecore +1 irony cloud bread adaptogen. Microdosing flannel PBR&B 8-bit brunch adaptogen. Bushwick adaptogen polaroid organic ennui.",
        itemTitle: "label"
    },
    {
        title: "title",
        copy: "Snackwave post-ironic gastropub poutine. Artisan pinterest mixtape aesthetic godard, vaporware kickstarter edison bulb mumblecore +1 irony cloud bread adaptogen. Microdosing flannel PBR&B 8-bit brunch adaptogen. Bushwick adaptogen polaroid organic ennui.",
        itemTitle: "label"
    }]
};