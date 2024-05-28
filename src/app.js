document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');

    const questions = [
        { question: "Do you prefer high-level or low-level languages?", choices: ["High-level", "Low-level"] },
        { question: "Do you enjoy working with web technologies?", choices: ["Yes", "No"] },
        { question: "Do you like statically typed languages?", choices: ["Yes", "No"] },
        { question: "Are you interested in data science?", choices: ["Yes", "No"] },
        { question: "Do you prefer functional programming?", choices: ["Yes", "No"] },
        { question: "Do you want a language that's beginner-friendly?", choices: ["Yes", "No"] },
        { question: "Do you need a language for system programming?", choices: ["Yes", "No"] },
        { question: "Do you prefer concise syntax?", choices: ["Yes", "No"] },
        { question: "Are you interested in mobile app development?", choices: ["Yes", "No"] },
        { question: "Do you like working with enterprise solutions?", choices: ["Yes", "No"] }
    ];

    const surveyForm = document.createElement('form');

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.choices.map(choice => `
                <label>
                    <input type="radio" name="question${index}" value="${choice}" required>
                    ${choice}
                </label>
            `).join('')}
        `;
        surveyForm.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    surveyForm.appendChild(submitButton);

    surveyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(surveyForm);
        const responses = Array.from(formData.entries()).map(entry => entry[1]);

        const result = calculateResult(responses);
        alert('Based on your answers, the programming language that suits you best is: ' + result);
    });

    app.appendChild(surveyForm);
});

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
