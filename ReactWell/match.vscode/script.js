// Variables for game logic
const cardColors = [
    'red', 'blue', 'green', 'orange', 
    'purple', 'yellow', 'pink', 'cyan'
  ];
  let cards = [...cardColors, ...cardColors]; // Duplicate colors for pairs
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  
  // Start the game
  function startGame() {
    // Shuffle cards and reset state
    shuffle(cards);
    matchedPairs = 0;
    moves = 0;
    document.getElementById('status').textContent = "Try to find all pairs!";
    
    // Clear game board and create cards
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = '';
    cards.forEach(color => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.dataset.color = color;
      card.onclick = () => flipCard(card);
      gameBoard.appendChild(card);
    });
  }
  
  // Shuffle function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Flip card logic
  function flipCard(card) {
    if (card.classList.contains('flip') || flippedCards.length === 2) return;
  
    // Flip the card
    card.classList.add('flip');
    card.style.backgroundColor = card.dataset.color;
    flippedCards.push(card);
  
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
  
  // Check if two flipped cards match
  function checkForMatch() {
    moves++;
    const [card1, card2] = flippedCards;
    if (card1.dataset.color === card2.dataset.color) {
      // Matched pair
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === cardColors.length) {
        evaluatePerformance(moves);
      }
    } else {
      // Not a match: flip back after a short delay
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1.style.backgroundColor = '#2e8b57';
        card2.style.backgroundColor = '#2e8b57';
        flippedCards = [];
      }, 800);
    }
  }

  // Evaluate memory performance based on moves
  function evaluatePerformance(moves) {
    let message = `You won in ${moves} moves! 🎉<br>`;

    if (moves <= 16) {
        message += "Excellent Memory! Your cognitive function is strong.";
    } else if (moves <= 28) {
        message += "Mild Impairment Detected. You may have slight memory lapses.<br>some difficulty recalling positions";
    } else if (moves <= 40) {
        message += "Moderate Impairment. Consider regular memory exercises.<br>Possible MCI or Early Dementia";
    } else {
        message += "Severe Impairment Detected. Consult a professional for further assessment.<br>Possible Alzheimer's or Dementia";
    }

    document.getElementById('status').innerHTML = message;
    
    // Save the score using ScoreTracker with debugging
    if (typeof ScoreTracker !== 'undefined') {
        console.log('Saving memory score:', moves);
        ScoreTracker.saveMemoryScore(moves);
        
        // Verify the save
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Current user:', currentUser);
        console.log('All user stats:', userStats);
        if (currentUser) {
            console.log('Current user stats:', userStats[currentUser.name]);
        }
    } else {
        console.error('ScoreTracker is not defined!');
    }
  }
