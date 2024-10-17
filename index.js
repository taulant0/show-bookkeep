import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const API_URL = process.env.API_URL || "http://localhost:4000";
let posts = [
  {
    id: 1,
    title: "Game of Thrones",
    genre: "Fantasy, Drama",
    description:
      "Based on George R.R. Martin's series of fantasy novels, this show follows the power struggles among noble families in the fictional continents of Westeros and Essos. It is known for its complex characters, intricate political plots, and epic battles.",
    rating: 9.3,
    whatILike: "The intricate political maneuvering and the unpredictability of the plot keep me on the edge of my seat.",
    watched: "yes",
    image: "/photos/Game of Thrones.jpg",
  },
  {
    id: 2,
    title: "Breaking Bad",
    genre: "Crime, Drama, Thriller",
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer teams up with a former student to secure his family's financial future. The series is celebrated for its intense storytelling and complex characters.",
    rating: 9.5,
    whatILike: "The transformation of Walter White from a mild-mannered teacher to a ruthless drug kingpin is both terrifying and captivating.",
    watched: "yes",
    image: "/photos/Breaking Bad.jpg",
  },
  {
    id: 3,
    title: "Stranger Things",
    genre: "Drama, Fantasy, Horror",
    description:
      "In a small town during the 1980s, a group of kids uncovers a series of supernatural events involving a missing boy and a girl with telekinetic powers. The show combines elements of science fiction, horror, and nostalgic references to 80s pop culture.",
    rating: 8.7,
    whatILike: "The nostalgic 80s setting combined with supernatural elements creates a perfect blend of horror and adventure.",
    watched: "yes",
    image: "/photos/Stranger Things.png",
  },
  {
    id: 4,
    title: "The Crown",
    genre: "Biography, Drama, History",
    description:
      "This historical drama chronicles the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century. It provides a detailed look into the personal and political challenges faced by the British monarchy.",
    rating: 8.6,
    whatILike: "The meticulous attention to historical detail and the complex portrayal of the royal family make it fascinating to watch.",
    watched: "yes",
    image: "/photos/The Crown.jpg",
  },
  {
    id: 5,
    title: "The Mandalorian",
    genre: "Action, Adventure, Fantasy",
    description:
      "Set in the Star Wars universe, this series follows a lone bounty hunter as he navigates the galaxy, encounters various characters, and protects a mysterious child known as Grogu. It is praised for its action sequences and storytelling.",
    rating: 8.8,
    whatILike: "The blend of Western and sci-fi elements, along with the adorable Grogu, makes it a unique and entertaining Star Wars experience.",
    watched: "yes",
    image: "/photos/The Mandalorian.jpg",
  },
  {
    id: 6,
    title: "Black Mirror",
    genre: "Drama, Sci-Fi, Thriller",
    description:
      "An anthology series that explores a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide. Each episode presents a standalone story, offering a provocative look at modern society and technology.",
    rating: 8.8,
    whatILike: "The thought-provoking stories that challenge our perceptions of technology and its impact on society are both disturbing and fascinating.",
    watched: "yes",
    image: "/photos/Black Mirror.jpg",
  },
  {
    id: 7,
    title: "The Office",
    genre: "Comedy",
    description:
      "This mockumentary-style series provides a humorous look at the everyday lives of office employees working at Dunder Mifflin’s Scranton, PA branch. It's well-loved for its witty dialogue and memorable characters.",
    rating: 8.9,
    whatILike: "The awkward humor and relatable workplace scenarios never fail to make me laugh.",
    watched: "yes",
    image: "/photos/The Office.jpg",
  },
  {
    id: 8,
    title: "Sherlock",
    genre: "Crime, Drama, Mystery",
    description:
      "A modern update to Arthur Conan Doyle's classic detective stories, this series follows Sherlock Holmes as he uses his brilliant mind to solve crimes in contemporary London. The show is known for its clever plots and dynamic characters.",
    rating: 9.1,
    whatILike: "The sharp wit and clever deductions of Sherlock Holmes, combined with the modern setting, make it a brilliant adaptation.",
    watched: "yes",
    image: "/photos/Sherlock.jpg",
  },
  {
    id: 9,
    title: "Westworld",
    genre: "Drama, Sci-Fi, Thriller",
    description:
      "Set in a futuristic theme park where guests interact with lifelike robots, this series explores themes of consciousness, free will, and the nature of reality. It is noted for its intricate narrative and philosophical questions.",
    rating: 8.6,
    whatILike: "The complex narrative and deep philosophical questions about artificial intelligence and consciousness are incredibly intriguing.",
    watched: "yes",
    image: "/photos/Westworld.jpg",
  },
  {
    id: 10,
    title: "The Witcher",
    genre: "Action, Adventure, Drama",
    description:
      "Based on the book series by Andrzej Sapkowski, 'The Witcher' follows Geralt of Rivia, a monster hunter with supernatural abilities, as he navigates a world filled with political intrigue, magical creatures, and ancient prophecies.",
    rating: 8.7,
    whatILike: "The rich fantasy world and complex characters, along with the exciting action sequences, make it a captivating watch.",
    watched: "yes",
    image: "/photos/The Witcher.jpg",
  }
];

let lastId = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/photos", express.static("photos"));

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post with image URL
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    rating: req.body.rating,
    watched: req.body.watched,
    whatILike: req.body.whatILike,
    image: req.body.image, // Expecting image URL from the request body
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.description) post.description = req.body.description;
  if (req.body.genre) post.genre = req.body.genre;
  if (req.body.rating) post.rating = req.body.rating;
  if (req.body.watched) post.watched = req.body.watched;
  if (req.body.whatILike) post.whatILike = req.body.whatILike;
  if (req.body.image) post.image = req.body.image; // Update image if provided
  
  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
