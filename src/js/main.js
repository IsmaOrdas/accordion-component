import Accordion from "./components/c-accordion";

document.addEventListener("DOMContentLoaded", () => {
    const accordionPlaceholder = document.querySelector(".accordion-placeholder");
    new Accordion(accordionPlaceholder);
});