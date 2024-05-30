document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');

    const questions = [
        { question: "Ви віддаєте перевагу мовам високого чи низького рівня?", choices: ["Висоворівневі", "Низькорівневі"] },
        { question: "Вам подобається працювати з веб-технологіями?", choices: ["Так", "Ні"] },
        { question: "Вам подобаються статично задані мови?", choices: ["Так", "Ні"] },
        { question: "Ви цікавитесь наукою про дані?", choices: ["Так", "Ні"] },
        { question: "Ви віддаєте перевагу функціональному програмуванню?", choices: ["Так", "Ні"] },
        { question: "Вам потрібна мова, зручна для початківців?", choices: ["Так", "Ні"] },
        { question: "Вам потрібна мова для системного програмування?", choices: ["Так", "Ні"] },
        { question: "Віддаєте перевагу лаконічному синтаксису?", choices: ["Так", "Ні"] },
        { question: "Вас цікавить розробка мобільних додатків?", choices: ["Так", "Ні"] },
        { question: "Вам подобається працювати з корпоративними рішеннями?", choices: ["Так", "Ні"] }
    ];

    let currentQuestionIndex = 0;
    const responses = [];

    function renderQuestion() {
        app.innerHTML = '';

        if (currentQuestionIndex < questions.length) {
            const questionDiv = document.createElement('div');
            const currentQuestion = questions[currentQuestionIndex];
            questionDiv.innerHTML = `
                <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
                ${currentQuestion.choices.map(choice => `
                    <label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${choice}" required>
                        ${choice}
                    </label>
                `).join('')}
            `;

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Наступне';
            nextButton.onclick = function() {
                const selectedChoice = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
                if (selectedChoice) {
                    responses[currentQuestionIndex] = selectedChoice.value;
                    currentQuestionIndex++;
                    renderQuestion();
                } else {
                    alert('Бульласка виберіть відповідь');
                }
            };

            const backButton = document.createElement('button');
            backButton.textContent = 'Попереднє';
            backButton.onclick = function() {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                }
            };

            if (currentQuestionIndex > 0) {
                questionDiv.appendChild(backButton);
            }

            questionDiv.appendChild(nextButton);
            app.appendChild(questionDiv);
        } else {
            const result = calculateResult(responses);
            app.innerHTML = `<p> На основі ваших відповідей ми визначимо мову програмування, яка вам найбільше підходить: ${result}</p>`;
        }
    }

    function calculateResult(responses) {
        const scores = {
            'JavaScript': 0,
            'Python': 0,
            'Java': 0,
            'C++': 0,
            'Rust': 0
        };

        responses.forEach((response, index) => {
            switch(index) {
                case 0: // High-level or Low-level
                    if (response === 'High-level') {
                        scores['JavaScript']++;
                        scores['Python']++;
                    } else {
                        scores['C++']++;
                        scores['Rust']++;
                    }
                    break;
                case 1: // Web technologies
                    if (response === 'Yes') scores['JavaScript']++;
                    break;
                case 2: // Statically typed
                    if (response === 'Yes') scores['Java']++;
                    else scores['Python']++;
                    break;
                case 3: // Data science
                    if (response === 'Yes') scores['Python']++;
                    break;
                case 4: // Functional programming
                    if (response === 'Yes') scores['Rust']++;
                    break;
                case 5: // Beginner-friendly
                    if (response === 'Yes') scores['Python']++;
                    break;
                case 6: // System programming
                    if (response === 'Yes') scores['C++']++;
                    break;
                case 7: // Concise syntax
                    if (response === 'Yes') scores['JavaScript']++;
                    break;
                case 8: // Mobile app development
                    if (response === 'Yes') scores['Java']++;
                    break;
                case 9: // Enterprise solutions
                    if (response === 'Yes') scores['Java']++;
                    break;
            }
        });

        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }

    renderQuestion();
});
