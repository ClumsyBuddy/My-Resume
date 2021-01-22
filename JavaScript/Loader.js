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

        document.getElementById("LoadedScripts").appendChild(script_tag[j]);
    }
    console.log(script_tag);
}