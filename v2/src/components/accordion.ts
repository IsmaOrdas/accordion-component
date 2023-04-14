import toDOMNode from "../utils";
import { dummyData } from "../data";

interface IDataItem {
    copy: string;
    itemTitle: string;
}

interface IData {
    list: IDataItem[];
}

export default class Accordion {
    private accordionElement: ChildNode;
    private placeholder: Element;
    private defaultHeight: string;
    private readonly labelCssClass: string = "c-accordion__label";
    private readonly openCssClass: string = "c-accordion__item--open";

    constructor(placeholder: Element) {
        this.placeholder = placeholder;
        this.defaultHeight = "40px";
        this.init();
    }

    init() {
        if (typeof this.placeholder === "undefined" || this.placeholder === null) {
            console.error("Accordion placeholder does not exist");
            return;
        }

        this.createAppendDomElement();
        this.events();
    }

    createAppendDomElement() {
        this.accordionElement = toDOMNode(accordionTemplate(dummyData));
        this.placeholder?.appendChild(this.accordionElement);
    }

    events() {
        if (!this.accordionElement) {
            console.warn("Accordion was not created.");
        }
        
        this.accordionElement.addEventListener("click", (ev) => {
            this.toggleHeight(ev.target as HTMLElement);
        });
    }

    toggleHeight(el: HTMLElement) {
        const target = el;
        const targetParent = target.parentElement;
        let elHeight = this.defaultHeight;

        if (!target.classList.contains(this.labelCssClass)) {
            return;
        }

        if (targetParent?.classList.contains(this.openCssClass)) {
            targetParent.style.height = `${elHeight}px`;
        } else {
            elHeight = `${target?.nextElementSibling?.offsetHeight + elHeight}px`;
            targetParent.style.height = elHeight;
        }

        targetParent?.classList.toggle(this.openCssClass);
    }

}

const accordionTemplate = (data: IData) =>
    `<div class="c-accordion">
        <ul class="c-accordion__list">
            ${data.list.length ? data.list.map((el) => accordionItemTemplate(el)).join("") : "<li>no content</li>"}
        </ul>
    </div>`;

const accordionItemTemplate = (obj: IDataItem) => 
    `<li class="c-accordion__item">
    <span class="c-accordion__label">
        <span class="c-accordion__item-title">${obj.itemTitle}</span>
    </span>
    <p class="c-accordion__copy">${obj.copy}</p>
    </li>`;
