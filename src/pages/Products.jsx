import { useEffect, useState, useContext } from "react";
import { Grid, TextField, MenuItem, CircularProgress, Typography, Button } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Products() {
    const {addToCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const categories = ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];
    
    useEffect(()=> {
         axios.get("https://fakestoreapi.com/products")
         .then(res => {
            const normalized = res.data.map(p => ({
                id: p.id,
                name: p.title,
                price: Number(p.price),
                image: p.image,
                description: p.description,
                reviews: p.rating ? [{user: "Rating", comment: `Rate ${p.rating.rate}`, rating: p.rating.rate}]
                : []
            }));
            setProducts(normalized);
            setLoading(false);
         })
         .catch(console.error);
    }, [])


    const filteredProducts = products.filter((product) => 
    (category === "All" || product.category === category) && 
    product.name.toLowerCase().includes(search.toLowerCase())
    );
   
  if (loading) return <CircularProgress sx={{mt: 5}}/>

    return (
        <div style={{padding: 20}}>
            <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={ (e)=> setSearch(e.target.value)}
            sx={{marginRight: 2}}
            />
            
            <TextField
            select
            label="Category"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            sx={{width: 200}}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}  
            </TextField>

            {filteredProducts.length === 0 ? (
                <Typography variant="h6" sx={{mt: 3}}>No Products Found.</Typography>
            ) : (

            <Grid container spacing={2} sx={{marginTop: 2}}>
                {filteredProducts.map((product) => (
                    <Grid key={product.id}>
                        <ProductCard product={product}>
                            <Button
                            variant="contained"
                            color="primary"
                            sx={{mt: 1}}
                            onClick={()=> addToCart(product)}
                            >Add To Cart</Button>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
            )}
        </div>
    );
}

export default Products;