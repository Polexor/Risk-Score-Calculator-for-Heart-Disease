"use strict";

/*Elements*/
const slider = document.querySelector(".select_age");
const value = document.querySelector(".age_value");
const container = document.querySelector(".container");

/*Form selectors*/
const form1 = document.querySelector(".div_form1");
const form2 = document.querySelector(".div_form2");
const form3 = document.querySelector(".div_form3");
const form4 = document.querySelector(".div_form4");
const form5 = document.querySelector(".div_form5");

/*Next buttons*/
const idButtonNext1 = document.getElementById("bn1");
const idButtonNext2 = document.getElementById("bn2");
const idButtonNext3 = document.getElementById("bn3");
const idButtonNext4 = document.getElementById("bn4");

/*Previous buttons*/
const idButtonPrevious2 = document.getElementById("bp2");
const idButtonPrevious3 = document.getElementById("bp3");
const idButtonPrevious4 = document.getElementById("bp4");
const idButtonPrevious5 = document.getElementById("bp5");

const idButtonRestart5 = document.getElementById("br5");

//Form1
const ageInput = document.querySelector(".select_age");
const maleInput = document.querySelector(".select_male");
const femaleInput = document.querySelector(".select_female");

//From2
const cholesterolInput = document.querySelector(".total_cholesterol");
const hdlCholesterolInput = document.querySelector(".hdl_cholesterol");

//Form3
const smokerYesInput = document.querySelector(".btn_yes");
const smokerNoInput = document.querySelector(".btn_no");

//Form4
const bloodPressureInput = document.querySelector(".in_pressure");
const bpTreated = document.querySelector(".select_treated");
const bpUnTreated = document.querySelector(".select_untreated");

//Form 5
let canvas = document.querySelector(".can");
//Inputs to clear
const mess = document.getElementsByTagName("p");
const radio = document.querySelectorAll("input[type=radio]");
const numBoxes = document.querySelectorAll("input[type=number]");

/**
 * When the button is clicked, hide the first element and show the second element.
 * Done by removing/ adding the "hidden" class in html which is linked with css which sets the display property to none.
 */
let hideShow = function (btnId, from, to) {
  btnId.onclick = function () {
    from.classList.add("hidden");
    to.classList.remove("hidden");
  };
};

/* Checking if the maleInput or femaleInput is checked. If it is not checked, it will display a
message. If it is checked, it will hide the first form and show the second form. */
idButtonNext1.onclick = function () {
  if (!(maleInput.checked || femaleInput.checked)) {
    displayMessage(".message_gender", "Please fill in the required fields");
  } else {
    form1.classList.add("hidden");
    form2.classList.remove("hidden");
  }
};

/* Checking if the user has entered both Total and HDL Cholesterol levels. */
idButtonNext2.onclick = function () {
  if (
    cholesterolInput.value.length == 0 ||
    hdlCholesterolInput.value.length == 0
  ) {
    displayMessage(
      ".message_ch",
      "Please enter both Total and HDL Cholesterol levels"
    );
  } else {
    form2.classList.add("hidden");
    form3.classList.remove("hidden");
  }
};

/* Checking if the user has selected either "Yes" or "No" for the question.*/
idButtonNext3.onclick = function () {
  if (!(smokerYesInput.checked || smokerNoInput.checked)) {
    displayMessage(".message_smoker", `Please select "Yes" or "No"`);
  } else {
    form3.classList.add("hidden");
    form4.classList.remove("hidden");
  }
};

/* Checking to see if the user has selected a radio button and entered a value in the input field. The results of the quiz will be displayed after the button click in the next form*/
idButtonNext4.onclick = function () {
  if (
    !(bpTreated.checked || bpUnTreated.checked) ||
    bloodPressureInput.value.length == 0
  ) {
    displayMessage(
      ".message_bp",
      `Please enter your blood pressure and select "Treated" or "Untreated"`
    );
  } else {
    form4.classList.add("hidden");
    form5.classList.remove("hidden");
    displayMessage(
      ".message_out",
      `Your 10-year risk of having a cardiovascular problem is ${finalPercent()}%`
    );

    if (!(finalPercent() == "less than 1" || finalPercent() == "over 30")) {
      canvas.classList.remove("hidden");
      draw();
    }
  }
};

