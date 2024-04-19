const filterResults = (Model, fields) => async (req, res, next) => {
  let query;
  if (req.user.role == "sender") {
    req.query.owner = req.user._id;
  } else if (req.user.role == "supplier") {
    req.query.supplier = req.user._id;
  }

  let queryParams = { ...req.query };

  // Remove fields that we don't wanna match like 'select' is not a "actual field" in database it is a filter to select sepcific fields only so we dont need that hence removing it from DUPLICATE req.query object
  let removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((field) => delete queryParams[field]);

  let queryString = JSON.stringify(queryParams);
  queryString = queryString.replace(
    // find pattern
    /\b(gt|gte|lt|lte|in)\b/g,
    // if found add prefix $
    (match) => `$${match}`
  );

  query = Model.find(JSON.parse(queryString));

  // Here we will check if we have select query from "ACTUAL" request if yes we will filter fields as needed
  if (req.query.select) {
    const selectStr = req.query.select.split(",").join(" ");
    // query.select(field1 field2 ... fieldN) is like SELECT col1,col2 from SQL <selecting speicific fields from fetched data>
    query.select(selectStr);
  }

  // Here we will sort results
  if (req.query.sort) {
    const sortStr = req.query.sort.split(",").join(" ");
    query.sort(sortStr);
  } else {
    query.sort("createdAt");
  }

  if (fields) {
    query = query.populate(fields);
  }
  const results = await query;

  res.filterResults = {
    success: true,
    count: results.length,
    data: results,
  };
  next();
};

module.exports = filterResults;
