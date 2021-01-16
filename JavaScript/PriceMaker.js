BaseCost = 70;
FinalCost = 0;

PricePerPage = 25;
ResponsivePageCost = 35;
CustomLayoutPrice = 45;

var IDS = ["RPAGE", "CustomLayout"];
const Prices = [35, 45];



DisplayFinalCost(BaseCost)

function CalcFinalCost() {
    FinalCost = BaseCost;

    var PageNumber = document.getElementById("PGNUM");
    MaxClamp(PageNumber);
    PageCost = (PageNumber.valueAsNumber - 1) * PricePerPage;

    CostToAdd = AddCost();

    FinalCost += PageCost + CostToAdd;
    DisplayFinalCost(FinalCost);
}

function DisplayFinalCost(Cost) {

    var GetElement = document.getElementById("Final");
    GetElement.value = Cost + "$";
}


function AddCost() {
    var Total = 0;
    for (var i = 0; i < IDS.length; i++) {
        if (IsCheckMarked(IDS[i])) {
            Total += Prices[i];
        }
    }
    return Total;
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