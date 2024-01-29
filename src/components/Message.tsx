export const Message = ({ message, suggestions }: { message: string; suggestions?: string }) => (
  <p class="message">
    <b>Kindllm</b>: {message}
  </p>
);
