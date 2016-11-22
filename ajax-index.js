$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://petdibs.herokuapp.com/pets';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  // What do we want to happen when we get our response?
  var successCallback = function (response) {
    console.log('success!');

    var body = $('.pets-body');

    $.each(response, function(index, pet){
      console.log(pet);
      var row = $('<tr></tr>');
      var name = $('<td>' + pet.name + '</td>');
      var breed = $('<td>' + pet.breed + '</td>');
      var age = $('<td>' + pet.age + '</td>');

      row.append(name, breed, age);
      body.append(row);
    });

    $('button').hide();
  };

  $('button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });
});