/*Used to clear all the form inputs and go back to form1*/
idButtonRestart5.onclick = function () {
  //Switch to the first page
  form5.classList.add("hidden");
  form1.classList.remove("hidden");

  /* Removing all the text from the page. */
  for (let i = 0; i < mess.length; i++) {
    mess[i].innerHTML = "";
  }

  /* Resetting the radio buttons to their default state. */
  for (let i = 0; i < radio.length; i++) {
    radio[i].checked = false;
  }

  //Clear the textboxes
  for (let i = 0; i < numBoxes.length; i++) {
    numBoxes[i].value = "";
  }

  //Clear the age slider
  slider.value = 50;
  value.innerHTML = slider.value;

  //Hide the canvas(piechart)
  canvas.classList.add("hidden");
};

/* Creating a slider and a value which shows age in text when the slider moves */
value.innerHTML = slider.value;
slider.oninput = function () {
  value.innerHTML = this.value;
};

//Previous buttons
hideShow(idButtonPrevious2, form2, form1);
hideShow(idButtonPrevious3, form3, form2);
hideShow(idButtonPrevious4, form4, form3);
hideShow(idButtonPrevious5, form5, form4);

/* The function takes two arguments, a class and a message, and then displays the message in the element with that class
 */
const displayMessage = function (cls, message) {
  document.querySelector(cls).textContent = message;
};

/**
 * This method is used in a lot of the functions to compare and set scores.
 * It takes the user input and compares it against two ages that are specified, after which a score is assigned/ returned if true
 */
const scoreMethod = function (input, age1, age2, score) {
  if (between(input, age1, age2)) {
    return score;
  }
  return 0;
};

/**
 * Responsible for giving scores to the choelsterol sections for male and females
 * Takes the age entered by the user and compares it with age1 and age2 values that are     specified in order to assign a score
 */
const cholesterolScore = function (
  inputAge,
  inputCh,
  age1,
  age2,
  c1,
  c2,
  score
) {
  if (between(inputAge, age1, age2) && between(inputCh, c1, c2)) {
    return score;
  }
  return 0;
};

/**This function is used to compare if a value is inbetween two other values
 * x is the user input while min and max are the ranges it should be between.
 * This is mainly used in other functions to calculate and asssign scores.
 */
const between = function (x, min, max) {
  return x >= min && x <= max;
};

/**
 * Used to compare the final score with specified points.
 * If true then the specified percentage is returned.
 */
const assignP = function (total, points, percent) {
  if (total === points) {
    return percent;
  } else {
    return 0;
  }
};

// Code adapted and used from:
//https://stackoverflow.com/questions/6995797/html5-canvas-pie-chart

/*To draw the pie chart, uses html canvas*/
const draw = function () {
  let ctx = canvas.getContext("2d");
  let lastend = 0;
  let data = [finalPercent(), 100 - finalPercent()];
  let myTotal = 0;
  let myColor = ["#D61C4E", "#FEC260"];
  let labels = ["Risk", "No-Risk"];

  for (let e = 0; e < data.length; e++) {
    myTotal += data[e];
  }

  let off = 10;
  let w = (canvas.width - off) / 2;
  let h = (canvas.height - off) / 2;
  for (let i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w, h);
    let len = (data[i] / myTotal) * 2 * Math.PI;
    let r = h - off / 2;
    ctx.arc(w, h, r, lastend, lastend + len, false);
    ctx.lineTo(w, h);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var mid = lastend + len / 2;
    ctx.fillText(
      labels[i],
      w + Math.cos(mid) * (r / 2),
      h + Math.sin(mid) * (r / 2)
    );

    lastend += Math.PI * 2 * (data[i] / myTotal);
  }
};

/**
 * Works out the percentage depending on the score returned by the user
 */
