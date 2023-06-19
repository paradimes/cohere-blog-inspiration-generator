// server/index.js
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cohere = require("cohere-ai");
// const { createFeedbackBot } = require("./discord-bot");

const startApp = async () => {
  console.log("Creating cohere client");
  // cohere.init(process.env.api_key, "2021-11-08");
  cohere.init("API_KEY");
  console.log("Cohere client created");

  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("/api", async (req, res) => {
    const prompt =
      `This is a trivia question generation tool. It generates questions related to a given topic.\n-\nTopic: History\nQ: Who invented penicillin?\n-\nTopic: Entertainment\nQ: What was the first toy to be advertised on television?\n-\nTopic: Sports\nQ: Which two countries have not missed one of the modern-day Olympics?\n-\nTopic: Geography\nQ: What is the smallest country in the world?\n-\nTopic: Food \nQ: What is the rarest M&M color?\n-\nTopic: Switzerland\nQ: What country consumes the most chocolate per capita? \n- \nTopic: India\nQ: What is the name given to Indian food cooked over charcoal in a clay oven?\n-\nTopic: Space\nQ: What was the first soft drink in space?\n-\nTopic: Cheese\nQ: From which country does Gouda cheese originate?\n-\nTopic: Disney\nQ: What was the first feature-length animated movie ever released?\n-\nTopic: Books\nQ: Who authored Sherlock Holmes? \n-\nTopic: Entertainment\nQ: What awards has an EGOT winner won?\n-\nTopic: Music\nQ: Which member of the Beatles married Yoko Ono?\n-\nTopic: Soccer\nQ: Which country won the first-ever soccer World Cup in 1930?\n-\nTopic: Basketball\nQ: Which Former NBA Player Was Nicknamed Agent Zero?\n-\nTopic: Gymnastics \nQ: Who was the first gymnast to score a perfect 10 score?\n-\nTopic: Volleyball\nQ: Dump, floater, and wipe are terms used in which team sport?\n-\nTopic: Formula 1\nQ: Who was the first female driver to score points in a Grand Prix?\n-\nTopic: United States\nQ: In which state is Area 51 located? \n-\nTopic: Animals\nQ: How long do elephant pregnancies last?\n-\nTopic: Science\nQ: In what type of matter are atoms most tightly packed?\n-\nTopic: Anatomy\nQ: How many teeth does an adult human have?\n-\nTopic: Etymology\nQ: Who invented the word vomit?\n-\nTopic: ${req.query.prompt}` ||
      "";

    // const prompt =
    //   `This is a recipe generation tool. It generates recipes related to a given topic.
    //   -
    //   Topic: Homemade Pizza
    //   Recipe:
    //   Ingredients:
    //   - 1 1/2 cups warm water (105°F-115°F)
    //   - 1 package (2 1/4 teaspoons) active dry yeast
    //   - 3 1/2 cups bread flour
    //   - 2 tablespoons extra virgin olive oil
    //   - 2 teaspoons salt
    //   - 1 teaspoon sugar
    //   - Pizza toppings (such as sauce, cheese, and toppings of your choice)

    //   Instructions:
    //   1. In a small bowl, combine the warm water and yeast. Stir until the yeast has dissolved. Let it sit for 5 minutes until foamy.
    //   2. In a large bowl, combine the bread flour, olive oil, salt, and sugar. Mix well.
    //   3. Pour the yeast mixture into the flour mixture. Stir until a dough forms.
    //   4. Transfer the dough to a floured surface and knead for about 5 minutes, until smooth and elastic.
    //   5. Place the dough in a greased bowl, cover with a clean kitchen towel, and let it rise in a warm place for about 1 hour, or until doubled in size.
    //   6. Preheat the oven to 475°F (245°C). If you have a pizza stone, place it in the oven while preheating.
    //   7. Punch down the dough and divide it into two equal portions. Roll out each portion into a 12-inch circle.
    //   8. Transfer the dough to a baking sheet or pizza peel lined with parchment paper.
    //   9. Add your desired pizza toppings, such as sauce, cheese, and toppings of your choice.
    //   10. Carefully transfer the pizza to the preheated oven (or onto the preheated pizza stone).
    //   11. Bake for about 12-15 minutes, or until the crust is golden and the cheese is bubbly and slightly browned.
    //   12. Remove from the oven and let it cool for a few minutes before slicing and serving.

    //   Enjoy your delicious homemade pizza!
    //   -
    //   Topic: Chocolate Chip Oatmeal Cookies
    //   Recipe:
    //   Ingredients:
    //   - 1 cup butter, softened
    //   - 1 cup packed light brown sugar
    //   - 1/2 cup white sugar
    //   - 2 eggs
    //   - 2 teaspoons vanilla extract
    //   - 1 1/4 cups all-purpose flour
    //   - 1/2 teaspoon baking soda
    //   - 1 teaspoon salt
    //   - 3 cups quick-cooking oats
    //   - 1 cup chopped walnuts
    //   - 1 cup semisweet chocolate chips

    //   Instructions:
    //   1. Preheat the oven to 325°F (165°C).
    //   2. In a large bowl, cream together the softened butter, brown sugar, and white sugar until smooth.
    //   3. Beat in the eggs one at a time, then stir in the vanilla extract.
    //   4. In a separate bowl, combine the flour, baking soda, and salt. Gradually add this dry mixture to the creamed mixture and mix well.
    //   5. Stir in the quick-cooking oats, chopped walnuts, and semisweet chocolate chips.
    //   6. Drop rounded tablespoons of dough onto ungreased baking sheets.
    //   7. Bake for 12 to 15 minutes in the preheated oven, or until golden brown.
    //   8. Allow the cookies to cool on the baking sheets for 5 minutes before transferring them to wire racks to cool completely.

    //   Enjoy your delicious homemade cookies!
    //   -
    //   Topic: ${req.query.prompt}` || "";

    const response = await cohere.generate("xlarge", {
      prompt,
      max_tokens: 50,
      temperature: 0.5,
      k: 0,
      p: 0.75,
      stop_sequences: ["-"],
    });
    response.body.prompt = prompt;
    res.json(response.body);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

startApp();
