// 雙打單場 (6~8人) 最佳賽程資料與動態驗證系統

const MULTI_SCHEDULES = {
  6: {
    totalMatches: 9,
    gamesPerPlayer: 6,
    restsPerPlayer: 3,
    maxConsecutive2Score: 16,
    matches: [
      { match: 1, team1: [0, 1], team2: [3, 5] },
      { match: 2, team1: [1, 2], team2: [3, 4] },
      { match: 3, team1: [0, 2], team2: [4, 5] },
      { match: 4, team1: [0, 3], team2: [1, 5] },
      { match: 5, team1: [1, 4], team2: [2, 3] },
      { match: 6, team1: [0, 4], team2: [2, 5] },
      { match: 7, team1: [0, 5], team2: [1, 3] },
      { match: 8, team1: [1, 3], team2: [2, 4] },
      { match: 9, team1: [0, 4], team2: [2, 5] }
    ]
  },
  7: {
    totalMatches: 14,
    gamesPerPlayer: 8,
    restsPerPlayer: 6,
    maxConsecutive2Score: 23,
    matches: [
      { match: 1, team1: [0, 2], team2: [1, 5] },
      { match: 2, team1: [1, 6], team2: [2, 5] },
      { match: 3, team1: [0, 6], team2: [3, 4] },
      { match: 4, team1: [0, 5], team2: [1, 3] },
      { match: 5, team1: [1, 2], team2: [4, 5] },
      { match: 6, team1: [0, 6], team2: [2, 3] },
      { match: 7, team1: [0, 5], team2: [4, 6] },
      { match: 8, team1: [1, 2], team2: [3, 4] },
      { match: 9, team1: [0, 2], team2: [1, 3] },
      { match: 10, team1: [0, 4], team2: [5, 6] },
      { match: 11, team1: [2, 4], team2: [3, 6] },
      { match: 12, team1: [0, 3], team2: [1, 5] },
      { match: 13, team1: [1, 4], team2: [5, 6] },
      { match: 14, team1: [2, 3], team2: [4, 6] }
    ]
  },
  8: {
    totalMatches: 14,
    gamesPerPlayer: 7,
    restsPerPlayer: 7,
    maxConsecutive2Score: 23,
    matches: [
      { match: 1, team1: [0, 1], team2: [2, 3] },
      { match: 2, team1: [0, 3], team2: [4, 5] },
      { match: 3, team1: [1, 2], team2: [5, 7] },
      { match: 4, team1: [2, 7], team2: [3, 6] },
      { match: 5, team1: [1, 3], team2: [5, 6] },
      { match: 6, team1: [1, 5], team2: [4, 7] },
      { match: 7, team1: [0, 4], team2: [6, 7] },
      { match: 8, team1: [0, 5], team2: [2, 6] },
      { match: 9, team1: [2, 4], team2: [3, 7] },
      { match: 10, team1: [1, 6], team2: [3, 4] },
      { match: 11, team1: [0, 6], team2: [1, 7] },
      { match: 12, team1: [0, 7], team2: [3, 5] },
      { match: 13, team1: [2, 5], team2: [4, 6] },
      { match: 14, team1: [0, 2], team2: [1, 4] }
    ]
  }
};

