$(document).ready(function () {
	
	//default search = soccer
		var searchInputValue = "soccer";
	
	getAndPrintJSON(searchInputValue);
	
	
	function getAndPrintJSON(searchInputValue) {

		/*get data from flickr in JSON*/
		$.getJSON('http://www.flickr.com/services/feeds/photos_public.gne?tags=' + searchInputValue + '&format=json&jsoncallback=?', function (myListOfObjects) {

			$.each(myListOfObjects.items, function (index, value) {

				var img = $("<img>").attr("src", value.media.m).attr("id", "cardImg").addClass("image");
				var date = $("<span>").addClass("dateSpan").text(value.date_taken);
				var title = $("<span>").addClass("titleSpan").text(value.title);
				var author = $("<span>").addClass("authorSpan").text(value.author);
				var tags = $("<span>").addClass("tagSpan").text(value.tags);
				var card = $("<div>").addClass("objectCard");
				var column = $("<div>").addClass("column");
				var floatColumn = $("<div>").addClass("floatColumn");

				
				if ($("#mainWrapper").hasClass("row")) {
					$("#mainWrapper").append(column);
					column.prepend(card);
					
					$("#useFlex").addClass("backgroundColor");
				} 
				if ($("#mainWrapper").hasClass("floatRow")) {
					$("#mainWrapper").append(floatColumn);
					floatColumn.prepend(card);
					
					$("#useFloat").addClass("backgroundColor");
				}
				
				card.prepend(img, title, date);
				
			});

			//shows the clicked img in dialog
			$("img").on("click", function () {

				$("#myModal").empty();

				let src = $(this).attr("src");

				$("#myModal").append("<img src=" + src + " >");
				$("#myModal").dialog({modal: true});
				
			});
		});

	}
	
	$("#searchBtn").on("click", function () {

		var searchInputValue = $("#searchInput").val();

		if (searchInputValue == "") {

			alert("Du måste fylla i ett sökord");

		} else {

			//clears mainwrappers children
			$("#mainWrapper").empty();
			
			getAndPrintJSON(searchInputValue);
			
			//clears input field
			$("#searchInput").val("");
		}

	});


	//changes class on mainwrapper from flex to float css
	$("#useFloat").on("click", function () {

		$("#mainWrapper").removeClass("row").addClass("floatRow");
		$(".column").removeClass("column").addClass("floatColumn");
		
		//changes the background of buttons
		$("#useFloat").addClass("backgroundColor");
		$("#useFlex").removeClass("backgroundColor");

	});

	//changes class on mainwrapper from float to flex
	$("#useFlex").on("click", function() {

		$("#mainWrapper").removeClass("floatRow").addClass("row");
		$(".floatColumn").removeClass("floatColumn").addClass("column");
		$(".floatLeft").removeClass("floatLeft");
		
		//changes the background of buttons
		$("#useFloat").removeClass("backgroundColor");
		$("#useFlex").addClass("backgroundColor");

	});
	
	//puts click event on search button if user presses enter key
	var input = document.getElementById("searchInput");

	input.addEventListener("keyup", function (event) {

		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("searchBtn").click();
		}

	});
	


});
