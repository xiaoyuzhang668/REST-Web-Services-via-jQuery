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
    $('#footer').append('p').text('email address');
    $('#footer p').css({
        'font-family': 'Courier',
        'font-size': '24px'
    });
    $('#yellowTeamList').append('p').html('<li>Joseph</li><li>Simon</li>');


});
