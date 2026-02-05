import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Michael A",
    date: "March 12, 2024",
    rating: 5,
    review:
      "Outbound Global Pathways provided clear guidance and well-organized administrative support throughout my petition preparation process. The consultation helped me better understand my options and next steps.",
  },
  {
    name: "Sophia K",
    date: "January 28, 2024",
    rating: 5,
    review:
      "The team was professional, responsive, and detail-oriented. Their structured approach made a complex immigration process much easier to navigate.",
  },
  {
    name: "Daniel O",
    date: "December 3, 2023",
    rating: 4,
    review:
      "I appreciated the clarity and transparency throughout the process. Everything was explained in a straightforward way, and expectations were clearly set from the beginning.",
  },
  {
    name: "Aisha M",
    date: "October 19, 2023",
    rating: 5,
    review:
      "Their administrative support was thorough and well-structured. I felt informed and confident throughout the preparation process.",
  },
  {
    name: "Robert T",
    date: "August 7, 2023",
    rating: 4,
    review:
      "Clear communication and well-organized documentation support. The consultation session was especially helpful.",
  },
];

const ReviewsSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  const next = () => {
    if (startIndex + 3 < reviews.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="my-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Client Reviews
            </h2>
            <p className="text-gray-700 mt-2">
              Experiences shared by individuals who used our immigration
              consulting and administrative support services.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="p-2 rounded-full cursor-pointer border disabled:opacity-40 hover:bg-blue-50 transition"
              disabled={startIndex === 0}
              onClick={prev}
            >
              <FaChevronLeft />
            </button>
            <button
              className="p-2 rounded-full cursor-pointer border disabled:opacity-40 hover:bg-blue-50 transition"
              disabled={startIndex + 3 >= reviews.length}
              onClick={next}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visibleReviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              {/* Header */}
              <span className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-mygreen text-white flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    <FaStar />
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
