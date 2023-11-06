export function Item({ item, onDelelteItems, handlePacked }) {
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
