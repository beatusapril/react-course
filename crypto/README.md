# Отслеживание криптовалюты
***
Написать приложение, позволяющее отслеживающее курсы различных криптовалют c помощью сервиса CryptoCompare:
Метод для получения курса конкретной криптовалюты (NAME) - https://min-api.cryptocompare.com/data/price?fsym=<NAME>&tsyms=USD&api_key=<API_KEY&gt;
Для получения вашего API_KEY необходимо зарегистрироваться на сайте https://www.cryptocompare.com/
1) Изначально в списке отслеживаемых компонентов должен быть только Dogecoin
2) На странице приложения должно быть поле ввода для названия криптовалюты (далее НК) и кнопка для отправки запроса
3) После нажатия на кнопку, отправляется запрос на сервер для получения курса по НК
4) Если такая валюта есть, то добавляем ее в список наших валют, которые мы отслеживаем (с проверкой на уникальность)
5) Если валюта в списке, то каждые 5 секунд нужно делать новый запрос на сервер для синхронизации данных
6) При повышении или понижении курса конкретной валюты необходимо сообщить пользователю об этом (любым понятным способом, например, визуально, с помощью стрелочки вверх/вниз)
7) У каждой валюты в списке должна быть кнопка, которая удаляет ее из списка, после удаления больше не требуется отправлять повторные запросы по этой валюте
***    
## Запуск через Webpack    
`npm install`   
`npm run build`  
`npm start`   
Открыть в папке `dist` `index.html`