import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Typography, TextField, Button } from "@mui/material";

function Checkout() {
    const { getCartTotal, clearCart} = useContext(CartContext);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCheckout = () => {
        //stimulate checkout
        if(name && address) {
            setSuccess(true);
            clearCart();
        }
    };

    if(success) return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4">Thanks for your order, {name}!</Typography>
            <Typography>Your order will be delivered to {address} soon</Typography>
        </Container>
    );

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" sx={{mb: 2}}>Checkout</Typography>
            <Typography variant="h6">Total: ${getCartTotal().toFixed(2)}</Typography>

            <TextField
            label="Full Name"
            fullWidth
            sx={{mt:2}}
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />

           <TextField
            label="Delivery Address"
            fullWidth
            sx={{mt:2}}
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
            />
            <Button variant="contained" sx={{mt: 2}} onClick={handleCheckout}>Place Order </Button>
        </Container>
    );
}
export default Checkout;