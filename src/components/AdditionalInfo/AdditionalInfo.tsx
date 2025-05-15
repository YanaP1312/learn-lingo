const AdditionalInfo = ({ teacher }) => {
  return (
    <div>
      <p>{teacher.experience}</p>
      <ul>
        {teacher.reviews.map((review) => {
          <li>
            <div>
              <div>
                <img
                  src="/image/comment.jpeg"
                  width={44}
                  height={44}
                  alt="Student avatar"
                />
              </div>

              <div>
                <p>{review.reviewer_name}</p>
                <div>
                  <svg>
                    <use href="/sprite.svg#icon-star" />
                  </svg>
                  <p>{review.reviewer_rating}</p>
                </div>
              </div>
              <b>{review.comment}</b>
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default AdditionalInfo;
