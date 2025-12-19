const result = document.getElementById("result");
const calculator = document.getElementById("calculator");
const toggleBtn = document.getElementById("toggleBtn");

let resetNext = false;

function append(value) {
  if (resetNext) {
    result.value = "";
    resetNext = false;
  }
  result.value += value;
}

function clearResult() {
  result.value = "";
  resetNext = false;
}

function backspace() {
  if (resetNext) return;
  result.value = result.value.slice(0, -1);
}
function safeInverseTrig(func, val) {
    if (val < -1 || val > 1) return NaN; 
    switch(func) {
        case "sin⁻¹": return Math.asin(val) * 180 / Math.PI;
        case "cos⁻¹": return Math.acos(val) * 180 / Math.PI;
        case "tan⁻¹": return Math.atan(val) * 180 / Math.PI;
    }
}


function calculate() {
  try {
    let exp = result.value;
    exp = exp.replace(/π/g, "Math.PI");
    exp = exp.replace(/\be\b/g, "Math.E");

 
    exp = exp.replace(/(sin⁻¹|cos⁻¹|tan⁻¹)\(([^()]+)\)/g, function(match, func, val) {
        return safeInverseTrig(func, eval(val));
    });

    exp = exp.replace(/sin\(([^()]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
    exp = exp.replace(/cos\(([^()]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
    exp = exp.replace(/tan\(([^()]+)\)/g, "Math.tan(($1) * Math.PI / 180)");

    exp = exp.replace(/sqrt\(([^()]+)\)/g, "Math.sqrt($1)");
    exp = exp.replace(/log\(([^()]+)\)/g, "Math.log10($1)");
    exp = exp.replace(/ln\(([^()]+)\)/g, "Math.log($1)");
    exp = exp.replace(/abs\(([^()]+)\)/g, "Math.abs($1)");

    let ans = eval(exp);

    if (!isFinite(ans) || isNaN(ans)) {
      result.value = "Error";
      resetNext = true;
    } else {
      result.value = ans;
      resetNext = false;
    }
  } catch {
    result.value = "Error";
    resetNext = true;
  }
}



function toggleScientific() {
  calculator.classList.toggle("expanded");
  toggleBtn.textContent =
    calculator.classList.contains("expanded") ? "Normal" : "Scientific";
}

function factorial() {
  let n = parseInt(result.value);
  if (isNaN(n) || n < 0) {
    result.value = "Error";
    resetNext = true;
    return;
  }
  let res = 1;
  for (let i = 1; i <= n; i++) res *= i;
  result.value = res;
}
