import React from "react";
import styles from "./PokemonCard.module.css";

export interface PokemonCardProps {
    index: number;
    name: string;
    imageURI: string;
    onClick: (pokemonId: number) => void;
}

function PokemonCard(props: PokemonCardProps) {
    return (
        <button
            className={styles.card}
            onClick={() => props.onClick(props.index)}
            data-testid="pokemon-card"
        >
            <h2>{`#${props.index} ${props.name}`}</h2>
            <img src={props.imageURI} alt="" />
        </button>
    );
}

export default PokemonCard;
