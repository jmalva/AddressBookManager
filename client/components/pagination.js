import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, current }) => {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNum.push(i);
  }
 
  return (
    <div className="pageNav">
      <ul className="pageNumbers">
        {pageNum.map((number) => (
          <li
            key={number}
            id={number}
            className={current === number ? "active" : null}
            onClick={() => current !== number ? paginate(number) : null}
          >
            {number}
          </li>
        ))}
      </ul>
      <style jsx>{`
       
      `}</style>
    </div>
  );
};
export default Pagination;
