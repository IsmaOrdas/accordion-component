import './style.css'
import Accordion from "./components/accordion";

document.addEventListener("DOMContentLoaded", () => {
  const accordionPlaceholder = document.querySelector(".accordion-placeholder");
  new Accordion(accordionPlaceholder);
});
