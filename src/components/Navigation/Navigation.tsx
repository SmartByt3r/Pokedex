import styles from "./Navigation.module.css";

function Navigation(props: {
    onPreviousPage: () => void;
    onNextPage: () => void;
    previousButtonDisabled?: boolean;
    nextButtonDisabled?: boolean;
}) {
    return (
        <nav className={styles.navigation}>
            <button
                className="button-primary"
                onClick={props.onPreviousPage}
                disabled={props.previousButtonDisabled}
            >
                &lt;
            </button>

            <section className={styles.logo}>
                <img src="/logo.png" alt="Logo" />
                <h1>Pokédex</h1>
            </section>

            <button
                className="button-primary"
                onClick={props.onNextPage}
                disabled={props.nextButtonDisabled}
            >
                &gt;
            </button>
        </nav>
    );
}

export default Navigation;
