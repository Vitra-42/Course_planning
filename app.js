const board = document.getElementById("board");
const counter = document.getElementById("counter");

let flippedCount = 0;


/* =========================================================
   ПРИНУДИТЕЛЬНЫЕ СТИЛИ ДЛЯ ОБОРОТНОЙ СТОРОНЫ
   ---------------------------------------------------------
   Этот блок специально добавлен в JS, чтобы старый CSS
   не мог скрыть текст обратной стороны.
========================================================= */

const forcedStickerStyles = document.createElement("style");

forcedStickerStyles.textContent = `

    .sticker {
        position: absolute !important;
        width: 170px !important;
        height: 135px !important;
        perspective: 1200px !important;
        cursor: pointer !important;
        z-index: 2;
    }

    .sticker-inner {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        transform-style: preserve-3d !important;
        transform-origin: center center !important;

        transition:
            transform 0.7s cubic-bezier(.2,.8,.2,1) !important;
    }

    .sticker-front,
    .sticker-back {
        position: absolute !important;

        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;

        width: 100% !important;
        height: 100% !important;

        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;

        overflow: hidden !important;
    }


    /* ПЕРЕДНЯЯ СТОРОНА */

    .sticker-front {
        z-index: 2 !important;
    }


    /* ОБРАТНАЯ СТОРОНА */

    .sticker-back {
        z-index: 1 !important;

        transform:
            rotateY(180deg)
            translateZ(1px) !important;

        display: flex !important;

        flex-direction: column !important;

        align-items: center !important;

        justify-content: flex-start !important;

        visibility: visible !important;

        opacity: 1 !important;

        color: #332b2b !important;

        background: #fffdf3 !important;

        padding: 14px !important;

        box-sizing: border-box !important;
    }


    /* ПРИНУДИТЕЛЬНО ПОКАЗЫВАЕМ КОНТЕНТ */

    .sticker-back-content {
        display: flex !important;

        flex-direction: column !important;

        width: 100% !important;
        height: 100% !important;

        visibility: visible !important;
        opacity: 1 !important;

        color: #332b2b !important;

        font-family:
            "Trebuchet MS",
            Arial,
            sans-serif !important;
    }


    .back-title {
        display: block !important;

        width: 100% !important;

        margin: 0 0 8px 0 !important;

        font-family:
            "Trebuchet MS",
            Arial,
            sans-serif !important;

        font-size: 15px !important;

        line-height: 1.25 !important;

        font-weight: bold !important;

        color: #a15f68 !important;

        text-align: center !important;

        text-transform: uppercase !important;

        letter-spacing: 0.5px !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    .mindmap {
        display: flex !important;

        flex-direction: column !important;

        align-items: center !important;

        gap: 6px !important;

        width: 100% !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    .mind-root {
        display: block !important;

        width: auto !important;

        max-width: 95% !important;

        padding: 6px 9px !important;

        border-radius: 8px !important;

        background: #f3c3c8 !important;

        font-family:
            "Trebuchet MS",
            Arial,
            sans-serif !important;

        font-size: 15px !important;

        line-height: 1.3 !important;

        font-weight: bold !important;

        color: #332b2b !important;

        text-align: center !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    .mind-branches {
        display: flex !important;

        flex-wrap: wrap !important;

        justify-content: center !important;

        align-items: center !important;

        gap: 5px !important;

        width: 100% !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    .mind-node {
        display: block !important;

        padding: 5px 7px !important;

        background: #e8edf8 !important;

        border-radius: 5px !important;

        font-family:
            "Trebuchet MS",
            Arial,
            sans-serif !important;

        font-size: 15px !important;

        line-height: 1.3 !important;

        color: #332b2b !important;

        text-align: center !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    .mind-actions {
        display: block !important;

        width: 100% !important;

        margin-top: 5px !important;

        padding: 0 4px !important;

        font-family:
            "Trebuchet MS",
            Arial,
            sans-serif !important;

        font-size: 15px !important;

        line-height: 1.4 !important;

        color: #655d5d !important;

        text-align: left !important;

        visibility: visible !important;

        opacity: 1 !important;
    }


    /* =====================================================
       ПЕРЕВОРОТ
    ===================================================== */

    .sticker.flipped .sticker-inner {
        transform:
            rotateY(180deg)
            scale(1.8) !important;

        filter:
            drop-shadow(
                0 20px 30px
                rgba(40,20,10,0.4)
            ) !important;
    }


    .sticker.flipped:hover .sticker-inner {
        transform:
            rotateY(180deg)
            scale(1.8) !important;
    }


    /* =====================================================
       ОБЫЧНЫЙ HOVER
    ===================================================== */

    .sticker:not(.flipped):hover .sticker-inner {
        transform:
            translateY(-9px)
            scale(1.04) !important;

        filter:
            drop-shadow(
                0 12px 12px
                rgba(40,20,10,0.25)
            ) !important;
    }


    /* =====================================================
       МОБИЛЬНАЯ ВЕРСИЯ
    ===================================================== */

    @media (max-width: 900px) {

        .sticker {
            width: 145px !important;
            height: 115px !important;
        }

        .sticker.flipped .sticker-inner {
            transform:
                rotateY(180deg)
                scale(1.75) !important;
        }

        .sticker.flipped:hover .sticker-inner {
            transform:
                rotateY(180deg)
                scale(1.75) !important;
        }
    }


    @media (max-width: 600px) {

        .sticker {
            width: 135px !important;
            height: 105px !important;
        }

        .sticker.flipped .sticker-inner {
            transform:
                rotateY(180deg)
                scale(1.7) !important;
        }

        .sticker.flipped:hover .sticker-inner {
            transform:
                rotateY(180deg)
                scale(1.7) !important;
        }
    }

`;

