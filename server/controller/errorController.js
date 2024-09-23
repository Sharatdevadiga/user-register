// Middleware to handle unhandled routes
export const unhandledRoutes = function (req, res, next) {
  if (!res.headersSent) {
    res.status(404).json({ message: "This route is not defined" }); // 404 for not found
  } else {
    next();
  }
};

// Global error handling middleware
export const globalErrorHandler = function (err, req, res, next) {
  if (!res.headersSent) {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  } else {
    next(err);
  }
};
