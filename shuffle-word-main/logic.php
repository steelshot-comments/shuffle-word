<?php
  require "shuffle.php";
  $file = fopen("names.xml", "r") or die("Unable to open file!");
  echo "$file";
  $filesize = filesize($file);
  $xmlstring = fread($file, $filesize);
  $xml = simplexml_load_string($xmlstring, "SimpleXMLElement", LIBXML_NOCDATA);
  $json = json_encode($xml);
  $array = json_decode($json,TRUE);
  echo "array";
  shuffleArray(names);

  // set tracker vaiables to first list element
  setCurrent(names[0].id);
?>

<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Unscramble the names</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="./font/css/alpino.css" />
    <script
      src="https://code.jquery.com/jquery-3.7.0.min.js"
      integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="
      crossorigin="anonymous"
    ></script>
    <script src="./phpscript.js"></script>
  </head>

  <body class="min-h-full text-gray-200 bg-gray-800 grid place-items-center">
    <h1 class="text-5xl text-orange-600 font-['Alpino-Bold'] text-center py-2">
      Unscramble all the names to win!
    </h1>
    <div class="mx-auto py-10 flex gap-10 relative">
      <section class="flex flex-col gap-7 justify-between">
        <div>
          <div class="relative z-0 w-96 mb-3">
            <input
              type="text"
              id="userInput"
              class="block font-['Alpino-Regular'] py-2 px-0 w-full text-lg bg-transparent border-0 border-b-[1.5px] appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              for="users-guess"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
              >
              Enter your guess
            </label>
          </div>
          <button class="btn" onclick="validateAnswer()">Check</button>
        </div>
        <div class="flex flex-col gap-1 justify-center items-baseline">
          <span
            id="scrambledWord"
            class="text-['Alpino-Regular'] text-xl mb-0.5"
          >
            
          </span>
          <button
            id="reshuffleButton"
            role="tooltip"
            class="btn mb-1"
            onclick="reshuffle()"
          >
            Click to re-shuffle
          </button>
          <div class="text-sm">
            You have&nbsp;<span
              id="remainingShuffles"
              class="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-700 text-orange-400 border border-orange-400"
              >5</span>
              &nbsp;re-shuffles left
          </div>
        </div>
        <div class="text-3xl">
          You have&nbsp;<span id="lives" class="text-2xl font-medium px-1.5 rounded bg-gray-700 text-orange-400 border border-orange-400">5</span>&nbsp;lives left
        </div>
      </section>
      <ul
        id="namesUL"
        class="w-48 max-h-96 rounded-lg overflow-scroll text-sm border border-gray-600 rounded-lg"
      >
      <?php
        // for each object in the array
        forEach($names as $entry){
          // "data-" attributes store extra info that is not visible.
          // without the data prefix, browsers think we are using an inbuilt attribute
          entry["scrambled"] = shuffleName(entry["name"]);
          echo "<li class='li' data-id='$entry['id']'>$entry['scrambled']</i>";
        };
      ?>
      </ul>
    </div>
  </body>
</html>