$(document).ready(function () {
    //    $('#mainInfoDiv').hide();
    $('#akronInfoDiv').hide();
    $('#minneapolisInfoDiv').hide();
    $('#louisvilleInfoDiv').hide();


    $('#louisvilleButton').on('click', function () {
        $('#louisvilleInfoDiv').show();
        $('#mainInfoDiv').hide();
        $('#akronInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
    });
    // just another example with styles
    $('#akronButton').on('click', function () {
        $('#akronInfoDiv').show();
        $('#mainInfoDiv').hide();
        $('#louisvilleInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
    });
    $('#mainButton').on('click', function () {
        $('#mainInfoDiv').show();
        $('#akronInfoDiv').hide();
        $('#louisvilleInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
    });

    $('#minneapolisButton').on('click', function () {
        $('#minneapolisInfoDiv').show();
        $('#akronInfoDiv').hide();
        $('#louisvilleInfoDiv').hide();
        $('#mainInfoDiv').hide();
    });

    $('#akronWeather').hide();
    $('#louisvilleWeather').hide();
    $('#minneapolisWeather').hide();

    $('#minneapolisInfoDiv').on('click', function () {
        $('#minneapolisWeather').toggle('slow');
    });
    $('#akronWeatherButton').on('click', function () {
        $('#akronWeather').toggle('slow');
    });
    $('#louisvilleInfoDiv').on('click', function () {
        $('#louisvilleWeather').toggle('slow');
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
