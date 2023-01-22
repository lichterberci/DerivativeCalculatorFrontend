import Link from 'next/link'
import { slide as Menu } from "react-burger-menu"
import styles from '../styles/burger.module.css'

export interface INavbarItemData {
    name: string,
    href: string
}


export default function HamburgerMenu(props: { items: INavbarItemData[] }): JSX.Element 
{
    const { items } = props;
    
    return(
        <div className={styles.holderNuzi}> 
        
            <div style={{display:"flex", flexDirection:"row", maxWidth:600,alignItems:'center', justifyContent:'space-evenly'}}>
                {   
                    items.map((item, i) => {
                        return (
                            <div className={styles.navBarItem} key={i}>
                                <Link href={item.href}>
                                    { item.name }
                                </Link>
                            </div>
                        );
                    })
                }
            </div>

            {/* <div className='relative p-2'>
                <Menu customBurgerIcon={<HamburgerIcon />} width={'auto'} className='left-0 top-12' >
                    <Links />
                </Menu>
            </div> */}
        </div> 
    )
} 




const HamburgerIcon = () => (<div className='p-1/2'><svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></div>)

export const Links = () => (<>
    <Link className='font-bold p-4' href="/">Home</Link>
    <Link className='font-bold p-4' href="/">About</Link>
</>)
