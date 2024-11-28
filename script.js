// Questions and Answers
const questions = [
  {
    question: "Who was the first President of India?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Patel"],
    answer: "Dr. Rajendra Prasad"
  },
  {
    question: "When did India gain independence?",
    options: ["1945", "1947", "1950", "1960"],
    answer: "1947"
  },
  {
    question: "Who is known as the Iron Man of India?",
    options: ["Sardar Patel", "Bhagat Singh", "Subhash Chandra Bose", "Dr. B. R. Ambedkar"],
    answer: "Sardar Patel"
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "Chennai", "New Delhi"],
    answer: "New Delhi"
  },
  {
    question: "Who wrote the Indian National Anthem?",
    options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Mahatma Gandhi"],
    answer: "Rabindranath Tagore"
  }
];

// Track current question and user answers
let currentQuestionIndex = 0;
let userAnswers = [];

// Elements
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const profileContainer = document.getElementById('profile-container');
const mcqContainer = document.getElementById('mcq-container');
const nextButton = document.getElementById('next-button');
const nextButtonMcq = document.getElementById('next-button-mcq');
const submitButton = document.getElementById('submit-button');
const logoutContainer = document.getElementById('logout-container');
const questionContainer = document.getElementById('question-container');

// Handle Login (Anyone can log in)
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Simulate user login without checking credentials
  loginContainer.style.display = 'none';
  profileContainer.style.display = 'block';
});

// Handle Update Profile (Go to MCQs Section)
document.getElementById("update-button").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Logic for updating profile (just simulating here)
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Optionally, you can validate these fields if necessary

  // Show Go to MCQs button after profile update
  document.getElementById("next-button").style.display = "block";
});

// Show MCQs section after clicking "Go to MCQs"
nextButton.addEventListener('click', function() {
  profileContainer.style.display = 'none';
  mcqContainer.style.display = 'block';

  // Load the first question
  loadQuestion();
});

// Load a question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    <div class="options">
      ${currentQuestion.options.map((option, index) => {
        return `
          <label><input type="radio" name="q${currentQuestionIndex}" value="${option}" /> ${option}</label><br>
        `;
      }).join('')}
    </div>
  `;

  // Show/hide buttons
  if (currentQuestionIndex === questions.length - 1) {
    submitButton.style.display = 'block';
    nextButtonMcq.style.display = 'none';
  } else {
    nextButtonMcq.style.display = 'block';
    submitButton.style.display = 'none';
  }
}

// Handle Next Question
nextButtonMcq.addEventListener('click', function() {
  const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  }

  currentQuestionIndex++;
  loadQuestion();
});

// Handle Submit
submitButton.addEventListener('click', function() {
  const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  }

  // Show results
  showResults();
});

// Show Results
function showResults() {
  mcqContainer.style.display = 'none';
  logoutContainer.style.display = 'block';

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  let correctAnswers = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      correctAnswers++;
    }
  });

  alert(`Name: ${name}\nEmail: ${email}\nScore: ${correctAnswers} / ${questions.length}`);

  // Optionally, you can save the data or log it to a server here
}

// Handle Logout (Close tab in demo)
document.getElementById('logout-button').addEventListener('click', function() {
  window.close(); // Simulate tab close
});
