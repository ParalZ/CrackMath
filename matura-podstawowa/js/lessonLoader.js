console.log("--- SCRIPT LOADER IS RUNNING (Optimized) ---");

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => {
      console.log(`Successfully loaded: ${src}`);
      resolve(script);
    };
    script.onerror = () => {
      console.error(`Failed to load: ${src}`);
      reject(new Error(`Script load error for ${src}`));
    };
    document.body.appendChild(script);
  });
}

// --- 1. Define Our Script Groups ---

// These scripts have NO dependencies on each other and can be loaded
// all at once, in parallel.
const parallelScripts = [
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/dist/compute-engine.min.umd.js',
  'https://cdn.jsdelivr.net/npm/mathlive',
  'https://cdn.jsdelivr.net/npm/dompurify@3.0.2/dist/purify.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.0/math.min.js',
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
  '../../js/utils/buttonAnimation.js' //
];

// These scripts DEPEND on each other or on the parallel scripts.
// They will be loaded sequentially (one by one) AFTER the parallel group is done.
const sequentialScripts = [
  '../../js/utils/safeHTML.js',           // Depends on DOMPurify
  '../../js/components/layout.js',             // Creates footer
  '../../js/components/zadaniaSection.js',    // Depends on footer
  '../../js/utils/autoNumberHeadings.js',  // Defines numberZadaniaHeadings
  '../../js/components/multipleChoice.js',   // Depends on safeHTML
  '../../js/components/openQuestions.js',      // Depends on safeHTML, ComputeEngine
  '../../js/services/questionLoader.js'      // Depends on multipleChoice & openQuestions
];


// --- 2. Run the Optimized Loading Process ---

(async function() {
  try {
    // Step 1: Load all parallel scripts and wait for ALL of them to finish.
    // This is much faster.
    console.log("--- Loading parallel scripts... ---");
    await Promise.all(parallelScripts.map(loadScript));
    
    // Step 2: Now that all utilities are loaded, load our app scripts
    // one by one to ensure dependencies are met.
    console.log("--- Loading sequential scripts... ---");
    for (const scriptPath of sequentialScripts) {
      await loadScript(scriptPath);
    }
    
    // --- ALL SCRIPTS ARE NOW LOADED AND EXECUTED ---
    console.log("--- ALL SCRIPTS FINISHED, FIRING CALLBACK ---");
    if (typeof runPageSpecificCode === 'function') {
      runPageSpecificCode(); // Call the function from your HTML
    } else {
      console.error("runPageSpecificCode() is not defined in your HTML.");
    }
    
  } catch (error) {
    console.error("A script in the chain failed to load:", error);
  }
})();