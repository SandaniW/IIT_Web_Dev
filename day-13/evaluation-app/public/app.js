$(document).ready(function() {
    // Bug 10: Incorrect selector
    $('#submitBtn').on('click', function(event) {
        const word = $('#wordInput').val();
        console.log(word);

        let score = parseInt(0);

        if (word === 'correct') {
            score = parseInt(10);
            $('#scoreDisplay').text('Score: ' + score);
            $('#scoreInput').val(score);
        } else {
            $('#scoreDisplay').text('Score: '+ score);
            $('#scoreInput').val(score);
        }
    });
});
