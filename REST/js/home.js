$(document).ready(function () {
    loadDvds();
    addButton();
    saveButton();
    updateButton();
    cancelEdit();

    $('.dvdRecord').hover(
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

var message = document.getElementById("errorMessages");

function loadDvds() {
    clearTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds',
        success: function (dvdArray) {
            $.each(dvdArray, function (index, dvd) {
                var title = dvd.title;
                var releaseYear = dvd.releaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var dvdId = dvd.id;

                var row = '<tr class="dvdRecord">';
                row += '<td class="border-end"><u><a style="cursor: pointer" onclick="displayForm(' + dvdId + ')">' + title + '</a></u></td>';
                row += '<td class="border-end">' + releaseYear + '</td>';
                row += '<td class="border-end">' + director + '</td>';
                row += '<td class="border-end">' + rating + '</td>';
                row += '<td><button type="button" class="shadow-lg btn btn-outline-info"  onclick="showEditForm(' + dvdId + ')">Edit</button></td>';
                row += '<td><button type="button" class="shadow-lg btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
                row += '</tr>';

                contentRows.append(row);
            })
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    })
                    .text('Error calling web service. Please try again later.'));
        }
    })
}

function addButton() {
    $('#addButton').click(function (event) {
        $('#errorMessages').hide();
        $('#dvdTable').hide();
        $('#addFormDiv').show();
    })
}

function saveButton() {

    $('#saveButton').click(function (event) {
        if ($('form#addForm').valid()) {
            $.ajax({
                type: 'POST',
                url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd',
                data: JSON.stringify({
                    title: $('#addTitle').val(),
                    releaseYear: $('#addReleaseYear').val(),
                    director: $('#addDirector').val(),
                    rating: $('#addRating').val(),
                    notes: $('#addNotes').val()
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'dataType': 'json',
                success: function () {
                    $('#errorMessages').empty(),
                        $('#addTitle').val(''),
                        $('#addReleaseYear').val(''),
                        $('#addDirector').val(''),
                        $('#addRating').val(''),
                        $('#addNotes').val(''),

                        $('#addFormDiv').hide();
                    $('#dvdTable').show();
                    loadDvds();
                },
                error: function () {
                    $('#errorMessages')
                        .append($('<li>')
                            .attr({
                                class: 'list-group-item list-group-item-danger'
                            })
                            .text('Error calling web service. Please try again later.'));
                }
            })
        }
    });
}

function showEditForm(dvdId) {
    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function (data, status) {
            $('#editTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear),
                $('#editDirector').val(data.director),
                $('#editRating').val(data.rating),
                $('#editNotes').val(data.notes),
                $('#editDvdId').val(data.id),
                $('#insertTitle').text(data.title)

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    })
                    .text('Error calling web service. Please try again later.'));
        }
    })

    $('#dvdTable').hide();
    $('#editFormDiv').show();
}

function displayForm(dvdId) {
    $('#errorMessages').empty();

    var displayFormDiv = $('#displayFormDiv');

    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function (data, status) {
            $('#dvdTable').hide();


            var title = data.title;
            var releaseYear = data.releaseYear;
            var director = data.director;
            var rating = data.rating;
            var notes = data.notes;

            var row = '<h2>' + title + '</h2><hr>';
            row += '<div class="row">';
            row += '<div class="col-md-3 mt-3">Releasae Year: </div>';
            row += '<div class="col-md-9 mt-3">' + releaseYear + '</div>';
            row += '<div class="col-md-3 mt-3">Director: </div>';
            row += '<div class="col-md-9 mt-3">' + director + '</div>';
            row += '<div class = "col-md-3 mt-3">Rating:</div>';
            row += '<div class = "col-md-9 mt-3">' + rating + '</div>';
            row += '<div class = "col-md-3 mt-3">Notes:</div>';
            row += '<div class = "col-md-9 mt-3">' + notes + '</div></div>';
            row += '<button type="button" id="backButton" class="mt-5 px-5 shadow-lg btn btn-outline-primary" onclick="goBack()">Back</button>';


            displayFormDiv.append(row);

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    })
                    .text('Error calling web service. Please try again later.'));
        }
    })
}

