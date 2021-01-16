BaseCost = 70;
FinalCost = 0;

PricePerPage = 25;
ResponsivePageCost = 35;
CustomLayoutPrice = 45;

DisplayFinalCost(BaseCost)

function CalcFinalCost() {
    FinalCost = BaseCost;


    var PageNumber = document.getElementById("PGNUM");
    MaxClamp(PageNumber);
    PageCost = (PageNumber.valueAsNumber - 1) * PricePerPage;

    if (IsCheckMarked("RPAGE")) {
        FinalCost += ResponsivePageCost;
    }
    if (IsCheckMarked("CustomLayout")) {
        FinalCost += CustomLayoutPrice;
    }


    FinalCost += PageCost;
    DisplayFinalCost(FinalCost);
}

function DisplayFinalCost(Cost) {

    var GetElement = document.getElementById("Final");
    GetElement.value = Cost + "$";
}



function IsCheckMarked(id) {
    var thiselement = document.getElementById(id);
    if (thiselement.checked == true) {
        return true
    } else {
        return false
    }
}




function MaxClamp(Value) {
    if (Value.valueAsNumber > Value.max) {
        Value.valueAsNumber = Value.max;
    }
}