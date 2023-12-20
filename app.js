const express =  require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find(); 
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const isbn = req.query.isbn;
        const books = await Book.find({ isbn: isbn });
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/api/books', async (req, res) => {
    try {
        const author = req.query.author;
        const books = await Book.find({ author: author });
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const title = req.query.title;
        const books = await Book.find({ title: title });
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/books/:bookId/reviews', async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await Review.find({ bookId: bookId });
        res.json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/users/register', async (req, res) => {
    try {
        const newUser = new User(req.body); // assuming User is your user model
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        // Validate user credentials
        // Assuming a 'validateUser' function that checks credentials
        const user = await validateUser(req.body.username, req.body.password);
        if (user) {
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a review
app.post('/api/books/:bookId/reviews', async (req, res) => {
    try {
        const newReview = new Review({
            bookId: req.params.bookId,
            review: req.body.review
        });
        await newReview.save();
        res.status(201).send("Review added successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Modify a review
app.put('/api/books/:bookId/reviews/:reviewId', async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.reviewId, req.body);
        res.send("Review updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/books/:bookId/reviews/:reviewId', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.send("Review deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});


async function getAllBooks() {
    try {
        const response = await axios.get('http://localhost:3000/api/books');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

app.get('/books/search', async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).send('Title is required');
        }
        const books = await Book.find({ title: new RegExp(title, 'i') }); // 'i' for case-insensitive
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Listening at ${port}`)
})
