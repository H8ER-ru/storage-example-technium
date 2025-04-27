import LocalStorage from '../components/LocalStorage';

function LocalStoragePage({ theme, toggleTheme }) {
  return (
    <div className="page-container">
      <LocalStorage theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default LocalStoragePage;