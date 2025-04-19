class Greetings {
    constructor() {
        this.knowledge = new Map();

        this.knowledge.set(["Hi", "Hello"], 
            ["Hello", "Hi there!", "Hello! nice to meet you!", "Hello... Pleased to meet you!", "Hello, How can I help you?"]);

        this.knowledge.set(["Good morning"], 
            ["Good morning", "Hi! Good morning", "Good morning. How can I help you?"]);

        this.knowledge.set(["Good afternoon"], 
            ["Good afternoon", "Hi! Good afternoon", "Good afternoon. How can I help you?"]);

        this.knowledge.set(["Good evening"], 
            ["Good evening", "Hi! Good evening", "Good evening. How can I help you?"]);

        this.knowledge.set(["Good night"], 
            ["Good night", "Good night. Sweet dreams!"]);

        this.knowledge.set(["Good bye", "Bye"], 
            ["Good bye", "Good bye. Take care", "Good bye. Have a nice day"]);

        this.knowledge.set(["Thank you", "Thanks"], 
            ["You're welcome!", "My pleasure", "Thank you. Have a nice day!"]);
    }

    getReply(userInput) {
        for (let [keys, replies] of this.knowledge) {
            const lowercaseKeys = keys.join('').toLowerCase().replace(/\s/g, '');
            const lowercaseInput = userInput.toLowerCase().replace(/\s/g, '');
            
            if (lowercaseKeys.includes(lowercaseInput)) {
                const randomIndex = Math.floor(Math.random() * replies.length);
                return replies[randomIndex];
            }
        }
        return null;
    }
}

export default Greetings;
