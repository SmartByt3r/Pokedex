import { PokemonFullDesc } from "../../services/PokemonAPI";
import styles from "./PokemonModal.module.css";
import { CSSTransition } from "react-transition-group";

interface PokemonModalProps {
    show: boolean;
    pokemonInfo?: PokemonFullDesc;
    onClose: () => void;
}

function PokemonModal(props: PokemonModalProps) {
    const { show, pokemonInfo } = props;
    if (!pokemonInfo) return <></>;
    return (
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={300}
            classNames={{
                enter: styles["modal-enter"],
                enterActive: styles["modal-enter-active"],
                exit: styles["modal-exit"],
                exitActive: styles["modal-exit-active"],
            }}
        >
            <div
                className={styles.modal}
                onClick={props.onClose}
                data-testid="pokemon-modal"
            >
                <div
                    className={styles["modal-content"]}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles["modal-header"]}>
                        <button
                            className="button-primary"
                            onClick={props.onClose}
                        >
                            X
                        </button>
                    </div>
                    <div className={styles["modal-body"]}>
                        <img src={pokemonInfo.imageURI} alt="" />
                        <h2>#{pokemonInfo.index}</h2>
                        <h2>{pokemonInfo.name}</h2>
                        <h3>Types</h3>
                        <ul>
                            {pokemonInfo.types.map((type) => (
                                <li key={type}>{type}</li>
                            ))}
                        </ul>
                        <h3>Weight</h3>
                        <p>{pokemonInfo.weight} Kg</p>
                        <h3>Sprites</h3>
                        <div className={styles["sprites-container"]}>
                            {pokemonInfo.sprites
                                .filter((sprite) => sprite)
                                .map((sprite, index) => (
                                    <img
                                        key={`${sprite}${index}`}
                                        src={sprite}
                                        alt="sprite"
                                        className={styles.sprite}
                                    />
                                ))}
                        </div>
                        <h3>Movements</h3>
                        <ul>
                            {pokemonInfo.movements.map((movement) => (
                                <li key={movement}>{movement}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default PokemonModal;
