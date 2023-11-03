import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", C: 12, packed: true },
  { id: 3, description: "Charger", quantity: 4, packed: false },
  { id: 4, description: "Mobile", quantity: 1, packed: true },
];
function App() {
  const [pkList, setPkList] = useState([]);
  function addList(newItem) {
    setPkList([...pkList, newItem]);
  }
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1> 🌴 Far Away 💼</h1>;
}
function Form({ pkList, addList }) {
  const [des, setDes] = useState("");
  const [qunt, setQunt] = useState("");
  const newItem = {
    id: date.now(),
    description: { des },
    quantity: { qunt },
  };
  function handleSubmit(e) {
    e.preventDefault();
    addList(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select name="sel" value={qunt} onChange={(e) => setQunt(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={des}
        onChange={(e) => setDes(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span>{item.quantity}</span>
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {item.description}
      </span>
      <button>❌</button>
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
