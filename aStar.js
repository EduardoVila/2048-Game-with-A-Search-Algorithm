//function for simulate the keyboard press
function simulateKeyPress(key, keycode) {
  var event = jQuery.Event('keydown');
  event.key = key;
  event.which = keycode;
  event.altKey = false;
  event.ctrlKey = false;
  event.metaKey = false;
  event.shiftKey = false;
  event.type = "keydown";
  $('body').trigger(event);
}
$(()=>{
  $('body').keydown((e)=>{
  console.log(e);
});
})

let line1 = [2, 0, 0];
let line2 = [0, 0, 0];
let line3 = [0, 0, 0];

let table = [line1, line2, line3];

c = 1;
setInterval(()=>{
    if(greatest(table)!=32) {
    console.log('tentativa '+c+': ')
    move(table);
    c = c +1;
  }
},2000)


//move function take decision of what movement to do 
function move(table, count) {
  decisions = [
    ['right', calcRight(table) ],
    ['down', calcDown(table) ], 
    ['left', calcLeft(table) ],
    ['up', calcUp(table) ]
  ]

  bd = bestDecision(decisions, table);

    if (bd[0] == 'up') {
      moveUp(table);
      console.log('up');
    } else  if (bd[0] == 'down') {
      moveDown(table);
      console.log('down');
    } else  if (bd[0] == 'left') {
      moveLeft(table);
      console.log('left');
    } else if (bd[0] == 'right') {
      moveRight(table);
      console.log('right');
    }

  insert2(table);

  console.log(table);
}

function copyOf(table) {
  copy = [];

  for (lineIndex in table) {
    copy.push([]);
    for (numberIndex in table[lineIndex]) {
      copy[lineIndex].push(table[lineIndex][numberIndex]);
    }
  }

  return copy;
}

function isDifferent(table1, table2) {
  for (lineIndex in table1) {
    for (numberIndex in table1[lineIndex]) {
      if (table1[lineIndex][numberIndex] != table2[lineIndex][numberIndex]) return true;
    }
  }

  return false;
}

function insert2(table) {
  for (lineIndex in table) {
    for (numberIndex in table[lineIndex]) {
      if (table[lineIndex][numberIndex] == 0) {
        table[lineIndex][numberIndex] = 2;
        return;
      }
    }
  }
}

function greatest(table) {
  g = table[0][0];

  for (lineIndex in table) {
    for (numberIndex in table[lineIndex]) {
      if (g < table[lineIndex][numberIndex]) g = table[lineIndex][numberIndex];
    }
  }

  return g;
}

function bestDecision(line, table) {
  best = line[0];

  for (posIndex in line) {
    if (best[1] > line[posIndex][1]) {
      best = line[posIndex];
    }
  }

  return best;
}

function zerosOf(t) {
  count = 0;
  for (lineIndex in table) for (numberIndex in table[lineIndex]) 
    if (table[lineIndex][numberIndex] == 0) count = count+1;

  return count;
}

function calcDown (table) {
  copy = copyOf(table);
  copy = moveDown(copy);

  if(!isDifferent(table, copy)) return 10000;
  return 32 - greatest(copy) - zerosOf(copy);
}

function calcUp (table) {
  copy = copyOf(table);
  copy = moveUp(copy);
  if(!isDifferent(table, copy)) return 10000;
  return 32 - greatest(copy) - zerosOf(copy);
}
function calcLeft (table) {
  copy = copyOf(table);
  copy = moveLeft(copy);
  if(!isDifferent(table, copy)) return 10000;
  return 32 - greatest(copy) - zerosOf(copy);
}
function calcRight (table) {
  copy = copyOf(table);
  copy = moveRight(copy);
  if(!isDifferent(table, copy)) return 10000;
  return 32 - greatest(copy) - zerosOf(copy);
}

