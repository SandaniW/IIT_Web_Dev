$(document).ready(function() {
    $('#nameForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const name = $('#name').val();

        // Error handling: Check if name is empty
        if (!name) {
            $('#responseMessage').html('<div class="alert alert-danger">Name is required.</div>');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/add-name',
            data: { name: name },
            success: function() {
                $('#responseMessage').html('<div class="alert alert-success">Name added successfully!</div>');
                $('#name').val(''); // Clear input
            },
            error: function(xhr) {
                $('#responseMessage').html('<div class="alert alert-danger">' + xhr.responseText + '</div>');
            }
        });
    });
});
