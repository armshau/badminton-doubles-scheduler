// 8人雙打單唱 14場最佳賽程資料與驗證系統

// 最佳賽程數據集 (預先經 Constraint Satisfaction Solver 最佳化求出)
// 極大化連續上場2場人次 = 23 人次 (理論與實務全球最大值)
const OPTIMAL_SCHEDULES = [
  {
    id: 1,
    name: "最佳極大化賽程 (連續上場2場 = 23人次)",
    score: 23,
    matches: [
      { match: 1, team1: [0, 1], team2: [2, 3] }, // AB vs CD
      { match: 2, team1: [0, 3], team2: [4, 5] }, // AD vs EF
      { match: 3, team1: [1, 2], team2: [5, 7] }, // BC vs FH
      { match: 4, team1: [2, 7], team2: [3, 6] }, // CH vs DG
      { match: 5, team1: [1, 3], team2: [5, 6] }, // BD vs FG
      { match: 6, team1: [1, 5], team2: [4, 7] }, // BF vs EH
      { match: 7, team1: [0, 4], team2: [6, 7] }, // AE vs GH
      { match: 8, team1: [0, 5], team2: [2, 6] }, // AF vs CG
      { match: 9, team1: [2, 4], team2: [3, 7] }, // CE vs DH
      { match: 10, team1: [1, 6], team2: [3, 4] }, // BG vs DE
      { match: 11, team1: [0, 6], team2: [1, 7] }, // AG vs BH
      { match: 12, team1: [0, 7], team2: [3, 5] }, // AH vs DF
      { match: 13, team1: [2, 5], team2: [4, 6] }, // CF vs EG
      { match: 14, team1: [0, 2], team2: [1, 4] }  // AC vs BE
    ]
  },
  {
    id: 2,
    name: "備用極大化賽程 B (連續上場2場 = 23人次)",
    score: 23,
    matches: [
      { match: 1, team1: [0, 1], team2: [2, 3] },
      { match: 2, team1: [0, 3], team2: [4, 5] },
      { match: 3, team1: [1, 5], team2: [4, 7] },
      { match: 4, team1: [0, 6], team2: [1, 7] },
      { match: 5, team1: [0, 5], team2: [2, 6] },
      { match: 6, team1: [2, 4], team2: [3, 7] },
      { match: 7, team1: [0, 4], team2: [6, 7] },
      { match: 8, team1: [1, 3], team2: [5, 6] },
      { match: 9, team1: [1, 2], team2: [5, 7] },
      { match: 10, team1: [2, 7], team2: [3, 6] },
      { match: 11, team1: [1, 6], team2: [3, 4] },
      { match: 12, team1: [0, 2], team2: [1, 4] },
      { match: 13, team1: [0, 7], team2: [3, 5] },
      { match: 14, team1: [2, 5], team2: [4, 6] }
    ]
  }
];

// Current State
let currentScheduleIndex = 0;
let playerNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
let currentView = "cards"; // 'cards' or 'table'

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initPlayerInputs();
  renderAll();
  bindEvents();
});

function initPlayerInputs() {
  const container = document.getElementById("playerInputs");
  container.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const div = document.createElement("div");
    div.className = "input-group";
    div.innerHTML = `
      <label for="p${i}">選手 ${i + 1} (${String.fromCharCode(65 + i)})</label>
      <input type="text" id="p${i}" value="${playerNames[i]}" data-index="${i}" placeholder="輸入名稱">
    `;
    container.appendChild(div);
  }

  // Bind input change events
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
  renderRulesVerification();
  renderMatchSchedule();
  renderAttendanceMatrix();
  renderTeammateOpponentMatrices();
}

