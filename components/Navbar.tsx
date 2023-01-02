import Link from "next/link";
import styles from "../styles/navbar.module.css";

export interface INavbarItemData {
    name: string,
    href: string
}

export default function Navbar (props: { items: INavbarItemData[] }): JSX.Element {

    const { items } = props;

    return (
        <div className={styles.myContainer}>
            <nav className={styles.navBarHolder}>
            {   
                items.map((item, i) => {
                    return (
                        <li className={styles.navBarItem} key={i}>
                            <Link href={item.href}>
                                { item.name }
                            </Link>
                        </li>
                    );
                })
            }
            </nav>
        </div>
    );
};