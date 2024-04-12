import { connectoDB } from "../../../../../libs/connectionMongodb";
import { NextResponse } from "next/server";
import { Utilisateur } from "../../../../../libs/model";

// Ajouter nouvel utilisateur
export async function GET(req, { params }) {
  const { id } = params;
  connectoDB;
  const utilisateurs = await Utilisateur.findOne({ numeroDEmploye: id });
  return NextResponse.json({ utilisateurs }, { status: 200 });
}

// Faire modification utilisateur
export async function PUT(req) {
  await connectoDB();
  
  const { numeroDEmploye, prenom, nom, email, disponibilites } =
    await req.json();
  console.log(numeroDEmploye, " Les nouvelles données ", disponibilites);

  try {
    const modifierUtilisateur = await Utilisateur.findOneAndUpdate(
      { numeroDEmploye: numeroDEmploye },
      {
        $set: {
          prenom: prenom,
          nom: nom,
          email: email,
          disponibilites: disponibilites,
        },
      },
      { new: true }
    );

    if (!modifierUtilisateur) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Mise à jour réussie",
        utilisateur: modifierUtilisateur,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour", error: error.message },
      { status: 500 }
    );
  }
}

// Faire la suppression utilisateur
export async function DELETE(res, { params }) {
  const { id } = params;
  console.log(id);
  connectoDB();
  await Utilisateur.findOneAndDelete({ numeroDEmploye: id });
  return NextResponse.json({ message: "Suppression succesful" });
}
