import styles from './style.module.css'

type Props = {
    posX: number,
    posY: number
}

const Ball:React.FC<Props> = ({posX, posY}) => {
  return (
    <div className={styles.ball} style={{left: posX, top: posY}}></div>
  )
}

export default Ball