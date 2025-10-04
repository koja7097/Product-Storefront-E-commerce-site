import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Typography, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";

function Cart() {
    const {cartItems, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);

    if(!cartItems || cartItems.length === 0) return(
        <Container sx={{mt: 4}}>
            <Typography variant="h5">Your cart is empty.</Typography>
            <Button component={Link} to="/products" variant="contained" sx={{mt: 2}}>Go Shopping</Button>
        </Container>
    );

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" sx={{mb: 2}}>Your Cart</Typography>
            <List>
                {cartItems.map(item => (
                    <React.Fragment key={item.id}>
                        <ListItem>
                            <ListItemText
                            primary={`${item.name ?? item.raw?.name ?? "item"} * ${item.quantity ?? 0}`}
                            secondary={`$${(((parseFloat(item.price) || 0) * (item.quantity || 0))).toFixed(2)}`}
                            />
                            <Button color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>

            <Typography variant="h5" sx={{mt: 2}}>Total: ${getCartTotal().toFixed(2)}</Typography>
            <Button variant="contained" component={Link} to="/checkout" sx={{mt: 2, mr: 2}}>Checkout</Button>
             <Button variant="outlined" color="error" onClick={clearCart} sx={{mt: 2}}>Clear cart</Button>
        </Container>
    );
}
export default Cart;