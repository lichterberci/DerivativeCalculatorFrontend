import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from "../styles/navBar.module.css"

export interface INavbarItemData {
    name: string,
    href: string
}

export default function Navbar (props: { items: INavbarItemData[] }): JSX.Element {

    const { items } = props;

    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", maxWidth:600,alignItems:'center', justifyContent:'space-evenly'}}>
            {   
                items.map((item, i) => {
                    return (
                        <div className={styles.navBarItem} key={i}>
                            <Link className={styles.navBarItem} href={item.href}>
                                { item.name }
                            </Link>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};