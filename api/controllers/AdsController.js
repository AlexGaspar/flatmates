/**
 * AdsController
 *
 * @description :: Server-side logic for managing ads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/**
 * Requires
 */

var Promise = require("bluebird");

/**
 * Private methods
 */
var _searchForTerm = function (params) {
    var deferred = Promise.pending();

    ElasticSearch.find(params, function(err, data) {
      if(data && data.length >= 1) {
        var i = 0;
        var list = [];

        data.forEach(function(it) {
          var item = it._source;

          if(item.images) item.images = item.images[0];
          item.newRow       = (i == 0);
          item.endRow       = (!(i % 3) && (i != 0));
          item.shortMessage = item.message.substring(0,290);
          if( item.message.length > 290 ) item.shortMessage = item.shortMessage + '...'

          list.push(item);

          // Reset counter
          i = ++i % 4;
        });

        // close last one
        list[list.length - 1].endRow = true;

        deferred.resolve(list);
      } else {
        deferred.reject(err || 'No Results');
      }
    });

    return deferred.promise;
  }

/**
 * Public Methods
 */

var indexAction = function(req, res, next) {
  var params = {};

  if(req.param("location") && req.param("location") !== '') {
    params.match = { message : req.param("location") };
  }

  if(req.param("from") || req.param("to")) {
    var from = Math.abs(parseInt( req.param("from")) ) || 0;
    var to   = Math.abs(parseInt( req.param("to")) )   || 999999;

    params.range = {
        field: "price"
      , min: from
      , max: to
    };
  }

  if(_.isEmpty(params)) params = null;

  // Template value
  var templateValue = {
      titles: 'Searching'
    , searchTerms: LastSearch(req)
    , partials : {}
  };

  _searchForTerm(params).then(function(data) {
    templateValue.items = data;
    templateValue.partials.content = './partials/search';
  })
  .catch(function(e) {
    templateValue.message = e;
    templateValue.partials.content = './partials/error';
  })
  .finally(function() {
    return res.render('layout', templateValue);
  });
}

var detailAction = function(req, res, next) {
  ElasticSearch.findById(req.params.id, function(err, result) {
    if(result && result.length > 0) {
      var data = result[0]._source;

      res.render('layout', {
          titles: 'Small loft'
        , searchTerms: LastSearch(req)
        , item: data
        , partials: {
          content: './partials/detail'
        }
      });
    } else {
      res.notFound();
    }
  });
}


module.exports = {
	  'index'  : indexAction
  , 'detail' : detailAction
};

