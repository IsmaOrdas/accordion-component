import toDOMNode from "./utils";

export default class Accordion {
    accordionElement: ChildNode;
    placeholder: Element | null;
    defaultHeight: number;
    labelCssClass: string;
    openCssClass: string;

    constructor(placeholder: Element | null) {
        if (typeof placeholder === "undefined" || placeholder === null) {
            console.error("Accordion placeholder does not exist");
            return;
        }

        this.placeholder = placeholder;
        this.defaultHeight = 40;
        this.labelCssClass = "c-accordion__label";
        this.openCssClass = "c-accordion__item--open";
        this.init();
    }

    init() {
        this.createAppendDomElement();
        this.events();
    }

    createAppendDomElement() {
        this.accordionElement = toDOMNode(accordionTemplate(dummyData));
        this.placeholder.appendChild(this.accordionElement);
    }

    events() {
        if (this.accordionElement) {
            this.accordionElement.addEventListener("click", (ev) => {
                this.toggleHeight(ev.target);
            });
        } else {
            console.warn("Accordion was not created.");
        }
    }

    toggleHeight(el) {
        const target = el;
        const targetParent = target.parentElement;
        let elHeight = this.defaultHeight;

        if (target.classList.contains(this.labelCssClass)) {

            if (targetParent.classList.contains(this.openCssClass)) {
                targetParent.style.height = `${elHeight}px`;
            } else {
                elHeight = `${target.nextElementSibling.offsetHeight + elHeight}px`;
                targetParent.style.height = elHeight;
            }

            targetParent.classList.toggle(this.openCssClass);
        }
    }

}

const accordionTemplate = (data) =>
    `<div class="c-accordion">
        <ul class="c-accordion__list">
            ${dummyData.list.length ? dummyData.list.map((el) => accordionItemTemplate(el)).join("") : "<li>no content</li>"}
        </ul>
    </div>`;

const accordionItemTemplate = (obj) => 
    `<li class="c-accordion__item">
    <span class="c-accordion__label">
        <span class="c-accordion__item-title">${obj.itemTitle}</span>
    </span>
    <p class="c-accordion__copy">${obj.copy}</p>
    </li>`;

const dummyData = {
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