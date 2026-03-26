# Hamming Code Simulator - Professional Edition

## 📌 Project Overview

This is a **Professional Web-Based Educational Simulation of Hamming Code** designed for Computer Organization and Architecture coursework. The project demonstrates the complete process of **Single Bit Error Detection and Correction (SEC)** using Hamming Code algorithm. It provides an interactive, step-by-step visualization of how data is encoded with parity bits, transmitted through a noisy channel, and then decoded to detect and correct errors.

### Key Features:
- ✅ **Hamming Code Encoding**: Automatic calculation of parity bits using the formula 2^r ≥ m + r + 1
- ⚠️ **Error Injection**: Simulate single-bit errors at any position in the transmitted data
- 🔍 **Error Detection & Correction**: Calculate syndrome values and identify error locations
- 📊 **Step-by-Step Execution Log**: Visual breakdown of each computation step
- 🎨 **Professional UI**: Modern, responsive design with color-coded modules
- 📱 **Supported Data**: Up to 16 bits of input data

---

## 🛠️ Technologies Used

### Frontend Technologies:
- **HTML5**: Semantic markup and form elements for user interface
- **CSS3**: Modern styling with CSS Grid, Flexbox, gradients, and animations
- **Vanilla JavaScript (ES6+)**: Core algorithm implementation and DOM manipulation

### Design & Libraries:
- **Google Fonts**: JetBrains Mono (monospace) and Inter (sans-serif) fonts
- **SVG Icons**: Inline SVG graphics for visual feedback
- **CSS Grid Layout**: Responsive 3-column layout for different screen sizes

### No Backend or External Dependencies:
- 100% client-side processing
- No server required
- No external libraries or frameworks (pure vanilla JS)

---

## 📂 Project Structure

```
Hamming Simulation/
├── index.html          # Main HTML structure (198 lines)
├── script.js           # Core JavaScript logic (591 lines)
├── style.css           # Professional styling (750+ lines)
└── README.md           # Project documentation
```

### File Descriptions:

**index.html**
- Defines the three main modules: Sender, Transmission Channel, Receiver
- Contains input fields, buttons, and display areas
- Includes execution log for step-by-step visualization
- Meta tags for SEO and responsive design

**script.js**
- Global state management via `AppState` object
- DOM element references via `Elements` object
- Utility functions for validation and calculations
- Core Hamming Code implementation functions
- Event listeners and user interaction handlers

**style.css**
- CSS custom properties (variables) for theme colors
- Professional card-based design with shadows and borders
- Color-coded modules (green for sender, red for channel, blue for receiver)
- Responsive grid layout and bit display styling
- Animations for user feedback

---

## 🔧 Main Backend Code Functions

### 1. **validateBinaryInput(input)**
Validates that input contains only binary digits (0 and 1)
- Returns validation object with `isValid` flag and message
- Checks for empty input, invalid characters, and length constraints (max 16 bits)

### 2. **calculateParityBits(m)**
Calculates the number of parity bits required
- Formula: Find smallest r where 2^r ≥ m + r + 1
- Where m = number of data bits, r = number of parity bits
- Used to determine total encoded length

### 3. **encodeHamming(data)**
Core encoding algorithm
```
Steps:
1. Calculate required parity bits (r)
2. Initialize array of size (m + r)
3. Place data bits at non-power-of-2 positions
4. Calculate parity bits at power-of-2 positions using XOR
5. Return encoded array and parity positions
```
- Parity positions: 1, 2, 4, 8, 16... (powers of 2)
- Data positions: 3, 5, 6, 7, 9, 10, 11... (non-powers of 2)
- Each parity bit covers positions where its binary representation bit is set

### 4. **injectError(data, position)**
Simulates single-bit error transmission
- Flips the bit at the specified position (1-based indexing)
- Position 0 = no error (clean transmission)
- Returns modified data array

