import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { capsFirst } from "../../helpers";

function PokemonCard({ name, index }) {
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  return (
    <Link to={`/${index}`} className="link">
      <Card>
        <CardMedia className="media_pokemon" image={sprite} />
        <CardContent>
          <Typography className="text_pokemon">
            {`${index}. ${capsFirst(name)}`}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default PokemonCard;
