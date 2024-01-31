export const Message = ({ message, suggestions }: { message: string; suggestions?: string }) => (
  <p
    style={{
      whiteSpace: "pre-wrap",
    }}
  >
    <b>Kindllm</b>: {message}
  </p>
);
