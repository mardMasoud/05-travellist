import { useState } from "react";

export function Form({ onAddItems, packed }) {
    const [description, setDes] = useState("");
    const [quantity, setQunt] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };
        setDes("");
        setQunt(1);
        onAddItems(newItem);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select value={quantity} onChange={(e) => setQunt(e.target.value)}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="item..."
                value={description}
                onChange={(e) => setDes(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
