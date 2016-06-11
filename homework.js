// Initial array of creatures
	var creatures = ['serpent', 'cerberus', 'manticore', 'satyr', 'dragon', 'mermaid', 'dalek', 'unicorn', 'harpy', "pegasus"];

	function creatureGifs(){
		$('#creatures').empty();
		var creature = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + creature + "&limit=10&api_key=dc6zaTOxFJmzC";
		
		// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);

			//loop through response array
			for (var i = 0; i < response.data.length; i++) {
				response.data[i]
		
			// Creates a div cage for the creature
			var creatureDiv = $('<div class="creature">');

			// Retrieves the Rating Data
			var rating = response.data[i].rating;

			// Creates an element to have the rating displayed
			var p = $('<p>').text( "Rating: " + rating);

			// Displays the rating
			creatureDiv.append(p);
			
			// Creates an element to hold the still image 
			var stillCreature = $('<img>').attr("src", response.data[i].images.fixed_height_still.url);
			var animCreature = $('<img>').attr("data-animated", response.data[i].images.fixed_height.url);

			// Appends the image
			creatureDiv.append(stillCreature);

			// Puts the new creature button at the end of the list of buttons
			$('#creatures').append(creatureDiv);
		};

		});

	}

	// ========================================================

	//  function for displaying creature buttons
	function creatureButtons(){ 

		// Clears the div before adding new buttons
		$('#creatureDiv').empty();

		// Loops through the array of creatures
		for (var i = 0; i < creatures.length; i++){

			// generates a button for each creature
		    var a = $('<button>') 
		    a.addClass('creature'); 
		    a.attr('data-name', creatures[i]); 
		    a.text(creatures[i]); 
		    $('#creatureDiv').append(a); 
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addCreature').on('click', function(){


		// This line of code will grab the input from the textbox
		var creature = $('#creature-input').val().trim();

		// The creature from the textbox is then added to the array
		creatures.push(creature);
		
		
		creatureButtons();

		
		return false;
	})



	$(document).on('click', '.creature', creatureGifs);



	creatureButtons();
