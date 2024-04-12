import { Utilisateur } from "../../../../libs/model";
import { connectoDB } from "../../../../libs/connectionMongodb";
import { NextResponse } from "next/server";

// Chercher les utilisateurs avec la journee saisie
export async function GET(req) {
  connectoDB();
  const {jour} = req.query;

  try {
    const utilisateurs = await Utilisateur.find({
      "disponibilites.jour": jour,
    });

    return NextResponse.json({utilisateurs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de la recherche des utilisateurs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Chercher les utilisateurs avec les heures saisies
export async function GETAvecHeure(req) {
  connectoDB();

  const { heure } = req.query;

  try {
    const utilisateurs = await Utilisateur.find({
        $or: 
        [
            {"disponibilites.heure.heureDebut": heure},
            {"disponibilites.heure.heureFin": heure}
        ]
    });

    return NextResponse.json({ utilisateurs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de la recherche des utilisateurs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
