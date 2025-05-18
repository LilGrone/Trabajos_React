import { useState } from "react";

function Barra({ onSearch, onShowCategories, onShowCart }) {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            onSearch(search.trim());
            setSearch("");
        }
    };

    return (
        <div className="navbar">
            <h1>SPACE CLUB</h1>
            <ul>
                <li><button className="nav-btn"><a href="/" >Home</a></button></li>
                <li>
                  <button className="nav-btn" onClick={onShowCategories}>Categorias</button>
                </li>
                <li>
                  <button className="nav-btn" onClick={onShowCart}>Compra</button>
                </li>
            </ul>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}
export default Barra;