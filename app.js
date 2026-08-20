const board = document.getElementById("board");
const counter = document.getElementById("counter");

let flippedCount = 0;


/* =========================================================
   ДАННЫЕ СТИКЕРОВ
========================================================= */

const stickers = [

    {
        text: "Виктор!!!",
        title: "ВИКТОР",
        nodes: ["контекст", "договорённость", "вопрос", "результат"],
        actions: "Вспомнить контекст → найти переписку → определить открытый вопрос → связаться → зафиксировать результат"
    },

    {
        text: "Иванов — узнать про макет",
        title: "МАКЕТ",
        nodes: ["статус", "правки", "решение", "согласование"],
        actions: "Проверить версию → уточнить правки → получить решение → определить следующий этап"
    },

    {
        text: "Надо что-то сделать с продажами колбас",
        title: "ПРОДАЖИ КОЛБАС",
        nodes: ["SKU", "каналы", "динамика", "цена", "конкуренты"],
        actions: "Найти просадку → определить причины → проверить гипотезы → выбрать меры"
    },

    {
        text: "Встреча с сетью в четверг",
        title: "ВСТРЕЧА С СЕТЬЮ",
        nodes: ["цель", "клиент", "предложение", "переговоры"],
        actions: "Определить результат → изучить клиента → подготовить предложение → определить точки переговоров"
    },

    {
        text: "Придумать акцию на шашлыки",
        title: "АКЦИЯ НА ШАШЛЫКИ",
        nodes: ["цель", "SKU", "оффер", "каналы", "экономика"],
        actions: "Выбрать продукты → проверить маржу → изучить конкурентов → выбрать механику → собрать предложение"
    },

    {
        text: "Петя обещал цифры!!!",
        title: "ДАННЫЕ ОТ ПЕТИ",
        nodes: ["контекст", "показатели", "срок", "источник"],
        actions: "Восстановить договорённость → определить данные → получить → проверить → использовать"
    },

    {
        text: "Соцсети опять стоят",
        title: "СОЦСЕТИ",
        nodes: ["контент", "площадки", "причина", "ресурс", "план"],
        actions: "Определить провал → найти причину → проверить материалы → сформировать контент-план"
    },

    {
        text: "Посмотреть конкурентов",
        title: "КОНКУРЕНТЫ",
        nodes: ["ассортимент", "цена", "промо", "позиционирование"],
        actions: "Выбрать игроков → сравнить SKU → изучить цены и промо → найти сильные решения"
    },

    {
        text: "Новая упаковка — что там?",
        title: "НОВАЯ УПАКОВКА",
        nodes: ["статус", "концепция", "производство", "сроки"],
        actions: "Проверить этап → выяснить решения → найти препятствия → определить дату готовности"
    },

    {
        text: "Позвонить дизайнеру",
        title: "ДИЗАЙНЕР",
        nodes: ["задача", "правки", "решения", "результат"],
        actions: "Собрать вопросы → обсудить спорные места → согласовать правки → определить новую версию"
    },

    {
        text: "Идея: дегустация",
        title: "ДЕГУСТАЦИЯ",
        nodes: ["цель", "аудитория", "продукт", "формат", "эффект"],
        actions: "Определить цель → выбрать продукт → выбрать формат → найти площадку → определить результат"
    },

    {
        text: "Страховка машины",
        title: "СТРАХОВКА",
        nodes: ["полис", "срок", "условия", "решение"],
        actions: "Проверить полис → сравнить условия → выбрать вариант → оформить"
    },

    {
        text: "Записаться к стоматологу",
        title: "СТОМАТОЛОГ",
        nodes: ["приём", "специалист", "клиника", "время"],
        actions: "Определить нужный приём → выбрать специалиста → найти окно → записаться"
    },

    {
        text: "Спросить у Олега про бюджет",
        title: "БЮДЖЕТ",
        nodes: ["план", "расходы", "остаток", "лимит"],
        actions: "Уточнить период → сверить расходы → получить актуальный лимит → зафиксировать"
    },

    {
        text: "Отчёт по продвижению",
        title: "ОТЧЁТ",
        nodes: ["активности", "охват", "расходы", "продажи", "эффект"],
        actions: "Собрать данные → сравнить каналы → оценить эффективность → сформировать выводы"
    },

    {
        text: "Почему у нас просели сосиски?",
        title: "ПРОСАДКА СОСИСОК",
        nodes: ["SKU", "каналы", "цена", "наличие", "конкуренты"],
        actions: "Найти момент падения → сегментировать → проверить причины → сформировать гипотезы"
    },

    {
        text: "Нужно обновить презентацию",
        title: "ПРЕЗЕНТАЦИЯ",
        nodes: ["данные", "ассортимент", "визуал", "сценарий"],
        actions: "Найти устаревшее → обновить информацию → заменить материалы → проверить логику"
    },

    {
        text: "Катя ждёт фотографии",
        title: "ФОТОГРАФИИ",
        nodes: ["назначение", "SKU", "архив", "качество"],
        actions: "Уточнить задачу → выбрать нужные кадры → найти недостающие → передать комплект"
    },

    {
        text: "Проверить цены у конкурентов",
        title: "ЦЕНОВОЙ АНАЛИЗ",
        nodes: ["SKU", "упаковка", "цена", "промо", "позиционирование"],
        actions: "Сопоставить продукты → собрать цены → учесть промо → найти ценовые разрывы"
    },

    {
        text: "Что делать с остатками?",
        title: "ОСТАТКИ",
        nodes: ["объём", "срок", "оборачиваемость", "каналы", "решение"],
        actions: "Найти проблемные SKU → определить причину → оценить варианты реализации → выбрать решение"
    },

    {
        text: "Идея: набор для пикника",
        title: "НАБОР ДЛЯ ПИКНИКА",
        nodes: ["состав", "аудитория", "цена", "упаковка", "канал"],
        actions: "Сформировать состав → рассчитать цену → определить формат → проверить конкурентов"
    },

    {
        text: "Согласовать баннер",
        title: "БАННЕР",
        nodes: ["цель", "оффер", "визуал", "бренд", "площадка"],
        actions: "Проверить сообщение → сверить бренд → собрать комментарии → передать финальную версию"
    },

    {
        text: "Позвонить в типографию",
        title: "ТИПОГРАФИЯ",
        nodes: ["тираж", "материал", "формат", "срок", "стоимость"],
        actions: "Определить параметры → запросить расчёт → согласовать производство → передать файлы"
    },

    {
        text: "Найти нормального фотографа",
        title: "ФОТОГРАФ",
        nodes: ["задача", "стиль", "портфолио", "бюджет", "ТЗ"],
        actions: "Сформировать требования → найти кандидатов → сравнить портфолио → выбрать → дать ТЗ"
    },

    {
        text: "Пятница — отправить материалы",
        title: "МАТЕРИАЛЫ",
        nodes: ["получатель", "состав", "версия", "формат"],
        actions: "Проверить комплект → проверить версии → отправить → получить подтверждение"
    },

    {
        text: "Надо разобраться с рекламой",
        title: "РЕКЛАМА",
        nodes: ["каналы", "бюджет", "цели", "результат", "эффективность"],
        actions: "Собрать кампании → сопоставить расходы и результаты → найти слабые места → перераспределить ресурс"
    },

    {
        text: "Клиент просил каталог",
        title: "КАТАЛОГ",
        nodes: ["потребность", "ассортимент", "цены", "формат"],
        actions: "Уточнить запрос → проверить актуальность → подготовить нужную версию → отправить"
    },

    {
        text: "Идея: конкурс в соцсетях",
        title: "КОНКУРС",
        nodes: ["цель", "аудитория", "механика", "приз", "результат"],
        actions: "Определить цель → придумать механику → выбрать приз → подготовить публикацию → определить метрики"
    },

    {
        text: "Уточнить сроки производства новой упаковки",
        title: "ПРОИЗВОДСТВО",
        nodes: ["макет", "материалы", "производство", "логистика", "дата"],
        actions: "Проверить этап → получить производственный срок → учесть логистику → определить дату запуска"
    },

    {
        text: "Сколько денег осталось на рекламу?",
        title: "РЕКЛАМНЫЙ БЮДЖЕТ",
        nodes: ["план", "факт", "обязательства", "остаток"],
        actions: "Сверить бюджет → вычесть расходы → учесть обязательства → определить свободный ресурс"
    },

    {
        text: "Поговорить с начальником про выставку",
        title: "ВЫСТАВКА",
        nodes: ["цель", "аудитория", "стоимость", "результат"],
        actions: "Определить пользу → оценить стоимость → сформировать предложение → обсудить решение"
    },

    {
        text: "Купить подарок маме",
        title: "ПОДАРОК",
        nodes: ["повод", "интересы", "бюджет", "варианты"],
        actions: "Определить повод → вспомнить предпочтения → подобрать варианты → выбрать и купить"
    },

    {
        text: "Оплатить интернет",
        title: "ИНТЕРНЕТ",
        nodes: ["счёт", "срок", "оплата", "подтверждение"],
        actions: "Проверить счёт → оплатить → проверить подтверждение"
    },

    {
        text: "Поменять масло в машине",
        title: "ТО МАШИНЫ",
        nodes: ["пробег", "масло", "сервис", "обслуживание"],
        actions: "Проверить историю → определить спецификацию → записаться → выполнить замену"
    },

    {
        text: "Когда-нибудь сделать свой проект",
        title: "СВОЙ ПРОЕКТ",
        nodes: ["идея", "проблема", "пользователь", "ценность", "MVP"],
        actions: "Выбрать идею → определить проблему → описать пользователя → собрать минимальную версию → проверить гипотезу"
    },

    {
        text: "Разобрать фотографии на компьютере",
        title: "ФОТОАРХИВ",
        nodes: ["архив", "дубликаты", "события", "структура", "backup"],
        actions: "Разобрать архив → удалить мусор → сгруппировать → привести структуру в порядок → сохранить копию"
    },

    {
        text: "Надо начать нормально спать",
        title: "РЕЖИМ СНА",
        nodes: ["режим", "вечер", "утро", "ограничения"],
        actions: "Определить проблему → выбрать режим → убрать препятствия → наблюдать → скорректировать"
    },

    {
        text: "Забрать посылку",
        title: "ПОСЫЛКА",
        nodes: ["пункт", "срок", "маршрут", "получение"],
        actions: "Проверить срок → выбрать время → забрать → проверить содержимое"
    },

    {
        text: "Идея: рецепты с нашей продукцией",
        title: "РЕЦЕПТЫ",
        nodes: ["контент", "продукт", "аудитория", "формат", "пилот"],
        actions: "Выбрать продукты → определить формат → сделать пилот → оценить реакцию"
    },

    {
        text: "Не забыть про отпуск",
        title: "ОТПУСК",
        nodes: ["период", "работа", "бюджет", "направление", "логистика"],
        actions: "Выбрать даты → согласовать → определить бюджет → сравнить варианты → забронировать"
    }

];


