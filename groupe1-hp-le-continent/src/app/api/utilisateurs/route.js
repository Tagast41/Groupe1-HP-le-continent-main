import { NextResponse } from "next/server";
import { connectoDB } from "../../../../libs/connectionMongodb";
import { Utilisateur } from "../../../../libs/model";

export async function GET(req, res) {
  connectoDB();
  const utilisateurs = await Utilisateur.find();
  return NextResponse.json({ utilisateurs });
}

export async function POST(req, res) {
  try {
    connectoDB();
    const { prenom, nom, email, numeroDEmploye, disponibilites } =
      await req.json();
      console.log(numeroDEmploye , "Voici le numero d'employe")
    await Utilisateur.create({
      prenom,
      nom,
      email,
      numeroDEmploye,
      disponibilites,
    });

    return NextResponse.json({ message: "Utilisateur created" });
  } catch (error) {
    console.log("Erreur lors de creation de l'utilisateur", error);
  }
}


