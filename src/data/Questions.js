class Questions {
    constructor() {
      this.knowledge = new Map();
  
      // Subjects
      this.knowledge.set(
        ["What tasks", "What are the tasks", "task", "tasks", "task details", "Subjects"],
        [
          `<p>Pick a Subject</p>
           <ul id='subjects'>
             <li onclick="selectSubject('Maths')">Maths</li>
             <li onclick="selectSubject('Science')">Science</li>
             <li onclick="selectSubject('History')">History</li>
           </ul>`
        ]
      );
  
      // Maths Tasks
      this.knowledge.set(
        ["Maths", "Maths tasks", "Maths task", "Maths assignments"],
        [
          `<p>Maths tasks for you</p>
          <ul id='tasks'>
            <li>
              <div>
                <h3>Algebra Basics Practice</h3>
                <h4>Solve linear equations and inequalities (20 problems)</h4>
              </div>
            </li>
            <li>
              <div>
                <h3>Geometry Proofs</h3>
                <h4>Complete 5 triangle congruence proofs</h4>
              </div>
            </li>
          </ul>
          <a href='https://www.khanacademy.org/math' target='_blank' rel="noopener noreferrer">Learn more Maths</a>`
        ]
      );
  
      // Science Tasks
      this.knowledge.set(
        ["Science", "Science tasks", "Science task", "Science assignments"],
        [
          `<p>Science tasks for you</p>
          <ul id='tasks'>
            <li>
              <div>
                <h3>Chemistry Lab Report</h3>
                <h4>Write a report on the acid-base titration experiment</h4>
              </div>
            </li>
            <li>
              <div>
                <h3>Biology Research</h3>
                <h4>Study and present on cellular respiration processes</h4>
              </div>
            </li>
          </ul>
          <a href='https://www.khanacademy.org/science' target='_blank' rel="noopener noreferrer">Learn more Science</a>`
        ]
      );

      // History Tasks
      this.knowledge.set(
        ["History", "History tasks", "History task", "History assignments"],
        [
          `<p>History tasks for you</p>
          <ul id='tasks'>
            <li>
              <div>
                <h3>Ancient Civilizations Essay</h3>
                <h4>Compare Mesopotamian and Egyptian societies (1000 words)</h4>
              </div>
            </li>
            <li>
              <div>
                <h3>World War II Timeline</h3>
                <h4>Create a detailed timeline of key WWII events</h4>
              </div>
            </li>
          </ul>
          <a href='https://www.khanacademy.org/humanities/history' target='_blank' rel="noopener noreferrer">Learn more History</a>`
        ]
      );
    }
  
    getReply(userInput) {
      const lowercaseInput = userInput.toLowerCase().replace(/\s/g, '');
      
      for (const [keys, replies] of this.knowledge) {
        const lowercaseKey = keys.join('').toLowerCase().replace(/\s/g, '');
        
        if (lowercaseKey.includes(lowercaseInput)) {
          const randomIndex = Math.floor(Math.random() * replies.length);
          return replies[randomIndex];
        }
      }
      return null;
    }
  }
  
  export default Questions;
