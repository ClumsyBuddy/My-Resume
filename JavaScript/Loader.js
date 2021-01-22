//Function to add scripts dynamically with a class and the source file
function AddScript(ScriptName) {

    try {
        if (ScriptName == "") throw "ScriptName is Empty";
        if (ScriptName == NaN) throw "ScriptName is NaN";
        if (ScriptName == null) throw "ScriptName is Null";
    } catch (err) {
        console.error(err + " " + ScriptName);
    }

    var DifferentScripts = ScriptName.split(','); //This allows one to add multiple scripts at once each script is split by the , 
    var Path = "../JavaScript/"; //Path to scripts

    var script_tag = []; //Holds all of the scripts
    for (var i = 0; i < DifferentScripts.length; i++) {
        try { script_tag.push(document.createElement("script")); } //Push script tag into array
        catch { console.error("Could not create tag script"); }
    }

    for (var j = 0; j < DifferentScripts.length; j++) {
        try { script_tag[j].setAttribute('src', Path + DifferentScripts[j]); } //Added a src to the script along with the path and name
        catch { console.error("Could not create source path: " + script_tag[j]); }
        script_tag[j].setAttribute('class', 'LoadedScripts'); //Add a class for easy removal later
        script_tag[j].setAttribute('type', 'text/javascript'); //Add a type attribute to scripts
        try { document.getElementById("LoadScripts").appendChild(script_tag[j]) } //Apend the child to a element with the loadscripts id where all scripts will be located
        catch { console.error("Could not append to LoadScripts as child: " + script_tag[j].src); }
    }
    return true;
}

//Function to remove scripts, can remove all loaded scripts or can remove select ones based on file name
function RemoveScript(_script = null) {
    try { var Scripts = document.getElementsByClassName("LoadedScripts"); } //Grabs all loaded scripts
    catch { console.error("Could not find LoadedScripts"); }

    var scriptToRemove = ''; //Used to for comparison
    if (_script === null) { //If not selecting a certain script remove all 
        var FailSafe = 0; //Just incase it tries to loop forever
        while (Scripts.length > 0) { //While loop to remove all of them
            if (FailSafe > 1000) { //Failsafe exit
                break;
            }
            try { Scripts[0].parentNode.removeChild(Scripts[0]); } //Remove the first script found one at time until no scripts remain
            catch { console.error("Problem with: " + Scripts[0]); }
            FailSafe += 1;
        }
    } else { //Else remove based on name of script given
        scriptToRemove = _script.split('JavaScript/'); //Gets the Scripts name
        for (var i = 0; i < Scripts.length; i++) {
            var CurrentScript = Scripts[i].src.split('JavaScript/'); //Get the current scripts name
            var NameToCheck = CurrentScript[1]; //Index 1 because the first is the script path
            if (NameToCheck === scriptToRemove[0]) {
                try { Scripts[i].parentNode.removeChild(Scripts[i]); } //Remove that script
                catch { console.error("Could not remove element: " + Scripts[i]); }
            }
        }
    }
    return true;
}


//This function runs at startup (onload) Its take the name of scripts to be created, names of functions to run and waittime before starting those functions
function Init(_ScriptName, func, waittime) {
    var FailSafe = 0; //Failsafe so that doesnt get stuck in a forever loop
    var Error = false;
    while (AddScript(_ScriptName) != true) { //If the scripts havent loaded then continue to wait

        if (FailSafe > 10000) { //break if it takes to long
            Error = true;
            console.error("Failed to load dynamic scripts");
            break;
        }
        FailSafe += 1;
        console.log(FailSafe); //It shouldnt take it long to make the scripts so I print the Failsafe count for debuging purposes
    }
    if (Error === false) {
        setTimeout(function() { StartFunctions(func) }, waittime); //After waiting a set amount of time go to functions to start functions in loaded scripts
    }

}

//function to load and run functions within the loaded scripts
function StartFunctions(func) {
    var Splitnames = func.split(','); //Split the names to get each function name
    for (var i = 0; i < Splitnames.length; i++) { //loop through
        try { window[Splitnames[i]](); } //Execute the function
        catch { console.error("Failed to load function: " + Splitnames[i]); }
    }
}