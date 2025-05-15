var symbols = ["🍒", "🍋", "🍉", "🍇", "🔔", "⭐", "💎"];
var slot1 = document.getElementById("slot1");
var slot2 = document.getElementById("slot2");
var slot3 = document.getElementById("slot3");
var result = document.getElementById("result");
var spinBtn = document.getElementById("spinBtn");
var spinning = false;

// Sounds
var spinSound = new Audio("spin.mp3");
var winSound = new Audio("win.mp3");

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  result.innerText = "";

  // Play spin sound
  spinSound.currentTime = 0;
  spinSound.play();

  // Animation effect
  slot1.classList.add("animate-bounce");
  slot2.classList.add("animate-bounce");
  slot3.classList.add("animate-bounce");

  let interval = setInterval(() => {
    slot1.innerText = getRandomSymbol();
    slot2.innerText = getRandomSymbol();
    slot3.innerText = getRandomSymbol();
  }, 100);

  // Stop after 1.5s
  setTimeout(function () {
    clearInterval(interval);

    // Easy win mode for demo
    let isWin = Math.random() < 0.3;
    let final1, final2, final3;

    if (isWin) {
      let winSymbol = getRandomSymbol();
      final1 = final2 = final3 = winSymbol;
    } else {
      final1 = getRandomSymbol();
      final2 = getRandomSymbol();
      final3 = getRandomSymbol();
    }

    slot1.innerText = final1;
    slot2.innerText = final2;
    slot3.innerText = final3;

    slot1.classList.remove("animate-bounce");
    slot2.classList.remove("animate-bounce");
    slot3.classList.remove("animate-bounce");

    if (final1 === final2 && final2 === final3) {
      result.innerText = "🎉 You Win!";
      winSound.currentTime = 0;
      winSound.play();
    } else {
      result.innerText = "😢 Try Again!";
    }

    spinning = false;
    spinBtn.disabled = false;
  }, 1500);
}
