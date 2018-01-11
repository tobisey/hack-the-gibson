//Important stuff
var col = $('.col');
var curPlayer = 'p1';
var victoryMessage = $('.victory-message');
var message = $('.message');
var cover = $('.cover');
var button = $('.reset');
var pOneScore = 0;
var pTwoScore = 0;

//Silly stuff
var title = $('.title')
var start = $('.start')
var startAudio = $('.start-audio');
var zeroCool = $('.zerocool');
zeroCool[0].volume = 0.4;
var hackThePlanet = $('.hack-the-planet');
var hackThePlanetTwo = $('.hack-the-planet-two');
var theme = $('.theme');
theme[0].volume = 0.2;
var playerOneIcon = $('.player-one');
var playerTwoIcon = $('.player-two');
var shutdown = $('.shutdown');
var gibson = $('.background img');
var smiley = $('.smiley');

//Hide game and victory message while title screen is up
$('main').hide();
victoryMessage.hide();
cover.hide();
button.hide();
playerOneIcon.hide();
playerTwoIcon.hide();
smiley.hide();

//Press start, move to game screen
start.on('click', function(){
  title.hide();
  $('main').fadeIn(2000);
  playerOneIcon.fadeIn(2000);
  playerTwoIcon.fadeIn(2000);
  startAudio[0].play();
  theme[0].play();
  playerOneIcon.css({'animation': 'flash 1s infinite'})
})

//Column hover behaviour
col.on('mouseover', function(e){
  var boxesHover = $(e.currentTarget).find('.box');
  for (var i = 0; i <= 5; i++) {
    if (boxesHover.eq(i).hasClass('p1') === false && boxesHover.eq(i).hasClass('p2') === false) {
      boxesHover.eq(i).addClass('hover');
    } else {
      boxesHover.eq(i).removeClass('hover');
    }
  }
})

col.on('mouseout', function(e){
  $(e.currentTarget).find('.box').removeClass('hover');
})

col.on('click', function(e){

  //Check for box
  var boxes = $(e.currentTarget).find('.box');
  var row;
  var pos;
  var thisCol = parseInt($(this).attr('id'));

  for (var i = 5; i >= 0; i--) {
    if (boxes.eq(i).hasClass('p1') === false && boxes.eq(i).hasClass('p2') === false) {
      boxes.eq(i).addClass(curPlayer);
      boxes.eq(i).removeClass('hover');
      pos = i;
      row = 'row' + i;
      break;
    }
  }

  //Check for vertical victory
  var countV = 0;
  for (var i = 0; i < boxes.length; i++) {
    if (boxes.eq(i).hasClass(curPlayer)) {
      countV++;
      if (countV == 4) {
        victory();
        return;
      }
    } else {
      countV = 0;
    }
  }

  //Check for horizontal victory
  var boxesH = $('.box.' + row);
  var countH = 0;
  for (var i = 0; i < boxesH.length; i++) {
    if (boxesH.eq(i).hasClass(curPlayer)) {
      countH++;
      if (countH == 4) {
        victory();
        return;
      }
    } else {
      countH = 0;
    }
  }

  //Check for diagonal victory
  //Checks four diagonal boxes including itself in each direction
  var diagUR;
  var diagUL;
  var diagDL;
  var diagDR;
  var countUR = 0;
  var countUL = 0;
  var countDL = 0;
  var countDR = 0;

  for (var i = 0; i <= 3; i++) {
    var diagUR = $('.row' + (pos - i) + '.col' + (thisCol + i));
    if (diagUR.hasClass(curPlayer)) {
      countUR++;
      if (countUR == 4) {
        victory();
        return;
      }
    }
    var diagUL = $('.row' + (pos - i) + '.col' + (thisCol - i));
    if (diagUL.hasClass(curPlayer)) {
      countUL++;
      if (countUL == 4) {
        victory();
        return;
      }
    }
    var diagDL = $('.row' + (pos + i) + '.col' + (thisCol - i));
    if (diagDL.hasClass(curPlayer)) {
      countDL++;
      if (countDL == 4) {
        victory();
        return;
      }
    }
    var diagDR = $('.row' + (pos + i) + '.col' + (thisCol + i));
    if (diagDR.hasClass(curPlayer)) {
      countDR++;
      if (countDR == 4) {
        victory();
        return;
      }
    }
  }

  //Victory function
  function victory(){
    victoryMessage.fadeIn(500);
    button.fadeIn(500);
    cover.show();
    gibson.addClass('invert');
    smiley.show();
    shutdown[0].play();
    if (curPlayer === 'p1') {
      $('.dade').addClass('slide-in');
      playerOneIcon.css({'animation': 'flash 0.2s infinite'});
      message.html('ZERO COOL HACKED THE GIBSON!');
      zeroCool[0].play();
      pOneScore += 1;
      $('.p1-score').html(' ' + pOneScore);
    } else if (curPlayer === 'p2') {
      $('.kate').addClass('slide-in');
      playerTwoIcon.css({'animation': 'flash 0.2s infinite'});
      message.html('ACID BURN HACKED THE GIBSON!');
      hackThePlanetTwo[0].play();
      pTwoScore += 1;
      $('.p2-score').html(' ' + pTwoScore)
    }
  }

  //Change player
  if (curPlayer == 'p1') {
    curPlayer = 'p2';
  } else {
    curPlayer = 'p1';
  }

  //Players icon flashes and sounds
  if (curPlayer === 'p1') {
    $('.three-beep')[0].play();
    $('.three-beep')[0].volume = 0.2;
    playerOneIcon.css({'animation': 'flash 1s infinite'})
    playerTwoIcon.css({'animation': ''})
  } else if (curPlayer === 'p2') {
    $('.beep')[0].play();
    $('.beep')[0].volume = 0.2;
    playerOneIcon.css({'animation': ''})
    playerTwoIcon.css({'animation': 'flash 1s infinite'})
  }
})


//Reset button
button.on('click', function(){
  var allBoxes = $('.box');
  allBoxes.removeClass('p1');
  allBoxes.removeClass('p2');
  gibson.removeClass('invert')
  smiley.hide();
  startAudio[0].play();
  cover.hide();
  victoryMessage.fadeOut(200);
  button.fadeOut(200);
   if (curPlayer === 'p2') {
    playerTwoIcon.css({'animation': ''})
  }
  if ($('.dade').hasClass('slide-in')) {
    $('.dade').removeClass('slide-in');
  }
  if ($('.kate').hasClass('slide-in')) {
    $('.kate').removeClass('slide-in');
  }
  curPlayer = 'p1';
  playerOneIcon.css({'animation': 'flash 1s infinite'})
})