/* =========================================================
   ДОПОЛНИТЕЛЬНЫЕ СТИЛИ
   Переворот сделан через масштабирование по X,
   а не через rotateY, чтобы текст оборота
   гарантированно отображался.
========================================================= */

const flipStyles = document.createElement("style");

flipStyles.textContent = `

    .sticker-inner {
        position: relative !important;
        transform-style: flat !important;
        transition:
            transform 0.32s cubic-bezier(.4,0,.2,1) !important;
    }

    .sticker-front,
    .sticker-back {
        position: absolute !important;
        inset: 0 !important;

        width: 100% !important;
        height: 100% !important;

        backface-visibility: visible !important;
        -webkit-backface-visibility: visible !important;

        transform: none !important;
    }

    .sticker-back {
        display: none !important;

        padding: 14px !important;

        background: #fffdf3 !important;

        color: #332b2b !important;

        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;

        overflow: hidden !important;
    }

    .sticker.show-back .sticker-front {
        display: none !important;
    }

    .sticker.show-back .sticker-back {
        display: flex !important;
    }

    .back-title {
        font-size: 15px !important;
        line-height: 1.25 !important;
        font-weight: bold !important;
        color: #a15f68 !important;
        text-align: center !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .mindmap {
        width: 100% !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .mind-root {
        font-size: 15px !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .mind-node {
        font-size: 15px !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .mind-actions {
        font-size: 15px !important;
        line-height: 1.35 !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

`;