const finalPercent = function () {
  let percent = 0;

  if (maleInput.checked) {
    if (finalScore() < 1) {
      return "less than 1";
    } else if (finalScore() >= 17) {
      return "over 30";
    }
    percent += scoreMethod(finalScore(), 1, 4, 1);
    percent += scoreMethod(finalScore(), 5, 6, 2);
    percent += assignP(finalScore(), 7, 3);
    percent += assignP(finalScore(), 8, 4);
    percent += assignP(finalScore(), 9, 5);
    percent += assignP(finalScore(), 10, 6);
    percent += assignP(finalScore(), 11, 8);
    percent += assignP(finalScore(), 12, 10);
    percent += assignP(finalScore(), 13, 12);
    percent += assignP(finalScore(), 14, 16);
    percent += assignP(finalScore(), 15, 20);
    percent += assignP(finalScore(), 16, 25);
  } else if (femaleInput.checked) {
    if (finalScore() < 9) {
      return "less than 1";
    } else if (finalScore() >= 25) {
      return "over 30";
    }
    percent += scoreMethod(finalScore(), 9, 12, 1);
    percent += assignP(finalScore(), 13, 2);
    percent += assignP(finalScore(), 14, 2);
    percent += assignP(finalScore(), 15, 3);
    percent += assignP(finalScore(), 16, 4);
    percent += assignP(finalScore(), 17, 5);
    percent += assignP(finalScore(), 18, 6);
    percent += assignP(finalScore(), 19, 8);
    percent += assignP(finalScore(), 20, 11);
    percent += assignP(finalScore(), 21, 14);
    percent += assignP(finalScore(), 22, 17);
    percent += assignP(finalScore(), 23, 22);
    percent += assignP(finalScore(), 24, 27);
  }

  return percent;
};

/**
 * Takes all the sperate functions that calculate scores for different sections of the form and adds it together depending on the gender selected.
 */
let finalScore = function () {
  let final = 0;
  if (maleInput.checked) {
    //add up all the counts here for male
    final +=
      genderScoreMale() +
      totalCholesterolMale() +
      smokerScoreMale() +
      hdlCholesterolBoth() +
      bloodPressureScoreMale();
  } else if (femaleInput.checked) {
    //add up all the counts here for female
    final +=
      genderScoreFemale() +
      totalCholesterolFemale() +
      smokerScoreFemale() +
      hdlCholesterolBoth() +
      bloodPressureScoreFemale();
  }
  return final;
};

/**
 * Calculates the score relative to age for males.
 * For example, if the age is between 20 and 34, subtract 9 from the score.
 */
const genderScoreMale = function () {
  const age = ageInput.value;
  let scoreMale = 0;

  scoreMale += scoreMethod(age, 20, 34, -9);
  scoreMale += scoreMethod(age, 35, 39, -4);
  scoreMale += scoreMethod(age, 40, 44, 0);
  scoreMale += scoreMethod(age, 45, 49, 3);
  scoreMale += scoreMethod(age, 50, 54, 6);
  scoreMale += scoreMethod(age, 55, 59, 8);
  scoreMale += scoreMethod(age, 60, 64, 10);
  scoreMale += scoreMethod(age, 65, 69, 11);
  scoreMale += scoreMethod(age, 70, 74, 12);
  scoreMale += scoreMethod(age, 75, 79, 13);

  return scoreMale;
};

/**
 * If the cholesterol is less than 160, and the age is between 20 and 79, then the score is 0.
 * Otherwise, the score is determined by the cholesterolScore() method.
 */
