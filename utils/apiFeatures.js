class ApiFeatures {
  // queryStr is the queries passed in the url (object of query)
  // query is the object of database model (such as Product) to apply feature on (like Product.find())
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // if search keyword present in query then apply mongoose $regex on it so that if any thing matching with the keyword can be searched and displayed instead of finding a exact match of keyword
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // making search case-insensitive
          },
        }
      : {};

    this.query = this.query.find(keyword);

    return this;
  }

  filter() {
    // copy the query object so that we can modify it and use it
    // destructing it so that it is copied via value and not reference
    const queryCopy = { ...this.queryStr };

    // Remove given below fields except for category as we want to find as per category only
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //  Filter for price and rating

    let queryStr = JSON.stringify(queryCopy);
    // replacing the [gt],[gte].... from (price[gt]=40000) in query to (price[$gte]=40000) as mongoose
    // has $ before its variables
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    // Tells which page is selected
    const currentPage = Number(this.queryStr.page) || 1;
    // calc. formula for finding how pages to skip to display current pgno. data
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
