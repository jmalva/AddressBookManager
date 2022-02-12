
  
export default function Footer({children}) {

  return(
    <footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            height: 50px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .logo {
            height: 1em;
          }
        `}
      </style></footer>
  );
}