console.log("--- LAYOUT IS RUNNING ---");
  const dashboardHTML = `
    <div class="dashboard">
      <a href="../../../index.html">Matura Podstawowa 2026</a>
      <a href="#zadania-section" class="jump-btn">Przejdź do sekcji "Zadania"</a>
    </div>
    <div class="footer-bar">
      <a href="../../to_be_developed.html">Poprzednia Strona</a>
      <a href="../../to_be_developed.html">Następna Strona</a>
    </div>
  `;

  // Insert at the beginning of <body>
document.body.insertAdjacentHTML("afterbegin", dashboardHTML);
