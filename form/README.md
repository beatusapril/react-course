# Задача:
Необходимо реализовать визард. То есть пользователь должен пройти несколько этапов заполнения данных.
Представьте, что вас попросили реализовать функциональность регистрации пользователей.

Общие требования:
- на каждом этапе, внизу будет кнопка "Вперед", которая становится активной, когда все обязательные поля заполнены и все значения валидны
- вывод ошибок - когда/как/где - все это на ваше усмотрение

Этап 1 - пользователь вводит логин и пароль
- логин должен быть в нижнем регистре - обязательное поле
- пароль должен быть более 5х символов - обязательное поле
- пароль должен содержать в себе хотя бы 1 букву и цифру
- пароль необходимо будет пользователю продублировать в дополнительном поле для пароля - чтобы пользователь точно ввел правильный пароль, ибо символы скрыты

Этап 2 - пользователь выбирает тип подписки(представьте, что это какой-нибудь нетфликс)
- либо бесплатный (но карту все равно привязать надо будет на одном из след этапов)
- либо платить надо будет ежемесячно
- либо ежегодно
- оформите этот этап как вам будет угодно
- пользователь должен что-то здесь выбрать

Этап 3 - пользователь вводит персональные данные
- имя - обязательное поле
- фамилия - обязательное поле
- отчество - необязательное поле
- день рождения - необязательное поле
- email - обязательное поле, должна быть проверка на то, что введен валидный email
- пол - мужской/женский - селект - обязательное поле
- больше ли юзеру 18 лет - чекбокс - обязательное поле

Этап 4 - пользователь вводит номер номер карты
- карта должна вводиться по маске, то есть сразу видно, какого формата должны быть данные, плюс ввести, например, буквы не получится
- https://nosir.github.io/cleave.js/ - посмотрите, чтобы понять, о чем идет речь
- формат карты сделайте любой, главное, чтобы была маска
- это обязательное поле

Этап 5 - согласие на обработку персональных данных
- сначала показывайте уже введенный логин и email, чтобы пользователь не забыл, что он до этого ввел
- но эти значения нельзя уже отредактировать, то есть просто текст
- согласие на обработку персональных данных - чекбокс - обязательное поле
- согласие с тем, что будут использоваться куки - чекбокс - обязательное поле

Финал
- покажите все поля, которые он/она заполнили