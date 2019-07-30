const aboutBtn = document.querySelector("#about-btn")
const codeBtn = document.querySelector("#code-btn")
const aboutModal = document.querySelector("#about-modal")
const codeModal = document.querySelector("#code-modal")
let aboutClose = document.querySelector("#about-close")
let codeClose = document.querySelector("#code-close")


aboutBtn.addEventListener("click", e => {
  aboutModal.style.display = "block"
})

codeBtn.addEventListener("click", e => {
  codeModal.style.display = "block"
})

aboutClose.addEventListener("click", () => {
  aboutModal.style.display = "none"
})

codeClose.addEventListener("click", () => {
  codeModal.style.display = "none"
})
