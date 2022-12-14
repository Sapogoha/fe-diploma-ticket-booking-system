[![Build status](https://ci.appveyor.com/api/projects/status/0aw4ixm1sjbkp7qj/branch/main?svg=true)](https://ci.appveyor.com/project/Sapogoha/fe-diploma-ticket-booking-system/branch/main)

# Дипломная работа к профессии frontend-разработчик (Система бронирования ЖД билетов)

## Demo

[Система бронирования ЖД билетов](https://sapogoha.github.io/fe-diploma-ticket-booking-system)

## Краткое описание задачи дипломной работы:

Создать SPA на React для сервиса покупки билетов на ж/д, сверстанное по [макетам в Figma](https://www.figma.com/file/7981GjEsjSpBUKolk4xFoT/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2?node-id=0%3A1), в котором в качестве API используется [внешний сервер](https://netology-trainbooking.netoservices.ru/).

## Используемые технологии

-  React
-  React Router
-  Redux
-  Redux Toolkit
-  Redux Persist
-  SCSS

## Уточнения

Главная и страница подтверждения заказа адаптированы для устройств с шириной экрана от 960px, другие страницы - от 1152px, брейкпоинты выбирал на свое усмотрение, поскольку в макете этого нет.

Приложение написано для Google Chrome, в Safari могут быть незначительные ошибки при изменении масштаба страницы.

## Описание проекта

### Основные элементы

1. Вагон
1. Направление
1. Группа направлений
1. Место (билет)

### Вагон

1. Вагон может быть одним из типов: сидячий, люкс (СВ), купе, плацкарт
1. У каждого типа вагона своя карта рассадки мест.
1. У каждого вагона своя стоимость билетов.
1. Для каждого вагона есть возможность выбора дополнительных услуг:
   бельё, кондиционер и Wi-Fi.
1. Для некоторых вагонов стоимость белья включена в стоимость билета
   (стоимость белья не должна прибавляться при формировании конечной стоимости билета).

### Направление

1. Направление - путь движения вагона из одного города в другой.
1. Направление предполагает движение поезда только в одну сторону.
1. Направление имеет дату отправления и дату прибытия.

### Группа направлений

1. Используется для того, чтобы обеспечить возможность
   путешествия из одного города в другой и обратно.
1. Объединяет в себе два направления

### Место (билет)

1. Имеет свой номер на карте вагона
1. Может быть занято другим пассажиром
1. Закреплено за конкретным направлением

### Далее [Информация по API](./reference/api.md)
