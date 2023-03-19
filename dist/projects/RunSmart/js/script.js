//Slider - jquery slick-slider

$(document).ready(function () {
    $(".carousel__inner").slick({
        dots: true,
        dotsClass: "slick-dots",
        focusOnSelect: true,
        speed: 800,
        adoptiveHeght: true,
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icons/chevronLeft.svg" alt="left"></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icons/chevronRight.svg" alt="right"></button>',
        responsive: [
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    });

    //smooth scroll and pageup appearing
    $('a[href^="#"]').click(function () {
        let path = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(path).offset().top + "px" });
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn("slow");
        } else {
            $(".pageup").fadeOut();
        }
    });
});

// forEach - принимает только стрелочную функцию, btn - это параметр функции имя элемента псевдомассива который хранит объект EVENT
// const arrBtn = document.querySelectorAll('.catalog-tabs__item'); //querySelectorAll - возвращает псевдомассив (.length, index и foreach )
// arrBtn.forEach((btn) => { // btn - это существующий объект, то есть сам элемент со страницы
//   btn.addEventListener('click', function() { //addEventListener - выбираем тип собтия и описываем само событие (изменения элемента .etc)
//     btn.classList.add('active');
//   })
// })

//Делегирование событий ниже
//Обработчик присваивается родительскому элементу, делегирование исп. для сокращения кода =)
//target-свойство объекта event. addEventListener всегда принимает три параметра: тип ивента, объект и необязательный парметр с опциями (capture, once.... etc)

let currentBtn = "fitness"; //Какой таб будет активным при загрузке страницы
let currentCatalog = "fitness-models"; //Какой из каталогов будет активен при загрузке страницы

const tabBtn = document.querySelector(".catalog-tabs"); //получаем родителькский элемент табов то есть контейнер с табами
const catalogList = document.querySelectorAll(".catalog-content"); //Псевдомассив каталогов (три каталога - массив с тремя элементами)

const tabList = document.querySelectorAll(".catalog-tabs__item"); //Получаем отдельный таб на него позже прим событие

tabBtn.addEventListener("click", (event) => {
    // Делегирование - навешиваем событие на родителя
    const target = event.target; //присваиваем ссылку на с-во таргет так мы понимаем на какой именно элемент родителя примениться событие(клик)

    tabList.forEach((btn) => {
        //убрать active у всех табов из списка табов (прим на родителя)
        btn.classList.remove("active");
    });

    catalogList.forEach((catalog) => {
        //убрать active у всех каталогов из списка каталогов (прим на родителя)
        catalog.classList.remove("active");
    });

    if (target.classList.contains("catalog-tabs__item")) {
        //Если в списке классов есть наш класс добавим ему active
        target.classList.add("active");
        currentBtn = target.id; //текущий таб изменит id на id объекта который был кликнут, станет активным
    } else if (target.parentNode.classList.contains("catalog-tabs__item")) {
        target.parentNode.classList.add("active");
        currentBtn = target.parentNode.id;
    }

    currentCatalog = document.querySelector(`#${currentBtn}-models`); // ссылка на объект в зависимости от нажатой кнопки ID которой интерполирован в аргументы селектора
    currentCatalog.classList.add("active"); // Добавляем класс выбранному выше каталогу
});

//Второе событие флип карточек с товаром
const catalog = document.querySelector(".catalog"); //получаем объект-родитель содержащий все каталоги со всеми карточками

catalog.addEventListener("click", (event) => {
    //Делегируем на него событие
    event.preventDefault(); //предотвращаем стандартное поведение ссылок/внимательно используем этот метод!
    const link = event.target; //понимаем конкретную ссылку на которую был осущ клик

    if (link.classList.contains("product-card__descr-side")) {
        link.parentNode.classList.remove("active");
        link.parentNode.nextSibling.nextSibling.classList.add("active");
    }

    if (link.classList.contains("product-card__promo-side")) {
        link.parentNode.classList.remove("active");
        link.parentNode.previousSibling.previousSibling.classList.add("active");
    }
});

//Модальные окна

$("[data-modal=consultation]").on("click", function () {
    $("#consultation, .overlay").fadeIn("slow");
});

$(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
});

$(".button_mini").each(function (i) {
    $(this).on("click", function () {
        $("#order .modal__subtitle").text(
            $(".product-card__title").eq(i).text()
        );
        $("#order, .overlay").fadeIn("slow");
    });
});

function validateForm(form) {
    $(form).validate({
        debug: true,
        rules: {
            userName: {
                required: true,
                minlength: 2,
            },
            phoneNumber: "required",
            userEmail: {
                required: true,
                email: true,
            },
        },
        messages: {
            userName: {
                required: "Пожалуйста, введите своё имя",
                minlength: jQuery.validator.format("Введите {0} символа!"),
            },
            phoneNumber: "Пожалуйста, введите свой номер телефона",
            userEmail: {
                email: "Неправильно введен адрес почты",
                required: "Пожалуйста, введите свою почту",
            },
        },
    });
}

validateForm(".consulting .form");
validateForm("#consultation .form");
validateForm("#order .form");

$("input[name=phoneNumber]").mask("+7 (999) 999-99-99");

$("form").submit(function (e) {
    e.preventDefault();

    //если метод valid нашей формы false (то есть форма не прошла валидацию) - выйти из отправки формы (запрещаем невалидным формам отправляться)
    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "./mailer/smart.php",
        data: $(this).serialize(),
    }).done(function () {
        $(this).find("input").val("");
        $("#consultation, #order").fadeOut();
        $(".overlay, #thanks").fadeIn("slow");
        $("form").trigger("reset");
    });
    return false;
});

new WOW().init();