const form = document.querySelector('.js-sendForm');
const phoneInput = form.querySelector('input[name=client_phone]');


phoneInput.addEventListener('input', (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 11);
    const formatted = input.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/, '+7($2)$3-$4-$5');
    e.target.value = formatted;
});

// Функция для валидации номера телефона
function validatePhoneNumber(phone) {
    const phonePattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    return phonePattern.test(phone);
}

phoneInput.addEventListener('input', () => {
    const phone = phoneInput.value.trim();
    if (!validatePhoneNumber(phone)) {
        // Если номер телефона не соответствует шаблону, выдаем предупреждение
        phoneInput.setCustomValidity('Номер телефона должен быть в формате +7(***)***-**-**');
    } else {
        // Если номер телефона соответствует шаблону, сбрасываем предупреждение
        phoneInput.setCustomValidity('');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const client_name = form.querySelector('input[name=client_name]').value.trim();
    const client_phone = phoneInput.value.trim();

    if (client_name === '' || client_phone === '') {
        alert('Введите имя и номер телефона');
        return;
    }

    if (!validatePhoneNumber(client_phone)) {
        alert('Номер телефона должен быть в формате +7(***)***-**-**');
        return;
    }

    const formData = {
        client_name: client_name,
        client_phone: client_phone
    };

    fetch('/api/sendForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Форма успешно отправлена!');
                form.reset(); // Опционально сбрасываем поля формы после успешной отправки
            } else {
                alert('Произошла ошибка при отправке формы.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('При отправке формы что-то пошло не так :(');
        });
});
