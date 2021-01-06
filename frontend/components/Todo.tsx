export default function Todo({ todo }) {
  const { title, body } = todo;
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
