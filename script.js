const logBox = document.getElementById('log');
const commandInput = document.getElementById('command');
const runBtn = document.getElementById('run-btn');
const themeBtn = document.getElementById('theme-btn');
const helpBtn = document.getElementById('help-btn');
const helpBox = document.getElementById('help-box');
let darkTheme = true;

function typeWriter(text, callback, speed = 30) {
  logBox.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      logBox.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) callback();
  }
  type();
}

function runCommand(command, url) {
  if (command === 'whoami') {
    typeWriter("> whoami\n[INFO] Philaphatz - Fullstack Dev\n[INFO] Web | Shell Script | Game Farming");
  } else if (command === 'projects') {
    typeWriter("> projects\n[1] Linktree Advance (live demo)\n[2] Auto Farming Bot\n[3] Shell Script Utilities");
  } else if (command === 'contact') {
    typeWriter("> contact\n[INFO] Email: youremail@gmail.com\n[INFO] Fastwork: fastwork.philaphatz");
  } else if (command === 'back') {
    typeWriter("> back\n[LOG] Returning to Linktree...", () => {
      setTimeout(() => {
        window.location.href = "https://linktr.ee/your-linktree";
      }, 1200);
    });
  } else if (command.startsWith('run')) {
    typeWriter(`> ${command}\n[LOG] Deploying to server...`, () => {
      setTimeout(() => {
        logBox.textContent += `\n[OK] Redirecting to ${url}`;
        setTimeout(() => {
          window.location.href = url;
        }, 1200);
      }, 1200);
    });
  } else {
    typeWriter(`> ${command}\n[ERROR] Command not found`);
  }
}

runBtn.addEventListener('click', () => {
  const cmd = commandInput.value.trim();
  if (!cmd) return;
  let url = '';
  if (cmd.includes('facebook')) url = 'https://facebook.com/iphilaphatz';
  else if (cmd.includes('github')) url = 'https://github.com/philaphatz';
  else if (cmd.includes('portfolio')) url = 'https://philaphatz.dev';
  runCommand(cmd, url);
});

document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.dataset.command;
    const url = btn.dataset.url || '';
    runCommand(cmd, url);
  });
});

helpBtn.addEventListener('click', () => {
  helpBox.style.display = helpBox.style.display === 'block' ? 'none' : 'block';
});

themeBtn.addEventListener('click', () => {
  darkTheme = !darkTheme;
  if (darkTheme) {
    document.documentElement.style.setProperty('--bg', '#000000');
    document.documentElement.style.setProperty('--text', '#00ff99');
    document.documentElement.style.setProperty('--btn-bg', '#003333');
    document.documentElement.style.setProperty('--btn-border', '#00ff99');
    document.documentElement.style.setProperty('--help-bg', '#001111');
  } else {
    document.documentElement.style.setProperty('--bg', '#f5f5f5');
    document.documentElement.style.setProperty('--text', '#333333');
    document.documentElement.style.setProperty('--btn-bg', '#dddddd');
    document.documentElement.style.setProperty('--btn-border', '#333333');
    document.documentElement.style.setProperty('--help-bg', '#eeeeee');
  }
});
