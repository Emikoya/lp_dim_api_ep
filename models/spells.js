// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition du schéma spell
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const spellSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true, enum: ["EVOCATION", "CONJURATION", "INVOCATION", "ENCHANTEMENT", "ILLUSION", "NECROMANCIE", "TRANSMUTATION", "DIVINATION", "METAMORPHOSE"] },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
spellSchema.virtual("id").get(function () {
    return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
spellSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

// (Étape 4) Export du modèle spell
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("spells", spellSchema);