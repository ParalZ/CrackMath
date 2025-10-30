console.log("--- SCRIPT LOADER IS RUNNING ---");
const commonScripts = [
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/dist/compute-engine.min.umd.js',
  'https://cdn.jsdelivr.net/npm/mathlive',
  'https://cdn.jsdelivr.net/npm/dompurify@3.0.2/dist/purify.min.js',
  '../../js/utils/safeHTML.js',
  '../../js/components/layout.js',
  '../../js/components/multipleChoice.js',
  '../../js/components/openQuestions.js',
  '../../js/utils/buttonAnimation.js',
  '../../js/utils/autoNumberHeadings.js',
  '../../js/services/questionLoader.js', // Provides the 'loadQuestions' function
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.0/math.min.js',
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" // This is the last script
];

// Loop through the list and add each script to the page
commonScripts.forEach(function(scriptPath, index) {
  console.log("--- for each activated ---");
  const script = document.createElement('script');
  script.src = scriptPath;
  script.defer = true; 

  // Check if this is the LAST script in the array
  if (index === commonScripts.length - 1) {
    // If it is, tell it to run our page-specific code when it's done
    script.onload = function() {
      if (typeof runPageSpecificCode === 'function') {
        runPageSpecificCode(); // Call the function from Step 1
      } else {
        console.error("runPageSpecificCode() is not defined in your HTML.");
      }
    };
  }

  document.body.appendChild(script);
});
