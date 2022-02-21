import styles from "./card.module.scss";

export default function DisplayCard({ children, props }) {
  return (
    <div className={styles.card}>
      <div className={`flex flex-wrap flex-col text-center `}>{children}</div>
    </div>
  );
}
