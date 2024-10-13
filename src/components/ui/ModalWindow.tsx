
import styles from './ModalWindow.module.scss'

const WonGameWindow = ({children}:React.PropsWithChildren) =>{
    return<div className={styles.wonGameWindow}>
        <div className={styles.popup}>
           {children}
        </div>
    </div>
}

export default WonGameWindow;