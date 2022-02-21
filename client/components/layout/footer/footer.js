
  
export default function Footer({children}) {

  return (
    <footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            height: 25px;
            border-top: 1px solid #eaeaea;
            display: flex;
            background: DarkOrchid;
            justify-content: center;
            align-items: center;
            position: fixed;
            left: 0px;
            right: 0px;
            bottom: 0rem;
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
      </style>
    </footer>
  );
}