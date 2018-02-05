import { convertTime } from "./time-converter.js";
import { buttonsHandler } from "./buttons-handler.js";

function buildLayout(response) {

    const $contentContainer = $('#content');
    response.forEach((el, idx) => {
        const time = convertTime(el.timestamp);
        const $imageBox = $(`<div class="main-content__img-box">
            <div class="main-content__img-box__checkbox-container">
                <input class="main-content__img-box__checkbox" id="img-checkbox-${idx}" type="checkbox" name="" value="">
                <label class="main-content__img-box__checkbox--label"for="img-checkbox-${idx}"></label>
            </div>
            <div class="main-content__img-box__image" data-id="${el.id}" id="${el.id}">
            </div>
            <div class="main-content__img-box__description">
                <p class="main-content__img-box__description__text">${el.name}</p>
                <p class="main-content__img-box__description__text main-content__img-box__description__text--modified">
                    <span>Modified:</span> ${time}
                </p>
            </div>
        </div>`);

        $contentContainer.append($imageBox);
        const $boxBackground = $('#' + el.id);
        $boxBackground.css("background-image", "url('./asstes/image (" + (idx + 1) + ").jpg')");
    });

    //add hidden elements for proper layout purpose(based on number of all items)
    if (response.length % 4 !== 0) {
        const rest = 4 - (response.length % 4);
        for (let i = 0; i < rest; i++) {
            const $imageBox = $(`<div class="main-content__img-box hidden-box">
                                    <div class="main-content__img-box__checkbox-container"></div>
                                    <div class="main-content__img-box__image></div>
                                    <div class="main-content__img-box__description"></div>
                                </div>`);
            $contentContainer.append($imageBox);
            $('.hidden-box').css('visibility', 'hidden');
        }
    }

    buttonsHandler(response);
}

export { buildLayout };
