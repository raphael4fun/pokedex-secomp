import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";

export default function PokemonCard(props) {
  const { pokemonInfo } = props;
  return (
    <Card border="dark">
      <Card.Header>
        <Row>
          <Col xs={5} lg={4}>
            <Image
              src={pokemonInfo.sprite}
              roundedCircle
              className="bg-white"
            />
          </Col>
          <Col xs={7} lg={8} className="d-flex align-self-center">
            <Card.Title>{pokemonInfo.name}</Card.Title>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text></Card.Text>
        {pokemonInfo.types.map((type, index) => {
          return (
            <Badge pill variant="danger" className="mr-2" key={index}>
              {type.type.name}
            </Badge>
          );
        })}
      </Card.Body>
    </Card>
  );
}
