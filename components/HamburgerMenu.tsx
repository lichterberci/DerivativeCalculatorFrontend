import Link from 'next/link'
import styles from '../styles/HamburgerMenu.module.css'
import { slide as Menu } from 'react-burger-menu'
import React, { useState } from 'react';

export interface INavbarItemData {
    name: string,
    href: string
}

export default function HamburgerMenu(props: { items: INavbarItemData[] }): JSX.Element 
{
	const [isOpen, setIsOpen] = useState(false)
    const { items } = props;
    
    return(<>
        <nav className={styles.outerHolder}> 
            <div className={styles.navbarHolder}>
                {   
                    items.map((item, i) => {
                        return (
                            <Link key={i} className={styles.navBarItem} href={item.href}>
                                { item.name }
                            </Link>  
                        );
                    })
                }
            </div>

            <div className={styles.hamburgerHolder}>
                <Menu 
                  isOpen={isOpen} 
                  onOpen={() => setIsOpen(true)} 
                  onClose={() => setIsOpen(false)} 
                  styles={ stylesDik } 
                  disableOverlayClick 
                  customBurgerIcon={<HamburgerIcon />} 
                  width={'auto'} 
                  className={styles.burgerMenuHolder}
                >
                    {   
                        items.map((item, i) => {
                            return (
                                <Link onClick={() => setIsOpen(false)} key={i} className={styles.hamburgerItem} href={item.href}>
                                    { item.name }
                                </Link>  
                            );
                        })
                    }
                </Menu>
            </div>
        </nav> 
    </>);
} 

var stylesDik = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
    },
    bmBurgerBars: {
      background: '#5e0de0'
    },
    bmBurgerBarsHover: {
      background: '#5e0de0',
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: "white"
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      display:'flex',
      flexDirection: 'column',
    },
    bmMenu: {
      background: '#3D1766',
      padding: '2.5em 3em 0em 1em',
      fontSize: '1.15em',
      overflow: 'hidden',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      width:"100%",  
      color: 'white',
      padding: '1em',
      display:'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    bmItem: {
      display: 'inline-block',
      marginTop:"1.5rem",
      color: 'white',
      textDecoration:"none"
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }


const HamburgerIcon = () => (<div className='p-1/2'><svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></div>)

export const Links = () => (<>
    <Link className='font-bold p-4' href="/">Kezdőlap</Link>
    <Link className='font-bold p-4' href="/">Ellenőrzés</Link>
    <Link className='font-bold p-4' href="/">Gyakorlás</Link>
    <Link className='font-bold p-4' href="/">Rólunk</Link>
    <Link className='font-bold p-4' href="/">Beállítások</Link>
</>)
