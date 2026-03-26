/**
 * HAMMING CODE SIMULATOR - PRO EDITION
 * Multi-Page Logic and Algorithm Implementation
 */

// Global State
const AppState = {
  currentPage: 1,
  originalData: '',
  encodedData: [],
  transmittedData: [],
  parityPositions: [],
  errorPosition: 0,
  stepCount: 0,
  isEncoded: false,
  isTransmitted: false,
  maxSteps: 3
};

// Cached Elements
const Elements = {
  // Navigation
  pages: [
    document.getElementById('page1'),
    document.getElementById('page2'),
    document.getElementById('page3')
  ],
  stepNodes: [
    document.getElementById('step1-node'),
    document.getElementById('step2-node'),
    document.getElementById('step3-node')
  ],
  
  // Inputs
  dataInput: document.getElementById('dataInput'),
  inputValidation: document.getElementById('inputValidation'),
  errorPositionInput: document.getElementById('errorPosition'),
  
  // Buttons
  encodeBtn: document.getElementById('encodeBtn'),
  injectBtn: document.getElementById('injectBtn'),
  detectBtn: document.getElementById('detectBtn'),
  resetBtn: document.getElementById('resetBtn'),
  goToStep2: document.getElementById('goToStep2'),
  goToStep3: document.getElementById('goToStep3'),
  backToStep1: document.getElementById('backToStep1'),
  backToStep2: document.getElementById('backToStep2'),
  
  // Display Containers
  parityInfo: document.getElementById('parityInfo'),
  dataBitsCount: document.getElementById('dataBitsCount'),
  parityBitsCount: document.getElementById('parityBitsCount'),
  encodedResult: document.getElementById('encodedResult'),
  encodedBits: document.getElementById('encodedBits'),
  transmittedResult: document.getElementById('transmittedResult'),
  transmittedBits: document.getElementById('transmittedBits'),
  transmissionStatus: document.getElementById('transmissionStatus'),
  syndromeResult: document.getElementById('syndromeResult'),
  syndromeBinary: document.getElementById('syndromeBinary'),
  syndromeDecimal: document.getElementById('syndromeDecimal'),
  detectionStatus: document.getElementById('detectionStatus'),
  correctedResult: document.getElementById('correctedResult'),
  correctedBits: document.getElementById('correctedBits'),
  extractedData: document.getElementById('extractedData'),
  extractedValue: document.getElementById('extractedValue'),
  executionLog: document.getElementById('executionLog'),
  maxPosition: document.getElementById('maxPosition')
};

// =====================================================
// ALGORITHM CORE
// =====================================================

