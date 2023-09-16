let currentEntry, currentName, currentScrambledName;

$(function () {
    // When the user clicks on a name in the ul,
    // we need to set the answer to the corresponding id
    Array.from($(".li")).forEach((list, index) => {
        if (index == 0) list.classList.add('active');
        // onclick
        list.addEventListener("click", function () {
            // remove the "active" class from all other lists
            Array.from($(".li")).forEach(li => {
                li.classList.remove('active');
            });
            // add the "active" class
            this.classList.add('active');
            // set tracker variables and helper text
            setCurrent(this.getAttribute("data-id"));
            $('#scrambledWord').text(currentScrambledName);
        });
    });
    // set tracker vaiables to first list element
    setCurrent(names[0].id);
});

function setCurrent(index) {
    currentEntry = names.find((entry) => entry.id == index);
    currentName = currentEntry["name"];
    currentScrambledName = currentEntry["scrambled"];
}

function validateAnswer() {
    if (lives != 0) {
        let answer = $("#userInput").val().replace(/\s{1,}$/gi, '').replace(/[ ]{2,}/g, ' ');

        if (answer === currentName) {
            alert("You got it right!!");
            currentEntry["completed"] = true;
            console.log(currentEntry["elementReferrence"]);
        } else {
            alert("Your answer is wrong!!");
            lives -= 1;
            $("#lives").text(lives);
        }
    }
    else {
        $("#userInput").attr("disabled", "true");
        alert("You have no more lives left. Refresh the page to try again.");
    }
}
