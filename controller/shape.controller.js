const Shape = require('../model/shape');
const ApiError = require('../utils/apiError');

exports.shape = async (req, res, next) => {
  try {
    let length_a = req.body.dimension.length_a;
    let length_b = req.body.dimension.length_b;
    let length_c = req.body.dimension.length_c;
    let radius = req.body.dimension.radius;

    // let s = (length_a - length_b - length_c)/2
    const shapeResult = (length_a, length_b, length_c, radius) => {
      if (req.body.shape === 'square') {
        const squareAns = length_a * length_a;
        return Math.round((squareAns + Number.EPSILON) * 100) / 100;
      } else if (req.body.shape === 'rectangle') {
        const rectangleAns = length_a * length_b;
        return Math.round((rectangleAns + Number.EPSILON) * 100) / 100;
      } else if (req.body.shape === 'triangle') {
        let s = (length_a + length_b + length_c) / 2;
        // console.log(Math.sqrt(s) * (s-length_a) * (s-length_b) * (s-length_c))
        const triangleAns =
          Math.sqrt(s) * (s - length_a) * (s - length_b) * (s - length_c);
        return Math.round((triangleAns + Number.EPSILON) * 100) / 100;
      } else if (req.body.shape === 'circle') {
        console.log(Math.PI);
        const circleAns = Math.PI * radius * radius;
        return Math.round((circleAns + Number.EPSILON) * 100) / 100;
      } else {
        next(new ApiError('please input valid details', 400));
      }
    };

    let data = {
      ...req.body,
      result: shapeResult(length_a, length_b, length_c, radius),
      user: req.user._id,
    };

    console.log(data);
    const circleDim = await Shape.create(data);
    res.status(200).json({
      status: 'success',
      message: circleDim,
    });
  } catch (error) {
    next(error);
  }
};



exports.getAllCal = async (req, res, next)=>{
  try {
    const shape = await Shape.find()
    res.status(200).json({
      status: "success",
      message: shape,
      result : shape.length
    })
  } catch (error) {
    next(error)
    
  }
}
