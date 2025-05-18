import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Boton from "./Boton";

function Pcard({ Product, addToCart, removeFromCart, cart }) {
    return (
        <div className="view">
            {Product.map((prod) => (
                <Card className="mt-6 w-96" key={prod.id}>
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img src={prod.image} alt={prod.title} />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {prod.title}
                        </Typography>
                        <Typography>
                            {prod.description}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {prod.category}
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            ${prod.price}
                        </Typography>
                        <Boton
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                            product={prod}
                            inCart={cart.some(item => item.id === prod.id)}
                        />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Pcard;