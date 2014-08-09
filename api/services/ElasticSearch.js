/**
 * ElasticSearch Service
 *
 * @description ::
 */
var es = require('elasticsearch');

var ElasticSearch = function() {
    this.connection = null;
};

ElasticSearch.prototype.getConnection = function() {
    if(this.connection === null) {
        this.connection = this.createConnection();
    }

    return this.connection;
}

ElasticSearch.prototype.createConnection = function(first_argument) {
    return new es.Client(sails.config.elasticSearch);
};

/**
 * Generate an ElasticSearch query based on parameters
 * @param  OBject   params  Parameters
 * @return Object           ElasticSearch formated query
 */
ElasticSearch.prototype.createQuery = function(params) {
    var query = { bool: { must: []} };

    if(params.id) {
      var tmp = { term : { _id : params.id } };
      query.bool.must.push(tmp);
    }

    if(params.match) {
      var tmp = { match : params.match };
      query.bool.must.push(tmp);
    }

    if(params.range) {
      var max   = params.range.max;
      var min   = params.range.min;
      var field = params.range.field;

      var range = {};

      range[field] = {
          gte : min
        , lte : max
      }
      var tmp = { range : range };
      query.bool.must.push(tmp);
    }

    return query;
};

ElasticSearch.prototype.run = function (params, callback) {
    var request = {
        index: "roommate"
      , type: "ads"
      , size: 50
    }

    if(params) request.body = { query : createQuery(params)}

    this.getConnection().search(request)
      .then(function (resp) {
          var data = addIdToItem(resp.hits.hits);
          callback(null, data);
      }, function (err) {
          callback(err);
    });
};

/*
 * Find methods
 */
ElasticSearch.prototype.find = function (params, callback) {
    this.run(params, callback)
};
ElasticSearch.prototype.findById = function (id, callback) {
    this.run({id:id}, callback)
};

module.exports = new ElasticSearch();