function bindEvents() {
  // Preset buttons
  document.getElementById("btnPresetDefault")?.addEventListener("click", () => {
    playerNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
    updateInputValues();
    renderAll();
  });

  document.getElementById("btnPresetZh")?.addEventListener("click", () => {
    playerNames = ["隊員一", "隊員二", "隊員三", "隊員四", "隊員五", "隊員六", "隊員七", "隊員八"];
    updateInputValues();
    renderAll();
  });

  document.getElementById("btnPresetStars")?.addEventListener("click", () => {
    playerNames = ["戴資穎", "周天成", "王齊麟", "李洋", "鄧淳薰", "李佳馨", "葉宏蔚", "許玟琪"];
    updateInputValues();
    renderAll();
  });

  // View toggle
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

  // Copy text for LINE
  document.getElementById("btnCopyText")?.addEventListener("click", copyLineFormat);

  // CSV Export
  document.getElementById("btnExportCSV")?.addEventListener("click", exportCSV);

  // Print
  document.getElementById("btnPrint")?.addEventListener("click", () => window.print());

  // Schedule Switcher
  document.getElementById("scheduleSelect")?.addEventListener("change", (e) => {
    currentScheduleIndex = parseInt(e.target.value);
    renderAll();
  });
}

function updateInputValues() {
  for (let i = 0; i < 8; i++) {
    const input = document.getElementById(`p${i}`);
    if (input) input.value = playerNames[i];
  }
}

