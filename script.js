$(document).ready(function () {
  let pageCounter = 1;
  let animalContainer = $("#animal-info");
  let btn = $("#btn");

  btn.on("click", function () {
    $.ajax({
      url:
        "https://learnwebcode.github.io/json-example/animals-" +
        pageCounter +
        ".json",
      method: "GET",
      success: function (data) {
        renderHTML(data);
      },
      error: function () {
        console.log("We connected to the server, but it returned an error.");
      },
    });

    pageCounter++;
    if (pageCounter > 3) {
      btn.addClass("hide-me");
    }
  });

  function renderHTML(data) {
    let htmlString = "";

    $.each(data, function (i, animal) {
      htmlString +=
        "<p>" + animal.name + " is a " + animal.species + " that likes to eat ";

      $.each(animal.foods.likes, function (ii, like) {
        if (ii === 0) {
          htmlString += like;
        } else {
          htmlString += " and " + like;
        }
      });

      htmlString += " and dislikes ";

      $.each(animal.foods.dislikes, function (ii, dislike) {
        if (ii === 0) {
          htmlString += dislike;
        } else {
          htmlString += " and " + dislike;
        }
      });

      htmlString += ".</p>";
    });

    animalContainer.append(htmlString);
  }
});