function moveDown(table) {
  simulateKeyPress('ArrowDown',40);
  moveTime('moved to down');
  for(numberIndex in table[1]) {
    if (table[2][numberIndex] == 0) {
      table[2][numberIndex] = table[1][numberIndex];
      table[1][numberIndex] = 0;
    } else if (table[1][numberIndex] == table[2][numberIndex]) {
      table[2][numberIndex] = table[2][numberIndex]*2;
      table[1][numberIndex] = 0;
    }
  }

  for(numberIndex in table[0]) {
    if(table[1][numberIndex] == 0 && table[2][numberIndex] == 0) {
      table[2][numberIndex] = table[0][numberIndex];
      table[0][numberIndex] = 0;
    } else if (table[1][numberIndex] == 0 && table[2][numberIndex] == table[0][numberIndex]) {
      table[2][numberIndex] = table[2][numberIndex]*2;
      table[0][numberIndex] = 0;
    } else if (table[1][numberIndex] == 0) {
      table[1][numberIndex] = table[0][numberIndex];
      table[0][numberIndex] = 0;
    } else if (table[1][numberIndex] == table[0][numberIndex]) {
      table[1][numberIndex] = table[0][numberIndex]*2;
      table[0][numberIndex] = 0;
    }
  }
  return table;
}

function moveUp(table) {
  simulateKeyPress('ArrowUp',38);
  moveTime('moved to up');
  for(numberIndex in table[1]) {
    if (table[0][numberIndex] == 0) {
      table[0][numberIndex] = table[1][numberIndex];
      table[1][numberIndex] = 0;
    } else if (table[1][numberIndex] == table[0][numberIndex]) {
      table[0][numberIndex] = table[0][numberIndex]*2;
      table[1][numberIndex] = 0;
    }
  }

  for(numberIndex in table[2]) {
    if(table[1][numberIndex] == 0 && table[0][numberIndex] == 0) {
      table[0][numberIndex] = table[2][numberIndex];
      table[2][numberIndex] = 0;
    } else if (table[1][numberIndex] == 0 && table[0][numberIndex] == table[2][numberIndex]) {
      table[0][numberIndex] = table[0][numberIndex]*2;
      table[2][numberIndex] = 0;
    } else if (table[1][numberIndex] == 0) {
      table[1][numberIndex] = table[2][numberIndex];
      table[2][numberIndex] = 0;
    } else if (table[1][numberIndex] == table[2][numberIndex]) {
      table[1][numberIndex] = table[2][numberIndex]*2;
      table[2][numberIndex] = 0;
    }
  }

  return table;
}

function moveLeft(table) {
  simulateKeyPress('ArrowLeft',37);
  moveTime('moved to left');
  for(lineIndex in table) {
    if (table[lineIndex][0] == 0) {
      table[lineIndex][0] = table[lineIndex][1];
      table[lineIndex][1] = 0;
    } else if (table[lineIndex][0] == table[lineIndex][1]) {
      table[lineIndex][0] = table[lineIndex][0] * 2;
      table[lineIndex][1] = 0;
    }

    if(table[lineIndex][1] == 0 && table[lineIndex][0] == 0) {
      table[lineIndex][0] = table[lineIndex][2];
      table[lineIndex][2] = 0;
    } else if (table[lineIndex][1] == 0 && table[lineIndex][0] == table[lineIndex][2]) {
      table[lineIndex][0] = table[lineIndex][0] * 2;
      table[lineIndex][2] = 0;
    } else if (table[lineIndex][1] == 0) {
      table[lineIndex][1] = table[lineIndex][2];
      table[lineIndex][2] = 0;
    } else if (table[lineIndex][1] == table[lineIndex][2]) {
      table[lineIndex][1] = table[lineIndex][1] * 2;
      table[lineIndex][2] = 0;
    }
  }

  return table;
}

function moveRight(table) {
    simulateKeyPress('ArrowRight',39);
    moveTime('moved to right');
  for(lineIndex in table) {
    if (table[lineIndex][2] == 0) {
      table[lineIndex][2] = table[lineIndex][1];
      table[lineIndex][1] = 0;
    } else if (table[lineIndex][2] == table[lineIndex][1]) {
      table[lineIndex][2] = table[lineIndex][2] * 2;
      table[lineIndex][1] = 0;
    }

    if(table[lineIndex][1] == 0 && table[lineIndex][2] == 0) {
      table[lineIndex][2] = table[lineIndex][0];
      table[lineIndex][0] = 0;
    } else if (table[lineIndex][1] == 0 && table[lineIndex][2] == table[lineIndex][0]) {
      table[lineIndex][2] = table[lineIndex][2] * 2;
      table[lineIndex][0] = 0;
    } else if (table[lineIndex][1] == 0) {
      table[lineIndex][1] = table[lineIndex][0];
      table[lineIndex][0] = 0;
    } else if (table[lineIndex][1] == table[lineIndex][0]) {
      table[lineIndex][1] = table[lineIndex][1] * 2;
      table[lineIndex][0] = 0;
    }
  }

  return table;
}


