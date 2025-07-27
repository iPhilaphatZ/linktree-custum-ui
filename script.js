// # Get elements
const logBox = document.getElementById('log');
const commandInput = document.getElementById('command');
const helpBox = document.getElementById('help-box');

// # Helper: Scroll to bottom of logBox
function scrollToBottom() {
  logBox.scrollTop = logBox.scrollHeight;
}

// # Helper: Print text to log
function printToLog(text) {
  logBox.innerHTML += `\n${text}`;
  scrollToBottom();
}

// # Helper: Clear log and print welcome message
function clearLog() {
  logBox.innerHTML =
    "Welcome to the Advanced Dev Terminal!<br />Type <b>help</b> to see available commands.";
  scrollToBottom();
}

// # Typewriter effect for typing simulation
function typeWriter(text, speed = 25, callback) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      logBox.innerHTML += text.charAt(i);
      scrollToBottom();
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }
  typing();
}

// # Run command logic
function runCommand(input) {
  const command = input.trim();

  if (!command) return;

  // Print command with prompt
  printToLog(`> ${command}`);

  const lowerCmd = command.toLowerCase();

  // # Command handlers
  if (lowerCmd === 'whoami') {
    typeWriter(
      "[INFO] Philaphatz - Fullstack Developer\n[INFO] Web | Shell Script | Game Farming\n",
      30
    );
  } else if (lowerCmd === 'projects') {
    typeWriter(
      "[1] Linktree Advance (live demo)\n[2] Auto Farming Bot\n[3] Shell Script Utilities\n",
      25
    );
  } else if (lowerCmd === 'contact') {
    typeWriter(
      "[INFO] Email: youremail@gmail.com\n[INFO] Fastwork: fastwork.philaphatz\n",
      25
    );
  } else if (lowerCmd === 'run facebook') {
    typeWriter("[LOG] Redirecting to Facebook...\n", 20, () => {
      setTimeout(() => {
        window.location.href = 'https://facebook.com/iphilaphatz';
      }, 1000);
    });
  } else if (lowerCmd === 'run github') {
    typeWriter("[LOG] Redirecting to GitHub...\n", 20, () => {
      setTimeout(() => {
        window.location.href = 'https://github.com/philaphatz';
      }, 1000);
    });
  } else if (lowerCmd === 'run portfolio') {
    typeWriter("[LOG] Redirecting to Portfolio...\n", 20, () => {
      setTimeout(() => {
        window.location.href = 'https://philaphatz.dev';
      }, 1000);
    });
  } else if (lowerCmd === 'back') {
    typeWriter("[LOG] Returning to Linktree...\n", 20, () => {
      setTimeout(() => {
        window.location.href = 'https://linktr.ee/your-linktree';
      }, 1000);
    });
  } else if (lowerCmd === 'clear') {
    clearLog();
  } else if (lowerCmd === 'help') {
    helpBox.style.display = helpBox.style.display === 'block' ? 'none' : 'block';
  } else if (lowerCmd.startsWith('echo ')) {
    const echoText = command.substring(5);
    printToLog(echoText);
  } else if (lowerCmd === 'date') {
    printToLog(new Date().toString());
  } else if (lowerCmd.startsWith('calc ')) {
    const expr = command.substring(5);
    try {
      // # Evaluate math expression safely (basic)
      // Note: for full safety, use a math lib instead of eval!
      // Here eval is used for demo only
      const result = eval(expr);
      printToLog(`[CALC] ${expr} = ${result}`);
    } catch {
      printToLog('[ERROR] Invalid expression');
    }
  } else {
    printToLog(`[ERROR] Unknown command: ${command}`);
  }
}

// # Event listener for Enter key
commandInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    runCommand(commandInput.value);
    commandInput.value = '';
  }
});

// # Init
clearLog();
helpBox.style.display = 'block'; // Show help by default
