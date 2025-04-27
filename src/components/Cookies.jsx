import { useState, useEffect } from 'react';

function Cookies() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [expireDays, setExpireDays] = useState(7);
  const [storedCookies, setStoredCookies] = useState({});

  // Load all cookies on component mount
  useEffect(() => {
    refreshCookies();
  }, []);

  // Parse cookies from document.cookie
  const parseCookies = () => {
    const cookiesObj = {};
    const cookieString = document.cookie;

    if (cookieString) {
      const cookies = cookieString.split(';');

      cookies.forEach(cookie => {
        const parts = cookie.split('=');
        const cookieName = parts[0].trim();
        const cookieValue = parts.slice(1).join('=');

        cookiesObj[cookieName] = decodeURIComponent(cookieValue);
      });
    }

    return cookiesObj;
  };

  // Refresh the list of stored cookies
  const refreshCookies = () => {
    setStoredCookies(parseCookies());
  };

  // Set a cookie
  const setCookie = (cookieName, cookieValue, days) => {
    if (cookieName.trim() && cookieValue.trim()) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);

      const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookieString;

      refreshCookies();
    }
  };

  // Handle saving a cookie
  const handleSave = () => {
    if (name.trim() && value.trim()) {
      setCookie(name, value, expireDays);
      setName('');
      setValue('');
    }
  };

  // Delete a cookie
  const handleRemove = (cookieName) => {
    document.cookie = `${encodeURIComponent(cookieName)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    refreshCookies();
  };

  // Clear all cookies
  const handleClearAll = () => {
    Object.keys(storedCookies).forEach(cookieName => {
      handleRemove(cookieName);
    });
  };

  return (
    <div className="storage-container">
      <h2>Пример Куки</h2>

      <div className="storage-info">
        <p>
          Куки - это небольшие фрагменты данных, хранящиеся в браузере. Они отправляются на сервер 
          с каждым HTTP-запросом, что делает их полезными для поддержания состояния сессии или отслеживания предпочтений пользователя.
        </p>
        <p>
          В отличие от localStorage и sessionStorage, куки имеют срок действия и ограничены 
          размером около 4КБ. Они могут быть защищены флагами, такими как HttpOnly и Secure.
        </p>
      </div>

      <div className="storage-form">
        <div className="form-group">
          <label htmlFor="cookieName">Имя:</label>
          <input
            id="cookieName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя куки"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cookieValue">Значение:</label>
          <input
            id="cookieValue"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите значение куки"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expireDays">Срок действия (дни):</label>
          <input
            id="expireDays"
            type="number"
            min="1"
            value={expireDays}
            onChange={(e) => setExpireDays(parseInt(e.target.value) || 1)}
          />
        </div>

        <button onClick={handleSave}>Сохранить куки</button>
        <button onClick={handleClearAll}>Очистить всё</button>
      </div>

      <div className="storage-items">
        <h3>Сохраненные куки:</h3>
        {Object.keys(storedCookies).length === 0 ? (
          <p>Нет сохраненных куки</p>
        ) : (
          <ul>
            {Object.entries(storedCookies).map(([cookieName, cookieValue]) => (
              <li key={cookieName}>
                <strong>{cookieName}:</strong> {cookieValue}
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(cookieName)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cookies;
