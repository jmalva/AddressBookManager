import styles from './navbar.module.scss'
import Link from "next/link";

export default function Navbar({children}) {

  return (
    <nav>
      {/* TODO make this header more center... */}
      <div className={`py-6 pl-5 ${styles["navbar__bar"]}`}>
        <Link href="/address-book">
        <img src="/logo.svg" alt="addressbook" />
        </Link>
        <h1>Address Book</h1>
      </div>
    </nav>
  );
}