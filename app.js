// app.js

// Регистрация сервис-воркера
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker зарегистрирован:', reg.scope))
      .catch(err => console.warn('Ошибка регистрации Service Worker:', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('arrayForm');
  const inputsContainer = document.getElementById('inputs');
  const arraysList = document.getElementById('arraysList');

  // Создаём 10 полей для ввода чисел
  for (let i = 0; i < 10; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    inputsContainer.appendChild(input);
  }

  // Загрузка массивов из localStorage
  const loadArrays = () => {
    const arrays = JSON.parse(localStorage.getItem('numberArrays')) || [];
    arraysList.innerHTML = '';
    if (arrays.length === 0) {
      arraysList.innerHTML = '<p>Массивов пока нет.</p>';
      return;
    }
    arrays.forEach((arr, index) => {
      const div = document.createElement('div');
      div.className = 'array-item';
      div.textContent = `Массив ${index + 1}: [${arr.join(', ')}]`;
      arraysList.appendChild(div);
    });
  };

  // Сохранение массива
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = Array.from(inputsContainer.children)
      .map(input => Number(input.value))
      .filter(v => !isNaN(v));

    if (values.length === 10) {
      const arrays = JSON.parse(localStorage.getItem('numberArrays')) || [];
      arrays.push(values);
      localStorage.setItem('numberArrays', JSON.stringify(arrays));
      loadArrays();
      form.reset();
    } else {
      alert('Пожалуйста, введите ровно 10 чисел!');
    }
  });

  loadArrays();
});
