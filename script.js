// URLs สำหรับ Log
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPwLScT8AQo-FRKXAT8QiSPazsjOxvwXMsbhzPuXIO2WW6VxUy_2_cPqN7gsl-Sj-I/exec";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/123456789012345678/AbCdEfGhIjKlMnOpQrStUvWxYz";

// อ้างอิง DOM
const output = document.getElementById('output');
const input = document.getElementById('input');

// เก็บประวัติคำสั่ง (localStorage)
let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let historyIndex = commandHistory.length;

// ชื่อธีม (ใช้สำหรับอนาคต)
let currentTheme = "cyberpunk"; // ใช้สลับธีมถ้าเพิ่ม

// ฟังก์ชันพิมพ์ทีละตัว (typewriter effect)
function typeWriter(text, delay = 25) {
  return new Promise(resolve => {
    let i = 0;
    function type() {
      if (i < text.length) {
        output.innerHTML += text.charAt(i);
        i++;
        output.scrollTop = output.scrollHeight;
        setTimeout(type, delay);
      } else {
        output.innerHTML += '\n';
        output.scrollTop = output.scrollHeight;
        resolve();
      }
    }
    type();
  });
}

// ฟังก์ชันแสดงข้อความอย่างรวดเร็ว (ไม่มี effect)
function print(text = '') {
  output.innerHTML += text + '\n';
  output.scrollTop = output.scrollHeight;
}

// เคลียร์หน้าจอ
function clearScreen() {
  output.innerHTML = '';
}

// ส่ง Log ขึ้น Google Apps Script
function sendLogOnline(command) {
  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      command,
      userAgent: navigator.userAgent
    }),
  }).catch(e => {
    print("[WARN] เกิดข้อผิดพลาดในการส่ง Log ไป Google Sheets");
  });
}

// แจ้งเตือน Discord Webhook
function notifyDiscord(command) {
  fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `[LOG] Command: ${command} | ${new Date().toLocaleString()}`
    }),
  }).catch(e => {
    print("[WARN] เกิดข้อผิดพลาดในการส่งแจ้งเตือน Discord");
  });
}

// แสดงคำสั่งช่วยเหลือ
async function showHelp() {
  const helpText = 
`Available commands:
help / ?         - Show this help text
c / clear        - Clear the terminal screen
logs             - Show command history
run [name]       - Open links: facebook, youtube, github
donate           - Show donation info
about            - About me
theme [name]     - Change terminal theme (dark, light, cyberpunk)
time             - Show current time
contact          - Show contact info
echo [text]      - Display text
clearlogs        - Clear saved command history
open [site]      - Open site: google, github, twitter
feedback         - Show feedback form link

Type command and press Enter.`;

  await typeWriter(helpText, 20);
}

// แสดงประวัติคำสั่ง (localStorage)
async function showLogs() {
  if (commandHistory.length === 0) {
    await typeWriter("No logs available.");
    return;
  }
  await typeWriter("Command History:\n", 20);
  for (let i = 0; i < commandHistory.length; i++) {
    await typeWriter(`${i + 1}. ${commandHistory[i]}`, 20);
  }
  await typeWriter("\nType 'back' to return.");
}

// แสดงข้อความ About
async function showAbout() {
  const aboutText = 
`Custom Terminal Linktree
Created by You

GitHub: https://github.com/iphilaphatz
Portfolio: https://iphilaphatz.work

Type 'help' to see commands.`;
  await typeWriter(aboutText, 20);
}

// แสดงข้อความ Donate
async function showDonate() {
  const donateText = 
`Support me by donating!

QR code: (Put your QR code image or link here)
PayPal: paypal.me/iphilaphatz

Type 'back' to return.`;
  await typeWriter(donateText, 20);
}

// แสดงข้อมูลติดต่อ
async function showContact() {
  const contactText = 
`Contact me:

Email: iphilaphatz@example.com
Phone: +66 1234 5678
Twitter: https://twitter.com/iphilaphatz

Type 'back' to return.`;
  await typeWriter(contactText, 20);
}