const totalCholesterolMale = function () {
  let chMaleScore = 0;
  const age = ageInput.value;
  const ch = cholesterolInput.value;

  if (ch < 160 && between(age, 20, 79)) {
    chMaleScore += 0;
  } else {
    // Ages 20-39 years
    chMaleScore += cholesterolScore(age, ch, 20, 39, 160, 199, 4);
    chMaleScore += cholesterolScore(age, ch, 20, 39, 200, 239, 7);
    chMaleScore += cholesterolScore(age, ch, 20, 39, 240, 279, 9);
    chMaleScore += cholesterolScore(age, ch, 20, 39, 280, 319, 11);

    // Ages 40-49 years
    chMaleScore += cholesterolScore(age, ch, 40, 49, 160, 199, 3);
    chMaleScore += cholesterolScore(age, ch, 40, 49, 200, 239, 5);
    chMaleScore += cholesterolScore(age, ch, 40, 49, 240, 279, 6);
    chMaleScore += cholesterolScore(age, ch, 40, 49, 280, 319, 8);

    // Ages 50-59 years
    chMaleScore += cholesterolScore(age, ch, 50, 59, 160, 199, 2);
    chMaleScore += cholesterolScore(age, ch, 50, 59, 200, 239, 3);
    chMaleScore += cholesterolScore(age, ch, 50, 59, 240, 279, 4);
    chMaleScore += cholesterolScore(age, ch, 50, 59, 280, 319, 5);

    // Ages 60-69 years
    chMaleScore += cholesterolScore(age, ch, 60, 69, 160, 199, 1);
    chMaleScore += cholesterolScore(age, ch, 60, 69, 200, 239, 1);
    chMaleScore += cholesterolScore(age, ch, 60, 69, 240, 279, 2);
    chMaleScore += cholesterolScore(age, ch, 60, 69, 280, 319, 3);

    // Ages 70-79 years
    chMaleScore += cholesterolScore(age, ch, 70, 79, 160, 199, 0);
    chMaleScore += cholesterolScore(age, ch, 70, 79, 200, 239, 0);
    chMaleScore += cholesterolScore(age, ch, 70, 79, 240, 279, 1);
    chMaleScore += cholesterolScore(age, ch, 70, 79, 280, 319, 1);
  }
  return chMaleScore;
};

/**
 * If the user is a male smoker, then the function will return a score based on the user's age.
 */
const smokerScoreMale = function () {
  const age = ageInput.value;
  let smokeMale = 0;
  if (smokerNoInput.checked) {
    smokeMale += 0;
  } else if (smokerYesInput.checked) {
    smokeMale += scoreMethod(age, 40, 49, 5);
    smokeMale += scoreMethod(age, 20, 39, 8);
    smokeMale += scoreMethod(age, 50, 59, 3);
    smokeMale += scoreMethod(age, 60, 69, 1);
    smokeMale += scoreMethod(age, 70, 79, 1);
  }

  return smokeMale;
};

/**
 * Used to calculate both male and female hdl levels
 */
const hdlCholesterolBoth = function () {
  const hdl = hdlCholesterolInput.value;
  let hdlCount = 0;
  if (hdl >= 60) {
    hdlCount += -1;
  } else {
    hdlCount += scoreMethod(hdl, 0, 39, -2);
    hdlCount += scoreMethod(hdl, 40, 49, 1);
    hdlCount += scoreMethod(hdl, 50, 59, 0);
  }

  return hdlCount;
};

/**Calculates the bloodpressure score for males depending on what button (treated/untreated) has been slected */
const bloodPressureScoreMale = function () {
  const bp = bloodPressureInput.value;
  let bpMale = 0;

  if ((bpUnTreated.checked || bpTreated.checked) && bp < 120) {
    bpMale += 0;
  } else if (bpUnTreated.checked) {
    bpMale += scoreMethod(bp, 120, 129, 0);
    bpMale += scoreMethod(bp, 130, 139, 1);
    bpMale += scoreMethod(bp, 140, 159, 1);
  } else if (bpTreated.checked) {
    bpMale += scoreMethod(bp, 120, 129, 1);
    bpMale += scoreMethod(bp, 130, 139, 2);
    bpMale += scoreMethod(bp, 140, 159, 2);
  }

  if (bpUnTreated.checked && bp > 160) {
    bpMale += 2;
  } else if (bpTreated.checked && bp > 160) {
    bpMale += 3;
  }

  return bpMale;
};

//MALE
//=============================================================================================
//FEMALE

/**Calculates the score for females depending on their age*/
const genderScoreFemale = function () {
  const age = ageInput.value;
  let scoreFemale = 0;

  scoreFemale += scoreMethod(age, 20, 34, -7);
  scoreFemale += scoreMethod(age, 35, 39, -3);
  scoreFemale += scoreMethod(age, 40, 44, 0);
  scoreFemale += scoreMethod(age, 45, 49, 3);
  scoreFemale += scoreMethod(age, 50, 54, 6);
  scoreFemale += scoreMethod(age, 55, 59, 8);
  scoreFemale += scoreMethod(age, 60, 64, 10);
  scoreFemale += scoreMethod(age, 65, 69, 12);
  scoreFemale += scoreMethod(age, 70, 74, 14);
  scoreFemale += scoreMethod(age, 75, 79, 16);

  return scoreFemale;
};

