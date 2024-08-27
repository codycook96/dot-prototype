//import { main } from "./modules/main.js";

var scripts = [
    "/src/scripts/modules/file.js",
    "/src/scripts/modules/extend.js",
    "/src/scripts/modules/dot.js",
    "/src/scripts/modules/main.js"
]

window.scriptLoadMap = new Map();
scripts.forEach(s =>{
    window.scriptLoadMap.set(s, false);
});

console.log(window.scriptLoadMap);

var scriptIndex = -1;
console.log("Start loading...");
loadNextScript();

export function loadNextScript(){
    scriptIndex += 1;
    if(scriptIndex >= scripts.length){
        loadComplete();
    }
    console.log("Loading " + scripts[scriptIndex] + "...");
    loadScript(scripts[scriptIndex], null, loadError, 10);
    console.log("Loading scrips complete.");
    
}

function loadComplete(){
    console.log("calling main");
    //main();
}

function loadError(){
    alert("ERROR COULD NOT COMPLETE SCRIPT LOADING!")
}

/** 
 * Mark/store the script as fully loaded in a global variable.
 * @param src URL of the script
 */
function markScriptFullyLoaded(src) {
    window.scriptLoadMap[src] = true;
}

/** 
 * Returns true if the script has been added to the page
 * @param src URL of the script
 */
function isScriptAdded(src) {
    return Boolean(document.querySelector('script[src="' + src + '"]'));
}

/** 
 * Returns true if the script has been fully loaded
 * @param src URL of the script
 */
function isScriptFullyLoaded(src) {
    return src in window.scriptLoadMap && window.scriptLoadMap[src];
}

/** 
 * Load a script. 
*/
function loadScript(src, onLoadCallback, onLoadErrorCallback, retryCount) {
    if (!src) return;
    
    // Check if the script is already loaded
    if ( isScriptAdded(src) )
    {
        // If script already loaded successfully, trigger the callback function
        if (isScriptFullyLoaded(src)) onLoadCallback();
        
        console.warn("Script already loaded. Skipping: ", src);
        return;
    }

    // Loading the script...
    const js = document.createElement('script');
    js.setAttribute("async", "");
    js.setAttribute("type", "module");
    js.src = src;
    
    js.onload = () => {
        markScriptFullyLoaded(src)
        
        // Optional callback on script load
        console.log("...returning from load...")
        if (onLoadCallback) onLoadCallback();
    };
    
    js.onerror = () => {
        // Remove the script node (to be able to try again later)
        const js2 = document.querySelector('script[src="' + src +'"]');
        js2.parentNode.removeChild(js2);
        
        // Optional callback on script load failure
        if (onLoadErrorCallback) onLoadErrorCallback();
    };

    document.head.appendChild(js);
}


