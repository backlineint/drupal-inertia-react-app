export default function Example({ props }) {
  console.log("Example template props", props);
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.body}</p>
    </>
  );
}
