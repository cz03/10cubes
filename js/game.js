const numDivs = 36;
const maxHits = 10;
const maxMissHits = 3;

let hits = 1;
let firstHitTime = 0;
let missHits = 0;
let gameStarted = false;

function round() {

  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  $(".game-field").removeClass("miss");
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits > maxHits) {
    endGame();
  }
}

function lose() {
  $("#table").addClass("d-none");
  $("#lose-message").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $("#table").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("")
    round();

    console.log(event.target);
  } else {
    if (gameStarted) {
      $(event.target).addClass("miss");
      missHits = missHits + 1;
      if (missHits === maxMissHits) {
        lose();
      }
    }
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  //round();

  $(".game-field").click(handleClick);
  $("#button-start").click(function() {
    firstHitTime = getTimestamp();
    round();
    gameStarted = true;
    $("#button-start").addClass("d-none");
  })
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
