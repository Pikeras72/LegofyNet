document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            document.querySelectorAll('.faq-answer').forEach(function(otherAnswer) {
                if (otherAnswer !== answer) {
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.classList.remove('open');
                }
            });

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.classList.remove('open');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.classList.add('open');
            }
        });
    });
});