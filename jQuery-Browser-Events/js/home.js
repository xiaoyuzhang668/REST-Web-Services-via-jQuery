$(document).ready(function () {
    //    $('#mainInfoDiv').hide();
    $('#akronInfoDiv').hide();

    $('#louisvilleButton').on('click', function () {
        $('#louisvilleInfoDiv').show();
        $('#mainInfoDiv').hide();
        $('#akronInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
    });
    // just another example with styles

    $('#minneapolisInfoDiv').on('click', function () {
        $('#minneapolisWeather').toggle('slow');
    });

    $("tr").hover(
        // in callback
        function () {
            $(this).css("background-color", "WhiteSmoke");
            $(this).css("cursor", "pointer");

        },
        // out callback
        function () {
            $(this).css("background-color", "");
        }
    );
});

$(document).ready(function () {

    // wire up the toggleNumbers button
    $('#toggleNumbers').on('click', function () {
        $('h2').toggle('slow');
    });

    // show that you can do more than one thing at a time in an event
    // handler
    $('#centerUp').on('click', function () {
        $('h1').addClass('text-center');
        $('h2').addClass('text-center');
        $('#buttonDiv').addClass('text-center');
    });

    // just another example with styles
    $('#headingsBlue').on('click', function () {
        $('h1').css('color', 'blue');
    });

    $('div').hover(
        // in callback
        function () {
            $(this).css('background-color', 'CornflowerBlue');
        },
        // out callback
        function () {
            $(this).css('background-color', '');
        });

})
