//* In Edamam API --> based on the number of counts of recipes per request, map out all the recipes

const apikey = "7ea5440820be1e1b904afbc6c8f3d309"; // Edamam API Key
const applicationid = "aeebdfb6"; // Edamam ID
const edamamUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${applicationid}&app_key=${apikey}`;

const handleSearchQuery = async () => {
  const res = await fetch(edamamUrl, { signal });
  const data = await res.json();
  setResults(data);
  console.log(data);
  // setResults(data?.hits[5]?.recipe?.images?.REGULAR?.url);
};
handleSearchQuery();
