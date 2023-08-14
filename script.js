const names = [
  { id: 1, name: "isha agarwal", scrambled: "" },
  { id: 2, name: "ryan dchuna", scrambled: "" },
  { id: 3, name: "rahul gupta", scrambled: "" },
  { id: 4, name: "sahil sheikh", scrambled: "" },
  { id: 5, name: "deva nadar", scrambled: "" },
  { id: 6, name: "johanna rodrigues", scrambled: "" },
  { id: 7, name: "feba thomas", scrambled: "" },
  { id: 8, name: "alethea rangaya", scrambled: "" },
  { id: 9, name: "archi mehta", scrambled: "" },
  { id: 10, name: "yeshaya varghese", scrambled: "" },
];
let currentEntry, currentName, currentScrambledName
let remaingShuffles = 5, lives = 5;

$(function () {
  shuffleArray(names);
  // for each object in the array
  names.forEach((entry) => {
    const listElement = document.createElement("li");
    listElement.classList.add("li");
    // "data-" attributes store extra info that is not visible.
    // without the data prefix, browsers think we are using an inbuilt attribute
    listElement.setAttribute('data-id', entry["id"]);
    entry["scrambled"] = shuffleName(entry["name"]);
    listElement.textContent = entry["scrambled"];
    // adding the list element to the unordered list
    $("#namesUL").append(listElement);
  });

  // When the user clicks on a name in the ul,
  // we need to set the answer to the corresponding id
  Array.from($(".li")).forEach((list, index) => {
    if(index == 0) list.classList.add('active');
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

function generateRandomInteger(range) {
  return Math.floor(Math.random() * range);
}

function setCurrent(index){
  currentEntry = names.find((entry) => entry.id == index);
  currentName = currentEntry["name"];
  currentScrambledName = currentEntry["scrambled"];
}

function shuffleName(s) {
  let name = s.split("");
  name = shuffleArray(name);
  return name.join("");
}

function reshuffle() {
  if(remaingShuffles != 0){
    currentEntry["scrambled"] = shuffleName(currentScrambledName);
    matchingListElement = Array.from($(".li")).find(list => list.getAttribute("data-id") == currentEntry["id"]);
    matchingListElement.innerText = currentEntry["scrambled"];
    currentScrambledName = currentEntry["scrambled"];
    $('#scrambledWord').text(currentScrambledName);
    remaingShuffles -= 1;
    $("#remainingShuffles").text(remaingShuffles);
  }
  else alert("You do not have any more shuffles left");
}

function shuffleArray(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let randomIndex = generateRandomInteger(n);

    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

function validateAnswer() {
  if(lives != 0){
    let answer = $("#userInput").val().replace(/[^A-Za-z\s]/g, '').replace(/[ ]{2,}/g, ' ').toLowerCase();

    if (answer === currentName) {
      alert("You got it right!!");
    } else {
      alert("Your answer is wrong!!");
      lives -= 1;
      $("#lives").text(lives);
    }
  }
  else{
    $("#userInput").attr("disabled", "true");
    alert("You have no more lives left. Refresh the page to try again.");
  }
}