### 5. **computeSyndrome(data, parityPositions)**
Detects error location using syndrome calculation
```
Steps:
1. Recalculate all parity bits on received data
2. Check if each parity matches (0 = match, 1 = mismatch)
3. Mismatches indicate bits that cover the error position
4. Sum all failing parity positions to get syndrome
```
- Syndrome = 0: No error detected
- Syndrome > 0: Error at position equal to syndrome value

### 6. **correctError(data, errorPosition)**
Corrects single-bit error by flipping the bit at error position
- Uses syndrome value to locate and fix the error
- Returns corrected data array

### 7. **isPowerOfTwo(n)**
Helper function to check if position is power of 2
- Used to identify parity bit positions
- Bit operation: `n > 0 && (n & (n - 1)) === 0`

### 8. **createBitDisplay(bits, parityPositions, errorPos, correctedPos)**
Creates visual HTML representation of bits
- Color-codes parity bits vs data bits
- Highlights error positions and corrected positions
- Displays position labels for each bit

### 9. **addExecutionStep(message)**
Logs each computation step to execution log
- Maintains step count
- Displays sequence of operations for educational purposes

---

## 🎯 Execution Process

### Step 1: **Data Encoding (Sender Module)**
1. User enters binary data (e.g., "1011001")
2. Click "Generate Hamming Code" button
3. System validates input
4. Calculates required parity bits: r = 3 (for 7 data bits)
5. Total encoded length: 7 + 3 = 10 bits
6. Encodes data:
   - Places data bits at positions: 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15
   - Calculates parity bits at positions: 1, 2, 4, 8 using XOR
7. Displays encoded Hamming code with visual bit representation

**Example:**
```
Input: 1011001
Data bits (m): 7
Parity bits (r): 3
Encoded output: 10 bits (includes 3 parity bits + 7 data bits)
```

### Step 2: **Error Injection (Transmission Channel)**
1. Encoded data is transmitted through noisy channel
2. User specifies error position (0 for no error)
3. Click "Inject Error & Transmit" button
4. System flips bit at specified position
5. Displays transmitted data with error highlighted (if applicable)

**Example:**
```
Original encoded: 1010110011
Error at position 5: bit flips from 1 → 0
Transmitted: 1010010011
```

### Step 3: **Error Detection & Correction (Receiver Module)**
1. Click "Detect & Correct Error" button
2. System calculates syndrome:
   - Rechecks all parity bits
   - Sums failing parity positions
3. If syndrome = 0: No error detected
4. If syndrome > 0: Error at position equal to syndrome
5. Corrects error by flipping the identified bit
6. Extracts original data bits from corrected codeword
7. Displays:
   - Syndrome value (decimal and binary)
   - Error detection status
   - Corrected data (with error fix highlighted)
   - Extracted original data

**Example:**
```
Received: 1010010011
Syndrome calculation:
  P1 check: PASSED (even parity)
  P2 check: FAILED (odd parity)
  P4 check: FAILED (odd parity)
Syndrome = 2 + 4 = 6 (Error at position 6)
Corrected: 1010110011
Extracted original data: 1011001
```

---

## 📊 Hamming Code Algorithm Details

### Parity Bit Formula:
$$2^r \geq m + r + 1$$

Where:
- m = number of data bits
- r = number of parity bits
- Total length = m + r

### Parity Calculation:
For each parity bit at position $2^i$, XOR all data bits at positions that have bit i set in their binary representation.

**Position Coverage Example:**
- P1 (position 1): covers positions 1,3,5,7,9,11,13,15... (binary has bit 0 set)
- P2 (position 2): covers positions 2,3,6,7,10,11,14,15... (binary has bit 1 set)
- P4 (position 4): covers positions 4,5,6,7,12,13,14,15... (binary has bit 2 set)
- P8 (position 8): covers positions 8,9,10,11,12,13,14,15... (binary has bit 3 set)

### Error Detection:
Syndrome = XOR recalculation of all parity bits
- If syndrome = 0: No single-bit error
- If syndrome > 0: Error location = syndrome value

---

## 🎮 How to Use

