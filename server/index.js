const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cohere = require("cohere-ai");

const startApp = async () => {
  console.log("Creating cohere client");
  cohere.init("API_KEY");
  console.log("Cohere client created");

  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("/api", async (req, res) => {
    const prompt =
      `This is a recipe description generation tool. It generates descriptions for recipes based on different types of dishes.\n-\nTopic: Pasta\nDescription: Discover the art of creating delicious pasta dishes that will satisfy your cravings. From classic Italian recipes to unique fusion creations, explore a world of flavors with our pasta recipes.\n-\nTopic: Cookies\nDescription: Indulge in the irresistible aroma and taste of freshly baked cookies. From traditional chocolate chip cookies to unique and creative varieties, our cookie recipes will delight your taste buds and bring a smile to your face.\n-\nTopic: Pizza\nDescription: Experience the magic of homemade pizza with our collection of mouthwatering recipes. From thin crust to deep dish, topped with an array of savory ingredients, our pizza recipes will transport you to Italy with every bite.\n-\nTopic: Soups\nDescription: Warm up your soul with a comforting bowl of soup. Whether you prefer creamy or broth-based, vegetarian or meaty, our soup recipes offer a delightful blend of flavors and textures that will leave you feeling nourished and satisfied.\n-\nTopic: Salads\nDescription: Elevate your salad game with our refreshing and vibrant salad recipes. From light and refreshing to hearty and filling, our salads are packed with fresh ingredients, flavorful dressings, and a variety of textures that will make every bite a delight.\n-\nTopic: Smoothies\nDescription: Start your day with a burst of energy and nutrients with our nutritious smoothie recipes. From fruity blends to green powerhouses, our smoothies are packed with vitamins, antioxidants, and delicious flavors that will keep you feeling refreshed and revitalized.\n-\nTopic: Grilled Meats\nDescription: Fire up the grill and savor the juicy and flavorful goodness of perfectly grilled meats. From succulent steaks to tender chicken and mouthwatering burgers, our grilled meat recipes will take your outdoor cooking to the next level.\n-\nTopic: Vegetarian Delights\nDescription: Embrace the world of vegetarian cuisine with our diverse and satisfying recipes. From plant-based alternatives to creative vegetarian twists on classic dishes, our recipes will inspire you to explore the endless possibilities of meatless cooking.\n-\nTopic: Seafood\nDescription: Dive into a sea of flavors with our seafood recipes. From succulent shrimp to flaky fish and delectable shellfish, our recipes will guide you in creating mouthwatering seafood dishes that will impress even the most discerning palate.\n-\nTopic: Breakfast Favorites\nDescription: Kickstart your day with a hearty and delicious breakfast. From fluffy pancakes to savory egg dishes and energizing smoothie bowls, our breakfast recipes will fuel your mornings and make every day feel like a special occasion.\n-\nTopic: ${req.query.prompt}` ||
      "";

    const response = await cohere.generate("xlarge", {
      prompt,
      max_tokens: 500,
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
