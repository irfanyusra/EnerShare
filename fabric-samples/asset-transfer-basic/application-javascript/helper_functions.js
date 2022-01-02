exports.test = function () {
    return 'hey helper! ';
};

function addHours(date, hours) {
    const copy = new Date(Number(date))
    copy.setHours(date.getHours() + hours)
    return copy
}

exports.getUserRemainingEnergy = function (list_energydata) {
    console.log("list_energydata")
    var result = []
    var current_date = new Date();
    for (var energydata of list_energydata) {
        var new_energydata = {
            start_time: addHours(current_date, -1),
            end_time: current_date,
            timezone: energydata.time_zone,
            remaining_energy: energydata.quantity_generated - energydata.quantity_delivered,
            quantity_generated: energydata.quantity_generated,
            quantity_delivered: energydata.quantity_delivered,
            unit: energydata.unit
        }
        current_date = addHours(current_date, -1);
        console.log(new_energydata);
        result.push(new_energydata)
    }
    return result
};



exports.getCumulativeRemainingEnergy = function (list_energydata) {
    list_energydata = list_energydata.reverse();
    var result = 0
    for (var energydata of list_energydata) {
        result += energydata.quantity_generated - energydata.quantity_delivered
    }
    return result
};
