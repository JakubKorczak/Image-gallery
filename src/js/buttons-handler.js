function buttonsHandler(response) {
    //Add number o items to the button
    const $numberOfAllItems = $('#number-items');
    $numberOfAllItems.text(response.length);

    //checkbox event
    let numberOfSelectedItems = 0;
    $('#number-selected').text(numberOfSelectedItems);
    $(".main-content__img-box__checkbox").change(function() {
        const $imgBox = $(this).parent().parent();
        if(this.checked) {
            $imgBox.addClass('active');
            numberOfSelectedItems++;
            $('#number-selected').text(numberOfSelectedItems);
        } else {
            $imgBox.removeClass('active');
            numberOfSelectedItems--;
            $('#number-selected').text(numberOfSelectedItems);
        }
    });

    //modal logic
    let currentDisplayImageIdx = 0;
    function modalHandler() {
        $('.modal-img__counter').text((currentDisplayImageIdx + 1) + "/" + numberOfSelectedItems)
        const modal = $('#modal');
        const btnClose = $("#modal-close");
        if (numberOfSelectedItems) {
            modal.css("display", "block");
        }
        btnClose.on('click', () => {
            modal.css("display", "none");
            currentDisplayImageIdx = 0;
        });
        $(window).on('click', (event) => {
            if ($(event.target).is(modal)) {
                modal.css("display", "none");
                currentDisplayImageIdx = 0;
            }
        });
    }

    //show chosen image after clicki show-selected button
    let choseElementsIdx = [];
    $('#show-selected').on('click', () => {
        modalHandler();

        response.forEach((el, idx) => {
            el.idx = idx + 1;
        });

        choseElementsIdx = [];
        const checkedElements = $('.main-content__img-box__checkbox:checkbox:checked');
        checkedElements.parent().siblings('.main-content__img-box__image').each(function () {
            let choseElement = response.filter((el) => {
                if (el.id === $(this).attr('data-id')) {
                    return el;
                }
            })
            choseElementsIdx.push(choseElement[0].idx);
        });
        $('.modal-img').css("background-image", "url('./asstes/image (" + choseElementsIdx[0] + ").jpg')");
    });

    //buttons events
    $('#select-all').on('click', () => {
        $(".main-content__img-box__checkbox").prop('checked', true);
        $(".main-content__img-box__checkbox").parent().parent().addClass('active');
        numberOfSelectedItems = $(".main-content__img-box__checkbox").length
        $('#number-selected').text(numberOfSelectedItems);
    });

    $('#reset-all').on('click', () => {
        $(".main-content__img-box__checkbox").prop('checked', false);
        $(".main-content__img-box__checkbox").parent().parent().removeClass('active');
        numberOfSelectedItems = 0;
        $('#number-selected').text(numberOfSelectedItems);
    });
    $('#btn-next').on('click', () => {
        if (currentDisplayImageIdx < choseElementsIdx.length - 1) {
            currentDisplayImageIdx++;
            $('.modal-img__counter').text((currentDisplayImageIdx + 1) + "/" + numberOfSelectedItems)
            $('.modal-img').css("background-image", "url('./asstes/image (" + choseElementsIdx[currentDisplayImageIdx] + ").jpg')");
        }
    });
    $('#btn-prev').on('click', () => {
        if (currentDisplayImageIdx > 0) {
            currentDisplayImageIdx--;
            $('.modal-img__counter').text((currentDisplayImageIdx + 1) + "/" + numberOfSelectedItems)
            $('.modal-img').css("background-image", "url('./asstes/image (" + choseElementsIdx[currentDisplayImageIdx] + ").jpg')");
        }
    });

    //keyboard events
    $(document).keydown((e) => {
        if (e.keyCode == 39) {
            if (currentDisplayImageIdx < choseElementsIdx.length - 1) {
                currentDisplayImageIdx++;
                $('.modal-img__counter').text((currentDisplayImageIdx + 1) + "/" + numberOfSelectedItems)
                $('.modal-img').css("background-image", "url('./asstes/image (" + choseElementsIdx[currentDisplayImageIdx] + ").jpg')");
            }
        }
        if (e.keyCode == 37) {
            if (currentDisplayImageIdx > 0) {
                currentDisplayImageIdx--;
                $('.modal-img__counter').text((currentDisplayImageIdx + 1) + "/" + numberOfSelectedItems)
                $('.modal-img').css("background-image", "url('./asstes/image (" + choseElementsIdx[currentDisplayImageIdx] + ").jpg')");
            }
        }
        if (e.keyCode == 27) {
                $('#modal').css("display", "none");
                currentDisplayImageIdx = 0;
        }
    });
}

export { buttonsHandler };
