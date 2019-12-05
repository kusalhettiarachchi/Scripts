const _map = function(){
    emit(this.uid, this._id + "&" + this.KYCChanged.date);
};

const _reduce = function(key, values){
    //oldest day in the calendar :p
    let latest = {
        obj_id: values[0].split("&")[0],
        date: new Date(values[0].split("&")[1])
    }
    values.slice(1).forEach(element => {
        let v = {
            obj_id: element.split("&")[0],
            date: new Date(element.split("&")[1])
        };
        if (v.date > latest.date) {
            latest.date = v.date;
            latest.obj_id = v.obj_id
        }
    });
    return latest.obj_id;
};

const _finalize = function(key, reducedValues) {
    if (reducedValues.includes("&")){
        return reducedValues.split("&")[0];
    }
    return reducedValues;
};

db.LAST_KYC_copy.mapReduce(map, reduce, {query: {isFinal: true}, out: "VALID_IDS", finalize: _finalize});