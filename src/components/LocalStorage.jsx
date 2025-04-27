import { useState, useEffect } from 'react';

function LocalStorage({ theme, toggleTheme }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storedItems, setStoredItems] = useState({});

  useEffect(() => {
    refreshStoredItems();
  }, []);

  const refreshStoredItems = () => {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      items[key] = localStorage.getItem(key);
    }
    setStoredItems(items);
  };

  const handleSave = () => {
    if (key.trim() && value.trim()) {
      localStorage.setItem(key, value);
      refreshStoredItems();
      setKey('');
      setValue('');
    }
  };

  // Remove an item
  const handleRemove = (keyToRemove) => {
    localStorage.removeItem(keyToRemove);
    refreshStoredItems();
  };

  // Clear all items
  const handleClearAll = () => {
    localStorage.clear();
    refreshStoredItems();
  };

  return (
    <div className="storage-container">
      <h2>Пример Локального Хранилища</h2>

      <div className="theme-toggle">
        <label htmlFor="theme-toggle">Тема:
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="theme-toggle"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="toggle-slider"></span>
          </div>
          <span className="toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </label>
      </div>

      <div className="storage-info">
        <p>
          Локальное хранилище предоставляет способ хранения пар ключ/значение в виде строк в браузере.
          В отличие от сессионного хранилища, данные сохраняются даже после закрытия 
          и повторного открытия браузера.
        </p>
        <p>
          Оно идеально подходит для хранения пользовательских настроек или состояния приложения.
        </p>
      </div>

      <div className="storage-form">
        <div className="form-group">
          <label htmlFor="localKey">Ключ:</label>
          <input
            id="localKey"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Введите ключ"
          />
        </div>

        <div className="form-group">
          <label htmlFor="localValue">Значение:</label>
          <input
            id="localValue"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите значение"
          />
        </div>

        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleClearAll}>Очистить всё</button>
      </div>

      <div className="storage-items">
        <h3>Сохраненные элементы:</h3>
        {Object.keys(storedItems).length === 0 ? (
          <p>Нет элементов в локальном хранилище</p>
        ) : (
          <ul>
            {Object.entries(storedItems).map(([itemKey, itemValue]) => (
              <li key={itemKey}>
                <strong>{itemKey}:</strong> {itemValue}
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(itemKey)}
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

export default LocalStorage;
