import { Handle, Position } from "reactflow";

export default function CircleNode({ data }: any) {
  return (
    <div
      style={{
        width: 130,
        height: 130,
        borderRadius: "50%",
        background: "white",
        border: "4px solid #a855f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        fontWeight: "bold",
        color: "black",
        fontSize: 14,
        textAlign: "center",
      }}
    >
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Top} />

      {data.label}
    </div>
  );
}