/**
 * Calculates the score for female cholesterol levels
 */
const totalCholesterolFemale = function () {
  let chFemaleScore = 0;
  const age = ageInput.value;
  const ch = cholesterolInput.value;

  if (ch < 160 && between(age, 20, 79)) {
    chFemaleScore += 0;
  } else {
    // Ages 20-39 years
    chFemaleScore += cholesterolScore(age, ch, 20, 39, 160, 199, 4);
    chFemaleScore += cholesterolScore(age, ch, 20, 39, 200, 239, 8);
    chFemaleScore += cholesterolScore(age, ch, 20, 39, 240, 279, 11);
    chFemaleScore += cholesterolScore(age, ch, 20, 39, 280, 319, 13);

    // Ages 40-49 years
    chFemaleScore += cholesterolScore(age, ch, 40, 49, 160, 199, 3);
    chFemaleScore += cholesterolScore(age, ch, 40, 49, 200, 239, 6);
    chFemaleScore += cholesterolScore(age, ch, 40, 49, 240, 279, 8);
    chFemaleScore += cholesterolScore(age, ch, 40, 49, 280, 319, 10);

    // Ages 50-59 years
    chFemaleScore += cholesterolScore(age, ch, 50, 59, 160, 199, 2);
    chFemaleScore += cholesterolScore(age, ch, 50, 59, 200, 239, 4);
    chFemaleScore += cholesterolScore(age, ch, 50, 59, 240, 279, 5);
    chFemaleScore += cholesterolScore(age, ch, 50, 59, 280, 319, 7);

    // Ages 60-69 years
    chFemaleScore += cholesterolScore(age, ch, 60, 69, 160, 199, 1);
    chFemaleScore += cholesterolScore(age, ch, 60, 69, 200, 239, 2);
    chFemaleScore += cholesterolScore(age, ch, 60, 69, 240, 279, 3);
    chFemaleScore += cholesterolScore(age, ch, 60, 69, 280, 319, 4);

    // Ages 70-79 years
    chFemaleScore += cholesterolScore(age, ch, 70, 79, 160, 199, 1);
    chFemaleScore += cholesterolScore(age, ch, 70, 79, 200, 239, 1);
    chFemaleScore += cholesterolScore(age, ch, 70, 79, 240, 279, 2);
    chFemaleScore += cholesterolScore(age, ch, 70, 79, 280, 319, 2);
  }
  return chFemaleScore;
};

/**
 *Calculates the score based on the smoking and age input selected
 */
const smokerScoreFemale = function () {
  const age = ageInput.value;
  let smokeFemale = 0;
  if (smokerNoInput.checked) {
    smokeFemale += 0;
  } else if (smokerYesInput.checked) {
    smokeFemale += scoreMethod(age, 20, 39, 9);
    smokeFemale += scoreMethod(age, 40, 49, 7);
    smokeFemale += scoreMethod(age, 50, 59, 4);
    smokeFemale += scoreMethod(age, 60, 69, 2);
    smokeFemale += scoreMethod(age, 70, 79, 1);
  }

  return smokeFemale;
};

/**
 * Calulates the bloodpressure score based on treated or untreated being checked
 */
const bloodPressureScoreFemale = function () {
  const bp = bloodPressureInput.value;
  let bpFemale = 0;

  if ((bpUnTreated.checked || bpTreated.checked) && bp < 120) {
    bpFemale += 0;
  } else if (bpUnTreated.checked) {
    bpFemale += scoreMethod(bp, 120, 129, 1);
    bpFemale += scoreMethod(bp, 130, 139, 2);
    bpFemale += scoreMethod(bp, 140, 159, 3);
  } else if (bpTreated.checked) {
    bpFemale += scoreMethod(bp, 120, 129, 3);
    bpFemale += scoreMethod(bp, 130, 139, 4);
    bpFemale += scoreMethod(bp, 140, 159, 5);
  }

  if (bpUnTreated.checked && bp > 160) {
    bpFemale += 4;
  } else if (bpTreated.checked && bp > 160) {
    bpFemale += 6;
  }

  return bpFemale;
};
