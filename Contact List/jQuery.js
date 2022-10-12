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
    $('h1').addClass('text-center');
    $('h2').addClass('text-center');
    $('#yellowHeading').text('Yellow Team');
    $('#yellowHeading').css('background-color', 'yellow');
    $('#redHeading').css('background-color', 'red');
    $('#blueHeading').css('background-color', 'CornflowerBlue');
    $('#orangeHeading').css('background-color', 'orange');
    $('#oops').hide();
    $('#footerPlaceholder').hide();
    $('#footer').append('p').text('Cathy Zhang xiaoyuzhang668@gmail.com');
    $('#footer p').css({
        'font-family': 'Courier',
        'font-size': '24px'
    });
    $('#yellowTeamList').append('p').html('<li>Joseph</li><li>Simon</li>');
});

$(document).ready(function () {

    // wire up the toggleNumbers button
    $('#toggleNumbers').on('click', function () {
        $('h2').toggle('slow');
    });

    // show that you can do more than one thing at a time in an event 
    // handler
    $('#centerUp').on('click', function () {
        $('h1').toggle('text-center');
        $('h2').toggle('text-center');
        $('#buttonDiv').addClass('text-center');
    });

    // just another example with styles
    $('#headingsBlue').on('click', function () {
        $('h1').css('color', 'blue');
    });
})

$(document).ready(function () {
    // remove a class from an element
    $("#first").removeClass("text-center");
    // add two classes to an element
    $("#newButton").addClass("btn btn-default");
    // create a new HTML element
    $("#emptyDiv").append("p").text("A new paragraph of text...");
    // set a CSS style on an element
    $("#first").css({
        "color": "blue",
        "font-size": "68px",
        "font-weight": "bold"
    });

})