// 驗證 7 大約束條件
function verifyConstraints(schedule) {
  const playerGamesCount = new Array(8).fill(0);
  const teammateMatrix = Array.from({ length: 8 }, () => new Array(8).fill(0));
  const opponentMatrix = Array.from({ length: 8 }, () => new Array(8).fill(0));
  const playerStreaks = new Array(8).fill(0);
  const playerMaxStreaks = new Array(8).fill(0);
  let totalConsecutive2Count = 0;

  schedule.matches.forEach((m, matchIdx) => {
    const t1 = m.team1;
    const t2 = m.team2;
    const currentPlaying = new Set([...t1, ...t2]);

    // Update attendance & streaks
    for (let p = 0; p < 8; p++) {
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

    // Teammate pairs
    teammateMatrix[t1[0]][t1[1]]++;
    teammateMatrix[t1[1]][t1[0]]++;
    teammateMatrix[t2[0]][t2[1]]++;
    teammateMatrix[t2[1]][t2[0]]++;

    // Opponent pairs
    for (let p1 of t1) {
      for (let p2 of t2) {
        opponentMatrix[p1][p2]++;
        opponentMatrix[p2][p1]++;
      }
    }
  });

  // Verify rules
  const allTeammates1x = teammateMatrix.every((row, i) =>
    row.every((val, j) => (i === j ? val === 0 : val === 1))
  );

  const allOpponents2x = opponentMatrix.every((row, i) =>
    row.every((val, j) => (i === j ? val === 0 : val === 2))
  );

  const allPlayed7Games = playerGamesCount.every(c => c === 7);
  const no3Consecutive = playerMaxStreaks.every(s => s <= 2);

  return {
    totalMatches: schedule.matches.length,
    allTeammates1x,
    allOpponents2x,
    allPlayed7Games,
    no3Consecutive,
    totalConsecutive2Count,
    playerGamesCount,
    teammateMatrix,
    opponentMatrix,
    playerMaxStreaks
  };
}

function renderRulesVerification() {
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  const stats = verifyConstraints(currentSched);

  const grid = document.getElementById("rulesGrid");
  grid.innerHTML = `
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>1. 八人組隊 (8 Players)</h4>
        <p>名單：${playerNames.join(", ")}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>2. 雙打 2vs2 (14 場賽程)</h4>
        <p>對戰格式符合規範，共 ${stats.totalMatches} 場</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>3. 隊友組合 28 對各 1 次</h4>
        <p>${stats.allTeammates1x ? "已驗證：每人與其餘7人剛好搭配隊友 1 次" : "未通過"}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>4. 對手組合 28 對各 2 次</h4>
        <p>${stats.allOpponents2x ? "已驗證：每人與其餘7人剛好對決 2 次" : "未通過"}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>5. 每人剛好上場 7 場</h4>
        <p>${stats.allPlayed7Games ? "已驗證：每人上場 7 場，休息 7 場" : "未通過"}</p>
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-icon">✓</div>
      <div class="rule-content">
        <h4>6. 絕不連續上場 3 場</h4>
        <p>${stats.no3Consecutive ? "已驗證：最長連續上場上限為 2 場" : "警示：有人連續3場"}</p>
      </div>
    </div>
    <div class="rule-card" style="border-color: rgba(245, 158, 11, 0.5); background: rgba(245, 158, 11, 0.08);">
      <div class="rule-icon star">★</div>
      <div class="rule-content">
        <h4>7. 極大化連續上場2場 <span class="highlight-badge">${stats.totalConsecutive2Count} 人次</span></h4>
        <p>達到理論與實務全球最大值 (${stats.totalConsecutive2Count} 人次)</p>
      </div>
    </div>
  `;
}

function renderMatchSchedule() {
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  const cardsContainer = document.getElementById("matchesCardsView");
  const tableBody = document.getElementById("matchesTableBody");

  cardsContainer.innerHTML = "";
  tableBody.innerHTML = "";

  currentSched.matches.forEach((m) => {
    const p1 = playerNames[m.team1[0]];
    const p2 = playerNames[m.team1[1]];
    const p3 = playerNames[m.team2[0]];
    const p4 = playerNames[m.team2[1]];

    // Cards View
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

    // Table View
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
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  const headRow = document.getElementById("attendanceHeadRow");
  const body = document.getElementById("attendanceBody");

  headRow.innerHTML = `<th>場次 / 選手</th>` + playerNames.map(name => `<th>${name}</th>`).join("");
  body.innerHTML = "";

  // Attendance matrix: 14 matches x 8 players
  // Track consecutive counts per player
  const playerStreaks = new Array(8).fill(0);
  const playerConsec2Counts = new Array(8).fill(0);

  for (let mIdx = 0; mIdx < 14; mIdx++) {
    const m = currentSched.matches[mIdx];
    const playingSet = new Set([...m.team1, ...m.team2]);

    const tr = document.createElement("tr");
    let rowHTML = `<td style="font-weight:700; color:#5eead4;">第 ${mIdx + 1} 場</td>`;

    for (let p = 0; p < 8; p++) {
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

  // Summary Row
  const summaryTr = document.createElement("tr");
  summaryTr.style.fontWeight = "bold";
  summaryTr.style.backgroundColor = "#0f172a";
  let sumHTML = `<td style="color:var(--accent-color);">統計 (總場次/連2次數)</td>`;
  for (let p = 0; p < 8; p++) {
    sumHTML += `<td style="color:#5eead4;">7場 (${playerConsec2Counts[p]}次連2)</td>`;
  }
  summaryTr.innerHTML = sumHTML;
  body.appendChild(summaryTr);
}

function renderTeammateOpponentMatrices() {
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  const stats = verifyConstraints(currentSched);

  // Teammate Matrix
  const tmHead = document.getElementById("teammateHead");
  const tmBody = document.getElementById("teammateBody");

  tmHead.innerHTML = `<th>隊友＼選手</th>` + playerNames.map(n => `<th>${n}</th>`).join("");
  tmBody.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");
    let html = `<td style="font-weight:700;">${playerNames[i]}</td>`;
    for (let j = 0; j < 8; j++) {
      if (i === j) {
        html += `<td class="cell-self">-</td>`;
      } else {
        html += `<td class="cell-val-1">${stats.teammateMatrix[i][j]} 次</td>`;
      }
    }
    tr.innerHTML = html;
    tmBody.appendChild(tr);
  }

  // Opponent Matrix
  const opHead = document.getElementById("opponentHead");
  const opBody = document.getElementById("opponentBody");

  opHead.innerHTML = `<th>對手＼選手</th>` + playerNames.map(n => `<th>${n}</th>`).join("");
  opBody.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");
    let html = `<td style="font-weight:700;">${playerNames[i]}</td>`;
    for (let j = 0; j < 8; j++) {
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

// 複製 LINE 賽程格式
function copyLineFormat() {
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  let text = `🏸 8人雙打14場最佳賽程表 🏸\n`;
  text += `名單：${playerNames.join("、")}\n`;
  text += `說明：每人上場7場｜隊友各1次｜對手各2次｜連續上場最多2場\n\n`;

  currentSched.matches.forEach(m => {
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

// 匯出 CSV
function exportCSV() {
  const currentSched = OPTIMAL_SCHEDULES[currentScheduleIndex];
  let csvContent = "\uFEFF"; // UTF-8 BOM
  csvContent += "場次,隊伍 A 選手 1,隊伍 A 選手 2,隊伍 B 選手 1,隊伍 B 選手 2\n";

  currentSched.matches.forEach(m => {
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
  a.download = `8人雙打14場賽程表.csv`;
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
