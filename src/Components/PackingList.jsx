import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ pkList, onDelelteItems, handlePacked, hadlleClearList }) {
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
                <button onClick={hadlleClearList}>clear list</button>
            </div>
        </div>
    );
}
