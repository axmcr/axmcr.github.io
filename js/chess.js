(() => {
  // Lightweight chess engine with legal move validation and SVG pieces.
  const boardEl = document.getElementById("chess-board");
  if (!boardEl) return;

  const moveListEl = document.getElementById("move-list");
  const turnIndicator = document.getElementById("turn-indicator");
  const undoBtn = document.getElementById("undo-move");
  const resetBtn = document.getElementById("reset-game");
  const themeBtn = document.getElementById("toggle-theme");
  const botToggle = document.getElementById("bot-toggle");
  const botSide = document.getElementById("bot-side");
  const botDifficulty = document.getElementById("bot-difficulty");
  const botApply = document.getElementById("apply-settings");
  const botStatus = document.getElementById("bot-status");
  const overlay = document.getElementById("chess-overlay");
  const overlayTitle = document.getElementById("chess-overlay-title");
  const overlayMessage = document.getElementById("chess-overlay-message");
  const overlayReset = document.getElementById("chess-overlay-reset");
  const overlayClose = document.getElementById("chess-overlay-close");

  const t = (key, vars) => {
    const translator = window.siteI18n && typeof window.siteI18n.t === "function" ? window.siteI18n.t : null;
    if (translator) return translator(key, vars);
    return key;
  };

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const createInitialBoard = () => [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
  ];

  const state = {
    board: createInitialBoard(),
    turn: "w",
    castling: { wK: true, wQ: true, bK: true, bQ: true },
    enPassant: null,
    moves: [],
    history: [],
    gameOver: false,
    result: "",
    resultKey: "",
    resultVars: null,
    positionHistory: [],
    positionCounts: {}
  };

  let selected = null;
  let legalMovesCache = [];

  const defaultSettings = {
    botEnabled: false,
    playerColor: "w",
    difficulty: "easy"
  };

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem("chessBotSettings");
      if (!stored) return { ...defaultSettings };
      const parsed = JSON.parse(stored);
      return {
        botEnabled: Boolean(parsed.botEnabled),
        playerColor: parsed.playerColor === "b" ? "b" : "w",
        difficulty: ["easy", "medium", "hard"].includes(parsed.difficulty)
          ? parsed.difficulty
          : "easy"
      };
    } catch (error) {
      return { ...defaultSettings };
    }
  };

  const settings = loadSettings();
  let botTimer = null;
  let botThinking = false;

  const setResult = (key, vars = null) => {
    state.resultKey = key || "";
    state.resultVars = vars || null;
    state.result = key ? t(key, vars || {}) : "";
  };

  const refreshResult = () => {
    if (state.resultKey) {
      state.result = t(state.resultKey, state.resultVars || {});
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem("chessBotSettings", JSON.stringify(settings));
    } catch (error) {
      // Ignore storage errors.
    }
  };

  const getBotColor = () => (settings.botEnabled ? (settings.playerColor === "w" ? "b" : "w") : null);
  const isHumanTurn = () => !settings.botEnabled || state.turn === settings.playerColor;

  const cloneBoard = (board) => board.map((row) => row.slice());
  const cloneMoves = (moves) => moves.map((move) => ({ ...move }));
  const cloneCounts = (counts) => ({ ...counts });

  const getPieceColor = (piece) =>
    piece ? (piece === piece.toUpperCase() ? "w" : "b") : null;

  const getPieceAsset = (piece) => {
    if (!piece) return "";
    const color = getPieceColor(piece);
    const type = piece.toUpperCase();
    return `assets/chess/${color}${type}.svg`;
  };

  const getPieceLabel = (piece) => {
    if (!piece) return "";
    const labels = {
      K: "chess.piece.king",
      Q: "chess.piece.queen",
      R: "chess.piece.rook",
      B: "chess.piece.bishop",
      N: "chess.piece.knight",
      P: "chess.piece.pawn"
    };
    const colorKey = getPieceColor(piece) === "w" ? "chess.color.white" : "chess.color.black";
    const pieceKey = labels[piece.toUpperCase()] || "chess.piece.pawn";
    const color = t(colorKey);
    const pieceLabel = t(pieceKey);
    return t("chess.piece.label", { color, piece: pieceLabel });
  };

  const isInside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

  const squareName = (r, c) => `${files[c]}${8 - r}`;

  const getPositionKey = (currentState) => {
    const rows = currentState.board
      .map((row) => row.map((cell) => (cell ? cell : ".")).join(""))
      .join("/");
    const castling = `${currentState.castling.wK ? "K" : ""}${currentState.castling.wQ ? "Q" : ""}${
      currentState.castling.bK ? "k" : ""
    }${currentState.castling.bQ ? "q" : ""}` || "-";
    const ep = currentState.enPassant ? squareName(currentState.enPassant.r, currentState.enPassant.c) : "-";
    return `${rows} ${currentState.turn} ${castling} ${ep}`;
  };

  const recordPosition = () => {
    const key = getPositionKey(state);
    state.positionHistory.push(key);
    state.positionCounts[key] = (state.positionCounts[key] || 0) + 1;
  };

  const isSquareAttacked = (board, r, c, byColor) => {
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const piece = board[row][col];
        if (!piece || getPieceColor(piece) !== byColor) continue;
        const type = piece.toLowerCase();

        if (type === "p") {
          const dir = byColor === "w" ? -1 : 1;
          const attackRows = row + dir;
          if (attackRows === r && (col - 1 === c || col + 1 === c)) {
            return true;
          }
          continue;
        }

        if (type === "n") {
          const jumps = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2]
          ];
          if (jumps.some(([dr, dc]) => row + dr === r && col + dc === c)) {
            return true;
          }
          continue;
        }

        const directions = [];
        if (type === "b" || type === "q") {
          directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
        }
        if (type === "r" || type === "q") {
          directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
        }
        if (type === "k") {
          directions.push(
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
          );
        }

        const maxSteps = type === "k" ? 1 : 8;
        for (const [dr, dc] of directions) {
          for (let step = 1; step <= maxSteps; step += 1) {
            const nr = row + dr * step;
            const nc = col + dc * step;
            if (!isInside(nr, nc)) break;
            if (nr === r && nc === c) return true;
            if (board[nr][nc]) break;
          }
        }
      }
    }
    return false;
  };

  const findKing = (board, color) => {
    const target = color === "w" ? "K" : "k";
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (board[row][col] === target) return { r: row, c: col };
      }
    }
    return null;
  };

  const isInCheck = (board, color) => {
    const king = findKing(board, color);
    if (!king) return false;
    const opponent = color === "w" ? "b" : "w";
    return isSquareAttacked(board, king.r, king.c, opponent);
  };

  const canCastle = (currentState, color, side) => {
    const row = color === "w" ? 7 : 0;
    const opponent = color === "w" ? "b" : "w";
    if (side === "K") {
      if (!currentState.castling[`${color}K`]) return false;
      if (currentState.board[row][5] || currentState.board[row][6]) return false;
      if (currentState.board[row][7].toLowerCase() !== "r") return false;
      if (
        isSquareAttacked(currentState.board, row, 4, opponent) ||
        isSquareAttacked(currentState.board, row, 5, opponent) ||
        isSquareAttacked(currentState.board, row, 6, opponent)
      ) {
        return false;
      }
      return true;
    }

    if (!currentState.castling[`${color}Q`]) return false;
    if (
      currentState.board[row][1] ||
      currentState.board[row][2] ||
      currentState.board[row][3]
    ) {
      return false;
    }
    if (currentState.board[row][0].toLowerCase() !== "r") return false;
    if (
      isSquareAttacked(currentState.board, row, 4, opponent) ||
      isSquareAttacked(currentState.board, row, 3, opponent) ||
      isSquareAttacked(currentState.board, row, 2, opponent)
    ) {
      return false;
    }
    return true;
  };

  const generatePseudoMoves = (currentState, r, c) => {
    const board = currentState.board;
    const piece = board[r][c];
    if (!piece) return [];
    const color = getPieceColor(piece);
    const type = piece.toLowerCase();
    const moves = [];

    const pushMove = (toR, toC, options = {}) => {
      moves.push({
        from: { r, c },
        to: { r: toR, c: toC },
        piece,
        capture: options.capture || false,
        enPassant: options.enPassant || false,
        castle: options.castle || null,
        promotion: options.promotion || null
      });
    };

    if (type === "p") {
      const dir = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      const lastRow = color === "w" ? 0 : 7;

      const oneStep = r + dir;
      if (isInside(oneStep, c) && !board[oneStep][c]) {
        const promotion = oneStep === lastRow ? "Q" : null;
        pushMove(oneStep, c, { promotion });
        const twoStep = r + dir * 2;
        if (r === startRow && !board[twoStep][c]) {
          pushMove(twoStep, c);
        }
      }

      [-1, 1].forEach((dc) => {
        const nr = r + dir;
        const nc = c + dc;
        if (!isInside(nr, nc)) return;
        const target = board[nr][nc];
        if (target && getPieceColor(target) !== color) {
          const promotion = nr === lastRow ? "Q" : null;
          pushMove(nr, nc, { capture: true, promotion });
        }
      });

      if (currentState.enPassant) {
        const { r: epR, c: epC } = currentState.enPassant;
        if (epR === r + dir && Math.abs(epC - c) === 1) {
          pushMove(epR, epC, { capture: true, enPassant: true });
        }
      }
    }

    if (type === "n") {
      const jumps = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
      ];
      jumps.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (!isInside(nr, nc)) return;
        const target = board[nr][nc];
        if (!target || getPieceColor(target) !== color) {
          pushMove(nr, nc, { capture: Boolean(target) });
        }
      });
    }

    if (type === "b" || type === "r" || type === "q") {
      const directions = [];
      if (type === "b" || type === "q") {
        directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
      }
      if (type === "r" || type === "q") {
        directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
      }

      directions.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        while (isInside(nr, nc)) {
          const target = board[nr][nc];
          if (!target) {
            pushMove(nr, nc);
          } else {
            if (getPieceColor(target) !== color) {
              pushMove(nr, nc, { capture: true });
            }
            break;
          }
          nr += dr;
          nc += dc;
        }
      });
    }

    if (type === "k") {
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
      ];
      directions.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (!isInside(nr, nc)) return;
        const target = board[nr][nc];
        if (!target || getPieceColor(target) !== color) {
          pushMove(nr, nc, { capture: Boolean(target) });
        }
      });

      if (canCastle(currentState, color, "K")) {
        pushMove(r, c + 2, { castle: "K" });
      }
      if (canCastle(currentState, color, "Q")) {
        pushMove(r, c - 2, { castle: "Q" });
      }
    }

    return moves;
  };

  const applyMoveToBoard = (board, move) => {
    const nextBoard = cloneBoard(board);
    const { from, to, piece } = move;
    nextBoard[from.r][from.c] = "";

    if (move.enPassant) {
      nextBoard[from.r][to.c] = "";
    }

    if (move.castle) {
      const row = from.r;
      if (move.castle === "K") {
        nextBoard[row][7] = "";
        nextBoard[row][5] = piece === piece.toUpperCase() ? "R" : "r";
      } else {
        nextBoard[row][0] = "";
        nextBoard[row][3] = piece === piece.toUpperCase() ? "R" : "r";
      }
    }

    const promoted = move.promotion
      ? piece === piece.toUpperCase()
        ? move.promotion.toUpperCase()
        : move.promotion.toLowerCase()
      : piece;

    nextBoard[to.r][to.c] = promoted;
    return nextBoard;
  };

  const getNextState = (currentState, move) => {
    const piece = move.piece;
    const color = getPieceColor(piece);
    const opponent = color === "w" ? "b" : "w";

    const nextBoard = applyMoveToBoard(currentState.board, move);
    const nextCastling = { ...currentState.castling };
    let nextEnPassant = null;

    if (piece.toLowerCase() === "p" && Math.abs(move.to.r - move.from.r) === 2) {
      nextEnPassant = {
        r: (move.from.r + move.to.r) / 2,
        c: move.from.c
      };
    }

    if (piece.toLowerCase() === "k") {
      nextCastling[`${color}K`] = false;
      nextCastling[`${color}Q`] = false;
    }

    if (piece.toLowerCase() === "r") {
      if (move.from.r === (color === "w" ? 7 : 0)) {
        if (move.from.c === 0) nextCastling[`${color}Q`] = false;
        if (move.from.c === 7) nextCastling[`${color}K`] = false;
      }
    }

    if (move.capture) {
      if (move.to.r === (opponent === "w" ? 7 : 0)) {
        if (move.to.c === 0) nextCastling[`${opponent}Q`] = false;
        if (move.to.c === 7) nextCastling[`${opponent}K`] = false;
      }
    }

    return {
      board: nextBoard,
      turn: opponent,
      castling: nextCastling,
      enPassant: nextEnPassant
    };
  };

  const generateLegalMoves = (currentState) => {
    const moves = [];
    const color = currentState.turn;

    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const piece = currentState.board[r][c];
        if (!piece || getPieceColor(piece) !== color) continue;
        const pseudo = generatePseudoMoves(currentState, r, c);
        pseudo.forEach((move) => {
          const nextBoard = applyMoveToBoard(currentState.board, move);
          if (!isInCheck(nextBoard, color)) {
            moves.push(move);
          }
        });
      }
    }

    return moves;
  };

  const isInsufficientMaterial = (board) => {
    const minorPieces = [];
    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const piece = board[r][c];
        if (!piece) continue;
        const type = piece.toLowerCase();
        if (type === "p" || type === "r" || type === "q") return false;
        if (type === "b" || type === "n") {
          minorPieces.push({ type, color: getPieceColor(piece) });
        }
      }
    }

    if (minorPieces.length === 0) return true;
    if (minorPieces.length === 1) return true;

    if (minorPieces.length === 2) {
      const [a, b] = minorPieces;
      if (a.color !== b.color) return true;
      if (a.type === "n" && b.type === "n") return true;
      return false;
    }

    return false;
  };

  const isThreefoldRepetition = () => {
    const key = getPositionKey(state);
    return (state.positionCounts[key] || 0) >= 3;
  };

  const getSan = (currentState, move, legalMoves) => {
    if (move.castle) {
      return move.castle === "K" ? "O-O" : "O-O-O";
    }

    const piece = move.piece;
    const color = getPieceColor(piece);
    const type = piece.toLowerCase();
    const destination = squareName(move.to.r, move.to.c);
    let san = "";

    if (type === "p") {
      if (move.capture || move.enPassant) {
        san += `${files[move.from.c]}x${destination}`;
      } else {
        san += destination;
      }
    } else {
      san += piece.toUpperCase();
      const contenders = legalMoves.filter(
        (other) =>
          other !== move &&
          other.piece.toLowerCase() === type &&
          other.to.r === move.to.r &&
          other.to.c === move.to.c
      );
      if (contenders.length) {
        const sameFile = contenders.some((other) => other.from.c === move.from.c);
        const sameRank = contenders.some((other) => other.from.r === move.from.r);
        if (sameFile && sameRank) {
          san += `${files[move.from.c]}${8 - move.from.r}`;
        } else if (sameFile) {
          san += `${8 - move.from.r}`;
        } else {
          san += files[move.from.c];
        }
      }
      if (move.capture) san += "x";
      san += destination;
    }

    if (move.promotion) {
      san += `=${move.promotion.toUpperCase()}`;
    }

    const nextState = getNextState(currentState, move);
    const opponent = nextState.turn;
    const inCheck = isInCheck(nextState.board, opponent);
    if (inCheck) {
      const opponentLegal = generateLegalMoves(nextState);
      san += opponentLegal.length === 0 ? "#" : "+";
    }

    return san;
  };

  const pieceValues = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
  };

  const getSquareValue = (type, color, r, c) => {
    const fileCenter = 3.5;
    const fileDist = Math.abs(fileCenter - c);
    const rankFromHome = color === "w" ? 7 - r : r;
    const centralBonus = Math.max(0, 3.5 - fileDist);

    if (type === "p") return rankFromHome * 6 - fileDist * 1.5;
    if (type === "n") return centralBonus * 8 - rankFromHome * 0.5;
    if (type === "b") return centralBonus * 6 + rankFromHome * 0.5;
    if (type === "r") return rankFromHome * 2;
    if (type === "q") return centralBonus * 4;
    if (type === "k") return -(rankFromHome * 2) + centralBonus * 2;
    return 0;
  };

  const orderMoves = (moves) => {
    const scoreMove = (move) => {
      let score = 0;
      if (move.capture) score += 10;
      if (move.promotion) score += 9;
      if (move.castle) score += 2;
      return score;
    };
    return moves.slice().sort((a, b) => scoreMove(b) - scoreMove(a));
  };

  const evaluateState = (searchState, botColor) => {
    const legal = generateLegalMoves(searchState);
    const ordered = orderMoves(legal);
    if (legal.length === 0) {
      if (isInCheck(searchState.board, searchState.turn)) {
        return searchState.turn === botColor ? -99999 : 99999;
      }
      return 0;
    }

    let score = 0;
    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const piece = searchState.board[r][c];
        if (!piece) continue;
        const color = getPieceColor(piece);
        const type = piece.toLowerCase();
        const value = pieceValues[type] || 0;
        const positional = getSquareValue(type, color, r, c);
        score += color === botColor ? value + positional : -(value + positional);
      }
    }

    const mobility = legal.length * 0.5;
    score += searchState.turn === botColor ? mobility : -mobility;
    return score;
  };

  const minimax = (searchState, depth, alpha, beta, botColor) => {
    const legal = generateLegalMoves(searchState);
    const ordered = orderMoves(legal);
    if (depth === 0 || legal.length === 0) {
      return { score: evaluateState(searchState, botColor) };
    }

    const maximizing = searchState.turn === botColor;
    let bestMove = null;

    if (maximizing) {
      let bestScore = -Infinity;
      for (const move of ordered) {
        const nextState = getNextState(searchState, move);
        const result = minimax(nextState, depth - 1, alpha, beta, botColor);
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = move;
        }
        alpha = Math.max(alpha, result.score);
        if (beta <= alpha) break;
      }
      return { score: bestScore, move: bestMove };
    }

    let bestScore = Infinity;
    for (const move of ordered) {
      const nextState = getNextState(searchState, move);
      const result = minimax(nextState, depth - 1, alpha, beta, botColor);
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      beta = Math.min(beta, result.score);
      if (beta <= alpha) break;
    }
    return { score: bestScore, move: bestMove };
  };

  const chooseBotMove = () => {
    const legalMoves = generateLegalMoves(state);
    if (!legalMoves.length) return null;
    const botColor = getBotColor();

    if (settings.difficulty === "easy") {
      const captures = legalMoves.filter((move) => move.capture);
      const pool = captures.length ? captures : legalMoves;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    if (settings.difficulty === "medium") {
      let bestScore = -Infinity;
      let bestMoves = [];
      legalMoves.forEach((move) => {
        const nextState = getNextState(state, move);
        const score = evaluateState(nextState, botColor);
        if (score > bestScore) {
          bestScore = score;
          bestMoves = [move];
        } else if (score === bestScore) {
          bestMoves.push(move);
        }
      });
      return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    const depth = 3;
    const result = minimax(state, depth, -Infinity, Infinity, botColor);
    if (result.move) return result.move;
    return legalMoves[Math.floor(Math.random() * legalMoves.length)];
  };

  const scheduleBotMove = () => {
    if (!settings.botEnabled || state.gameOver) return;
    const botColor = getBotColor();
    if (!botColor || state.turn !== botColor) return;
    if (botThinking) return;

    botThinking = true;
    const delay =
      settings.difficulty === "easy" ? 350 : settings.difficulty === "medium" ? 480 : 620;

    if (botTimer) {
      clearTimeout(botTimer);
    }

    botTimer = setTimeout(() => {
      botThinking = false;
      if (state.gameOver) return;
      if (!settings.botEnabled || state.turn !== getBotColor()) return;
      const move = chooseBotMove();
      if (!move) return;
      const legalMoves = generateLegalMoves(state);
      const san = getSan(state, move, legalMoves);
      makeMove(move, san);
      clearSelection();
      renderBoard();
      renderMoveList();
    }, delay);
  };

  const updateEndOverlay = () => {
    if (!overlay) return;
    if (!state.gameOver) {
      overlay.classList.remove("is-active");
      overlay.setAttribute("aria-hidden", "true");
      return;
    }
    const parts = state.result.split("?");
    overlayTitle.textContent = parts[0].trim();
    overlayMessage.textContent = parts.slice(1).join("?").trim();
    overlay.classList.add("is-active");
    overlay.setAttribute("aria-hidden", "false");
  };

  const evaluateGameState = () => {
    const legal = generateLegalMoves(state);
    if (legal.length === 0) {
      if (isInCheck(state.board, state.turn)) {
        const winner = state.turn === "w" ? t("chess.color.black") : t("chess.color.white");
        state.gameOver = true;
        setResult("chess.result.checkmate", { winner });
      } else {
        state.gameOver = true;
        setResult("chess.result.stalemate");
      }
    } else if (isInsufficientMaterial(state.board)) {
      state.gameOver = true;
      setResult("chess.result.insufficient");
    } else if (isThreefoldRepetition()) {
      state.gameOver = true;
      setResult("chess.result.threefold");
    } else {
      state.gameOver = false;
      setResult("");
    }

    updateEndOverlay();
  };

  const makeMove = (move, san) => {
    state.history.push({
      board: cloneBoard(state.board),
      turn: state.turn,
      castling: { ...state.castling },
      enPassant: state.enPassant ? { ...state.enPassant } : null,
      moves: cloneMoves(state.moves),
      gameOver: state.gameOver,
      result: state.result,
      resultKey: state.resultKey,
      resultVars: state.resultVars ? { ...state.resultVars } : null,
      positionHistory: state.positionHistory.slice(),
      positionCounts: cloneCounts(state.positionCounts)
    });

    const piece = move.piece;
    const color = getPieceColor(piece);

    const nextState = getNextState(state, move);
    state.board = nextState.board;
    state.turn = nextState.turn;
    state.castling = nextState.castling;
    state.enPassant = nextState.enPassant;

    state.moves.push({ san, color });
    recordPosition();
    evaluateGameState();
  };

  const commitMove = (move, san) => {
    makeMove(move, san);
    clearSelection();
    renderBoard();
    renderMoveList();
    scheduleBotMove();
  };

  const renderMoveList = () => {
    if (!moveListEl) return;
    moveListEl.innerHTML = "";
    for (let i = 0; i < state.moves.length; i += 2) {
      const row = document.createElement("div");
      row.className = "move-row";

      const index = document.createElement("div");
      index.textContent = `${i / 2 + 1}.`;

      const whiteMove = document.createElement("div");
      whiteMove.textContent = state.moves[i] ? state.moves[i].san : "";

      const blackMove = document.createElement("div");
      blackMove.textContent = state.moves[i + 1] ? state.moves[i + 1].san : "";

      row.appendChild(index);
      row.appendChild(whiteMove);
      row.appendChild(blackMove);
      moveListEl.appendChild(row);
    }
  };

  const updateTurnIndicator = () => {
    if (!turnIndicator) return;
    if (state.gameOver) {
      turnIndicator.textContent = state.result;
      return;
    }
    const label = state.turn === "w" ? t("chess.color.white") : t("chess.color.black");
    let text = t("chess.turn.move", { color: label });
    if (isInCheck(state.board, state.turn)) {
      text += t("chess.turn.check");
    }
    if (settings.botEnabled && state.turn === getBotColor()) {
      text += t("chess.turn.bot");
    }
    turnIndicator.textContent = text;
  };

  const renderBoard = () => {
    boardEl.innerHTML = "";
    const orientation = settings.playerColor === "b" ? "b" : "w";
    boardEl.dataset.orientation = orientation;
    for (let displayR = 0; displayR < 8; displayR += 1) {
      const r = orientation === "b" ? 7 - displayR : displayR;
      for (let displayC = 0; displayC < 8; displayC += 1) {
        const c = orientation === "b" ? 7 - displayC : displayC;
        const square = document.createElement("button");
        square.type = "button";
        square.className = `square ${(r + c) % 2 === 0 ? "light" : "dark"}`;
        square.dataset.row = r;
        square.dataset.col = c;
        square.setAttribute("aria-label", squareName(r, c));

        if (selected && selected.r === r && selected.c === c) {
          square.classList.add("selected");
        }

        if (legalMovesCache.some((move) => move.to.r === r && move.to.c === c)) {
          square.classList.add("legal");
        }

        const piece = state.board[r][c];
        if (piece) {
          const img = document.createElement("img");
          img.className = "piece-img";
          img.src = getPieceAsset(piece);
          img.alt = getPieceLabel(piece);
          img.dataset.color = getPieceColor(piece);
          square.appendChild(img);
        }

        square.draggable = Boolean(piece) && getPieceColor(piece) === state.turn && !state.gameOver && isHumanTurn();
        boardEl.appendChild(square);
      }
    }

    updateTurnIndicator();
  };

  const selectSquare = (r, c) => {
    if (state.gameOver || !isHumanTurn()) return;
    selected = { r, c };
    legalMovesCache = generateLegalMoves(state).filter(
      (move) => move.from.r === r && move.from.c === c
    );
    renderBoard();
  };

  const clearSelection = () => {
    selected = null;
    legalMovesCache = [];
  };

  const attemptMove = (toR, toC) => {
    if (!selected || state.gameOver || !isHumanTurn()) return;
    const legalMoves = generateLegalMoves(state);
    const move = legalMoves.find(
      (candidate) =>
        candidate.from.r === selected.r &&
        candidate.from.c === selected.c &&
        candidate.to.r === toR &&
        candidate.to.c === toC
    );

    if (move) {
      const san = getSan(state, move, legalMoves);
      commitMove(move, san);
      return;
    }

    const targetPiece = state.board[toR][toC];
    if (targetPiece && getPieceColor(targetPiece) === state.turn) {
      selectSquare(toR, toC);
      return;
    }

    clearSelection();
    renderBoard();
  };

  const setTheme = (theme) => {
    boardEl.dataset.theme = theme;
    if (themeBtn) {
      const labelKey = theme === "light" ? "chess.theme.light" : "chess.theme.dark";
      themeBtn.textContent = t(labelKey);
    }
    try {
      localStorage.setItem("chessTheme", theme);
    } catch (error) {
      // Ignore storage errors.
    }
  };

  const resetGame = () => {
    if (botTimer) {
      clearTimeout(botTimer);
      botTimer = null;
      botThinking = false;
    }
    state.board = createInitialBoard();
    state.turn = "w";
    state.castling = { wK: true, wQ: true, bK: true, bQ: true };
    state.enPassant = null;
    state.moves = [];
    state.history = [];
    state.gameOver = false;
    setResult("");
    state.positionHistory = [];
    state.positionCounts = {};
    recordPosition();
    clearSelection();
    renderBoard();
    renderMoveList();
    updateEndOverlay();
    scheduleBotMove();
  };

  const initialTheme = (() => {
    try {
      return localStorage.getItem("chessTheme") || "dark";
    } catch (error) {
      return "dark";
    }
  })();

  setTheme(initialTheme);

  const updateBotStatus = () => {
    if (!botStatus) return;
    if (!settings.botEnabled) {
      botStatus.textContent = t("chess.bot.off");
      return;
    }
    const sideLabel = settings.playerColor === "w" ? t("chess.color.black") : t("chess.color.white");
    const levelLabel =
      settings.difficulty === "easy"
        ? t("chess.level.easy")
        : settings.difficulty === "medium"
          ? t("chess.level.medium")
          : t("chess.level.hard");
    botStatus.textContent = t("chess.bot.status", { level: levelLabel, side: sideLabel });
  };

  const syncSettingsUI = () => {
    if (botToggle) botToggle.value = settings.botEnabled ? "on" : "off";
    if (botSide) botSide.value = settings.playerColor;
    if (botDifficulty) botDifficulty.value = settings.difficulty;
    updateBotStatus();
  };

  const applySettings = () => {
    settings.botEnabled = botToggle?.value === "on";
    settings.playerColor = botSide?.value === "b" ? "b" : "w";
    settings.difficulty = ["easy", "medium", "hard"].includes(botDifficulty?.value)
      ? botDifficulty.value
      : "easy";
    saveSettings();
    syncSettingsUI();
    resetGame();
  };

  syncSettingsUI();

  window.siteI18n?.onChange?.(() => {
    refreshResult();
    updateEndOverlay();
    updateBotStatus();
    setTheme(boardEl.dataset.theme === "light" ? "light" : "dark");
    renderBoard();
  });

  boardEl.addEventListener("click", (event) => {
    if (state.gameOver || !isHumanTurn()) return;
    const square = event.target.closest(".square");
    if (!square) return;
    const r = Number(square.dataset.row);
    const c = Number(square.dataset.col);
    const piece = state.board[r][c];

    if (!selected) {
      if (piece && getPieceColor(piece) === state.turn) {
        selectSquare(r, c);
      }
      return;
    }

    if (selected.r === r && selected.c === c) {
      clearSelection();
      renderBoard();
      return;
    }

    attemptMove(r, c);
  });

  boardEl.addEventListener("dragstart", (event) => {
    if (state.gameOver || !isHumanTurn()) {
      event.preventDefault();
      return;
    }
    const square = event.target.closest(".square");
    if (!square) return;
    const r = Number(square.dataset.row);
    const c = Number(square.dataset.col);
    const piece = state.board[r][c];
    if (!piece || getPieceColor(piece) !== state.turn) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", `${r},${c}`);
    selectSquare(r, c);
  });

  boardEl.addEventListener("dragover", (event) => {
    if (event.target.closest(".square")) {
      event.preventDefault();
    }
  });

  boardEl.addEventListener("drop", (event) => {
    if (state.gameOver || !isHumanTurn()) return;
    const square = event.target.closest(".square");
    if (!square) return;
    event.preventDefault();
    const r = Number(square.dataset.row);
    const c = Number(square.dataset.col);
    attemptMove(r, c);
  });

  undoBtn?.addEventListener("click", () => {
    if (botTimer) {
      clearTimeout(botTimer);
      botTimer = null;
      botThinking = false;
    }
    const previous = state.history.pop();
    if (!previous) return;
    state.board = cloneBoard(previous.board);
    state.turn = previous.turn;
    state.castling = { ...previous.castling };
    state.enPassant = previous.enPassant ? { ...previous.enPassant } : null;
    state.moves = cloneMoves(previous.moves);
    state.gameOver = previous.gameOver || false;
    state.result = previous.result || "";
    state.resultKey = previous.resultKey || "";
    state.resultVars = previous.resultVars ? { ...previous.resultVars } : null;
    if (state.resultKey) {
      refreshResult();
    }
    state.positionHistory = previous.positionHistory ? previous.positionHistory.slice() : [];
    state.positionCounts = previous.positionCounts ? cloneCounts(previous.positionCounts) : {};
    clearSelection();
    renderBoard();
    renderMoveList();
    updateEndOverlay();
    scheduleBotMove();
  });

  botApply?.addEventListener("click", applySettings);
  resetBtn?.addEventListener("click", resetGame);
  overlayReset?.addEventListener("click", resetGame);

  overlayClose?.addEventListener("click", () => {
    if (!overlay) return;
    overlay.classList.remove("is-active");
    overlay.setAttribute("aria-hidden", "true");
  });

  themeBtn?.addEventListener("click", () => {
    const next = boardEl.dataset.theme === "light" ? "dark" : "light";
    setTheme(next);
  });

  recordPosition();
  evaluateGameState();
  renderBoard();
  renderMoveList();
  scheduleBotMove();
})();








