BaseCost = 70;
FinalCost = 0;


DisplayFinalCost(BaseCost)

function CalcFinalCost() {
    var PageNumber = document.getElementById("PGNUM");
    MaxClamp(PageNumber);
    PageCost = PageNumber.valueAsNumber * 5;




    FinalCost = PageCost + BaseCost;
    DisplayFinalCost(FinalCost);
}

function DisplayFinalCost(Cost) {

    var GetElement = document.getElementById("Final");
    GetElement.value = Cost + "$";
}








function MaxClamp(Value) {
    if (Value.valueAsNumber > Value.max) {
        Value.valueAsNumber = Value.max;
    }
}