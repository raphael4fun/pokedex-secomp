import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";

import Header from "../components/Header/header";
import PokemonCard from "../components/Card/card";
import Pagination from "../components/Pagination/pagination";
import api from "../services/api";

const pageCount = 12;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      request: null,
      pokemons: [],
      maxPages: 0
    };
  }

  renderCard = pokemon => {
    return (
      <Col xs={8} md={6} lg={4} className="mb-3" key={pokemon.id}>
        <PokemonCard pokemonInfo={pokemon} />
      </Col>
    );
  };

  componentDidMount() {
    const { pageNumber } = this.props.match.params;
    this.requestData(pageNumber);
  }

  componentDidUpdate(prevProps) {
    const { pageNumber } = this.props.match.params;
    pageNumber !== prevProps.match.params.pageNumber &&
      this.requestData(pageNumber);
  }

  componentWillUnmount() {
    if (this.state.request !== null) this.state.request.cancel();
  }

  requestData = async page => {
    const { request } = this.state;
    page = parseInt(page, 10);

    request !== null && request.cancel();
    const source = axios.CancelToken.source();

    try {
      const response = await api.get(
        `?offset=${(page - 1) * pageCount}&limit=${pageCount}`,
        {
          cancelToken: source.token
        }
      );

      const pokemonDetails = await Promise.all(
        response.data.results.map(
          async pokemon =>
            await axios.get(pokemon.url, { cancelToken: source.Token })
        )
      );

      this.setState({
        pokemons: pokemonDetails.map(pokemon => {
          return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            sprite: pokemon.data.sprites.front_default,
            types: pokemon.data.types
          };
        }),
        maxPages: response.data.count / pageCount
      });
    } catch (e) {
      this.setState({
        pokemons: []
      });
    }
  };

  render() {
    const { pageNumber } = this.props.match.params;
    return (
      <>
        <Header />
        <Jumbotron className="p-5 bg-white">
          <h4>Todos os Pokemóns</h4>
        </Jumbotron>
        <Container>
          {this.state.pokemons.length === 0 ? (
            <h1>Nenhuma Informação Encontrada</h1>
          ) : (
            <Row>{this.state.pokemons.map(this.renderCard)}</Row>
          )}
        </Container>
        <Pagination maxPages={this.state.maxPages} pageNumber={pageNumber} />
      </>
    );
  }
}

export default Main;
