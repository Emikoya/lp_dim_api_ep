// Import du modèle Classes
var Classe = require("../models/classes");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const ClasseValidationRules = () => {
    return [   
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), ClasseValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de Classe à ajouter 
    var classe = new Classe({
        _id: req.body.id,
        name: req.body.name,
      });

    // Ajout de Classe dans la bdd 
    classe.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Classe created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    classe.find(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    classe.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), ClasseValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de Classe à modifier 
    var classe = new Classe({
        _id: req.params.id,
        name: req.body.name,
        Classe: req.body.Classe,
      });

      classe.findByIdAndUpdate(req.params.id, classe, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Classe with id "+req.params.id+" is not found !");
        }
        return res.status(201).json("Classe updated successfully !");
      });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    classe.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Classe with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("Classe deleted successfully !");
      });
}];