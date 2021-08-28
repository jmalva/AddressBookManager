import styles from './navbar.module.scss'
import { useRouter } from "next/router"
import Link from 'next/link'

export default function Navlinks({href, label, icon }) {
  const router = useRouter();
  return (
    <li key={`${label}`} className={`${styles['navbar__item']} ${router.pathname == (href) ? styles['navbar__item--active'] : ""}`}>
      <Link href={href}>
        <a className="no-underline flex items-center">
          <img className="pr-4" src={`/${icon}.svg`} alt={`Icon ${label}`}/>
          {label}
        </a>
      </Link>
    </li>
  )
}
