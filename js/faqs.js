// FAQ

(function () {
  const questionTitle = [...document.querySelectorAll('.question-title')];

  questionTitle.forEach(question => {
    question.addEventListener('click', () => {
      let height = 0;
      let answer = question.nextElementSibling;
      let addPadding = question.parentElement.parentElement;

      addPadding.classList.toggle('question-padding--add');

      if (answer.clientHeight === 0) {
        height = answer.scrollHeight;
      }

      answer.style.height = `${height}px`;
    });
  });
})();

