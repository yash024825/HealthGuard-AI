const Prediction = require("../models/Prediction");
const HealthProfile = require("../models/HealthProfile");

const {
  predictHeartDisease,
  predictDiabetes,
} = require("../services/ml.service");

const requireUser = (req, res) => {
  if (!req.user) {
    res.status(404).json({
      success: false,
      message: "Account not fully set up yet. Please sign in again.",
    });
    return false;
  }
  return true;
};


/**
 * Generate Prediction
 */
const createPrediction = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    let { predictionType, ...inputData } = req.body;

    if (!predictionType) {
      return res.status(400).json({
        success: false,
        message: "predictionType is required.",
      });
    }


    // Normalize prediction type
    predictionType = predictionType.toLowerCase();


    // Check health profile
    const profile = await HealthProfile.findOne({
      userId: req.user.id,
    });


    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Health profile not found.",
      });
    }


    let result;
    let modelName;


    switch (predictionType) {

      case "heart":
      case "heart_disease":

        predictionType = "heart_disease";

        modelName = "Heart Disease Random Forest";

        result = await predictHeartDisease(inputData);

        break;


      case "diabetes":

        predictionType = "diabetes";

        modelName = "Diabetes Random Forest";

        result = await predictDiabetes(inputData);

        break;


      default:

        return res.status(400).json({
          success: false,
          message: "Invalid prediction type.",
        });
    }



    /**
     * Convert ML prediction output
     *
     * ML:
     * 1 => Positive
     * 0 => Negative
     */
    const predictionValue =
      result.prediction ?? result.result;


    const predictionLabel =
      predictionValue === 1 || predictionValue === "1"
        ? "Positive"
        : "Negative";



    const prediction = await Prediction.create({

      userId: req.user.id,

      healthProfileId: profile._id,


      modelName,

      predictionType,


      inputData,


      prediction: {

        label: predictionLabel,


        probability: result.probability,


        confidence: result.confidence,


        riskLevel:
          predictionLabel === "Positive"
            ? "High"
            : "Low",



        recommendations:

          predictionLabel === "Positive"

            ? [
                "Consult a healthcare professional.",
                "Schedule additional medical tests.",
                "Maintain a healthy diet.",
                "Exercise regularly.",
              ]

            : [
                "Continue a healthy lifestyle.",
                "Exercise regularly.",
                "Eat a balanced diet.",
                "Get annual health checkups.",
              ],
      },


      // Store original ML response
      rawResponse: result,


      status: "completed",

    });



    return res.status(201).json({

      success: true,

      message: "Prediction generated successfully.",

      data: prediction,

    });



  } catch (error) {

    console.error(
      "Prediction Error:",
      error.response?.data || error.message
    );


    return res.status(500).json({

      success: false,

      message: error.message || "Prediction failed.",

    });

  }
};




/**
 * Get Prediction History
 */
const getPredictionHistory = async (req, res, next) => {

  try {

    if (!requireUser(req, res)) return;

    const predictions = await Prediction.find({

      userId: req.user.id,

    }).sort({

      createdAt: -1,

    });



    return res.status(200).json({

      success: true,

      count: predictions.length,

      data: predictions,

    });


  } catch(error){

    next(error);

  }

};




/**
 * Get Single Prediction
 */
const getPredictionById = async (req,res,next)=>{

  try{

    if (!requireUser(req, res)) return;

    const prediction = await Prediction.findOne({

      _id:req.params.id,

      userId:req.user.id,

    });


    if(!prediction){

      return res.status(404).json({

        success:false,

        message:"Prediction not found.",

      });

    }


    return res.status(200).json({

      success:true,

      data:prediction,

    });


  }catch(error){

    next(error);

  }

};




module.exports = {

  createPrediction,

  getPredictionHistory,

  getPredictionById,

};