const express = require('express');

const mongoose = require('mongoose');
const ApiError = require('./utils/apiError');
const userRoute = require('./routes/user.routes');
const shapeRoute = require('./routes/shape.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoute);

app.use('/api/shape', shapeRoute);

///handling 404 error
app.all('*', (req, res, next) => {
  next(new ApiError('opps page not found', 404));
});

//global error
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 4000;

let dbString;
process.env.NODE_ENV !== 'production'
  ? (dbString = process.env.MONGO_LOCAL)
  : (dbString = process.env.MONGO_URI);

mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connection is successful ......');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
