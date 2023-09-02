const express = require("express");
const app = express();
const port = 3001;
app.use(express.json());

const USERS = [
    {
        email: "sad@gmail.com",
        password: "sadAF",
    },
];

const QUESTIONS = [
    {
        id: 1,
        title: "Two states",
        description: "Given an array , return the maximum of the array?",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "5",
            },
        ],
    },
    {
        id: 2,
        title: "Two waters",
        description: "Given an array , return the minimum of the array?",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "1",
            },
        ],
    },
];

const SUBMISSION = [
    {
        userId: 1,
        questionTitle: "Two states",
        date: "2023-09-20",
        Submission: "passed",
    },
    {
        userId: 2,
        questionTitle: "Three cities",
        date: "2023-08-15",
        Submission: "failed",
    },
    {
        userId: 1,
        questionTitle: "Four mountains",
        date: "2023-09-25",
        Submission: "passed",
    },
];

app.post("/signup1", function (req, res) {
    // Add logic to decode body
    // body should have email and password

    //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

    // return back 200 status code to the client
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email and password both should be filled !" });
    }
    const isExistingUser = USERS.find((user) => user.email === email);
    if (isExistingUser) {
        return res.status().json({ error: "The user already exists! " });
    } else {
        const newUser = { email, password };
        USERS.push(newUser);
        console.log(USERS);
        return res.status(200).json({ messsage: "Sign up successfull" });
    }
});

app.post("/login", function (req, res) {
    // Add logic to decode body
    // body should have email and password

    // Check if the user with the given email exists in the USERS array
    // Also ensure that the password is the same

    // If the password is the same, return back 200 status code to the client
    // Also send back a token (any random string will do for now)
    // If the password is not the same, return back 401 status code to the client
    const { email, password } = req.body;
    const isValid = USERS.find((user) => {
        if (user.email === email && user.password === password) return true;
        else return false;
    });
    const validEmail = USERS.find((user) => {
        if (user.email === email) return false;
    });

    if (isValid) {
        res.status(200).json({ success: "Login Successful" });
    } else {
        res.status(409).json({ error: "The user does not exist" });
    }

    res.send("Hello World from route 2!");
});

app.get("/questions", function (req, res) {
    //return the user all the questions in the QUESTIONS array
    res.send(
        QUESTIONS.map((user) => {
            return {
                title: user.title,
                desc: user.description,
            };
        })
    );

    // res.send("Hello World from route 3!");
});

app.get("/submissions", function (req, res) {
    const userId = req.query.userId; // Extract userId from the query parameter

    if (!userId) {
        return res.status(400).json({
            error: "userId is required in query parameters",
        });
    }

    const userSubmissions = SUBMISSION.filter((sub) => {
        return sub.userId == userId;
    });

    const finalSubmissionReport = userSubmissions.map((ques) => {
        return {
            Name: ques.questionTitle,
            Status: ques.Submission,
            Date: ques.date,
        };
    });
    res.json(finalSubmissionReport);
});

app.post("/submissions", function (req, res) {
    // let the user submit a problem, randomly accept or reject the solution
    // Store the submission in the SUBMISSION array above

    const { id, output } = req.body;

    const targettedQues = QUESTIONS.find((ques) => ques.id === id);

    if (!targettedQues) {
        res.status(400).json({ error: "Wrong Answer" });
        return;
    }

    if (targettedQues.testCases[0].output === output) {
        res.status(200).json({ success: "The output is correct !" });
    } else {
        res.json({ error: "Wrong answer" });
    }
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});
