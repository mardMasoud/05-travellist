import { useState } from "react";

function App() {
    const [pkList, setPkList] = useState([]);
    function handleAddlist(newItem) {
        setPkList([...pkList, newItem]);
    }
   function handleDelelteItems(id){
    setPkList(pkList=>pkList.filter(item=>item.id!==id))
   }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddlist} />
            <PackingList pkList={pkList} onDelelteItems={handleDelelteItems}/>
            <Stats />
        </div>
    );
}
function Logo() {
    return <h1> 🌴 Far Away 💼</h1>;
}
function Form({ onAddItems }) {
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

function PackingList({ pkList,onDelelteItems }) {
    console.log(pkList);
    return (
        <div className="list">
            <ul>
                {pkList.map((item) => (
                    <Item item={item} key={item.id} items={pkList}  onDelelteItems={onDelelteItems} />
                ))}
            </ul>
        </div>
    );
}
function Item({ item, onDelelteItems }) {

    function DelelteItems(id) {
     onDelelteItems(id)
    }
   
    return (
        <li>
            <span>{item.quantity}</span>
            <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
                {item.description}
            </span>
            <button onClick={()=>DelelteItems(item.id)}>❌</button>
        </li>
    );
}
function Stats() {
    return (
        <footer
            className="stats 
  "
        >
            You have X items on your list
        </footer>
    );
}
export default App;