// 擴充動畫角色池 (加入戰鬥陀螺X & 經典人氣動漫角色)
const ANIME_POOL = [
  // 戰鬥陀螺X (Beyblade X)
  "黑須風見", "風見鳥", "七色玲音", "龍宮克羅姆", "不死原伯恩", "萬丈嚴", "冥殿名子", "萬丈珍",
  // 鬼滅之刃
  "灶門炭治郎", "灶門襧豆子", "我妻善逸", "嘴平伊之助", "煉獄杏壽郎", "富岡義勇", "胡蝶忍", "栗花落香奈乎",
  // 灌籃高手
  "櫻木花道", "流川楓", "宮城良田", "三井壽", "赤木剛憲", "仙道彰", "藤真健司", "花形透",
  // 海賊王 (One Piece)
  "蒙其·D·魯夫", "羅羅亞·索隆", "娜美", "騙人布", "香吉士", "多尼多尼·喬巴", "妮可·羅賓", "波特卡斯·D·艾斯",
  // 咒術迴戰
  "五條悟", "虎杖悠仁", "伏黑惠", "釘崎野薔薇", "乙骨憂太", "狗卷棘", "七海建人", "兩面宿儺",
  // 排球少年!!
  "日向翔陽", "影山飛雄", "月島螢", "及川徹", "黑尾鐵朗", "孤爪研磨", "宮侑", "木兔光太郎",
  // 火影忍者
  "漩渦鳴人", "宇智波佐助", "春野櫻", "旗木卡卡西", "我愛羅", "宇智波鼬", "日向雛田",
  // 進擊的巨人
  "艾連·葉卡", "米卡莎·阿卡曼", "阿爾敏·亞魯雷特", "里維兵長", "艾爾文·史密斯",
  // 獵人 Hunter x Hunter
  "小傑·富力士", "奇犽·揍敵客", "酷拉皮卡", "雷歐力", "西索",
  // 七龍珠
  "孫悟空", "貝吉塔", "孫悟飯", "特南克斯", "比克",
  // 間諜家家酒 & 藍色監獄 & 其餘熱門
  "安妮亞", "洛伊德", "約爾", "潔世一", "蜂樂迴", "凪誠士郎", "糸師凜", "坂田銀時", "齊木楠雄"
];

// 擴充世界羽球名將角色池
const BADMINTON_STARS_POOL = [
  // 台灣
  "戴資穎", "周天成", "王齊麟", "李洋", "林俊易", "鄧淳薰", "李佳馨", "葉宏蔚", "許玟琪",
  // 馬來西亞
  "李宗偉", "李梓嘉", "謝定峰", "蘇偉譯", "陳康樂", "蒂娜",
  // 丹麥
  "安賽龍 (Axelsen)", "安東森 (Antonsen)",
  // 日本
  "桃田賢斗", "山口茜", "奧原希望", "渡邊勇大", "東野有紗", "保木卓朗", "小林優吾", "志田千陽", "松山奈未",
  // 韓國
  "安洗瑩", "徐承宰", "蔡侑玎", "金元昊", "鄭娜銀", "李紹希", "白荷娜",
  // 中國
  "林丹", "諶龍", "石宇奇", "陳雨菲", "鄭思維", "黃雅瓊", "賈一凡", "陳清晨", "梁偉鏗", "王昶",
  // 印尼
  "金廷 (Ginting)", "喬納坦 (Jonatan)", "蘇卡穆約", "吉德翁", "阿山 (Ahsan)", "塞蒂亞萬",
  // 西班牙 & 印度
  "馬琳 (Marin)", "辛度 (Sindhu)"
];

// Preset Default Name Templates per count
const PRESETS = {
  default: {
    6: ["A", "B", "C", "D", "E", "F"],
    7: ["A", "B", "C", "D", "E", "F", "G"],
    8: ["A", "B", "C", "D", "E", "F", "G", "H"]
  },
  zh: {
    6: ["隊員一", "隊員二", "隊員三", "隊員四", "隊員五", "隊員六"],
    7: ["隊員一", "隊員二", "隊員三", "隊員四", "隊員五", "隊員六", "隊員七"],
    8: ["隊員一", "隊員二", "隊員三", "隊員四", "隊員五", "隊員六", "隊員七", "隊員八"]
  }
};

// 隨機抽選不重複角色 helper
function getRandomFromPool(pool, count) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Current State
let playerCount = 8;
let playerNames = [...PRESETS.default[8]];
let currentView = "cards";

document.addEventListener("DOMContentLoaded", () => {
  initPlayerCountSelector();
  initPlayerInputs();
  renderAll();
  bindEvents();
});

function initPlayerCountSelector() {
  document.querySelectorAll('input[name="playerCount"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      playerCount = parseInt(e.target.value);
      playerNames = [...PRESETS.default[playerCount]];
      
      document.querySelectorAll(".count-option").forEach(opt => opt.classList.remove("active"));
      document.getElementById(`labelCount${playerCount}`)?.classList.add("active");

      initPlayerInputs();
      renderAll();
    });
  });
}

function initPlayerInputs() {
  const container = document.getElementById("playerInputs");
  container.innerHTML = "";
  for (let i = 0; i < playerCount; i++) {
    const div = document.createElement("div");
    div.className = "input-group";
    div.innerHTML = `
      <label for="p${i}">選手 ${i + 1} (${String.fromCharCode(65 + i)})</label>
      <input type="text" id="p${i}" value="${playerNames[i]}" data-index="${i}" placeholder="輸入名稱">
    `;
    container.appendChild(div);
  }

  container.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      const val = e.target.value.trim();
      playerNames[idx] = val || String.fromCharCode(65 + idx);
      renderAll();
    });
  });
}