function updateButton(dvdId) {
    $('#updateButton').click(function (event) {
        $.ajax({
            type: 'PUT',
            url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + $('#editDvdId').val(),
            data: JSON.stringify({
                id: $('#editDvdId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            datatype: 'json',
            success: function () {
                cancelEdit();
                loadDvds();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({
                            class: 'list-group-item list-group-item-danger'
                        })
                        .text('Error calling web service.  Please try again later.'));
            }
        })
    })
}

//when user answers yes to confirmation question inside modal, deleteModal
function deleteDvd(dvdId) {
    $('#tempDvdId').val(dvdId);
}

function deleteOneDvd() {

    $.ajax({
        type: 'DELETE',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + $('#tempDvdId').val(),

        success: function () {
            $('#deleteModal').modal('hide');
            loadDvds();
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    })
                    .text('Error calling web service.  Please try again later.'));
        }

    })
}


function clearTable() {
    $('#contentRows').empty();
}

function cancelEdit() {
    $('#errorMessages').empty();

    $('#editTitle').val(''),
        $('#editReleaseYear').val(''),
        $('#editDirector').val(''),
        $('#editRating').val(''),
        $('#editNotes').val(''),

        $('#dvdTable').show();
    $('#editFormDiv').hide();
}

function cancelAdd() {
    $('#errorMessages').empty();

    $('#addTitle').val(''),
        $('#addReleaseYear').val(''),
        $('#addDirector').val(''),
        $('#addRating').val(''),
        $('#addNotes').val(''),

        $('#dvdTable').show();
    $('#addFormDiv').hide();
}

function goBack() {
    $('#displayFormDiv').hide();
    $('#dvdTable').show();
    loadDvds();
    window.location.reload();
}

// for disabling form submissions
// if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


//check not null search category and search term
$('#searchRecord').click(function (event) {
    let searchCategory = document.getElementById("searchSelect");
    let searchTerm = document.getElementById("searchTerm");

    if ((searchTerm.value == null) || (searchTerm.value == '') || (searchCategory.value == null) || (searchCategory.value == '')) {
        message.innerHTML = "<li class='list-group-item list-group-item-danger'>Both Search Category and Search Term are required.</li>";
        event.preventDefault();
        event.stopPropagation();
    }
})

//check title required field and year number field
$('#saveButton').click(function (event) {
    let title = document.getElementById("addTitle");

    if ((title.value == null) || (title.value == '')) {
        message.innerHTML = "<li class='list-group-item list-group-item-danger'>Please enter a title for the Dvd.</li>";

    }
})


//validate form
jQuery(document).ready(function ($) {
    $.validator.addMethod("numberonly", function (value, element) {
        return this.optional(element) || /^[0-9]+$/i.test(value);
    }, "Please enter a 4-digit year.");
    $('form#addForm').validate({
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
        rules: {
            addTitle: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            addReleaseYear: {
                required: true,
                numberonly: true,
                minlength: 4,
                maxLength: 4,
            }
        },
        messages: {
            addTitle: {
                required: "Please enter a title for the Dvd."
            },
            addRelease: {
                required: "Please enter a 4-digit year.",
                numberOnly: "Please enter a 4-digit year.",
                minlength: "Please enter a 4-digit year.",
                maxlength: "Please enter a 4-digit year."
            },
        },
        errorElement: "li",
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            //Custom position: first name
            if (element.attr("name") == "addReleaseYear") {
                $("#newserror").html(error);
                //					console.log($(error).html());
            } else if (element.attr("name") == "addTitle") {
                $("#errorMessages").html(error);
            } else {
                error.insertAfter(element);
            }
        },
    })
});
