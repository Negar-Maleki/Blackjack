export function hide(cssClass) {
  document
    .querySelectorAll(cssClass)
    .forEach((ele) => ele.classList.add("hidden"));
}
export function unhide(cssClass) {
  document
    .querySelectorAll(cssClass)
    .forEach((ele) => ele.classList.remove("hidden"));
}

export function activate(element) {
  element.classList.remove("inactive-player");
  element.classList.add("active-player");
}
export function deactivate(element) {
  element.classList.remove("active-player");
  element.classList.add("inactive-player");
}

export function getElement(classPath) {
  let element = document.querySelector(classPath[0]);

  for (let i = 1; i < classPath.length; i++) {
    element = element.querySelector(classPath[i]);
  }

  return element;
}
