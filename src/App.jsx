import { useState } from "react";

function App() {
    const [pkList, setPkList] = useState([]);
    function hadlleClearList(){
        setPkList([])
    }
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
                hadlleClearList={hadlleClearList}
            />
            <Stats items={pkList} />
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

function PackingList({ pkList, onDelelteItems, handlePacked ,hadlleClearList}) {
    const [sortBy, setSortBy] = useState("input");
    let sorted;

    if (sortBy === "input") sorted = pkList;
    else if (sortBy === "des")
        sorted = pkList.slice().sort((a, b) => {
            const _a = a.description.toUpperCase();
            const _b = b.description.toUpperCase();
            if (_a < _b) return -1;
            if (_a > _b) return 1;
            return 0;
        });
    else if (sortBy === "packed") sorted = pkList.slice().sort((a, b) => b.packed - a.packed);
    console.log(sorted);
    function sortHandler(e) {
        setSortBy(e.target.value);
        console.log(sortBy);
    }
    function clearHandler(){
        hadlleClearList()
    }
    return (
        <div className="list">
            <ul>
                {sorted.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        items={sorted}
                        onDelelteItems={onDelelteItems}
                        handlePacked={handlePacked}
                    />
                ))}
            </ul>
            <div className="actions">
                <select value={sortBy} id="" onChange={(e) => sortHandler(e)}>
                    <option value="input">Sort by input order</option>
                    <option value="des">Sort by deccription</option>
                    <option value="packed">Sort by packed status</option>
                </select>
               <button onClick={clearHandler}>clear list</button>
            </div>
        </div>
    );
}
function Item({ item, onDelelteItems, handlePacked }) {
    function DelelteItems(id) {
        onDelelteItems(id);
    }
    function checkedHandler(id) {
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
function Stats({ items }) {
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