// แสดงฟอร์ม feedback (ลิงก์ไป Google Form)
async function showFeedback() {
  const feedbackText = 
`Please send your feedback here:
https://forms.gle/your-feedback-form-link

Type 'back' to return.`;
  await typeWriter(feedbackText, 20);
}

// เปลี่ยนธีม (รองรับอนาคต)
function changeTheme(name) {
  // ตัวอย่างเปลี่ยนธีมง่าย ๆ
  if (name === "dark") {
    document.body.style.background = "#000";
    output.style.color = "#0f0";
  } else if (name === "light") {
    document.body.style.background = "#fff";
    output.style.color = "#000";
  } else if (name === "cyberpunk") {
    document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    output.style.color = "#00ff99";
  } else {
    print("Unknown theme: " + name);
  }
}

// เปิดลิงก์ตามคำสั่ง run
function openLink(name) {
  const links = {
    facebook: "https://facebook.com/iphilaphatz",
    youtube: "https://youtube.com/iphilaphatz",
    github: "https://github.com/iphilaphatz",
  };
  if (links[name]) {
    print(`Opening ${name}...`);
    window.open(links[name], "_blank");
  } else {
    print(`No link configured for '${name}'`);
  }
}

// เปิดลิงก์ open
function openSite(name) {
  const sites = {
    google: "https://google.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  };
  if (sites[name]) {
    print(`Opening ${name}...`);
    window.open(sites[name], "_blank");
  } else {
    print(`No site configured for '${name}'`);
  }
}

// ประมวลผลคำสั่ง
async function runCommand(command) {
  if (!command.trim()) return;

  commandHistory.push(command);
  localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
  historyIndex = commandHistory.length;

  print(`➜ ${command}`);

  // ส่ง Log
  sendLogOnline(command);
  notifyDiscord(command);

  // แยกคำสั่งและ argument
  const args = command.trim().split(" ");
  const cmd = args[0].toLowerCase();

  switch(cmd) {
    case "help":
    case "?":
      await showHelp();
      break;

    case "c":
    case "clear":
      clearScreen();
      break;

    case "logs":
      await showLogs();
      break;

    case "back":
      clearScreen();
      print("Back to main terminal.");
      break;

    case "run":
      if (args.length < 2) {
        print("Usage: run [name]");
      } else {
        openLink(args[1].toLowerCase());
      }
      break;

    case "donate":
      await showDonate();
      break;

    case "about":
      await showAbout();
      break;

    case "theme":
      if (args.length < 2) {
        print("Usage: theme [name]");
      } else {
        changeTheme(args[1].toLowerCase());
      }
      break;

    case "time":
      print(new Date().toLocaleString());
      break;

    case "contact":
      await showContact();
      break;

    case "echo":
      if (args.length < 2) {
        print("Usage: echo [text]");
      } else {
        print(args.slice(1).join(" "));
      }
      break;

    case "clearlogs":
      if(confirm("Are you sure to clear logs?")) {
        commandHistory = [];
        localStorage.removeItem('commandHistory');
        clearScreen();
        print("Logs cleared.");
      }
      break;

    case "open":
      if (args.length < 2) {
        print("Usage: open [site]");
      } else {
        openSite(args[1].toLowerCase());
      }
      break;

    case "feedback":
      await showFeedback();
      break;

    default:
      print(`Command not found: ${cmd}`);
  }
}

// จับ key press สำหรับส่งคำสั่ง
input.addEventListener('keydown', async (e) => {
  if (e.key === "Enter") {
    const val = input.value;
    input.value = "";
    await runCommand(val);
  } else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex] || "";
    }
    e.preventDefault();
  } else if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex] || "";
    } else {
      historyIndex = commandHistory.length;
      input.value = "";
    }
    e.preventDefault();
  }
});

// เริ่มต้นหน้าจอด้วยข้อความต้อนรับ
(async () => {
  await typeWriter("Welcome to Custom Terminal Linktree!\nType 'help' or '?' to get started.\n", 30);
  input.focus();
})();
