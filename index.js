const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const api_key = "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";

const configuration = new Configuration({
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Express in working fine");
});

app.post("/chat", (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 1000,
      temperature: 0,
    })
    .then((response) => {
      return response?.data.choices?.[0]?.text;
    })
    .then((answer) => {
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());
      return array;
    })
    .then((answer) => {
      res.json({ answer, question });
    });
});

app.listen(port, () => {
  console.log("port listen....:", port);
});