document.head.appendChild(forcedStickerStyles);


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
   ЭКРАНИРОВАНИЕ ТЕКСТА
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   СОЗДАНИЕ СТИКЕРА
========================================================= */

function createSticker(data, index) {

    const sticker = document.createElement("div");

    sticker.className = "sticker";

    sticker.dataset.index = index;


    /* -----------------------------------------------------
       ПОЗИЦИЯ
    ----------------------------------------------------- */

    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;

    const stickerWidth = 170;
    const stickerHeight = 135;

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


    /* =====================================================
       HTML СТИКЕРА
    ===================================================== */

    const nodesHTML = data.nodes
        .map(node => {

            return `
                <div class="mind-node">
                    ${escapeHTML(node)}
                </div>
            `;

        })
        .join("");


    sticker.innerHTML = `

        <div class="sticker-inner">


            <!-- =========================================
                 ПЕРЕДНЯЯ СТОРОНА
            ========================================== -->

            <div class="sticker-front">

                ${escapeHTML(data.text)}

            </div>


            <!-- =========================================
                 ОБРАТНАЯ СТОРОНА
            ========================================== -->

            <div class="sticker-back">


                <div class="sticker-back-content">


                    <div class="back-title">
                        ${escapeHTML(data.title)}
                    </div>


                    <div class="mindmap">


                        <div class="mind-root">
                            ${escapeHTML(data.title)}
                        </div>


                        <div class="mind-branches">

                            ${nodesHTML}

                        </div>


                        <div class="mind-actions">
                            ${escapeHTML(data.actions)}
                        </div>


                    </div>


                </div>


            </div>


        </div>

    `;


    /* =====================================================
       ПРОВЕРКА — ТЕКСТ ДЕЙСТВИТЕЛЬНО СОЗДАН
    ===================================================== */

    const back = sticker.querySelector(".sticker-back");

    if (back) {

        back.style.visibility = "visible";
        back.style.opacity = "1";

    }


    /* =====================================================
       КЛИК
    ===================================================== */

    sticker.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            const wasFlipped =
                sticker.classList.contains("flipped");


            sticker.classList.toggle(
                "flipped"
            );


            if (!wasFlipped) {

                flippedCount++;

            } else {

                flippedCount--;

            }


            counter.textContent =
                flippedCount;


            createSparkle(
                event.clientX,
                event.clientY
            );

        }
    );


    return sticker;
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


    setTimeout(
        () => {

            sparkle.remove();

        },
        700
    );

}


/* =========================================================
   ЗАКРЫТИЕ СТИКЕРА ПРИ КЛИКЕ ПО ДОСКЕ
========================================================= */

board.addEventListener(
    "click",
    function() {

        const opened =
            board.querySelector(
                ".sticker.flipped"
            );


        if (!opened) {
            return;
        }


        opened.classList.remove(
            "flipped"
        );


        if (flippedCount > 0) {

            flippedCount--;

        }


        counter.textContent =
            flippedCount;

    }
);


/* =========================================================
   СОЗДАНИЕ ВСЕХ СТИКЕРОВ
========================================================= */

function renderStickers() {

    /* На случай повторного запуска */

    board
        .querySelectorAll(".sticker")
        .forEach(sticker => {
            sticker.remove();
        });


    flippedCount = 0;

    counter.textContent = "0";


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
   ПЕРВИЧНЫЙ ЗАПУСК
========================================================= */

renderStickers();
