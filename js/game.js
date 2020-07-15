const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);

  if (hits === maxHits) {
    $(divSelector).removeClass("target");
    $(divSelector).text('');
    endGame();
  }

}

function endGame() {

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

  $("#total-time-played").text(totalPlayedSeconds);
  $(".play-field").addClass("d-none");
  $("#win-message").removeClass("d-none");

}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text('');
    $(event.target).removeClass('target');
    round();
  }
  
}

function startGame(){
  firstHitTime = getTimestamp();
  round();
  $(".game-field").click(handleClick);
}

function init() {
  $("#button-reload").click(
    function(){
      hits = 0;
      firstHitTime = 0;
      $(".play-field").removeClass("d-none");
      $("#win-message").addClass("d-none");
      startGame();
    }
  );
}

$(document).ready(init);