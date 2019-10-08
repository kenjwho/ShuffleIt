var correctAnswer = [1,2,3,4,5,6,7,8,9];
var board = document.getElementById('board');
var tiles = document.querySelectorAll(".tile")
var winnerImg = "http://giphygifs.s3.amazonaws.com/media/5xaOcLLyNsTBTjfM5DG/giphy.gif"

// newImage("https://scontent-atl3-1.cdninstagram.com/vp/89d94be8d19cb23f7af51c367b2a4a05/5E2BF482/t51.2885-15/e35/s1080x1080/70657334_983171822027558_5164702872260107689_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=102"); // set an img
// newImage("https://scontent-atl3-1.cdninstagram.com/vp/55beb6e54bcca0504ac446d172e406bf/5E178A09/t51.2885-15/e35/51931772_618984781848963_2157883750484937648_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=103"); // set an img
newImage("https://picsum.photos/900"); // set an img

assignPositions();

function newImage(imgUrl) {
  imgUrl = imgUrl ? imgUrl : 'https://picsum.photos/900';
  tiles.forEach((tile) => {
    tile.style.backgroundImage = "url('')" // clear the url first since the image changes on new request
    tile.style.backgroundImage = `url(${imgUrl})`
  })
}

function shuffleBoard() {
  var allTiles = [1,2,3,4,5,6,7,8,9]

  tiles.forEach((tile) => {
    var newID = allTiles[Math.floor(Math.random()*allTiles.length)];
    tile.setAttribute('data-id', newID);
    allTiles.splice(allTiles.indexOf(newID), 1)
  })

  assignPositions();
    
}

function swapTiles(clickedTileEl) {
  var blankTileEl = findBlankTile();

  var clickedTile = {
    id: clickedTileEl.target.dataset.id,
    position: Number(clickedTileEl.target.dataset.position)
  }
  var blankTile = {
    id: blankTileEl.dataset.id,
    position: Number(blankTileEl.dataset.position)
  }

  if (blankTile.id !== clickedTile.id) { // If not the blank tile

    // Check the position to see if the selected tile can mover
    if (
      (clickedTile.position === (blankTile.position - 3)) || // can move up
      (clickedTile.position === (blankTile.position + 3)) || // can move down
      ((clickedTile.position - 1 ===  blankTile.position) && (clickedTile.position - 1) % 3 !== 0) || // can move left
      ((clickedTile.position + 1 ===  blankTile.position) && (blankTile.position % 3 !== 1)) // can move right
    )
    {
      clickedTileEl.target.setAttribute('data-id', blankTile.id);
      clickedTileEl.target.classList.add('blank');
      blankTileEl.setAttribute('data-id', clickedTile.id);
      blankTileEl.classList.remove('blank');
      
      assignPositions();
      checkAsnwer();
    }
    
  }

}

function assignPositions() {
  tiles.forEach((tile, i) => {
    tile.setAttribute('data-position', i + 1);
  })
}

function findBlankTile() {
  return document.querySelector('.blank');
}

function checkAsnwer() {
  var currentAnswer = [];

  tiles.forEach((tile) => {
    currentAnswer.push(Number(tile.dataset.id));
  })

  // Since checking if arrays are equal is hardr than it should be...
  if (getNumFromArray(currentAnswer) === getNumFromArray(correctAnswer)) {
    console.log("WINRAR");
    document.querySelector('body').style.backgroundImage = `url("${winnerImg}")`;
    return true;
  }

  return false;
}

function getNumFromArray(array) {
  num = '';
  array.forEach((int) => {
    num = num+int;
  })

  return num;
}

function startNewGame() {
  // Remove previus blank tile
  resetBlankTile = document.querySelector(".blank").classList.remove('blank');

  // Assign new blank tile
  blankTile = correctAnswer[Math.floor(Math.random()*correctAnswer.length)] // Set blank tile
  tiles[blankTile-1].classList.add("blank")

  shuffleBoard();
  // newImage();
}

// function winnerWinnerChickenDinner() {
//   for (let index = 0; index < 9999; index++) {
    
//     shuffleBoard();

//     if (checkAsnwer())
    
//   }
// }

document.getElementById("start").addEventListener('click', startNewGame);
document.getElementById("newImage").addEventListener('click', () => {
  newImage();
});

tiles.forEach((tile) => {
  tile.addEventListener('click', swapTiles);
});

// Handle uploads
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          // var img = document.querySelector('img');  // $('img')[0]
          var imgUrl = URL.createObjectURL(this.files[0]); // set src to file url
          newImage(imgUrl);
          // img.onload = imageIsLoaded; // optional onload event listener
      }
  });
});
