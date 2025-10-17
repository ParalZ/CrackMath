document.addEventListener("DOMContentLoaded", () => {
  let count = 0;

  // Select all h2 elements
  document.querySelectorAll("h2").forEach(h2 => {
    const text = h2.textContent.trim(); // get pure text to match

    if (text !== "Przykład" && text !== "") {
      count++;
      h2.textContent = `${count}) ${text}`;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let counter = 0;
  // Select all h2 elements
  document.getElementById("zadania").querySelectorAll("h2").forEach(h2 => {
    counter++;
    h2.textContent = `Zadanie ${counter}`;
    h2.style.display = "grid";
  });
});