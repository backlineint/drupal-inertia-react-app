interface ArticleProps {
  props: {
    body: string;
  };
}

export default function Article(props: ArticleProps) {
  console.log(props);
  return (
    <>
      <h2>Loaded with inertia</h2>
      <ul>
        <li>props.props.body {props.props.body}</li>
      </ul>
    </>
  );
}
