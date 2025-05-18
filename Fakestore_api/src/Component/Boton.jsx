function Boton({ onAdd, onRemove, product, inCart }) {
    return (
        <div className="boton1" style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onAdd(product)}>Añadir</button>
            <button onClick={() => onRemove(product)} disabled={!inCart}>Eliminar</button>
        </div>
    );
}

export default Boton;