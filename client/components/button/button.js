import styles from './button.module.scss'

export default function Button({children, variant,func}) {
  return (
    <button className={`mr-2 ${styles.button} ${styles[`button--${variant}`]}`} onClick={func}>{children}</button>
  )
}