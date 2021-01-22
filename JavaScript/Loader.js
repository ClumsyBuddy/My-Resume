//Function to add scripts dynamically with a class and the source file
function AddScript(ScriptName) {
    var DifferentScripts = ScriptName.split(','); //This allows one to add multiple scripts at once each script is split by the , 
    var Path = "../JavaScript/"; //Path to scripts
    var script_tag = []; //Holds all of the scripts
    for (var i = 0; i < DifferentScripts.length; i++) {
        script_tag.push(document.createElement("script")); //Push script tag into array
    }

    for (var j = 0; j < DifferentScripts.length; j++) {
        script_tag[j].setAttribute('src', Path + DifferentScripts[j]); //Added a src to the script along with the path and name
        script_tag[j].setAttribute('class', 'LoadedScripts'); //Add a class for easy removal later
        document.getElementById("LoadScripts").appendChild(script_tag[j]); //Apend the child to a element with the loadscripts id where all scripts will be located
    }
}



//Function to remove scripts, can remove all loaded scripts or can remove select ones based on file name
function RemoveScript(_script = null) {
    var Scripts = document.getElementsByClassName("LoadedScripts"); //Grabs all loaded scripts
    var scriptToRemove = ''; //Used to for comparison
    if (_script === null) { //If not selecting a certain script remove all 
        var FailSafe = 0; //Just incase it tries to loop forever
        while (Scripts.length > 0) { //While loop to remove all of them
            if (FailSafe > 1000) { //Failsafe exit
                break;
            }
            Scripts[0].parentNode.removeChild(Scripts[0]); //Remove the first script found one at time until no scripts remain
            FailSafe += 1;
        }
    } else { //Else remove based on name of script given
        scriptToRemove = _script.split('JavaScript/'); //Gets the Scripts name
        for (var i = 0; i < Scripts.length; i++) {
            var CurrentScript = Scripts[i].src.split('JavaScript/'); //Get the current scripts name
            var NameToCheck = CurrentScript[1]; //Index 1 because the first is the script path
            if (NameToCheck === scriptToRemove[0]) {
                Scripts[i].parentNode.removeChild(Scripts[i]); //Remove that script
            }
        }
    }
    return true;
}



function Init(func = null) {
    //AddScript(_ScriptName);
    if (func != null) {
        StartFunctions(func);
    }
}


function StartFunctions(func) {
    var fn = [];
    var Splitnames = func.split(',');
    for (var i = 0; i < Splitnames.length; i++) {
        fn.push(window[Splitnames[i]]);
    }
    for (var i = 0; i < fn.length; i++) {
        if (typeof fn === 'function') {
            fn.apply();
            console.log(fn);
        }
    }
    console.log("EXIT");
}