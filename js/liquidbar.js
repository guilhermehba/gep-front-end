function progressBarLiquidChance(dadas,previstas) {
    const progress = document.querySelector(`.progressCircle`);
    const progressLabelDadas = document.querySelector(`.progressCircle-label > #numeroDadas`);
    const progressLabelPrevistas = document.querySelector(`.progressCircle-label > #numeroPrevistas`);
    const progressLabelBarra = document.querySelector(`.progressCircle-label > span`);
    const input = (dadas/previstas)*100;
    
      let value = input <= 100 && input >= 0 ? input : 50;
      progressLabelDadas.textContent = dadas;
      progressLabelPrevistas.textContent = previstas;
      progress.style.setProperty(`--progressCircle-value`, value);
      progress.dataset.value = value;
      if(value == 100){
        progressLabelPrevistas.textContent = "";
        progressLabelBarra.textContent ="";
      }
  
      if (value > 50) progress.classList.add(`progressCircle--upper-half-value`);
      else
        progress.classList.contains("progressCircle--upper-half-value") &&
          progress.classList.remove(`progressCircle--upper-half-value`);
  }
  