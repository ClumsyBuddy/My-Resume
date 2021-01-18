//Base Cost of a website
BaseCost = 75;
FinalCost = 0;

//Cost for items that vary in number
PricePerPage = 25;
RevisionCost = 15;
//Cost of items that can be true or false
ResponsivePageCost = 50;
CustomLayoutPrice = 40;

//Used to display the prices on the website automatically
const Display_Prices = ["BaseCostDisplay", "PagePriceDisplay", "RevisionPriceDisplay", "ResponsivePriceDisplay", "CustomPriceDisplay"];
const Prices = [BaseCost, PricePerPage, RevisionCost, ResponsivePageCost, CustomLayoutPrice];
//Used to calculate the cost based on the number chosen
const Numbered_Item_IDS = ["PGNUM", "Revise"];
const Numbered_Item_Cost = [PricePerPage, RevisionCost];
//Used to calculate the cost based on if true or false 
const Check_Mark_IDS = ["RPAGE", "CustomLayout"];
const Check_Mark_Prices = [ResponsivePageCost, CustomLayoutPrice];

//Displays the prices on startup
DisplayPrices()
    //Displays Basecost until they add other variables
DisplayFinalCost(BaseCost)


//Display prices above for easier editing
function DisplayPrices() {
    var Displays = [];
    for (var i = 0; i < Display_Prices.length; i++) {
        Displays.push(document.getElementById(Display_Prices[i]));
        Displays[i].textContent = ("$" + Prices[i])
    }
}


//All of the different pricing and cost get added up here
function CalcFinalCost() {
    FinalCost = BaseCost; //Final cost = base cost
    var CostToAdd = 0; //Holds all cost that need to be added

    CostToAdd += NumberedItemCost(); //Add return of NumberedItemCost
    CostToAdd += CheckMarkCost(); //Add return of CheckMarkCost

    FinalCost += CostToAdd; //Add Them together
    DisplayFinalCost(FinalCost); //Go and display it
}


//Simple fuction to display final cost with a dollar sign
function DisplayFinalCost(Cost) {

    var GetElement = document.getElementById("Final");
    GetElement.value = "$" + Cost;
}

//Function that iterates each numbered item and then adds there respective prices
function NumberedItemCost() {
    var Total = 0;
    var Items = [];
    for (var i = 0; i < Numbered_Item_IDS.length; i++) {
        Items.push(document.getElementById(Numbered_Item_IDS[i])); //Push all elements that are numbered into a array
    }

    for (var i = 0; i < Items.length; i++) {
        if (i == 0) { //If its the first variable then its PageCost, if so then remove one from its total to account for the fact websits need atleast one page
            MinMaxClamp(Items[i]);
            Total += ((Items[i].valueAsNumber - 1) * Numbered_Item_Cost[i]); //Take the current amount of pages they want and times it by the cost for each page
        } else {
            MinMaxClamp(Items[i]);
            Total += (Items[i].valueAsNumber * Numbered_Item_Cost[i]); //Take the current amount of revisions/ect they want and times it by the cost for each page
        }
    }
    return Total; //return total to be used in final calc
}

//Checks if true or false (Has been check marked or not) then adds cost if it has been
function CheckMarkCost() {
    var Total = 0;
    for (var i = 0; i < Check_Mark_IDS.length; i++) {
        if (IsCheckMarked(Check_Mark_IDS[i])) { //IsCheckedMarked gets the document
            Total += Check_Mark_Prices[i]; //If it is checked marked add price
        }
    }
    return Total; //Return total
}


function IsCheckMarked(id) {
    var thiselement = document.getElementById(id); //Get the element
    if (thiselement.checked == true) { //If it is checked marked
        return true //return true
    } else {
        return false //else return false if it isnt
    }
}


//This function clamps the value when it is changed in realtime
function ValueClamp(_doc) {
    var doc = document.getElementById(_doc);

    if (doc.valueAsNumber > doc.max) {
        doc.valueAsNumber = doc.max;
    } //Clamp if value is above max

    if (doc.valueAsNumber < doc.min) {
        doc.valueAsNumber = doc.min;
    } //Clamp if value is below min

    if (doc.value == "") {
        doc.valueAsNumber = doc.min;
    } //Set Value to min if there is no value
}

//This function clamps on clicking calc price
//Same as value clamp, possibly uneeded but I will leave incase I find bugs with
//input santization
function MinMaxClamp(doc) {
    if (doc.valueAsNumber > doc.max) {
        doc.valueAsNumber = doc.max;
    }
    if (doc.valueAsNumber < doc.min) {
        doc.valueAsNumber = doc.min;
    }
    if (doc.value == "") {
        doc.valueAsNumber = doc.min;
    }
}