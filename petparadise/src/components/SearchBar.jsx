// SearchBar is a CONTROLLED component
// The value is controlled by parent via useState - typical controlled pattern
import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or breed..."
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')}>X</button>
      )}
    </div>
  )
}
