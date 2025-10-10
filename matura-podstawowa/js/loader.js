// Generic function to load questions from JSON for a page
function loadQuestions(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      data.forEach(q => {
        if(q.type === "open"){
          addOpenQuestion(
          q.containerId,
          q.question,
          q.answerForEvaluation,
          q.latexAnswer,
          q.explanation
        );
        }
      });
      // Re-render MathJax after questions are added
      if (window.MathJax) {
        MathJax.typesetPromise();
      }
    })
    .catch(err => console.error("Error loading questions:", err));
}
