import styles from './input.module.scss'

export default function Input({props, children, icon, label="Label", placeholder, func, name="", maxL, value=""}) {
  return (
    <div className="mb-8">
      <label className="block text-lg mb-4" htmlFor="input">
        {label}
      </label>
      {icon && <img className={styles["input__icon"]} src={`/${icon}`} />}
      {label === "Search" ? (
        <div className='relative mb-8'>
        {icon && <img className={styles["input__icon"]} src={`/${icon}`} />}
        <input
          className={`w-full h-10 pl-8 ${styles.input}`}
          type="text"
          placeholder={placeholder}
          onChange={func}
          name={name}
          maxLength={maxL}
          value={value}
        />
        {children}</div>
      ) : (
        <input
          className={`block w-full ${styles.input}`}
          type="text"
          placeholder={placeholder}
          onChange={func}
          name={name}
          maxLength={maxL}
        />
      )}
    </div>
  );
}