function calculateParityCount(m) {
  let r = 0;
  while (Math.pow(2, r) < m + r + 1) r++;
  return r;
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

function encodeHamming(data) {
  const m = data.length;
  const r = calculateParityCount(m);
  const totalBits = m + r;
  
  addStep(`Initializing encoding for ${m} bits of data.`);
  addStep(`Formula: 2^r >= m + r + 1. Calculated r = ${r}`);
  
  const encoded = new Array(totalBits).fill(0);
  const parityPos = [];
  for (let i = 0; i < r; i++) parityPos.push(Math.pow(2, i));
  
  addStep(`Parity bits will be placed at positions: ${parityPos.join(', ')}`);

  let dataIdx = 0;
  for (let i = 1; i <= totalBits; i++) {
    if (!isPowerOfTwo(i)) {
      encoded[i - 1] = parseInt(data[dataIdx++]);
    }
  }
  addStep("Data bits inserted into codeword placeholders.");

  for (const p of parityPos) {
    let parity = 0;
    for (let i = 1; i <= totalBits; i++) {
      if ((i & p) !== 0) {
        parity ^= encoded[i - 1];
      }
    }
    encoded[p - 1] = parity;
    addStep(`P${p} calculated as XOR of covered bits: ${parity}`);
  }

  return { encoded, parityPos };
}

function injectError(data, pos) {
  const result = [...data];
  if (pos > 0 && pos <= data.length) {
    result[pos - 1] = result[pos - 1] === 0 ? 1 : 0;
    addStep(`ALERT: Bit flipped at position ${pos} during transmission.`);
  } else {
    addStep("Transmission clean. No errors injected.");
  }
  return result;
}

function computeSyndrome(data, parityPos) {
  let syndrome = 0;
  addStep("Receiver analyzing parity bits...");
  
  for (const p of parityPos) {
    let check = 0;
    for (let i = 1; i <= data.length; i++) {
      if ((i & p) !== 0) check ^= data[i - 1];
    }
    if (check !== 0) {
      syndrome += p;
      addStep(`P${p} check: FAIL (Syndrome value += ${p})`);
    } else {
      addStep(`P${p} check: PASS`);
    }
  }
  return syndrome;
}

// =====================================================
// UI LOGIC
// =====================================================

function addStep(msg) {
  if (AppState.stepCount === 0) Elements.executionLog.innerHTML = '';
  AppState.stepCount++;
  const div = document.createElement('div');
  div.className = 'execution-step';
  div.innerHTML = `<span class="step-number">${AppState.stepCount}</span><span class="step-text">${msg}</span>`;
  Elements.executionLog.appendChild(div);
  Elements.executionLog.scrollTop = Elements.executionLog.scrollHeight;
}

function navigateTo(pageNumber) {
  if (pageNumber < 1 || pageNumber > AppState.maxSteps) return;
  
  // Transition effect
  Elements.pages.forEach(p => p.classList.remove('active'));
  Elements.stepNodes.forEach(n => n.classList.remove('active', 'completed'));
  
  AppState.currentPage = pageNumber;
  Elements.pages[pageNumber - 1].classList.add('active');
  
  // Update Stepper
  for (let i = 0; i < pageNumber; i++) {
    if (i < pageNumber - 1) {
      Elements.stepNodes[i].classList.add('completed');
    } else {
      Elements.stepNodes[i].classList.add('active');
    }
  }
  
  addStep(`User navigated to Step ${pageNumber}: ${Elements.stepNodes[pageNumber-1].querySelector('.step-label').innerText}`);
}

function renderBits(bits, target, parityPos = [], errorPos = 0, correctedPos = 0) {
  target.innerHTML = bits.map((bit, i) => {
    const pos = i + 1;
    let cls = parityPos.includes(pos) ? 'bit-parity' : 'bit-data';
    if (pos === errorPos) cls += ' bit-error';
    if (pos === correctedPos) cls += ' bit-corrected';
    
    return `
      <div class="bit-box">
        <span class="bit-position">${parityPos.includes(pos) ? 'P' : 'D'}${pos}</span>
        <div class="bit-value ${cls}">${bit}</div>
      </div>
    `;
  }).join('');
}

// =====================================================
// EVENT HANDLERS
// =====================================================

Elements.dataInput.addEventListener('input', (e) => {
  const val = e.target.value.replace(/[^01]/g, '');
  e.target.value = val;
  
  if (val.length > 0) {
    const r = calculateParityCount(val.length);
    Elements.dataBitsCount.innerText = val.length;
    Elements.parityBitsCount.innerText = r;
    Elements.parityInfo.classList.remove('hidden');
    Elements.inputValidation.innerHTML = `<div class="status-badge status-success">Valid binary input (${val.length} bits)</div>`;
  } else {
    Elements.parityInfo.classList.add('hidden');
    Elements.inputValidation.innerHTML = '';
  }
});

Elements.encodeBtn.addEventListener('click', () => {
  const data = Elements.dataInput.value;
  if (!data) return;
  
  const { encoded, parityPos } = encodeHamming(data);
  AppState.originalData = data;
  AppState.encodedData = encoded;
  AppState.parityPositions = parityPos;
  AppState.isEncoded = true;
  
  renderBits(encoded, Elements.encodedBits, parityPos);
  Elements.encodedResult.classList.remove('hidden');
  Elements.goToStep2.disabled = false;
  Elements.maxPosition.innerText = encoded.length;
  Elements.errorPositionInput.max = encoded.length;
  
  addStep("Codeword generated successfully. Ready for step 2.");
});

Elements.injectBtn.addEventListener('click', () => {
  const pos = parseInt(Elements.errorPositionInput.value) || 0;
  AppState.errorPosition = pos;
  AppState.transmittedData = injectError(AppState.encodedData, pos);
  AppState.isTransmitted = true;
  
  renderBits(AppState.transmittedData, Elements.transmittedBits, AppState.parityPositions, pos);
  Elements.transmittedResult.classList.remove('hidden');
  
  const status = pos === 0 
    ? '<div class="status-badge status-success">Clean Transmission</div>'
    : `<div class="status-badge status-error">Error position ${pos} detected by channel</div>`;
  Elements.transmissionStatus.innerHTML = status;
  
  Elements.goToStep3.disabled = false;
  addStep("Codeword transmitted through the channel.");
});

Elements.detectBtn.addEventListener('click', () => {
  const syndrome = computeSyndrome(AppState.transmittedData, AppState.parityPositions);
  
  Elements.syndromeBinary.innerText = syndrome.toString(2).padStart(AppState.parityPositions.length, '0');
  Elements.syndromeDecimal.innerText = syndrome;
  Elements.syndromeResult.classList.remove('hidden');

  let corrected = [...AppState.transmittedData];
  if (syndrome !== 0) {
    corrected[syndrome - 1] = corrected[syndrome - 1] === 0 ? 1 : 0;
    Elements.detectionStatus.innerHTML = `<div class="status-badge status-error">Error detected at position ${syndrome}! Correcting...</div>`;
    renderBits(corrected, Elements.correctedBits, AppState.parityPositions, 0, syndrome);
    Elements.correctedResult.classList.remove('hidden');
  } else {
    Elements.detectionStatus.innerHTML = `<div class="status-badge status-success">No errors detected. Data is valid.</div>`;
    Elements.correctedResult.classList.add('hidden');
  }

  // Extract data
  let extracted = '';
  for (let i = 1; i <= corrected.length; i++) {
    if (!isPowerOfTwo(i)) extracted += corrected[i - 1];
  }
  
  Elements.extractedValue.innerText = extracted;
  Elements.extractedData.classList.remove('hidden');
  
  addStep(`Final Verification: ${extracted === AppState.originalData ? "SUCCESS (extracted == original)" : "FAIL (data mismatch)"}`);
});

// Navigation Listeners
Elements.goToStep2.addEventListener('click', () => navigateTo(2));
Elements.goToStep3.addEventListener('click', () => navigateTo(3));
Elements.backToStep1.addEventListener('click', () => navigateTo(1));
Elements.backToStep2.addEventListener('click', () => navigateTo(2));
Elements.resetBtn.addEventListener('click', () => location.reload()); // Simple reset

// Init
window.onload = () => {
  addStep("Hamming Simulator Pro System Ready.");
  addStep("Awaiting Sender input...");
};
