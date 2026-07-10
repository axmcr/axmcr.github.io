(() => {
  // Notes rendering for the notes page and homepage.
  const listEl = document.getElementById("notes-list");
  const recentEl = document.getElementById("recent-notes");
  const matrixEl = document.getElementById("notes-matrix");

  const shouldRenderNotes = Boolean(listEl || recentEl);
  const shouldRenderMatrix = Boolean(matrixEl);
  if (!shouldRenderNotes && !shouldRenderMatrix) return;

  const escapeHtml = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const renderText = (text) => {
    const escaped = escapeHtml(text);
    return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  };

  // Basic markdown-style parsing for code blocks and inline code.
  const createContent = (text) => {
    const fragment = document.createDocumentFragment();
    const blocks = text.split(/```/);

    blocks.forEach((block, index) => {
      if (index % 2 === 1) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = block.trim();
        pre.appendChild(code);
        fragment.appendChild(pre);
        return;
      }

      block
        .split(/\n\n/)
        .map((para) => para.trim())
        .filter(Boolean)
        .forEach((para) => {
          const p = document.createElement("p");
          p.innerHTML = renderText(para);
          fragment.appendChild(p);
        });
    });

    return fragment;
  };

  const renderCards = (target, notes) => {
    target.innerHTML = "";
    notes.forEach((note) => {
      const card = document.createElement("article");
      card.className = "note-card";

      const title = document.createElement("h3");
      title.textContent = note.title;

      const date = document.createElement("time");
      date.textContent = note.date;

      const content = document.createElement("div");
      content.className = "note-content";
      content.appendChild(createContent(note.content));

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(content);
      target.appendChild(card);
    });
  };

  const renderTitleList = (target, notes) => {
    target.innerHTML = "";
    target.classList.add("note-title-list");
    notes.forEach((note) => {
      const link = document.createElement("a");
      link.href = "notes.html";
      link.textContent = note.title;
      target.appendChild(link);
    });
  };

  const renderTarget = (target, notes) => {
    const limit = Number(target.dataset.limit) || notes.length;
    const slice = notes.slice(0, limit);
    if (target.dataset.notes === "titles") {
      renderTitleList(target, slice);
    } else {
      renderCards(target, slice);
    }
  };

  const applyNotes = (notes) => {
    const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
    if (listEl) renderTarget(listEl, sorted);
    if (recentEl) renderTarget(recentEl, sorted);
  };

  if (shouldRenderNotes) {
    fetch("data/notes.json")
      .then((response) => response.json())
      .then((notes) => applyNotes(notes))
      .catch(() => {
        const fallback = document.getElementById("notes-fallback");
        if (fallback) {
          try {
            const notes = JSON.parse(fallback.textContent);
            applyNotes(notes);
            return;
          } catch (error) {
            // Fall through to empty states.
          }
        }
        if (listEl) listEl.innerHTML = "<p>Notes are unavailable.</p>";
        if (recentEl) recentEl.innerHTML = "<p>No notes available.</p>";
      });
  }

  if (shouldRenderMatrix) {
    const kana = "\u30a2\u30a4\u30a6\u30a8\u30aa\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce";
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%*+-/<>" + kana;
    const words = ["AXMCR", "GREED", "INDEX", "ARCHIVE", "LAB", "NOTES"];

    const measure = () => {
      const rect = matrixEl.getBoundingClientRect();
      const charWidth = 8;
      const rowHeight = 12;
      const columns = Math.max(30, Math.floor(rect.width / charWidth));
      const rows = Math.max(10, Math.floor(rect.height / rowHeight));
      return { columns, rows };
    };

    let { columns, rows } = measure();
    let drops = Array.from({ length: columns }, () => ({
      pos: Math.random() * rows,
      speed: 0.9 + Math.random() * 0.9,
      trail: 4 + Math.floor(Math.random() * 8)
    }));

    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

    const insertWords = (grid) => {
      for (let i = 0; i < 2; i += 1) {
        if (Math.random() < 0.35) {
          const word = words[Math.floor(Math.random() * words.length)];
          const row = Math.floor(Math.random() * rows);
          const start = Math.floor(Math.random() * Math.max(1, columns - word.length));
          for (let c = 0; c < word.length; c += 1) {
            grid[row][start + c] = word[c];
          }
        }
      }
    };

    const renderMatrix = () => {
      const grid = Array.from({ length: rows }, () => Array.from({ length: columns }, () => " "));

      drops.forEach((drop, col) => {
        const head = Math.floor(drop.pos);
        for (let r = head; r >= head - drop.trail; r -= 1) {
          if (r >= 0 && r < rows) {
            grid[r][col] = randomGlyph();
          }
        }
      });

      insertWords(grid);

      const output = grid.map((row) => row.join("")).join("\n");
      matrixEl.textContent = output;

      drops = drops.map((drop) => {
        const next = { ...drop };
        next.pos += next.speed;
        if (next.pos - next.trail > rows + 4) {
          next.pos = -Math.random() * rows;
          next.speed = 0.9 + Math.random() * 0.9;
          next.trail = 4 + Math.floor(Math.random() * 8);
        }
        return next;
      });
    };

    renderMatrix();
    setInterval(renderMatrix, 90);

    window.addEventListener("resize", () => {
      const measured = measure();
      columns = measured.columns;
      rows = measured.rows;
      drops = Array.from({ length: columns }, () => ({
        pos: Math.random() * rows,
        speed: 0.9 + Math.random() * 0.9,
        trail: 4 + Math.floor(Math.random() * 8)
      }));
    });
  }
})();


