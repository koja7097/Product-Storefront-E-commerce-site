import {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Container, Typography, Button, Card, CardContent, CardMedia, TextField, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

function ProductDetail() {
    const {id} = useParams();
    const {addToCart} = useContext(CartContext);
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
            let mounted = true;
            setLoading(true);
            axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                if(!mounted) return;
                const p = res.data;
                //Normalize FakeStore
                setProduct({
                    id: p.id,
                    name: p.title,
                    price: Number(p.price),
                    image: p.image,
                    description: p.description,
                    reviews: p.rating ? [{user: "Customer rating",
                        comment: `Rate: ${p.rating.rate}`, rating: p.rating.rate
                    }]
                    : [],
                    raw: p,
                });
            })
          .catch(err => {
            console.error("Failed to fetch product:", err);
            setProduct(null);
          })
           .finally(()=> setLoading(false));
           return () => {mounted = false;};  
    }, [id]);

    if (loading) return <CircularProgress sx={{mt: 5}}/>;
    if(!product) return<Typography>Product not found</Typography>;

    const handleQtyChange = (val) => {
        const q = parseInt(val, 10);
        setQuantity(isNaN(q) || q < 1 ? 1 : q);
    };

    return (
        <Container sx={{mt: 4, mb: 4}}>
            <Card sx={{display: 'flex',
                flexDirection: {xs: "column", md: "row"},
                alignItems: {xs: "center", md: "flex-start"},
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
            }}>
                <CardMedia
                component="img"
                sx={{width: {xs: "100%", sm: 300},
                 height: {xs: 300, sm: "auto"},
                 objectFit: "contain",
                 borderRadius: 2,
                 mb: {xs: 2, md: 0}
                }}
                image={product.image}
                alt={product.name}
                />
                <Grid sx={{flex: 1, width: "100%"}} container spacing={3} alignItems="center">
                    <Typography variant="h4">{product.name}</Typography>
                     <Typography variant="h6" sx={{my: 2}}>${product.price}</Typography>
                      <Typography variant="body1" sx={{mb: 2}}>{product.description}</Typography>

                      <TextField
                      label="Quantity"
                      type="number"
                      value={quantity}
                      onChange={(e)=> handleQtyChange(e.target.value)}
                      sx={{width: 100, mr: 2}}
                      
                      />

                      <Button variant="contained" onClick={()=> addToCart(product, quantity)}>Add to Cart</Button>

                      {product.rating && product.rating.length > 0 ? (
                      <>
                      <Typography variant="h6" sx={{mt: 4}}>Review:</Typography>
                      {product.reviews.map((review, index)=> (
                        <Typography key={index} variant="body2">
                            {review.user}: {review.comment} ({review.rating})
                        </Typography>
                      ))}
                      </>
                      ) : (
                        <Typography variant="body2" sx={{mt: 2}}>
                            No reviews available
                        </Typography>
                      )} 
                </Grid>
            </Card>
        </Container>
    )
}
export default ProductDetail;