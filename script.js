// A list of my questions and answers
const questions = [
  {
    type: "text",
    question: "What is the capital city of Ukraine?",
    answer: "Kyiv",
  },
  {
    type: "text",
    question: "What is the national flower of Ukraine?",
    answer: "Sunflower",
  },
  {
    type: "radio",
    question: "Ukraine gained independence in which year?",
    options: ["1990", "1991", "1992"],
    answer: "1991",
  },
  {
    type: "radio",
    question: "What is the currency of Ukraine?",
    options: ["Hryvnia", "Euro", "Dollar"],
    answer: "Hryvnia",
  },
  {
    type: "radio",
    question: "Ukraine is famous for which traditional Easter decoration?",
    options: ["Easter Egg", "Pysanka", "Perun Idol"],
    answer: "Pysanka",
  },
  {
    type: "radio",
    question: "Which sea is located to the south of Ukraine?",
    options: ["Black Sea", "Mediterranean Sea", "Baltic Sea"],
    answer: "Black Sea",
  },
  {
    type: "checkbox",
    question: "Select Ukraine's neighboring countries",
    options: ["Poland", "Slovakia", "Hungary", "Romania"],
    answer: ["Poland", "Slovakia", "Hungary", "Romania"],
  },
  {
    type: "checkbox",
    question: "Select traditional Ukrainian foods",
    options: ["Borscht", "Pizza", "Varenyky", "Sushi"],
    answer: ["Borscht", "Varenyky"],
  },
  {
    type: "radio",
    question: "What language is primarily spoken in Ukraine?",
    options: ["Ukrainian", "High Vallirian", "Polish"],
    answer: "Ukrainian",
  },
  {
    type: "radio",
    question: "What colors are on the Ukrainian flag?",
    options: ["Blue and Yellow", "Red and White", "Green and Yellow"],
    answer: "Blue and Yellow",
  },
];

function setQuestions() {
  const quizForm = document.getElementById("quizForm");
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    if (q.type === "text") {
      questionDiv.innerHTML += `<input type="text" name="question${index}" />`;
    } else if (q.type === "radio") {
      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("options");
      q.options.forEach((option) => {
        optionsDiv.innerHTML += `
                            <label><input type="radio" name="question${index}" value="${option}" />${option}</label>
                        `;
      });
      questionDiv.appendChild(optionsDiv);
    } else if (q.type === "checkbox") {
      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("options");
      q.options.forEach((option) => {
        optionsDiv.innerHTML += `
                            <label><input type="checkbox" name="question${index}" value="${option}" />${option}</label>
                        `;
      });
      questionDiv.appendChild(optionsDiv);
    }
    quizForm.appendChild(questionDiv);
  });
}

function checkAnswers() {
  let score = 0;
  questions.forEach((q, index) => {
    const userAnswer = document.getElementsByName(`question${index}`);
    const questionDiv = document.getElementsByClassName("question")[index];
    let isCorrect = false;

    if (q.type === "text") {
      if (userAnswer[0].value.trim().toLowerCase() === q.answer.toLowerCase()) {
        score++;
        isCorrect = true;
      }
    } else if (q.type === "radio") {
      for (let i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i].checked && userAnswer[i].value === q.answer) {
          score++;
          isCorrect = true;
        }
      }
    } else if (q.type === "checkbox") {
      const checkedValues = Array.from(userAnswer)
        .filter((input) => input.checked)
        .map((input) => input.value);
      if (
        JSON.stringify(checkedValues.sort()) === JSON.stringify(q.answer.sort())
      ) {
        score++;
        isCorrect = true;
      }
    }

    if (isCorrect) {
      questionDiv.classList.add("correct-answer");
    } else {
      questionDiv.classList.add("incorrect-answer");
    }
  });

  const resultDiv = document.getElementById("result");
  const passingScore = 6;
  if (score >= passingScore) {
    resultDiv.innerHTML = `Congratulations! You scored ${score}/10. You passed the quiz!`;
    resultDiv.classList.add("pass");
    resultDiv.classList.remove("fail");
  } else {
    resultDiv.innerHTML = `You scored ${score}/10. You did not pass the quiz. Try again!`;
    resultDiv.classList.add("fail");
    resultDiv.classList.remove("pass");
  }
}

setQuestions();