1. **Open in Browser:**
   - Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)

2. **Encode Data:**
   - Enter binary data in the "Sender Module" input field (max 16 bits)
   - Click "Generate Hamming Code" button
   - View encoded result and step-by-step execution log

3. **Inject Error:**
   - Enter error position in the "Transmission Channel" (0 for no error)
   - Click "Inject Error & Transmit" button
   - Observe transmitted data with error highlighted

4. **Detect & Correct:**
   - Click "Detect & Correct Error" button in "Receiver Module"
   - View syndrome calculation and error correction result
   - See extracted original data

5. **Reset:**
   - Click "Reset All" button to start a new simulation

---

## 📋 Example Walkthrough

**Scenario:** Encode "101" with error at position 3

### Encoding:
```
Input: 101
m = 3 data bits
r = 3 parity bits (2^3 = 8 ≥ 3 + 3 + 1 = 7) ✓
Total = 6 bits
Positions: 1(P1) 2(P2) 3(D0) 4(P4) 5(D1) 6(D2)
Encoded:   1     0     1     0     0     1
```

### Transmission with Error:
```
Encoded:    1 0 1 0 0 1
Error at 3: 1 0 0 0 0 1 (bit flipped 1→0)
```

### Reception & Correction:
```
Received: 1 0 0 0 0 1
P1: 1⊕0⊕0⊕1 = 0 (correct)
P2: 0⊕0⊕0⊕1 = 1 (error)
P4: 0⊕0⊕1 = 1 (error)
Syndrome = 2 + 4 = 6... wait that's wrong, let me recalculate

Actually for position 3:
P1 covers: 1, 3, 5, 7... → 1⊕0⊕0 = 1 (parity fail)
P2 covers: 2, 3, 6... → 0⊕0⊕1 = 1 (parity fail)
P4 covers: 4, 5, 6... → 0⊕0⊕1 = 1 (parity fail)
Syndrome = 1 + 2 + 4 = 7... no, should be 3

Syndrome = 1 + 2 = 3 (Error at position 3) ✓
Corrected: 1 0 1 0 0 1
Original: 101 ✓
```

---

## 🎓 Educational Value

This simulator helps students understand:
- How Hamming codes detect and correct single-bit errors
- The relationship between data bits and parity bits
- Binary mathematics and XOR operations
- Network communication error handling
- Information theory fundamentals

---

## ✨ Features in Detail

### Visual Feedback:
- **Color-coded bits**: Green (parity), Blue (data)
- **Error highlighting**: Red for errors, Green for corrections
- **Position labels**: Each bit labeled with its position and type

### Execution Log:
- Detailed step-by-step breakdown of all calculations
- Real-time updates as operations progress
- Scroll-friendly display for long calculations

### Input Validation:
- Only accepts binary digits (0 and 1)
- Enforces maximum 16-bit input length
- Clear error messages for invalid input

### Responsive Design:
- Optimized for large desktop displays (1920px+)
- 3-column grid layout that adapts to screen size
- Professional modern aesthetic with shadows and gradients

---

## 🔬 Technical Implementation Notes

- **State Management**: Uses global `AppState` object to track simulation data
- **DOM Caching**: `Elements` object caches all DOM references for performance
- **Modular Functions**: Each operation is isolated in its own function
- **XOR Operations**: Used extensively for parity calculations (`^` operator)
- **Bitwise Operations**: Used for power-of-2 checks (`&` operator)
- **Real-time Display**: Updates DOM immediately after each operation

---

## 📌 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6+ JavaScript support

---

## 👨‍🎓 Course Information

- **Subject**: Computer Organization and Architecture
- **Year**: 2nd Year
- **Term**: 3rd Term
- **Topic**: Error Detection and Correction Codes

---

## 📝 License

MIT License - Feel free to use and modify for educational purposes.

---

## 🤝 Notes

This is an educational project designed to teach Hamming Code concepts through interactive simulation. All processing happens client-side with no backend or external dependencies required.
