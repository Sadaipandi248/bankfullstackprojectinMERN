const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://sadaipandi:dmc7g5U4KSJ8qJJW@cluster0.6ucbddp.mongodb.net/BankDB", { useNewUrlParser: true }
).then(()=>console.log(`Atlas DB connected`))
.catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

//get All datas
app.get('/users', async(req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});


//get last User
app.get("/getLatestUserBalance", async (req, res) => {
  try {
    const latestUser = await User.findOne().sort({ createdAt: + 1 });

    if (!latestUser) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({ balance: latestUser.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Error fetching balance" });
  }
});


// Registration route
app.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
    });

    const savedUser = await newUser.save();

    console.log("User saved:", savedUser);

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving user.");
  }
});


//Login
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      console.log(user);
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          if (result === true) {
            res.status(200).json({ message: 'Login successful',redirectTo: '/deposit'  });
          } else {
            res.status(401).json({ error: 'Incorrect password' });
          }
        }
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Deposit
app.post('/deposit', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    user.balance += depositAmount;
    await user.save();

    res.status(201).json({ message: "Deposit successful" });
  } catch (error) {
    console.error("Error during deposit:", error);
    res.status(500).json({ message: "Error during deposit" });
  }
});

//widthdraw

app.post('/withdraw', async (req, res) => {
  const { username, amount } = req.body;

  try {
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    if (user.balance < withdrawalAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= withdrawalAmount;
    await user.save();

    res.status(200).json({ message: 'Withdrawal successful' });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    res.status(500).json({ message: 'Error during withdrawal' });
  }
});



app.listen(4000, () => console.log("Server is running on port 4000"));
