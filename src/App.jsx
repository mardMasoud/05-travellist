import { useState } from "react";

function App() {
    const [pkList, setPkList] = useState([]);

    function handleAddlist(newItem) {
        setPkList([...pkList, newItem]);
    }
    function handleDelelteItems(id) {
        setPkList((pkList) => pkList.filter((item) => item.id !== id));
    }
    function handlePacked(id) {
        setPkList((pkList) =>
            pkList.map((list) => (list.id === id ? { ...list, packed: !list.packed } : list))
        );
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddlist} />
            <PackingList
                pkList={pkList}
                onDelelteItems={handleDelelteItems}
                handlePacked={handlePacked}
            />
            <Stats items={pkList}/>
        </div>
    );
}
function Logo() {
    return <h1> 🌴 Far Away 💼</h1>;
}
function Form({ onAddItems, packed }) {
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

function PackingList({ pkList, onDelelteItems, handlePacked }) {
    return (
        <div className="list">
            <ul>
                {pkList.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        items={pkList}
                        onDelelteItems={onDelelteItems}
                        handlePacked={handlePacked}
                    />
                ))}
            </ul>
        </div>
    );
}
function Item({ item, onDelelteItems, handlePacked }) {
    function DelelteItems(id) {
        onDelelteItems(id);
    }
    function checkedHandler(id) {
        console.log(id);
        handlePacked(id);
    }

    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                id=""
                onChange={() => checkedHandler(item.id)}
            />
            <span>{item.quantity}</span>
            <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
                {item.description}
            </span>
            <button onClick={() => DelelteItems(item.id)}>❌</button>
        </li>
    );
}
function Stats({items}) {
    return (
        <footer
            className="stats 
  "
        >
            You have {items.length} items on your list
        </footer>
    );
}
export default App;
