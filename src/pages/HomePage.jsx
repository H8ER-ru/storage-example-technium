import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container home-page">
      <h2>Добро пожаловать в примеры хранилищ браузера</h2>
      
      <div className="storage-info">
        <p>
          Этот проект демонстрирует различные способы хранения данных в браузере.
          Выберите один из разделов, чтобы узнать больше и попробовать в действии:
        </p>
        
        <ul className="home-links">
          <li>
            <Link to="/session">Сессионное Хранилище</Link> - хранит данные только на время сессии
          </li>
          <li>
            <Link to="/local">Локальное Хранилище</Link> - сохраняет данные между сессиями
          </li>
          <li>
            <Link to="/indexeddb">IndexedDB</Link> - мощная база данных в браузере
          </li>
          <li>
            <Link to="/cookies">Куки</Link> - классический способ хранения данных
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;