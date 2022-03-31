const advancedResults = (model, populate) => (req, res, next) => {
  model.countDocuments({}).then((docs) => {
    let query;
    let reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach((param) => delete reqQuery[param]);
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = model.find(JSON.parse(queryString));

    if (populate) {
      query.populate(populate);
    }

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query.select(fields);
    }

    if (req.query.sort) {
      const fields = req.query.sort.split(',').join(',');
      query.sort(fields);
    }

    //Pagination
    const pagination = {};
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const numberOfPages = Math.ceil(docs / limit);

    if (startIndex > 0 && page <= numberOfPages) {
      pagination.prevPage = page - 1;
    }
    if (page > 0 && page < numberOfPages) {
      pagination.nextPage = page + 1;
    }
    query.skip(startIndex).limit(limit);

    return query.then((data) => {
      res.advancedResults = {
        success: true,
        count: data.length,
        data,
        pagination,
        docs,
      };
      next();
    });
  });
};

module.exports = advancedResults;
