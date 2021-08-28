import styles from './button.module.scss'

export default function Button({children, variant}) {
  return (
    <button className={`mr-2 ${styles.button} ${styles[`button--${variant}`]}`}>{children}</button>
  )
}