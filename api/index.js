const express = require("express");
const client = require("./connection");
const app = express();
const cors = require("cors");
app.use(express.json());


app.use(cors({
  credentials: true,
  origin:'http://localhost:5173',
}));
 

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// GET endpoint to retrieve item details by ID
app.get("/item/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const query = `SELECT * FROM item WHERE id = ${itemId}`;
    const result = await client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving item:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve organization details by ID
app.get("/org/:id", async (req, res) => {
  try {
    const orgId = req.params.id;
    const query = `SELECT * FROM organization WHERE id = ${orgId}`;
    const result = await client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving organization:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to calculate total price
app.post("/calculate-price", async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;

    // Construct SQL query to fetch pricing details based on provided parameters
    const query = `SELECT *
        FROM pricing  
        JOIN item ON item.id = pricing.item_id
        WHERE organization_id = '${organization_id}' 
        AND zone = '${zone}' 
        AND item.type = '${item_type}'
        LIMIT 1;`;

    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Pricing not found for provided parameters" });
    }

    const pricing = result.rows[0];
    console.log("Pricing details:", pricing);
    
    // Calculate total price based on pricing details
    if (pricing.type === "perishable") {
      let total_price =
        pricing.fix_price +
        (total_distance - pricing.base_distance) * 1.5 ;
        total_price = total_price*100;
      res.json({ total_price });
    } else {
      const total_price =
        pricing.fix_price + (total_distance - pricing.base_distance);
        const service = {
          total_price: total_price
        }
      res.json(service);
    }
  } catch (error) {
    console.error("Error calculating price:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