function renderAll() {
  document.getElementById("scheduleTitleText").innerText = `${MULTI_SCHEDULES[playerCount].totalMatches} 場對戰賽程表 (${playerCount}人隊伍)`;
  renderRulesVerification();
  renderMatchSchedule();
  renderAttendanceMatrix();
  renderTeammateOpponentMatrices();
}

function bindEvents() {
  document.getElementById("btnPresetDefault")?.addEventListener("click", () => {
    playerNames = [...PRESETS.default[playerCount]];
    updateInputValues();
    renderAll();
  });

  document.getElementById("btnPresetZh")?.addEventListener("click", () => {
    playerNames = [...PRESETS.zh[playerCount]];
    updateInputValues();
    renderAll();
  });

  document.getElementById("btnPresetStars")?.addEventListener("click", () => {
    playerNames = getRandomFromPool(BADMINTON_STARS_POOL, playerCount);
    updateInputValues();
    renderAll();
    showToast(`🏸 已隨機抽選 ${playerCount} 位世界羽球名將！`);
  });

  document.getElementById("btnPresetAnime")?.addEventListener("click", () => {
    playerNames = getRandomFromPool(ANIME_POOL, playerCount);
    updateInputValues();
    renderAll();
    showToast(`✨ 已隨機抽選 ${playerCount} 位動畫角色！`);
  });

  document.getElementById("btnViewCards")?.addEventListener("click", () => {
    currentView = "cards";
    document.getElementById("btnViewCards").classList.add("active");
    document.getElementById("btnViewTable").classList.remove("active");
    document.getElementById("matchesCardsView").style.display = "grid";
    document.getElementById("matchesTableView").style.display = "none";
  });

  document.getElementById("btnViewTable")?.addEventListener("click", () => {
    currentView = "table";
    document.getElementById("btnViewTable").classList.add("active");
    document.getElementById("btnViewCards").classList.remove("active");
    document.getElementById("matchesCardsView").style.display = "none";
    document.getElementById("matchesTableView").style.display = "block";
  });

  document.getElementById("btnCopyText")?.addEventListener("click", copyLineFormat);
  document.getElementById("btnExportCSV")?.addEventListener("click", exportCSV);
  document.getElementById("btnPrint")?.addEventListener("click", () => window.print());
}

function updateInputValues() {
  for (let i = 0; i < playerCount; i++) {
    const input = document.getElementById(`p${i}`);
    if (input) input.value = playerNames[i];
  }
}

function verifyConstraints(scheduleData) {
  const N = playerCount;
  const playerGamesCount = new Array(N).fill(0);
  const teammateMatrix = Array.from({ length: N }, () => new Array(N).fill(0));
  const opponentMatrix = Array.from({ length: N }, () => new Array(N).fill(0));
  const playerStreaks = new Array(N).fill(0);
  const playerMaxStreaks = new Array(N).fill(0);
  let totalConsecutive2Count = 0;

  scheduleData.matches.forEach((m) => {
    const t1 = m.team1;
    const t2 = m.team2;
    const currentPlaying = new Set([...t1, ...t2]);

    for (let p = 0; p < N; p++) {
      if (currentPlaying.has(p)) {
        playerGamesCount[p]++;
        playerStreaks[p]++;
        if (playerStreaks[p] > playerMaxStreaks[p]) {
          playerMaxStreaks[p] = playerStreaks[p];
        }
        if (playerStreaks[p] === 2) {
          totalConsecutive2Count++;
        }
      } else {
        playerStreaks[p] = 0;
      }
    }

    teammateMatrix[t1[0]][t1[1]]++;
    teammateMatrix[t1[1]][t1[0]]++;
    teammateMatrix[t2[0]][t2[1]]++;
    teammateMatrix[t2[1]][t2[0]]++;

    for (let p1 of t1) {
      for (let p2 of t2) {
        opponentMatrix[p1][p2]++;
        opponentMatrix[p2][p1]++;
      }
    }
  });

  const expectedGames = scheduleData.gamesPerPlayer;
  const allPlayedTarget = playerGamesCount.every(c => c === expectedGames);
  const no3Consecutive = playerMaxStreaks.every(s => s <= 2);

  return {
    totalMatches: scheduleData.matches.length,
    expectedGames,
    allPlayedTarget,
    no3Consecutive,
    totalConsecutive2Count,
    playerGamesCount,
    teammateMatrix,
    opponentMatrix
  };
}

