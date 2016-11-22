var createHeaders = function(keys) {
  var row = $('.pets-headers');

  for(var i = 0; i < keys.length; i++) {
    var head = $('<th>' + keys[i] + '</th>');
    row.append(head);
  }
};

var createData = function(item) {
  return $('<td>' + item + '</td>');
};

var createTable = function(pets) {
  var table = $('.pets-body');
  for (var i = 0; i < pets.length; i++){
    var pet = pets[i];
    var row = $('<tr><td>stuff</td></tr>');
    var name = createData(pet.name);
    var species = createData(pet.species);
    var human = createData(pet.human);
    var mammal = createData(pet.mammal);

    row.prepend(name, species, human, mammal);
    table.append(row);
  }
};


var pets = [
  { name: 'kylo', species: 'dog', human: 'kari', mammal: true },
  { name: 'gecky', species: 'lizard', human: 'dan', mammal: false },
  { name: 'hedwig', species: 'owl', human: 'harry', mammal: false },
  { name: 'crookshanks', species: 'cat', human: 'hermione', mammal: true },
  { name: 'scabbers', species: 'rat', human: 'ron', mammal: true }
];

$(document).ready(function() {
  createHeaders(Object.keys(pets[0]));
  createTable(pets);
});
