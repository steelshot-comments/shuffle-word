<?php
function generateRandomInteger(range) {
  return Math.floor(Math.random() * range);
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
?>