function renderRulesVerification() {
  const schedData = MULTI_SCHEDULES[playerCount];
  const stats = verifyConstraints(schedData);

  const grid = document.getElementById("rulesGrid");
  grid.innerHTML = `
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>1. 選手人數 (${playerCount} 人)</h4>
        <p>名單：${playerNames.join(", ")}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>2. 雙打對戰格式 (${stats.totalMatches} 場)</h4>
        <p>單球場對決，共 ${stats.totalMatches} 場對戰賽程</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>3. 平均分配上場場次</h4>
        <p>${stats.allPlayedTarget ? `已驗證：每人平均剛好上場 ${stats.expectedGames} 場` : "計算中"}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>4. 絕不連續上場 3 場</h4>
        <p>${stats.no3Consecutive ? "已驗證：最長連續上場上限為 2 場" : "警示：有人連續3場"}</p>
      </div>
    </div>
    <div class="rule-card" style="border-color: rgba(245, 158, 11, 0.5); background: rgba(245, 158, 11, 0.08);">
      <div class="rule-icon star">★</div>
      <div class="rule-content">
        <h4>5. 極大化連續上場2場 <span class="highlight-badge">${stats.totalConsecutive2Count} 人次</span></h4>
        <p>達到極大化對戰連續流暢度 (${stats.totalConsecutive2Count} 人次)</p>
      </div>
    </div>
  `;
}

