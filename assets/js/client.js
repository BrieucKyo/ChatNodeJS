var socket = io.connect('https://chatnodejs-betournator.c9users.io/');

var pseudo = prompt('Quel est votre pseudo ?');
    while (pseudo == null) {
        var pseudo = prompt('Rentrez votre pseudo.');
    }
socket.emit('new_client', pseudo);

socket.on('message', function(data) {
    insertMessage(data.pseudo, data.message);
})

socket.on('new_client', function(pseudo) {
    $('#zone_chat ul').append('<li>' + pseudo + ' a rejoint le Chat </li>');
})

$('#formulaire_chat').submit(function () {
    var message = $('#message').val();
    socket.emit('message', message); 
    insertMessage(pseudo, message); 
    $('#message').val('').focus(); 
    return false; 
});

function insertMessage(pseudo, message) {
    $('#zone_chat ul').append('<li><strong>' + pseudo + '</strong> ' + " : " + message + '</li>');
   
    $('#zone_chat').scrollTop($('#zone_chat')[0].scrollHeight);
}