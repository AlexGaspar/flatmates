function setPropToValue (value) {
    if(value && value !== '') {
        return value;
    }

    return null;
};

module.exports = function (req) {
    var location  = "";
    var priceFrom = 0;
    var priceTo   = 4000;

    if(req && req.body) {
        location  = setPropToValue(req.body.location) || location;
        priceFrom = setPropToValue(req.body.from)     || priceFrom;
        priceTo  = setPropToValue(req.body.to)        || priceTo;
    }

    return {
        location : location
      , from: parseInt(priceFrom) + ' €'
      , to: parseInt(priceTo) + ' €'
    };
};
