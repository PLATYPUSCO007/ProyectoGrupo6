import Publication from "../models/publication.js"
import fs from "fs";
import path from "path";
import { followUserIds } from "../services/followServices.js";

// Método para hacer una publicación
export const savePublication = async (req, res) => {
  try {

    // Obtener datos del body
    const params = req.body;

  } catch (error) {
    console.log("Error al crear la publicación:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al crear la publicación"
    });
  }
}