document.head.appendChild(flipStyles);


/* =========================================================
   СОЗДАНИЕ СТИКЕРА
========================================================= */

function createSticker(data, index) {

    const sticker = document.createElement("div");

    sticker.className = "sticker";

    sticker.dataset.index = index;


    /* -----------------------------------------------------
       РАЗМЕР
    ----------------------------------------------------- */

    const stickerWidth = 170;
    const stickerHeight = 135;


    /* -----------------------------------------------------
       СЛУЧАЙНАЯ ПОЗИЦИЯ
    ----------------------------------------------------- */

    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;


    const x =
        Math.random() *
        Math.max(
            20,
            boardWidth - stickerWidth - 20
        );


    const y =
        Math.random() *
        Math.max(
            20,
            boardHeight - stickerHeight - 20
        );


    const rotation =
        Math.random() * 14 - 7;


    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;

    sticker.style.transform =
        `rotate(${rotation}deg)`;


    /* -----------------------------------------------------
       HTML СТИКЕРА
    ----------------------------------------------------- */

    sticker.innerHTML = `

        <div class="sticker-inner">

            <div class="sticker-front">

                ${escapeHTML(data.text)}

            </div>


            <div class="sticker-back">

                <div class="back-title">
                    ${escapeHTML(data.title)}
                </div>


                <div class="mindmap">

                    <div class="mind-root">
                        ${escapeHTML(data.title)}
                    </div>


                    <div class="mind-branches">

                        ${data.nodes.map(node => `

                            <div class="mind-node">
                                ${escapeHTML(node)}
                            </div>

                        `).join("")}

                    </div>


                    <div class="mind-actions">
                        ${escapeHTML(data.actions)}
                    </div>

                </div>

            </div>

        </div>

    `;


    const inner =
        sticker.querySelector(".sticker-inner");

    const front =
        sticker.querySelector(".sticker-front");

    const back =
        sticker.querySelector(".sticker-back");


    /* =====================================================
       ПЕРЕВОРОТ
    ===================================================== */

    sticker.addEventListener("click", function(event) {

        event.stopPropagation();


        const isFlipped =
            sticker.classList.contains("show-back");


        if (!isFlipped) {

            /* -------------------------------------------------
               Начало переворота
            ------------------------------------------------- */

            sticker.classList.add("flipping");

            sticker.style.zIndex = "100";


            inner.style.transform =
                "scaleX(0.02)";


            setTimeout(() => {

                /* ---------------------------------------------
                   В МОМЕНТ "ТОНКОГО" СТИКЕРА
                   меняем сторону
                --------------------------------------------- */

                sticker.classList.add("show-back");

                sticker.classList.add("flipped");

                sticker.classList.remove("flipping");


                /* ---------------------------------------------
                   Возвращаем ширину
                --------------------------------------------- */

                requestAnimationFrame(() => {

                    inner.style.transform =
                        "scaleX(1)";

                });


                flippedCount++;

                counter.textContent =
                    flippedCount;

            }, 170);


        } else {

            /* -------------------------------------------------
               Обратный переворот
            ------------------------------------------------- */

            sticker.classList.add("flipping");


            inner.style.transform =
                "scaleX(0.02)";


            setTimeout(() => {

                sticker.classList.remove("show-back");

                sticker.classList.remove("flipped");

                sticker.classList.remove("flipping");


                requestAnimationFrame(() => {

                    inner.style.transform =
                        "scaleX(1)";

                });


                flippedCount--;

                counter.textContent =
                    flippedCount;


                setTimeout(() => {

                    sticker.style.zIndex = "2";

                }, 350);

            }, 170);

        }


        createSparkle(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       HOVER
    ===================================================== */

    sticker.addEventListener("mouseenter", () => {

        if (
            !sticker.classList.contains("flipping") &&
            !sticker.classList.contains("show-back")
        ) {

            inner.style.transform =
                "translateY(-9px) scale(1.04)";

        }

    });


    sticker.addEventListener("mouseleave", () => {

        if (
            !sticker.classList.contains("flipping")
        ) {

            inner.style.transform =
                "scaleX(1)";

        }

    });


    return sticker;
}


/* =========================================================
   ЗАЩИТА ТЕКСТА
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* =========================================================
   ЭФФЕКТ ✦
========================================================= */

function createSparkle(x, y) {

    const sparkle =
        document.createElement("div");


    sparkle.className =
        "sparkle";


    sparkle.textContent =
        Math.random() > 0.5
            ? "✦"
            : "✧";


    sparkle.style.left =
        `${x}px`;


    sparkle.style.top =
        `${y}px`;


    document.body.appendChild(
        sparkle
    );


    setTimeout(() => {

        sparkle.remove();

    }, 700);

}


/* =========================================================
   СОЗДАНИЕ ВСЕХ СТИКЕРОВ
========================================================= */

function renderStickers() {

    board.querySelectorAll(".sticker")
        .forEach(sticker => sticker.remove());


    stickers.forEach(
        (data, index) => {

            const sticker =
                createSticker(
                    data,
                    index
                );


            board.appendChild(
                sticker
            );

        }
    );

}


/* =========================================================
   ЗАПУСК
========================================================= */

renderStickers();
   ПЕРВИЧНЫЙ ЗАПУСК
========================================================= */

renderStickers();
