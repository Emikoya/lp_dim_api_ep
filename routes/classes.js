// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur classes
var classes_controller = require("../controllers/classes");

// (Étape 2) Ajout de la route qui permet d'ajouter un sort
router.post("/", classes_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les sorts
router.get("/", classes_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul sort grâce à son identifant
router.get("/:id", classes_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul sort grâce à son identifant
router.put("/:id", classes_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul sort grâce à son identifant
router.delete("/:id", classes_controller.delete);

// (Étape 1) Export du router
module.exports = router;