exports.test = function () {
    return 'hey helper! ';
};

function addHours(date, hours) {
    const copy = new Date(Number(date))
    copy.setHours(date.getHours() + hours)
    return copy
}

exports.getUserRemainingEnergy = function (list_energy_data) {
    var result = []
    var current_date = new Date();
    for (var energy_data of list_energy_data) {
        var new_energy_data = {
            start_time: addHours(current_date, -1),
            end_time: current_date,
            timezone: energy_data.time_zone,
            remaining_energy: energy_data.quantity_generated - energy_data.quantity_delivered,
            quantity_generated: energy_data.quantity_generated,
            quantity_delivered: energy_data.quantity_delivered,
            unit: energy_data.unit
        }
        current_date = addHours(current_date, -1);
        result.push(new_energy_data)
    }
    return result
};



exports.getCumulativeRemainingEnergy = function (list_energy_data, list_transaction_data) {
    var result = 0
    for (var energy_data of list_energy_data) {
        result += energy_data.quantity_generated - energy_data.quantity_delivered
    }
    for (var transaction_data of list_transaction_data) {
        result -= transaction_data.posting_info.amount_energy;
    }
    return result
};
