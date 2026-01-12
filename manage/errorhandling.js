exports.errorHandler = (err, req, res, next) => {
  console.log(err);

  // 1. ValidationError
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => ({
      field: el.properties.path,
      message: el.message,
      wrongValue: el.properties.value,
    }));

    return res.status(400).json({
      message: "Invalid data",
      errors,
    });
  }

  // 2. CastError
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // 3. Duplicate error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern)[0];
    const duplicateValue = err.keyValue[duplicateField];

    return res.status(400).json({
      message: `Invalid value ${duplicateValue} for field ${duplicateField}`,
    });
  }

  // 4. General Error
  res.status(500).json({
    message: "fail",
    error: err || "Internal server error",
  });
};