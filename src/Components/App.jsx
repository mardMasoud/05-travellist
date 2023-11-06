import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import Stats from "./Stats";

function App() {
    const [pkList, setPkList] = useState([]);
    function hadlleClearList() {
        const confrimed = window.confirm("Are  you sure you want to delete all items?");
        if (confrimed) setPkList([]);
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
export default App;
