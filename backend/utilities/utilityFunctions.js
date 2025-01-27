//utility object to convert flow rate type to litres
let flowRate = {
    standardShower: 13,
    lowFlowShower: 6.5,
    standardTap: 5,
    lowFlowTap: 2.5,
    standardToilet: 10.5,
    lowFlushToilet: 5,
    standardDishWasher: 11,
    waterSaverDishWasher: 8,
    standardWashingMachine: 80,
    waterSaverWashingMachine: 50,
    weekly: 4,
    monthly: 1
}


//Utility function to format dates
const formatDate = (date)=>{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());   
}

module.exports = {flowRate, formatDate}; 