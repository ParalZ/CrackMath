console.log("--- LAYOUT IS RUNNING ---");
  const zadaniaSectionHTML = `
    <div id="zadania-section">
        <hr>
        <h1>Zadania</h1>
        <div id="zadania"></div>
        <hr>
    </div>
  `;

  // Insert at the beginning of <body>
document.body.insertAdjacentHTML("beforeend", zadaniaSectionHTML);
