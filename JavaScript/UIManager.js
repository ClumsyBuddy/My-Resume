
function UIManager(BaseElement) {
    this.CE = {};
    this.BaseElement = document.getElementById(BaseElement);
    this.start = function(){
    }
    //This function takes a key and a object containing all of the things for a element and then
    //it creates the element using the object and puts it into a object with a key for future retrieval
    this.CreateElement = function(Key=null, Element = {Ele, id, type, width, height, style, textContent}){ 
        const e = document.createElement(Element.Ele);
        if(Element.id != undefined)
            e.setAttribute("id", Element.id);
        if(Element.type != undefined)
            e.setAttribute("type", Element.type);
        if(Element.width != undefined)
            e.setAttribute("width", Element.width);
        if(Element.height != undefined)
            e.setAttribute("width", Element.height);
        if(Element.style != undefined)
            e.setAttribute("style", Element.style);
        if(Element.textContent != undefined)
            e.textContent = Element.textContent;

        this.CE[Key] = e;
        this.BaseElement.appendChild(this.CE[Key]);
    }
    this.GetSavedElement = function(key){
        return this.CE[key];
    }
}