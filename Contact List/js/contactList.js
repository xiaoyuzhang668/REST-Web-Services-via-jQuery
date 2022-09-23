$(document).ready(function () {
    //    alert("Ready to go.");
    loadContacts();

})

function loadContacts() {

    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://contactlist.us-east-1.elasticbeanstalk.com/contacts',
        success: function (contactArray) {
            $.each(contactArray, function (index, contact) {
                var name = contact.firstName + ' ' + contact.lastName;
                var company = contact.company;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + company + '</td>';
                row += '<td><button type="button" class="btn btn-info">Edit</button></td>';
                row += '<td><button type="button" class="btn btn-danger">Delete</button></td>';
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
