import mongoose, { Schema } from "mongoose";

const utilisateurSchema = new Schema(
    {
        prenom:String,
        nom:String,
        email:String,
        numeroDEmploye: { type: String, index: true },
        disponibilites:[{
            jour:String,
            heure:[{heureDebut:String,heureFin:String}]
        }]
    },
    {timestamps:true}
);

utilisateurSchema.index({ numeroDEmploye: 1 }, { unique: true });

export const Utilisateur = 
mongoose.models?.Utilisateur || mongoose.model("Utilisateur", utilisateurSchema);
