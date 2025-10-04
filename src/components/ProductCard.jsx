import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({product}) {
    return (
     <Card sx={{maxWidth: 345, margin: 2}}>
        <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        />
        <CardContent>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">${product.price}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small" component={Link} to={`/products/${product.id}`}>View</Button>
        </CardActions>
     </Card>
    )
}