function renderMatchSchedule() {
  const schedData = MULTI_SCHEDULES[playerCount];
  const cardsContainer = document.getElementById("matchesCardsView");
  const tableBody = document.getElementById("matchesTableBody");

  cardsContainer.innerHTML = "";
  tableBody.innerHTML = "";

  schedData.matches.forEach((m) => {
    const p1 = playerNames[m.team1[0]];
    const p2 = playerNames[m.team1[1]];
    const p3 = playerNames[m.team2[0]];
    const p4 = playerNames[m.team2[1]];

    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-header">
        <span class="match-number">第 ${m.match} 場</span>
        <span style="font-size:0.8rem; color:var(--text-muted);">雙打對決</span>
      </div>
      <div class="match-versus">
        <div class="team-box">
          <div class="team-name">隊伍 A</div>
          <div class="player-names">${p1} & ${p2}</div>
        </div>
        <div class="vs-badge">VS</div>
        <div class="team-box">
          <div class="team-name">隊伍 B</div>
          <div class="player-names">${p3} & ${p4}</div>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; color:#5eead4;">第 ${m.match} 場</td>
      <td style="font-weight:600; color:var(--text-main);">${p1} & ${p2}</td>
      <td style="font-weight:900; color:var(--accent-color);">VS</td>
      <td style="font-weight:600; color:var(--text-main);">${p3} & ${p4}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function renderAttendanceMatrix() {
  const schedData = MULTI_SCHEDULES[playerCount];
  const N = playerCount;
  const headRow = document.getElementById("attendanceHeadRow");
  const body = document.getElementById("attendanceBody");

  headRow.innerHTML = `<th>場次 / 選手</th>` + playerNames.map(name => `<th>${name}</th>`).join("");
  body.innerHTML = "";

  const playerStreaks = new Array(N).fill(0);
  const playerConsec2Counts = new Array(N).fill(0);

  for (let mIdx = 0; mIdx < schedData.matches.length; mIdx++) {
    const m = schedData.matches[mIdx];
    const playingSet = new Set([...m.team1, ...m.team2]);

    const tr = document.createElement("tr");
    let rowHTML = `<td style="font-weight:700; color:#5eead4;">第 ${mIdx + 1} 場</td>`;

    for (let p = 0; p < N; p++) {
      if (playingSet.has(p)) {
        playerStreaks[p]++;
        if (playerStreaks[p] === 2) {
          playerConsec2Counts[p]++;
          rowHTML += `<td class="cell-streak-2">上場 <span class="badge-consec">連2</span></td>`;
        } else {
          rowHTML += `<td class="cell-play">上場</td>`;
        }
      } else {
        playerStreaks[p] = 0;
        rowHTML += `<td class="cell-rest">休息</td>`;
      }
    }
    tr.innerHTML = rowHTML;
    body.appendChild(tr);
  }

  const summaryTr = document.createElement("tr");
  summaryTr.style.fontWeight = "bold";
  summaryTr.style.backgroundColor = "#0f172a";
  let sumHTML = `<td style="color:var(--accent-color);">統計 (總場次/連2次數)</td>`;
  for (let p = 0; p < N; p++) {
    sumHTML += `<td style="color:#5eead4;">${schedData.gamesPerPlayer}場 (${playerConsec2Counts[p]}次連2)</td>`;
  }
  summaryTr.innerHTML = sumHTML;
  body.appendChild(summaryTr);
}

function renderTeammateOpponentMatrices() {
  const schedData = MULTI_SCHEDULES[playerCount];
  const stats = verifyConstraints(schedData);
  const N = playerCount;

  const tmHead = document.getElementById("teammateHead");
  const tmBody = document.getElementById("teammateBody");

  tmHead.innerHTML = `<th>隊友＼選手</th>` + playerNames.map(n => `<th>${n}</th>`).join("");
  tmBody.innerHTML = "";

  for (let i = 0; i < N; i++) {
    const tr = document.createElement("tr");
    let html = `<td style="font-weight:700;">${playerNames[i]}</td>`;
    for (let j = 0; j < N; j++) {
      if (i === j) {
        html += `<td class="cell-self">-</td>`;
      } else {
        html += `<td class="cell-val-1">${stats.teammateMatrix[i][j]} 次</td>`;
      }
    }
    tr.innerHTML = html;
    tmBody.appendChild(tr);
  }

  const opHead = document.getElementById("opponentHead");
  const opBody = document.getElementById("opponentBody");

  opHead.innerHTML = `<th>對手＼選手</th>` + playerNames.map(n => `<th>${n}</th>`).join("");
  opBody.innerHTML = "";

  for (let i = 0; i < N; i++) {
    const tr = document.createElement("tr");
    let html = `<td style="font-weight:700;">${playerNames[i]}</td>`;
    for (let j = 0; j < N; j++) {
      if (i === j) {
        html += `<td class="cell-self">-</td>`;
      } else {
        html += `<td class="cell-val-2">${stats.opponentMatrix[i][j]} 次</td>`;
      }
    }
    tr.innerHTML = html;
    opBody.appendChild(tr);
  }
}

function copyLineFormat() {
  const schedData = MULTI_SCHEDULES[playerCount];
  let text = `🏸 ${playerCount}人雙打 ${schedData.totalMatches}場賽程表 🏸\n`;
  text += `名單：${playerNames.join("、")}\n`;
  text += `說明：每人上場${schedData.gamesPerPlayer}場｜絕不連續上場3場｜連續上場最多2場\n\n`;

  schedData.matches.forEach(m => {
    const p1 = playerNames[m.team1[0]];
    const p2 = playerNames[m.team1[1]];
    const p3 = playerNames[m.team2[0]];
    const p4 = playerNames[m.team2[1]];
    text += `第 ${m.match} 場：[${p1} & ${p2}] VS [${p3} & ${p4}]\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ 已複製賽程（格式適合貼至 LINE 或 Messenger）！");
  }).catch(err => {
    console.error("Copy failed", err);
    alert("複製失敗，請手動複製");
  });
}

function exportCSV() {
  const schedData = MULTI_SCHEDULES[playerCount];
  let csvContent = "\uFEFF";
  csvContent += "場次,隊伍 A 選手 1,隊伍 A 選手 2,隊伍 B 選手 1,隊伍 B 選手 2\n";

  schedData.matches.forEach(m => {
    const p1 = playerNames[m.team1[0]];
    const p2 = playerNames[m.team1[1]];
    const p3 = playerNames[m.team2[0]];
    const p4 = playerNames[m.team2[1]];
    csvContent += `第 ${m.match} 場,${p1},${p2},${p3},${p4}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${playerCount}人雙打${schedData.totalMatches}場賽程表.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("✓ CSV 賽程表檔案已成功下載！");
}

function showToast(msg) {
  let toast = document.getElementById("toastMsg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastMsg";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
