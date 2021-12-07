import { Button } from "@mui/material";
import { fontSize, margin } from "@mui/system";
import { Link } from "react-router-dom";

export default function SplashScreen() {
    return (
            <div id="splash-screen">
                Welcome to <br />The Top 5
                Lister 

                <div id="splash-desc">
                Make and share your Top 5 Lists!
                </div>

                <Link to="/login/" style={{ textDecoration: "none" }}>
                    <Button
                    id = "splash-button"
                        style={{
                        width: 250,
                        height: 75,
                        backgroundColor: "#d4d4f5",
                        fontSize: "25px",
                        color: "#9933ff",
                        borderRadius: "10px",
                        fontWeight: "bold"
                        }}
                    >
                        Login
                    </Button>
                </Link>

                <Link to="/register/" style={{ textDecoration: "none" }}>
                    <Button
                    id = "splash-button"
                        style={{
                        width: 250,
                        height: 75,
                        backgroundColor: "#d4d4f5",
                        fontSize: "25px",
                        color: "#9933ff",
                        borderRadius: "10px",
                        fontWeight: "bold"  
                        
                        }}
                    >
                        Sign up
                    </Button>
                </Link>

                <Link to="/register/" style={{ textDecoration: "none" }}>
                    <Button 
                        id = "splash-button"
                        style={{
                        width: 250,
                        height: 75,
                        backgroundColor: "#d4d4f5",
                        fontSize: "20px",
                        color: "#9933ff",
                        borderRadius: "10px",
                        fontWeight: "bold"  
                        }}
                    >
                        Continue as Guest
                    </Button>
                </Link>                
            </div>  );
}