import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <h1>
                    VRecipes
                </h1>
            </div>
        </div>
    )
}

export default Header;