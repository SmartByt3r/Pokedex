import React, { FormEvent, useEffect } from "react";
import styles from "./App.module.css";
import Navigation from "./components/Navigation/Navigation";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import {
    GetAllPokemons,
    GetAllPokemonsCount,
    GetPokemon,
    GetPokemonByName,
    PokemonFullDesc,
    PokemonShortDesc,
} from "./services/PokemonAPI";
import { CSSTransition } from "react-transition-group";

function App() {
    //Constants
    const POKEMONS_PER_PAGE = 25;
    //Hooks
    const [pokemons, setPokemons] = React.useState<PokemonShortDesc[]>([]);
    const [pokemonModalVisible, setPokemonModalVisible] =
        React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const offsetCounter = React.useRef<number>(0);
    const pokemonFullDescriptions = React.useRef<PokemonFullDesc>();
    const totalPokemons = React.useRef<number>(0);
    useEffect(() => {
        GetAllPokemons(POKEMONS_PER_PAGE).then(setPokemons);
    }, []);
    useEffect(() => {
        GetAllPokemonsCount().then((count) => {
            totalPokemons.current = count;
        });
    }, [pokemons]);
    //Buttons Event Handlers
    const nextPageHandler = () => {
        if (offsetCounter.current + POKEMONS_PER_PAGE >= totalPokemons.current)
            return;
        setLoading(true);
        offsetCounter.current += POKEMONS_PER_PAGE;
        GetAllPokemons(POKEMONS_PER_PAGE, offsetCounter.current)
            .then((pokemons) => {
                setPokemons(pokemons);
                setLoading(false);
            })
            .catch(() => alert("An error occurred"));
    };
    const previousPageHandler = () => {
        offsetCounter.current -= POKEMONS_PER_PAGE;
        if (offsetCounter.current < 0) {
            offsetCounter.current = 0;
            return;
        }
        setLoading(true);
        GetAllPokemons(POKEMONS_PER_PAGE, offsetCounter.current)
            .then((pokemons) => {
                setPokemons(pokemons);
                setLoading(false);
            })
            .catch(() => alert("An error occurred"));
    };
    //Card click handler
    const pokemonCardClickHandler = async (pokemonId: number) => {
        try {
            const pokemonFullDesc = await GetPokemon(pokemonId);
            pokemonFullDescriptions.current = pokemonFullDesc;
            setPokemonModalVisible(true);
        } catch (error) {
            alert("Pokemon not found");
        }
    };
    //Form contoller
    const [pokemonName, setPokemonName] = React.useState<string>("");
    const searchHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const pokemonFullDesc = await GetPokemonByName(
                pokemonName.toLowerCase()
            );
            pokemonFullDescriptions.current = pokemonFullDesc;
            setPokemonModalVisible(true);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            alert("Pokemon not found");
        }
    };
    //Render
    return (
        <>
            <header data-testid="app-header">
                <Navigation
                    onNextPage={nextPageHandler}
                    onPreviousPage={previousPageHandler}
                    previousButtonDisabled={offsetCounter.current === 0}
                    nextButtonDisabled={
                        offsetCounter.current + POKEMONS_PER_PAGE >=
                        totalPokemons.current
                    }
                />
            </header>
            <main data-testid="app-body">
                <PokemonModal
                    show={pokemonModalVisible}
                    pokemonInfo={pokemonFullDescriptions.current}
                    onClose={() => setPokemonModalVisible(false)}
                />
                <form
                    onSubmit={searchHandler}
                    className={styles["search-form"]}
                >
                    <input
                        type="text"
                        placeholder="Enter pokemon name"
                        onChange={(e) => setPokemonName(e.target.value)}
                    />
                    <button className="button-primary">Search</button>
                </form>
                <CSSTransition
                    in={!isLoading}
                    unmountOnExit
                    timeout={200}
                    classNames={{
                        enter: styles["cards-enter"],
                        enterActive: styles["cards-enter-active"],
                        exit: styles["cards-exit"],
                        exitActive: styles["cards-exit-active"],
                    }}
                >
                    <section className={styles["cards-outlet"]}>
                        {isLoading
                            ? "Loading..."
                            : pokemons.map((pokemon) => (
                                  <PokemonCard
                                      key={pokemon.index}
                                      {...pokemon}
                                      onClick={pokemonCardClickHandler}
                                  />
                              ))}
                    </section>
                </CSSTransition>
            </main>
        </>
    );
}

export default App;
