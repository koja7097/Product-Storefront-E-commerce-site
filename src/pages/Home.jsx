import { useEffect, useState } from "react";
import {Typography, Box, Button, TextField, Container} from "@mui/material";
import {Link} from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //Fetching from Api
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => { setProducts(data.slice(0,3))
        })
        .catch((err)=> console.error("Error fetching products", err))
    }, [])
    return (
        <div>
        
        <Box sx={{
         /*  position: "relative",
          backgroundImage: "url('/)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center" */
        }}>
            {/* OverLay */}
        {/*     <Box
            sx={{
                position: "absolute",
                top:0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1,
            }}/> */}
            <Box sx={{position: "relative", zIndex: 2, alignItems: "center", justifyContent: "center"}}>
            <Typography variant="h2" fontWeight="bold" textAlign="center">
                Welcome to our store
            </Typography>
            <Typography variant="h6" sx={{mt: 2}} textAlign="center">
                Shop with us and ENJOY our 50% discount.
            </Typography>
        
            <div style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
            }}>
                
            <TextField
            placeholder="Search For product...."
            variant="outlined"
            sx={{background: "white", borderRadius: 1, mt: 3, 
                width: {xs: "80%", sm: "50%", md: "40%"},
            }}/>
            </div>
              <div style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
            }}>
            <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            sx={{mt: 3, borderRadius: "30px", display: "block",}}
            >Shop Now</Button>
            </div>
            </Box>
         {/* Featured Products Section */}
         <Container sx={{py: 6, zIndex: 2}}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Featured Products
            </Typography>
            <Typography textAlign="center" color="text.white" sx={{mb: 4, fontSize: "1.5rem"}}>
                Explore our best and nice picks
            </Typography>
            <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr"
                },
                gap: 3,
            }}
            >
                {products.map((product)=> (
                    <Box
                    key={product.id}
                    sx={{
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: 2,
                        textAlign: "center",
                        boxShadow: 2,
                    }}
                    >
                        <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            height: "200px",
                            objectFit: "cover",
                        }}
                        />
                        <Typography variant="h6" sx={{mt: 2}}>
                            {product.title}
                        </Typography>
                        <Typography color="text.primary">
                            ${product.price}
                        </Typography>
                        <Button
                        variant="contained"
                        color="primary"
                        sx={{mt: 2, borderRadius: "20px"}}
                        component={Link}
                        to="/products"
                        >
                            See more Products
                        </Button>
                </Box>
                ))}
            </Box>
         </Container>

           </Box> 
        </div>
    )
}




