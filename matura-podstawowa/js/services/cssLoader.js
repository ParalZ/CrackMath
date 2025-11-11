const cssLinks = [
    "../../css/base/baseStyles.css",
    "../../css/base/utilities.css",
    "../../css/components/animations.css",
    "../../css/components/theorySection.css",
    "../../css/components/zadaniaSection.css",
    "../../css/components/button.css",
    "../../css/components/math-field.css",
    "../../css/layout/dashboard.css",
    "../../css/layout/footer.css",
    "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css",
    "../../css/components/graphs.css"
];

function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = "stylesheet";
    link.onload = () => {
      console.log(`Successfully loaded: ${href}`);
      resolve(link);
    };
    link.onerror = () => {
      console.error(`Failed to load: ${href}`);
      reject(new Error(`CSS load error for ${href}`));
    };
    document.head.appendChild(link);
  });
}

(function (){
    try{
        cssLinks.map(loadCSS);
    }
    catch(error){
        console.error("Error occured during loading CSS  files:", error);
    }
})();