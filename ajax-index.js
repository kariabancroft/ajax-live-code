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
    body.empty(); // Clear this out to start with to ensure we are populating fresh

    $.each(response, function(index, pet){
      // console.log(pet);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + pet.id + '>' + pet.name + '</a></td>');
      var breed = $('<td>' + pet.breed + '</td>');
      var age = $('<td>' + pet.age + '</td>');

      row.append(name, breed, age);
      body.append(row);
    });

    toggleTableView(true);
  };

  $('#load-pet-button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.pet-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var showSuccess = function(pet) {
    var section = $('.pet-details');
    var name = $('<strong>Name</strong><div>' + pet.name + '</div>');
    var breed = $('<strong>Breed</strong><div>' + pet.breed + '</div>');
    var age = $('<strong>Age</strong><div>' + pet.age + '</div>');
    var owner = $('<strong>Owner</strong><div>' + pet.owner + '</div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, breed, age, owner);

    toggleTableView(false);
  };

  var showFailure = function(xhr) {
    var section = $('.pet-details');
    section.html('<strong>Error has occurred</strong>');

    toggleTableView(false);
  }

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  };



  // POST STUFF (from Wednesday w/ Dan)
  var postCallback = function() {
    alert("POST worked just fine!");
  };

  var addPetCallback = function(event) {
    // The default action on submit is to refresh
    // the page! Not what we want!
    event.preventDefault();

    console.log("Sending pet data!");

    // jQuery knows how to take form data and turn
    // it into something we can send with our POST
    // request. This process is called serialization.
    var petData = $(this).serialize();

    console.log("Pet data is " + petData);

    // Send the POST. Just like GET, but with data!
    $.post(url, petData, postCallback);
  };

  // We'll attach ourselves to the "submit" event
  // on our input form. It has a few differences from
  // waiting for a click on a button:
  //   * The event happens on the form, not the button,
  //       so we'll have access to form data
  //   * Submit can be triggered by clicking the button
  //       or by pressing enter
  $('#add-pet-form').submit(addPetCallback);
});
