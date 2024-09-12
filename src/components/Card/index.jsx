import "./styles.css";
import translate from "translate";
import { useEffect, useState } from "react";

// Defina o provedor de tradução, por exemplo, Google:
translate.engine = "google"; // ou outro provedor
// translate.key = 'YOUR_API_KEY'; // se necessário para o provedor

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

// Função assíncrona para traduzir o texto
async function translateText(text) {
  try {
    const translatedText = await translate(text, { to: "pt" });
    return translatedText;
  } catch (error) {
    console.error("Erro ao traduzir:", error);
    return text; // Retorna o original se houver erro na tradução
  }
}

export default function Card({ data: personagem }) {
  const [genderTranslate, setGenderTranslate] = useState("");
  const [speciesTranslate, setSpeciesTranslate] = useState("");
  const [statusTranslate, setStatusTranslate] = useState("");

  // Usando useEffect para lidar com a tradução dos três campos de forma assíncrona
  useEffect(() => {
    async function fetchTranslations() {
      try {
        const [translatedGender, translatedSpecies, translatedStatus] =
          await Promise.all([
            translateText(personagem.gender),
            translateText(personagem.species),
            translateText(personagem.status),
          ]);

        setGenderTranslate(translatedGender);
        setSpeciesTranslate(translatedSpecies);
        setStatusTranslate(translatedStatus);
      } catch (error) {
        console.error("Erro ao traduzir:", error);
      }
    }

    fetchTranslations();
  }, [personagem.gender, personagem.species, personagem.status]);

  function dotColor(status) {
    switch (status) {
      case "Alive":
        return <div className="status_icon alive"></div>;
      case "Dead":
        return <div className="status_icon dead"></div>;
      default:
        return <div className="status_icon unknown"></div>;
    }
  }

  return (
    <div id="card">
      <img src={personagem.image} alt={personagem.name} />
      <div className="info">
        <h2>{personagem.name}</h2>
        <div>
          <span className="line">
            {dotColor(personagem.status)}
            {`${capitalizeFirstLetter(
              statusTranslate
            )} - ${capitalizeFirstLetter(speciesTranslate)}`}
          </span>
          <span>{capitalizeFirstLetter(genderTranslate)}</span>
        </div>
        <span>Origem: {personagem.origin.name}</span>
      </div>
    </div>
  );
}
