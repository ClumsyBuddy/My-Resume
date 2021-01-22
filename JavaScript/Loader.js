function AddScript(ScriptName) {
    var DifferentScripts = ScriptName.split(',');
    var Path = "../JavaScript/";
    var ScriptAmount = DifferentScripts.length;
    var script_tag = [];
    console.log(DifferentScripts);
    for (var i = 0; i < DifferentScripts.length; i++) {
        script_tag.push(document.createElement("script"));
    }

    for (var j = 0; j < DifferentScripts.length; j++) {
        script_tag[j].setAttribute('src', Path + DifferentScripts[j]);
        script_tag[j].setAttribute('class', 'LoadedScripts');

        document.getElementById("LoadScripts").appendChild(script_tag[j]);
    }
    console.log(script_tag);
}




function RemoveScript(_script = null) {
    var Scripts = document.getElementsByClassName("LoadedScripts");

    var scriptToRemove = '';

    if (_script === null) {
        var FailSafe = 0;
        while (Scripts.length > 0) {
            if (FailSafe > 1000) {
                break;
            }
            Scripts[0].parentNode.removeChild(Scripts[0]);
            FailSafe += 1;
        }
    } else {
        scriptToRemove = _script.split('JavaScript/');
        for (var i = 0; i < Scripts.length; i++) {
            var CurrentScript = Scripts[i].src.split('JavaScript/');
            var NameToCheck = CurrentScript[1];
            if (NameToCheck === scriptToRemove[0]) {
                Scripts[i].parentNode.removeChild(Scripts[i]);
            }
        }
    }



    console.log(Scripts);
}