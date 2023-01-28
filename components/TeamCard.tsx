import styles from "../styles/teamCard.module.css"
import Image from 'next/image'

export default function TeamCard(props:any){

    const {props:_props} = props;


    return( 
        <div className={styles.cardHolder}>
            
            <div className={styles.header}>
                <div style={{background:`linear-gradient(to right, ${_props.colors.primary}, ${_props.colors.secondary})`}} className={styles.banner}></div>
                <div className={styles.infoHolder}>
                    <Image
                        className={styles.profilePic}
                        alt="kép"
                        width={70}
                        height={70}
                        src={`/images/${_props.url}`}
                     />
                    <p className={styles.name}>{_props.name}</p>
                </div>
            </div>

            <div className={styles.responsibilityList}>
                {
                    _props.role.map((role : string,k : number)=>{
                        return(
                            <div className={styles.responsibility}key = {k}>
                                {role}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
