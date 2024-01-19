import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputref = useRef();
  function submitFormHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputref.current.value;
  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={sunmitFormHandler}>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label for="feedback">Feedback</label>
          <textarea id="feedback" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
