import styles from "./Header.module.css";

const Header = props => {
    return (
        <header className={styles["app-header"]}>
            <h1>Invoicer</h1>
        </header>
    )
}

export default Header;