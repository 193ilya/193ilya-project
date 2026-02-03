// Обработка формы
window.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                agreement: document.getElementById('agreement').checked
            };
            
            // Валидация
            if (!validateForm(formData)) {
                return;
            }
            
            // Блокировка кнопки отправки
            const submitBtn = supportForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // Отправка данных (эмуляция запроса)
            setTimeout(function() {
                // Здесь должен быть реальный запрос на сервер
                // Например: fetch('https://formspree.io/f/your-form-id', { ... })
                
                // Эмуляция успешной отправки
                showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                
                // Очистка формы
                supportForm.reset();
                
                // Разблокировка кнопки
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
            }, 1500);
        });
    }
    
    // Функция валидации
    function validateForm(data) {
        if (!data.name || data.name.trim().length < 2) {
            showNotification('Пожалуйста, введите ваше имя', 'error');
            return false;
        }
        
        if (!data.phone || !/^[\+]?[0-9\s\-\(\)]+$/.test(data.phone)) {
            showNotification('Пожалуйста, введите корректный номер телефона', 'error');
            return false;
        }
        
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return false;
        }
        
        if (!data.agreement) {
            showNotification('Необходимо согласие на обработку персональных данных', 'error');
            return false;
        }
        
        return true;
    }
    
    // Функция показа уведомлений
    function showNotification(message, type) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#f44336';
        }
        
        // Добавляем в DOM
        document.body.appendChild(notification);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Добавляем CSS анимации
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
});