
var LastSearch = function() {
    this.location  = "";
    this.priceFrom = 0;
    this.priceTo   = 2000;
};

LastSearch.prototype.getLocation = function() {
    return this.location;
};

LastSearch.prototype.getPriceFrom = function() {
    return this.priceFrom + " €";
};

LastSearch.prototype.getPriceTo = function() {
    return this.priceTo + " €";
};

LastSearch.prototype.setLocation = function(location) {
    this.setPropToValue('location' , location);
};

LastSearch.prototype.setPriceFrom = function(from) {
    this.setPropToValue('priceFrom' , parseInt(from));
};

LastSearch.prototype.setPriceTo = function(to) {
    this.setPropToValue('priceTo' , parseInt(to));
};

LastSearch.prototype.setPropToValue = function(prop, value) {
    console.log(prop + '---' + value);
    if(value && value !== '') {
        console.log('SET !');
        this[prop] = value;
    }
};

LastSearch.prototype.get = function(req) {
    if(req && req.body) {
        this.setLocation(req.body.location);
        this.setPriceTo(req.body.to);
        this.setPriceFrom(req.body.from);
    }

    return {
        location : this.getLocation()
      , from: this.getPriceFrom()
      , to: this.getPriceTo()
    };
};

module.exports = new LastSearch();
