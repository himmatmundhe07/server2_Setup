const express = require("express");
const app = express();
app.use(express.json());

const users = [
    { att: 80, uid: 108800, total_Sub: 14, bonus: 100, name: "Himmat" },
    { att: 70, uid: 108864, total_Sub: 14, bonus: 10, name: "Kamlesh" },
    { att: 65, uid: 108824, total_Sub: 14, bonus: 50, name: "Jonty" },

];


app.get("/", (req, res) => {
    res.send("Express server is running");
});


app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});


app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});


app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        uid: userId,
        name: req.body.name,
        role: req.body.role,
        att: req.body.att
    };

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });
});

app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.status(204).end();
});



app.patch("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.role) user.role = req.body.role;

    res.status(200).json({
        message: "User updated",
        user
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});