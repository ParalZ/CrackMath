//adding dynamically the counter to each section of the theory
document.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  const theorySection = document.getElementById("theory-section");
  if(!theorySection) return;
  // Select all h2 elements
  theorySection.querySelectorAll("h2").forEach(h2 => {
    const text = h2.textContent.trim(); // get pure text to match

    if (text !== "Przykład" && text !== "") {
      count++;
      h2.textContent = `${count}) ${text}`;
    }
  });
});

//adding counter to each zadanie
function numberZadaniaHeadings(){
  let counter = 0;
  // Select all h2 elements
  const zadaniaSection = document.getElementById("zadania");
  if(!zadaniaSection) return;
  zadaniaSection.querySelectorAll("h2").forEach(h2 => {
    counter++;
    const numberSpan = h2.querySelector(".zadanie-number");
    if(numberSpan){
      numberSpan.textContent = `Zadanie ${counter}`;
    }
    h2.style.display = "flex";
  });
}