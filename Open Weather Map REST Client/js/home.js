$(document).ready(function () {

    var unit = $('#addUnit').val();

    function getCurrent() {
        var conditionDiv = $('#conditionDiv');

        $.ajax({
            type: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?zip=' + $('#addZipCode').val() + ',us&appid=4c82a1275a245eb2f5ee4efe0555471f',
            success: function (data, status) {
                var city = data.name;
                var icon = data.weather[0].icon;
                var main = data.weather[0].main;
                var description = data.weather[0].description;
                var temp = data.main.temp;
                var speed = data.wind.speed;
                var humidity = data.main.humidity;


                var row = '<h2 class="my-5">Current Conditoins in ' + city;
                row += '</h2><div class="row"><div class="col-6 d-flex flex-row">';
                row += '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="icon">';
                row += '<p class="my-auto">' + main + ': ' + description + '</p>';
                row += '</div><div class="col-6">';
                row += '<p>Temperature: ' + temp + ' F</p>';
                row += '<p>Humidity: ' + humidity + '%</p>';
                row += '<p>Wind: ' + speed + ' miles/hour</p>';
                row += '</div></div>';

                conditionDiv.append(row);
            },

            error: function () {

                $('#errorMessages')
                    .append($('<li>')
                        .attr({
                            class: 'list-group-item list-group-item-danger'
                        })
                        .text('Error calling web service open weather to retrieve current weather. Please try again later.'));
            }
        })
    }

    function getFiveDay() {
        var fiveDayDiv = $('#fiveDayDiv');

        var today = (new Date());
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast?zip=' + $('#addZipCode').val() + ',us&cnt=5&exclude=hourly,minutely&appid=4c82a1275a245eb2f5ee4efe0555471f',
            success: function (dataArray) {

                $.each(dataArray.list, function (index, data) {
                    const options = {
                        month: 'long'
                    };
                    var todayString = (new Intl.DateTimeFormat('en-US', options).format(today));

                    var description = data.weather[0].description;
                    var main = data.weather[0].main;
                    var description = data.weather[0].description;
                    var icon = data.weather[0].icon;
                    var temp_min = data.main.temp_min;
                    var temp_max = data.main.temp_max;

                    var row = '<div class = "col-md-2 col-6 text-center">';
                    row += '<p id = "addDate">' + today.getDate() + ' ' + todayString + '</p>';
                    row += '<p><img src="http://openweathermap.org/img/w/' + icon + '.png" alt="icon">     ';
                    row += main + '</p>';
                    row += '<small>H: ' + temp_min + ' F   ';
                    row += 'L: ' + temp_max + ' F</small>';
                    row += '</div>';


                    fiveDayDiv.append(row);
                    today.setDate(today.getDate() + 1);
                })
            },
            error: function (err) {

                $('#errorMessages')
                    .append($('<li>')
                        .attr({
                            class: 'list-group-item list-group-item-danger'
                        })
                        .text('Error calling web service open weather to retrieve 5 day forecast. Please try again later.'));
            }
        })
    }


    //error message
    function checkAndDisplayValidationErrors(input) {
        $('#errorMessages').empty();

        var errorMessages = [];

        input.each(function () {
            if (!this.validity.valid) {
                var errorField = $('label[for=' + this.id + ']').text();
                errorMessages.push(errorField + ' ' + this.validationMessage);
            }
        });

        if (errorMessages.length > 0) {
            $.each(errorMessages, function (index, message) {
                $('#errorMessages').append($('<li>').attr({
                    class: 'list-group-item list-group-item-danger'
                }).text(message));
            });
            // return true, indicating that there were errors
            return true;
        } else {
            // return false, indicating that there were no errors
            return false;
        }
    }

    //validate
    jQuery(document).ready(function ($) {
        $.validator.addMethod("numberonly", function (value, element) {
            return this.optional(element) || /^[0-9]+$/i.test(value);
        }, "Please enter a 5-digit zip code.");
        $('form#addForm').validate({
            errorClass: "error fail-alert",
            validClass: "valid success-alert",
            rules: {
                addZipCode: {
                    required: true,
                    numberonly: true,
                    minlength: 5,
                    maxlength: 5,
                }
            },
            messages: {
                addZipCode: {
                    required: "Please enter a 5-digit zip code.",
                    numberOnly: "Please enter a 5-digit zip code.",
                    minlength: "Please enter a 5-digit zip code.",
                    maxlength: "Please enter a 5-digit zip code."
                }
            },
            submitHandler: function () {
                $('#errorMessages').text('');
                clearContent();
            },
            errorElement: "div",
            errorClass: "list-group-item list-group-item-danger",
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                //Custom position: first name
                if (element.attr("name") == "addZipCode") {
                    $("#errorMessages").html(error);
                }
            }
        })
    });

    function clearContent() {
        $('#fiveDayDiv').empty();
        $('#conditionDiv').empty();
        getCurrent();
        getFiveDay();
    }

})
