import { useEffect, useState } from "react";
import Card from "../../components/Card";
import "./styles.css";

export default function ConsumoApiRick() {
  const [conteudo, setConteudo] = useState(<p>Carregando...</p>);
  const [pages, setPages] = useState(1);
  const [name, setName] = useState();

  function retFilter(filter, name) {
    if (name) {
      return `&${filter}=${name}`;
    }
    return "";
  }

  function LoadButtons() {
    if (pages == 1) {
      return (
        <div className="navPages">
          <a className="previous">&laquo;</a>
          <span className="nowPage">{pages.toString().padStart(2, "0")}</span>
          <a className="next" onClick={() => setPages(pages + 1)}>
            &raquo;
          </a>
        </div>
      );
    } else {
      return (
        <div className="navPages">
          <a className="previous" onClick={() => setPages(pages - 1)}>
            &laquo;
          </a>
          <span className="nowPage">{pages.toString().padStart(2, "0")}</span>
          <a className="next" onClick={() => setPages(pages + 1)}>
            &raquo;
          </a>
        </div>
      );
    }
  }

  async function CarregarPersonagens() {
    const reqOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = `https://rickandmortyapi.com/api/character/?page=${pages}${retFilter(
      "name",
      name
    )}`;
    try {
      const response = await fetch(url, reqOptions);
      if (!response.ok) {
        throw new Error("Deu muito ruin");
      }

      const responseApi = await response.json();
      return responseApi;
    } catch (error) {
      console.error(error);
      setConteudo(<p>Erro ao carregar os personagens</p>);
    }
    // return { info: {}, results: mock };
  }

  async function listarPersonagens() {
    try {
      const { results } = await CarregarPersonagens();
      return results.map((personagem) => (
        <Card key={personagem.id} data={personagem} />
      ));
    } catch (error) {
      console.error(error);
      setConteudo(<p>Erro ao carregar a lista de personagens</p>);
    }
  }

  useEffect(() => {
    async function getConteudo() {
      const personagens = await listarPersonagens();
      setConteudo(personagens);
    }
    getConteudo();
  }, [pages, name]);

  return (
    <div id="RickPage">
      <div className="filter">
        <LoadButtons />
        <div className="filter-name">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>
      <div className="grid">{conteudo}</div>
    </div>
  );
}
