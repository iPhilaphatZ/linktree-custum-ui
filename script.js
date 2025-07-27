const logBox = document.getElementById('log');
const commandInput = document.getElementById('command');

function printToLog(text) {
  logBox.innerHTML += `\n${text}`;
  logBox.scrollTop = logBox.scrollHeight;
}

function runCommand(cmd) {
  const command = cmd.trim().toLowerCase();

  if (!command) return;

  printToLog(`> ${command}`);

  if (command === 'whoami') {
    printToLog("[INFO] Philaphatz - Fullstack Dev\n[INFO] Web | Shell Script | Game Farming");
  } else if (command === 'projects') {
    printToLog("[1] Linktree Advance (live demo)\n[2] Auto Farming Bot\n[3] Shell Script Utilities");
  } else if (command === 'contact') {
    printToLog("[INFO] Email: youremail@gmail.com\n[INFO] Fastwork: fastwork.philaphatz");
  } else if (command === 'run facebook') {
    printToLog("[LOG] Redirecting to Facebook...");
    setTimeout(() => window.location.href = "https://facebook.com/iphilaphatz", 1000);
  } else if (command === 'run github') {
    printToLog("[LOG] Redirecting to GitHub...");
    setTimeout(() => window.location.href = "https://github.com/philaphatz", 1000);
  } else if (command === 'run portfolio') {
    printToLog("[LOG] Redirecting to Portfolio...");
    setTimeout(() => window.location.href = "https://philaphatz.dev", 1000);
  } else if (command === 'back') {
    printToLog("[LOG] Returning to Linktree...");
    setTimeout(() => window.location.href = "https://linktr.ee/your-linktree", 1000);
  } else if (command === 'clear') {
    logBox.innerHTML = "Welcome to the Dev Terminal!\nType <b>help</b> to see available commands.";
  } else if (command === 'help') {
    printToLog("Available Commands: whoami, projects, contact, run facebook, run github, run portfolio, back, clear");
  } else {
    printToLog(`[ERROR] Unknown command: ${command}`);
  }
}

commandInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    runCommand(commandInput.value);
    commandInput.value = "";
  }
});
